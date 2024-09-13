
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, Dimensions, Alert } from "react-native";
import { Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';


WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
    responseType: ResponseType.Token,
  });




  const handleLogin = async () => {
    try {
      const response = await axios.post("https://your-api-endpoint.com/login", {
        email: email,
        password: password,
      });

      // Handle successful login here (e.g., navigate to another screen)
      console.log("Login successful", response.data);
      // Example: Navigate to a different screen after successful login
      // navigation.navigate("HomeScreen");

    } catch (error) {
      console.error("Login failed", error);
      Alert.alert("Login failed", "Invalid email or password. Please try again.");
    }
  };

  const handleGoogleAuth = async () => {
    const result = await promptAsync();

    if (result.type === 'success') {
      // Handle successful Google authentication here
      console.log("Google authentication successful", result.authentication);
      
      // Example: Navigate to another screen upon success
      navigation.navigate("HomeScreen");
    } else {
      Alert.alert("Google Sign-In failed", "Please try again.");
    }
  };

  return (
    <View style={styles.login}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/startsy-5-31.png")}
        />
      </View>
      <View style={styles.formContainer}>
        <Input
          placeholder="E-Mail ID"
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          leftIcon={{ type: "font-awesome", name: "envelope", color: "#828282" }}
          value={email}
          onChangeText={setEmail} // Update email state
        />
        <Input
          placeholder="Password"
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          leftIcon={{ type: "font-awesome", name: "lock", color: "#828282" }}
          secureTextEntry
          value={password}
          onChangeText={setPassword} // Update password state
        />
        <Text style={styles.forgot}>Forgot?</Text>
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        <Text style={styles.orContinueWith}>Or continue with</Text>
        <Pressable style={styles.googleAuth} onPress={handleGoogleAuth}>
       
          <Image
            style={styles.googleIcon}
            contentFit="cover"
            source={require("../assets/flatcoloriconsgoogle.png")}
          />
          <Text style={styles.googleText}>Google</Text>
        </Pressable>
        <View style={styles.signUpContainer}>
          <Text style={styles.dontHaveAccount}>Don’t have an account?</Text>
          <View>
            <Pressable onPress={() => navigation.navigate("Login1")}>
              <Text style={styles.createNow}>Create now</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
  },
  login: {
    flex: 1,
    backgroundColor: "#16181A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    marginBottom:0,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    margintop:5
  },
  logo: {
    width: 234,
    height: 234,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#24272A",
    borderTopLeftRadius: 60, // Round only the top left corner
    borderBottomLeftRadius: 0, // Round the bottom left corner as well
    borderTopRightRadius: 0, // No rounding for the top right corner
    borderBottomRightRadius: 0, // No rounding for the bottom right corner
    padding: 20,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 5,
    shadowRadius: 4,
  },
  inputText: {
    color: "#FFFFFF", // Updated text color for better visibility
  },
  inputContainer : {
    marginBottom: 10,
  },
  forgot: {
    alignSelf: "flex-end",
    color: "#FFFFFF",
    fontWeight: "500",
    marginTop: -60, // Adjust this value to move it up
  },
  loginButton: {
    backgroundColor: "#000000", // Black button color
    borderRadius: 30,
    width: width * 0.7, // Dynamically setting the width
    height: height * 0.07, // Dynamically setting the height
    justifyContent: "center",
    alignItems: "center",
    display:"flex",
    marginTop: 30,
    marginLeft:30
  },
  loginButtonText: {
    color: "#FFFFFF", // White text on black button
    fontWeight: "600",
    fontSize: 16,
  },
  orContinueWith: {
    color: "#B3B3B3",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "Roboto-Regular",
  },
  googleAuth: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10, // Reduced padding for a smaller button
    borderRadius: 10,
    width: width * 0.5, // Maintain width
    marginLeft:70,
    height: height * 0.06, // Reduced height for a smaller button
  },
  googleIcon: {
    marginRight: 10,
    width: 20, // Increased size for better visibility
    height: 20,
  },
  googleText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto-Bold",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  dontHaveAccount: {
    color: "#B3B3B3",
  },
  createNow: {
    color: "#00FF66", // Updated to match the green color in the image
    fontWeight: "500",
    marginLeft: 5,
  },
});

export default Login;
