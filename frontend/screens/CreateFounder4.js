//team information page
import * as React from "react";
import { StyleSheet, View, Text, Pressable ,TextInput} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios"; // Import Axios
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const CreateFounder4 = () => {
  const navigation = useNavigation();
 
  const route = useRoute();
  const  {fullName, email, contactInfo, age, gender, Country, profileImageUri,
    company,year,role,skills,education,nameOfStartup,
    goal,fundingStatus,socialProof,description,sector,stageOfStartup} = route.params;


  const [tag, settag] = React.useState("");
  const [name, setname] = React.useState("");
  const [teamrole, setteamrole] = React.useState("");
// Axios API request function
const handleSubmit = async () => {
  try {
    const response = await axios.post("http://192.168.43.217:5000/api/founderInfo", {
      fullName,
      email,
      contactInfo,
      age,
      gender,
      Country,
      profileImageUri,
      company,
      year,
      role,
      skills,
      education,
      nameOfStartup,
      goal,
      fundingStatus,
      socialProof,
      description,
      sector,
      stageOfStartup,
      tag,
      name,
      teamrole
    });

    // Handle the response here (e.g., navigate to another screen or display success message)
    console.log("Response:", response.data);
    navigation.navigate("SuccessScreen"); // Replace with your success screen
  } catch (error) {
    console.error("Error submitting form:", error);
    // You can show an error message or alert here
  }
};



  return (
    <View style={styles.createAccountFounder6}>
      <Text>fullName:{fullName}</Text>
      <Text>email:{email}</Text>
      <Text>contactInfo:{contactInfo}</Text>
      <Text>age:{age}</Text>
      <Text>gender:{gender}</Text>
      <Text> Country:{ Country}</Text>
      <Text> profileImageUri:{ profileImageUri}</Text>
      <Text> company:{ company}</Text>
      <Text> year:{ year}</Text>
      <Text> role:{ role}</Text>
      <Text> skills:{ skills}</Text>
      <Text> education:{ education}</Text>
      <Text>nameOfStartup:{ nameOfStartup}</Text>
      <Text>goal:{ goal}</Text>
      <Text>fundingStatus:{ fundingStatus}</Text>
      <Text>socialProof:{ socialProof}</Text>
      <Text>description:{description}</Text>
      <Text>sector:{ sector}</Text>
      <Text>stageOfStartup:{ stageOfStartup}</Text>
      
      <View style={styles.createAccountFounder6Child} />
      <View style={styles.teamMemberCard}>
        <View style={[styles.teamMemberCardChild, styles.childBorder]} />
        <View style={[styles.username, styles.nameLayout]}>
          <View style={[styles.usernameChild, styles.childPosition]} />
          
          <TextInput
            style={[styles.username1, styles.name1Typo]}
            placeholder="@Username"
            placeholderTextColor={"silver"}
            value={tag}
            onChangeText={(text) => settag(text)}
          />
        </View>
        <View style={[styles.name, styles.nameLayout]}>
          <View style={[styles.usernameChild, styles.childPosition]} />
   
          <TextInput
            style={[styles.name1, styles.name1Typo]}
            placeholder="Name"
            placeholderTextColor={"silver"}
            value={name}
            onChangeText={(text) => setname(text)}
          />
        </View>
        <View style={[styles.role, styles.nameLayout]}>
          <View style={[styles.usernameChild, styles.childPosition]} />
        
          <TextInput
            style={[styles.name1, styles.name1Typo]}
            placeholder="Role"
            placeholderTextColor={"silver"}
            value={teamrole}
            onChangeText={(text) => setteamrole(text)}
          />
        </View>
        <Image
          style={styles.plus02Icon}
          contentFit="cover"
          //source={require("../assets/plus02.png")}
        />
      </View>
      <Text style={[styles.teamInformation, styles.submitTypo]}>
        Team Information
      </Text>
      <View style={[styles.progress, styles.progressLayout]}>
        <View style={[styles.progressChild, styles.childPosition]} />
        <Image
          style={[styles.progressItem, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressInner, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.ellipseIcon, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressChild1, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressChild2, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <LinearGradient
          style={[styles.rectangleLineargradient, styles.progressChildPosition]}
          locations={[0, 1]}
          colors={["rgba(255, 255, 255, 0.6)", "rgba(153, 153, 153, 0.4)"]}
        />
        <Text style={[styles.text, styles.textTypo]}>1</Text>
        <Text style={[styles.text1, styles.textTypo]}>2</Text>
        <Text style={[styles.text2, styles.textTypo]}>3</Text>
        <Text style={[styles.text3, styles.textTypo]}>4</Text>
        <Image
          style={[styles.startsy53, styles.progressLayout]}
          contentFit="cover"
          source={require("../assets/startsy-5-3.png")}
        />
      </View>
      <View style={[styles.submitButton, styles.submitLayout]}>
        <View style={[styles.submitButtonChild, styles.submitLayout]} />
        <Pressable onPress={handleSubmit}>
        <Text style={[styles.submit, styles.submitTypo]}>Submit</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.expandLeft}
        onPress={() => navigation.navigate("CreateFounder3")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/expand-left.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  childBorder: {
    borderColor: "black",
    left: 0,
  },
  nameLayout: {
    height: 44,
    width: 240,
    left: 22,
    position: "absolute",
  },
  childPosition: {
    top: 40,
    borderStyle: "solid",
    position: "absolute",
  },
  name1Typo: {
    textAlign: "left",
    color: Color.colorSilver_200,
    fontFamily: FontFamily.sansSerifCollection,
    fontSize: FontSize.size_lg_8,
    left: 8,
    top: 0,
    position: "absolute",
  },
  submitTypo: {
    textAlign: "center",
    fontFamily: FontFamily.alataRegular,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  progressLayout: {
    height: 83,
    position: "absolute",
  },
  progressChildPosition: {
    height: 12,
    top: 34,
    position: "absolute",
  },
  textTypo: {
    color: Color.colorSpringgreen_200,
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_mini,
    top: 48,
    textAlign: "left",
    position: "absolute",
  },
  submitLayout: {
    height: 48,
    width: 168,
    position: "absolute",
  },
  createAccountFounder6Child: {
    top: 118,
    borderTopLeftRadius: Border.br_41xl,
    width: 360,
    height: 700,
    backgroundColor: "#24272A",
    left: 0,
    position: "absolute",
  },
  teamMemberCardChild: {
    borderRadius: Border.br_3xs,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "black",
    top: 0,
    height: 194,
    width: 284,
    backgroundColor: Color.colorGray_100,
    position: "absolute",
  },
  usernameChild: {
    borderTopWidth: 2,
    width: 242,
    height: 2,
    borderColor: "black",
    left: 0,
  },
  username1: {
    width: 230,
  },
  username: {
    top: 26,
  },
  name1: {
    width: 88,
  },
  name: {
    top: 79,
  },
  role: {
    top: 132,
  },
  plus02Icon: {
    top: 12,
    left: 245,
    width: 28,
    height: 28,
    position: "absolute",
  },
  teamMemberCard: {
    top: 222,
    left: 38,
    height: 194,
    width: 284,
    position: "absolute",
  },
  teamInformation: {
    top: 168,
    left: 82,
    lineHeight: 26,
    color: "white",
  },
  progressChild: {
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    borderTopWidth: 3,
    width: 222,
    height: 3,
  },
  progressItem: {
    width: 12,
    height: 12,
    top: 34,
    left: 90,
  },
  progressInner: {
    left: 145,
    width: 12,
    height: 12,
    top: 34,
    
  },
  ellipseIcon: {
    left: 200,
    width: 12,
    height: 12,
    top: 34,
  },
  progressChild1: {
    left: 255,
    width: 12,
    height: 12,
    top: 34,
  },
  progressChild2: {
    left: 310,
    width: 12,
    height: 12,
    top: 34,
  },
  rectangleLineargradient: {
    borderRadius: Border.br_11xl,
    borderColor: "black",
    borderWidth: 0.2,
    width: 232,
    backgroundColor: "transparent",
    left: 90,
    height: 12,
    top: 34,
    borderStyle: "solid",
  },
  text: {
    left: 148,
  },
  text1: {
    left: 202,
  },
  text2: {
    left: 257,
  },
  text3: {
    left: 311,
  },
  startsy53: {
    width: 83,
    top: 0,
    left: 0,
  },
  progress: {
    top: 16,
    width: 322,
    left: 12,
  },
  submitButtonChild: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorSpringgreen_100,
    top: 0,
    left: 0,
  },
  submit: {
    top: 19,
    left: 45,
    lineHeight: 24,
    color: Color.colorBlack_100,
    width: 79,
    height: 18,
  },
  submitButton: {
    top: 609,
    left: 169,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  expandLeft: {
    top: 595,
    width: 76,
    height: 76,
    left: 12,
    position: "absolute",
  },
  createAccountFounder6: {
    backgroundColor: "#16181A",
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default CreateFounder4;
