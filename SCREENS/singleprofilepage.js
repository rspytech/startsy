import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Upvote from "../assets/icons/upvote.js"; // Replace with your Upvote component
import Share from "../assets/icons/share.js"; // Replace with your Share component

const Singleprofilepage = () => {
  const handleFollow = () => {
    // Handle Follow action
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.profileSection}>
        <Image
          style={styles.profileImage}
          source={require("../assets/images/p1.png")}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.username}>raz.shhh</Text>
          <Text style={styles.role}>Founder</Text>
        </View>
        <Text style={styles.connections}>12k ↑</Text>
      </View>

      {/* Bio Section */}
      <View style={styles.bioSection}>
        <Text style={styles.bioText}>
          Revolutionizing the startup ecosystem.
        </Text>
        <Text style={styles.stage}>Preseed stage - 200k</Text>
        <Text style={styles.connectionsInfo}>
          3 Investor connections · 34 connections
        </Text>
      </View>

      {/* Follow Button */}
      <Pressable style={styles.followButton} onPress={handleFollow}>
        <Text style={styles.followText}>Follow</Text>
      </Pressable>

      {/* Post Section */}
      <View style={styles.postSection}>
        <Image
          style={styles.postImage}
          source={require("../assets/images/template.png")}
        />
        <View style={styles.postActions}>
          <View style={styles.actionsLeft}>
            <Upvote width={36} height={36} />
            <FontAwesome name="comment-o" size={30} color="#00DE62" />
          </View>
          <Share />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#16181a",
    padding: 16,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 12,
  },
  username: {
    fontFamily: "Alata",
    fontSize: 20,
    color: "#E9E9E9",
  },
  role: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#00DE62",
  },
  connections: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#00DE62",
  },
  bioSection: {
    marginBottom: 16,
  },
  bioText: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#B8B8B8",
    marginBottom: 4,
  },
  stage: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#00DE62",
  },
  connectionsInfo: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#B8B8B8",
  },
  followButton: {
    backgroundColor: "#00DF60",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: "center",
    marginBottom: 16,
  },
  followText: {
    fontFamily: "Alata",
    fontSize: 16,
    color: "#16181A",
  },
  postSection: {
    marginTop: 16,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  actionsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Singleprofilepage;
