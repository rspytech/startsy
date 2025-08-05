from sentence_transformers import SentenceTransformer
import pymongo
import redis
import json
from bson import ObjectId
from dotenv import load_dotenv
import os
import numpy as np

# Load environment variables
load_dotenv()
mongo_uri = os.getenv("MONGODB_URI")

# Connect to Redis
r = redis.Redis()

# Load SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Connect to MongoDB
client = pymongo.MongoClient(mongo_uri)
db = client["startsy"]
post_vectors_col = db["postVectors"]
posts_col = db["posts"]
saves_col = db["saves"]
general_col = db["generals"]
user_vectors_col = db["userVectors"]

def get_post_vectors(user_id):
    post_ids = set()

    # Posts created by the user
    created_posts = posts_col.find({"user_id": ObjectId(user_id)}, {"_id": 1})
    post_ids.update([p["_id"] for p in created_posts])

    # Posts liked by the user
    liked_posts = posts_col.find({"likedBy": ObjectId(user_id)}, {"_id": 1})
    post_ids.update([p["_id"] for p in liked_posts])

    # Posts saved by the user
    saved = saves_col.find_one({"userId": ObjectId(user_id)})
    if saved and "saveId" in saved:
        post_ids.update(saved["saveId"])

    # Get vectors for all posts
    vectors = []
    for pid in post_ids:
        pv = post_vectors_col.find_one({"_id": ObjectId(pid)})
        if pv and "vector" in pv:
            vectors.append(np.array(pv["vector"]))

    return vectors

def get_profile_vector(user_id):
    general = general_col.find_one({"user_id": ObjectId(user_id)})
    if not general:
        return None

    fields = [
        general.get("areaOfInterest", ""),
        general.get("contentPrefrence", ""),
        general.get("skills", ""),
        general.get("goal", ""),
        general.get("tagline", ""),
        general.get("description", ""),
        general.get("education", "")
    ]
    combined_text = " ".join([str(f) for f in fields if f])

    if combined_text.strip() == "":
        return None

    return model.encode(combined_text)

def compute_user_vector(user_id):
    vectors = get_post_vectors(user_id)
    behavior_vector = np.mean(vectors, axis=0) if vectors else np.zeros(384)

    profile_vector = get_profile_vector(user_id)
    if profile_vector is None:
        final_vector = behavior_vector
    else:
        final_vector = 0.6 * behavior_vector + 0.4 * profile_vector

    return final_vector.tolist()

def process_job(job_data):
    user_id = job_data['userId']
    print(f"Processing user vector for user {user_id}...")

    user_vector = compute_user_vector(user_id)

    user_vectors_col.update_one(
        {"user_id": ObjectId(user_id)},
        {"$set": {"vector": user_vector}},
        upsert=True
    )
    print(f"Vector saved for user: {user_id}")

def listen():
    print("User Vector Worker listening for jobs...")
    while True:
        job = r.blpop("bull:userVectorQueue:wait", timeout=0)
        if job:
            _, job_id_bytes = job
            job_id = job_id_bytes.decode()
            print("Got job ID:", job_id)

            job_key = f"bull:userVectorQueue:{job_id}"
            job_hash = r.hgetall(job_key)

            if not job_hash:
                print("No job hash found.")
                continue

            try:
                job_json = json.loads(job_hash[b'data'].decode())
                process_job(job_json)
            except Exception as e:
                print("Error processing job:", e)

listen()
