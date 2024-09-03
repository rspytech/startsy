

import * as React from "react";
import { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, Text, Dimensions } from "react-native";
import { Input } from "@rneui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const CreateAccount = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get the userType from the route params
  const { role } = route.params;
  const [userName, setUserName] = useState("");

  return (
    <View style={styles.createAccount1}>
      <View style={styles.vectorParent}>
        <Image
          style={styles.backgroundImage}
          contentFit="cover"
          source={require("../assets/rectangle-4523.png")}
        />
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            contentFit="cover"
            source={require("../assets/startsy-5-3.png")}
          />
        </View>
      </View>
      <Image
        style={styles.startsy531}
        contentFit="cover"
        source={require("../assets/startsy-5-31.png")}
      />
      <Pressable
        style={styles.backButtonWrapper}
        onPress={() => navigation.navigate("Login1")}
      >
        <Image
          style={styles.backIcon}
          contentFit="cover"
          source={require("../assets/group-27.png")}
        />
      </Pressable>
      <View style={styles.contentWrapper}>
        <Text style={styles.chooseUsername}> {`Create your ${role} account`}</Text>
        <Text style={styles.subText}>You can always change it later.</Text>
        <View style={styles.inputWrapper}>
          
          <Input
          placeholder="UserName"
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          value={userName}
          onChangeText={(text) => setUserName(text)}
          
        />
        </View>
        <Pressable
          style={styles.buttonWrapper}
          onPress={() => navigation.navigate("CreateAccount1", {role, userName })}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  createAccount1: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  logoContainer: {
    backgroundColor: "#000000", // Set the background color to black
    padding: 10, // Optional: Add padding for spacing
    borderRadius: width * 0.35, // Optional: Adjust to round the corners
  },
  startsy531: {
    top: 42,
    left: 93,
    width: 177,
    height: 177,
    position: "absolute",
  },
  vectorParent: {
    width: "100%",
    height: height * 0.5,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: height * 0.02,
    paddingBottom: height * 0.05,
  },
  backButtonWrapper: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  contentWrapper: {
    width: "100%",
    height: "90%",
    backgroundColor: "#24272A",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.1,
    margin: -80,
  },
  chooseUsername: {
    fontSize: width * 0.08,
    fontFamily: "Alata",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subText: {
    fontSize: width * 0.04,
    color: "#9E9E9E",
    textAlign: "center",
    marginTop: 10,
  },
  inputWrapper: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    // Removed the borderBottomWidth and borderColor properties
  },
  inputText: {
    color: "#FFFFFF", // Updated text color for better visibility
  },
  inputContainer: {
    marginBottom: 10,
  },
  buttonWrapper: {
    width: "100%",
    backgroundColor: "#00FF66",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginTop: 30,
  },
  nextButtonText: {
    fontSize: width * 0.06,
    color: "#000000",
    textAlign: "center",
  },
});

export default CreateAccount;