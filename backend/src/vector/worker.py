import redis
import json
from sentence_transformers import SentenceTransformer
import pymongo
from bson import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()
mongo_uri = os.getenv("MONGODB_URI")

r = redis.Redis()

model = SentenceTransformer('all-MiniLM-L6-v2')

client = pymongo.MongoClient(mongo_uri)
db = client["startsy"]
post_vectors = db["postVectors"]

def process_job(job_data):
    post_id = job_data['postId']
    text = job_data['text']
    print(f"Processing vector for post {post_id}...")

    vector = model.encode(text).tolist()

    post_vectors.update_one(
        {"_id": ObjectId(post_id)},
        {"$set": {"vector": vector}},
        upsert=True
    )
    print(f"Vector saved for post: {post_id}")

def listen():
    print("Worker listening for jobs...")
    while True:
        job = r.blpop("bull:vectorQueue:wait", timeout=0)
        if job:
            _, job_id_bytes = job
            job_id = job_id_bytes.decode()
            print("Got job ID from queue:", job_id)

            # Use HGETALL because BullMQ stores jobs as hashes
            job_key = f"bull:vectorQueue:{job_id}"
            job_hash = r.hgetall(job_key)

            if not job_hash:
                print("No job hash found for ID:", job_id)
                continue

            try:
                # job_hash[b'data'] is bytes -> decode -> parse JSON
                job_json = json.loads(job_hash[b'data'].decode())
                print("Job data:", job_json)
                process_job(job_json)
            except Exception as e:
                print("Error processing job:", e)
        else:
            print("No jobs in the queue, waiting...")

listen()