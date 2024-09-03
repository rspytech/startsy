
/*import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from '@rneui/themed';


const { width, height } = Dimensions.get("window");

const Login1 = ({title}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('createAccount1'); 
  };

  return (
    <View style={styles.login}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Image
          style={styles.backIcon}
          contentFit="cover"
          source={require("../assets/group-27.png")}
        />
      </Pressable>
      
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/startsy-5-31.png")}
        />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.newAccountText}>Create a new account as?</Text>
        <Pressable
          style={styles.optionButton}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={styles.optionText}>Investor</Text>
        </Pressable>
        <View>
      <Button 
        title="Founder" 
        onPress={handlePress}
        buttonStyle={styles.optionButton} 
       titleStyle={styles.optionText}
      />
    </View>
        <Pressable style={styles.optionButton}>
          <Text style={styles.optionText}>Freelancer</Text>
        </Pressable>
        <Pressable style={styles.optionButton}>
          <Text style={styles.optionText}>Community member</Text>
        </Pressable>
        <Text style={styles.helpText}>
          Don’t know what to choose? 
          <Pressable onPress={() => navigation.navigate("About")}>
            <Text style={styles.readMoreText}> Read more</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#16181A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    
   backgroundColor: "#24272A",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.1,
  },
  newAccountText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Alata-Regular",
    fontSize: 24,
    lineHeight: 28,
    marginBottom: height * 0.03,
  },
  optionButton: {
    backgroundColor: "#00FF66", // Matching the logo color
    borderRadius: 30,
    width: "100%",
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  optionText: {
    color: "#000000", // Black text on the button
    fontWeight: "600",
    fontSize: 20,
  },
  helpText: {
    color: "#FFFFFF", // Matching "Don't know what to choose?" color
    fontSize: 14,
    textAlign: "center",
    marginTop: height * 0.03,
    marginBottom: height * 0.02, // Adjusted margin to lower the position
  },
  readMoreText: {
    color: "#00FF66", // Green color for the "Read more" text
    fontWeight: "500",
    marginLeft: 5,
  
  },
  backButton: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
  },
  backIcon: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: "contain",
    marginleft:10
  },
});

export default Login1;
import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, Dimensions,TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from '@rneui/themed';


const { width, height } = Dimensions.get("window");
const Login1 = ({ title }) => {
  const navigation = useNavigation();

  const handlePress = (userType) => {
    // Passing prop 'userType' as 'Founder' to CreateAccount
    navigation.navigate("CreateAccount", { userType: "investor" });
    navigation.navigate("CreateAccount", { userType });
  };

  return (
    <View style={styles.login}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Image
          style={styles.backIcon}
          contentFit="cover"
          source={require("../assets/group-27.png")}
        />
      </Pressable>
      
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/startsy-5-31.png")}
        />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.newAccountText}>Create a new account as?</Text>
        <Pressable
         
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Button 
            title="Investor" 
            onPress={handlePress}
            buttonStyle={styles.optionButton} 
            titleStyle={styles.optionText}
          />
        </Pressable>
        <View>
          <Button 
            title="Founder" 
            onPress={handlePress}
            buttonStyle={styles.optionButton} 
            titleStyle={styles.optionText}
          />
        </View>

        <Pressable
          style={styles.optionButton}
          onPress={() => navigation.navigate("CreateAccount", { userType: "Freelancer" })}
        >
          <Text style={styles.optionText}>Freelancer</Text>
        </Pressable>
        
        <Pressable
          style={styles.optionButton}
          onPress={() => navigation.navigate("CreateAccount", { userType: "Community Member" })}
        >
          <Text style={styles.optionText}>Community member</Text>
        </Pressable>
        
        <Text style={styles.helpText}>
          Don’t know what to choose? 
          <Pressable onPress={() => navigation.navigate("About")}>
            <Text style={styles.readMoreText}> Read more</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#16181A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    
   backgroundColor: "#24272A",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.1,
  },
  newAccountText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Alata-Regular",
    fontSize: 24,
    lineHeight: 28,
    marginBottom: height * 0.03,
  },
  optionButton: {
    backgroundColor: "#00FF66", // Matching the logo color
    borderRadius: 30,
    width: "100%",
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  optionText: {
    color: "#000000", // Black text on the button
    fontWeight: "600",
    fontSize: 20,
  },
  helpText: {
    color: "#FFFFFF", // Matching "Don't know what to choose?" color
    fontSize: 14,
    textAlign: "center",
    marginTop: height * 0.03,
    marginBottom: height * 0.02, // Adjusted margin to lower the position
  },
  readMoreText: {
    color: "#00FF66", // Green color for the "Read more" text
    fontWeight: "500",
    marginLeft: 5,
  
  },
  backButton: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
  },
  backIcon: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: "contain",
    marginleft:10
  },
});

export default Login1; //
import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from '@rneui/themed';

const { width, height } = Dimensions.get("window");

const Login1 = ({ title }) => {
  const navigation = useNavigation();

  const handlePress = (userType) => {
    navigation.navigate("CreateAccount", { userType });
  };

  return (
    <View style={styles.login}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Image
          style={styles.backIcon}
          contentFit="cover"
          source={require("../assets/group-27.png")}
        />
      </Pressable>
      
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/startsy-5-31.png")}
        />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.newAccountText}>Create a new account as?</Text>
        
        <Button 
          title="Investor" 
          onPress={() => handlePress("Investor")}
          buttonStyle={styles.optionButton} 
          titleStyle={styles.optionText}
        />

        <Button 
          title="Founder" 
          onPress={() => handlePress("Founder")}
          buttonStyle={styles.optionButton} 
          titleStyle={styles.optionText}
        />
        
        <Button 
          title="Freelancer" 
          onPress={() => handlePress("Freelancer")}
          buttonStyle={styles.optionButton} 
          titleStyle={styles.optionText}
        />

        <Button 
          title="Community Member" 
          onPress={() => handlePress("Community Member")}
          buttonStyle={styles.optionButton} 
          titleStyle={styles.optionText}
        />
        
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>
            Don’t know what to choose?
          </Text>
          <Pressable onPress={() => navigation.navigate("About")}>
            <Text style={styles.readMoreText}> Read more</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#16181A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#24272A",
    borderTopLeftRadius: 60,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.1,
  },
  newAccountText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Alata-Regular",
    fontSize: 24,
    lineHeight: 28,
    marginBottom: height * 0.03,
  },
  optionButton: {
    backgroundColor: "#00FF66",
    borderRadius: 30,
    width: "100%",
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  optionText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 20,
  },
  helpText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
  },
  //
  helpTextContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: height * 0.03, 
    marginBottom: height * 0.02,
  },
  readMoreText: {
    color: "#00FF66",
    fontWeight: "500",
    marginLeft: 5,
  },
  backButton: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
  },
  backIcon: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: "contain",
  },
});

export default Login1;
import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";

const { width, height } = Dimensions.get("window");

const Login1 = ({ title }) => {
  const navigation = useNavigation();

  const handlePress = (userType) => {
    navigation.navigate("CreateAccount", { userType });
  };

  return (
    <View style={styles.login}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Image
          style={styles.backIcon}
          contentFit="cover"
          source={require("../assets/group-27.png")}
        />
      </Pressable>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/startsy-5-31.png")}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.newAccountText}>Create a new account as?</Text>

        <Button
          title="Investor"
          onPress={() => handlePress("Investor")}
          buttonStyle={styles.optionButton}
          titleStyle={styles.optionText}
        />

        <Button
          title="Founder"
          onPress={() => handlePress("Founder")}
          buttonStyle={styles.optionButton}
          titleStyle={styles.optionText}
        />

        <Button
          title="Freelancer"
          onPress={() => handlePress("Freelancer")}
          buttonStyle={styles.optionButton}
          titleStyle={styles.optionText}
        />

        <Button
          title="Community Member"
          onPress={() => handlePress("Community Member")}
          buttonStyle={styles.optionButton}
          titleStyle={styles.optionText}
        />

        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>
            Don’t know what to choose?{" "}
            <Pressable onPress={() => navigation.navigate("About")}>
              <Text style={styles.readMoreText}>Read more</Text>
            </Pressable>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#16181A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#24272A",
    borderTopLeftRadius: 60,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.1,
  },
  newAccountText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Alata-Regular",
    fontSize: 24,
    lineHeight: 28,
    marginBottom: height * 0.03,
  },
  optionButton: {
    backgroundColor: "#00FF66",
    borderRadius: 30,
    width: "100%",
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  optionText: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 20,
  },
  helpTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
  },
  helpText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
  readMoreText: {
    color: "#00FF66",
    fontWeight: "500",
    marginLeft: 5,
  },
  backButton: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
  },
  backIcon: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: "contain",
  },
});

export default Login1;

import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Login1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.login}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Image
          style={styles.backIcon}
          contentFit="cover"
          source={require("../assets/group-27.png")}
        />
      </Pressable>
      
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/startsy-5-31.png")}
        />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.newAccountText}>Create a new account as?</Text>
        <Pressable
          style={styles.optionButton}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={styles.optionText}>Investor</Text>
        </Pressable>
        <Pressable style={styles.optionButton}>
          <Text style={styles.optionText}>Founder</Text>
        </Pressable>
        <Pressable style={styles.optionButton}>
          <Text style={styles.optionText}>Freelancer</Text>
        </Pressable>
        <Pressable style={styles.optionButton}>
          <Text style={styles.optionText}>Community member</Text>
        </Pressable>
        <Text style={styles.helpText}>
          Don’t know what to choose? 
          <Pressable onPress={() => navigation.navigate("About")}>
            <Text style={styles.readMoreText}> Read more</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#16181A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    
   backgroundColor: "#24272A",
    borderTopLeftRadius: 60,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.1,
  },
  newAccountText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Alata-Regular",
    fontSize: 24,
    lineHeight: 28,
    marginBottom: height * 0.03,
  },
  optionButton: {
    backgroundColor: "#00FF66", // Matching the logo color
    borderRadius: 30,
    width: "100%",
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  optionText: {
    color: "#000000", // Black text on the button
    fontWeight: "600",
    fontSize: 20,
  },
  helpText: {
    color: "#FFFFFF", // Matching "Don't know what to choose?" color
    fontSize: 14,
    textAlign: "center",
    marginTop: height * 0.03,
    marginBottom: height * 0.02, // Adjusted margin to lower the position
  },
  readMoreText: {
    color: "#00FF66", // Green color for the "Read more" text
    fontWeight: "500",
    marginLeft: 5,
  
  },
  backButton: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
  },
  backIcon: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: "contain",
    marginleft:10
  },
});

export default Login1;*/
import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text, Pressable, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Login1 = () => {
  const navigation = useNavigation();

  // Function to handle the button press and pass text to the next screen
  const handlePress = (role) => {
    navigation.navigate("CreateAccount", { role });
  };

  return (
    <View style={styles.login}>
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Image
          style={styles.backIcon}
          contentFit="cover"
          source={require("../assets/group-27.png")}
        />
      </Pressable>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/startsy-5-31.png")}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.newAccountText}>Create a new account as?</Text>

        {/* Button with text "Investor", passes "Investor" as prop */}
        <Pressable
          style={styles.optionButton}
          onPress={() => handlePress("Investor")}
        >
          <Text style={styles.optionText}>Investor</Text>
        </Pressable>

        {/* Button with text "Founder", passes "Founder" as prop */}
        <Pressable
          style={styles.optionButton}
          onPress={() => handlePress("Founder")}
        >
          <Text style={styles.optionText}>Founder</Text>
        </Pressable>

        {/* Button with text "Freelancer", passes "Freelancer" as prop */}
        <Pressable
          style={styles.optionButton}
          onPress={() => handlePress("Freelancer")}
        >
          <Text style={styles.optionText}>Freelancer</Text>
        </Pressable>

        {/* Button with text "Community member", passes "Community Member" as prop */}
        <Pressable
          style={styles.optionButton}
          onPress={() => handlePress("Community Member")}
        >
          <Text style={styles.optionText}>Community member</Text>
        </Pressable>

        <Text style={styles.helpText}>
          Don’t know what to choose?
          <Pressable onPress={() => navigation.navigate("About")}>
            <Text style={styles.readMoreText}> Read more</Text>
          </Pressable>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#16181A",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#24272A",
    borderTopLeftRadius: 60,
    paddingVertical: height * 0.05,
    paddingHorizontal: width * 0.1,
  },
  newAccountText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontFamily: "Alata-Regular",
    fontSize: 24,
    lineHeight: 28,
    marginBottom: height * 0.03,
  },
  optionButton: {
    backgroundColor: "#00FF66", // Matching the logo color
    borderRadius: 30,
    width: "100%",
    height: height * 0.07,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02,
  },
  optionText: {
    color: "#000000", // Black text on the button
    fontWeight: "600",
    fontSize: 20,
  },
  helpText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
  },
  readMoreText: {
    color: "#00FF66",
    fontWeight: "500",
    marginLeft: 5,
  },
  backButton: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
  },
  backIcon: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: "contain",
  },
});

export default Login1;
