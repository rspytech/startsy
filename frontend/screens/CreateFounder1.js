/*import * as React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const CreateFounder1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.createAccountFounder4}>
      <View style={styles.createAccountFounder4Child} />
      <View style={styles.icons}>
        <Pressable
          style={[styles.icon, styles.iconLayout]}
          onPress={() => navigation.navigate("CreateAccountFounder1")}
        >
          <Image
            style={styles.icon1}
            contentFit="cover"
            //source={require("../assets/icon.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.expandLeft, styles.iconLayout]}
          onPress={() => navigation.navigate("CreateAccountFounder5")}
        >
          <Image
            style={styles.icon1}
            contentFit="cover"
            //source={require("../assets/icons.png")}
          />
        </Pressable>
      </View>
      <View style={styles.workExp}>
        <View style={[styles.expCard, styles.expCardLayout]}>
          <View style={[styles.expCardChild, styles.childBorder]} />
          <Image
            style={styles.plus02Icon}
            contentFit="cover"
            //source={require("../assets/plus02.png")}
          />
          <View style={styles.groupParent}>
            <View
              style={[styles.companyOrganisationParent, styles.parentLayout]}
            >
              <Text style={[styles.companyOrganisation, styles.roleTypo]}>
                Company / Organisation
              </Text>
              <View style={styles.groupChild} />
            </View>
            <View style={[styles.roleParent, styles.parentLayout]}>
              <Text style={[styles.role, styles.roleTypo]}>Role</Text>
              <View style={styles.groupChild} />
            </View>
            <View style={[styles.yearParent, styles.parentLayout]}>
              <Text style={[styles.role, styles.roleTypo]}>Year</Text>
              <View style={styles.groupChild} />
            </View>
          </View>
        </View>
        <Text style={[styles.detailAnyRelevant, styles.listYourHighestTypo]}>
          Detail any relevant industry experience, particularly if you’ve worked
          in a specific company or held roles that have prepared you for your
          current venture.
        </Text>
        <Text style={[styles.previousWorkExperience, styles.skills1Typo]}>
          Previous Work Experience
        </Text>
      </View>
      <View style={[styles.education, styles.skillsLayout1]}>
        <View style={[styles.select, styles.selectLayout]}>
          <View style={[styles.selectChild, styles.selectLayout]} />
          <Text style={[styles.select1, styles.roleTypo]}>Select</Text>
          <Image
            style={styles.chevronDownIcon}
            contentFit="cover"
            //source={require("../assets/chevrondown1.png")}
          />
        </View>
        <Text style={[styles.listYourHighest, styles.listYourHighestTypo]}>
          List your highest degree achieved, which helps to establish your
          academic background and qualifications.
        </Text>
        <Text style={[styles.previousWorkExperience, styles.skills1Typo]}>
          Education
        </Text>
      </View>
      <View style={[styles.skills, styles.skillsLayout1]}>
        <Text style={[styles.skills1, styles.skills1Typo]}>Skills</Text>
        <View style={[styles.skills2, styles.skillsLayout1]}>
          <Text style={[styles.writeAnyTop, styles.roleTypo]}>
            Write any Top 3
          </Text>
          <View style={[styles.skillsChild, styles.skillsChildLayout]} />
          <View style={[styles.skillsItem, styles.skillsChildLayout]} />
        </View>
      </View>
      <View style={[styles.progressBar, styles.startsy54Layout]}>
        <View style={[styles.progressBarChild, styles.skillsChildLayout]} />
        <Image
          style={[styles.progressBarItem, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressBarInner, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.ellipseIcon, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressBarChild1, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressBarChild2, styles.progressChildPosition]}
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
          style={[styles.startsy54, styles.startsy54Layout]}
          contentFit="cover"
          source={require("../assets/startsy-5-3.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout: {
    width: 76,
    top: 0,
    height: 76,
    position: "absolute",
  },
  expCardLayout: {
    height: 194,
    width: 284,
    position: "absolute",
  },
  childBorder: {
    borderWidth: 3,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    borderRadius: Border.br_3xs,
    top: 0,
    backgroundColor: Color.colorGray_100,
  },
  parentLayout: {
    height: 44,
    width: 240,
    left: 0,
    position: "absolute",
  },
  roleTypo: {
    textAlign: "left",
    fontFamily: FontFamily.sansSerifCollection,
    position: "absolute",
  },
  listYourHighestTypo: {
    color: Color.colorLightslategray,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_smi,
    top: 33,
    textAlign: "left",
    position: "absolute",
  },
  skills1Typo: {
    textAlign: "center",
    color: Color.colorGainsboro,
    fontFamily: FontFamily.alataRegular,
    lineHeight: 16,
    fontSize: FontSize.size_5xl,
    top: 0,
    position: "absolute",
  },
  skillsLayout1: {
    width: 284,
    position: "absolute",
  },
  selectLayout: {
    height: 49,
    width: 284,
    left: 0,
    position: "absolute",
  },
  skillsChildLayout: {
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
    position: "absolute",
  },
  startsy54Layout: {
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
  createAccountFounder4Child: {
    top: 118,
    borderTopLeftRadius: Border.br_41xl,
    width: 360,
    height: 771,
    backgroundColor: Color.colorGray_100,
    left: 0,
    position: "absolute",
  },
  icon1: {
    height: "100%",
    width: "100%",
  },
  icon: {
    left: 267,
  },
  expandLeft: {
    left: 0,
  },
  icons: {
    top: 803,
    left: 10,
    width: 343,
    height: 76,
    position: "absolute",
  },
  expCardChild: {
    height: 194,
    width: 284,
    position: "absolute",
    left: 0,
  },
  plus02Icon: {
    top: 12,
    left: 245,
    width: 28,
    height: 28,
    position: "absolute",
  },
  companyOrganisation: {
    width: 230,
    color: Color.colorSilver_200,
    left: 8,
    textAlign: "left",
    fontFamily: FontFamily.sansSerifCollection,
    top: 0,
    fontSize: FontSize.size_lg,
  },
  groupChild: {
    borderTopWidth: 2,
    width: 242,
    height: 2,
    top: 40,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    left: 0,
    position: "absolute",
  },
  companyOrganisationParent: {
    top: 0,
  },
  role: {
    width: 88,
    color: Color.colorSilver_200,
    left: 8,
    textAlign: "left",
    fontFamily: FontFamily.sansSerifCollection,
    top: 0,
    fontSize: FontSize.size_lg,
  },
  roleParent: {
    top: 53,
  },
  yearParent: {
    top: 106,
  },
  groupParent: {
    top: 26,
    left: 22,
    height: 150,
    width: 240,
    position: "absolute",
  },
  expCard: {
    top: 110,
    left: 1,
  },
  detailAnyRelevant: {
    left: 19,
    width: 256,
    height: 77,
  },
  previousWorkExperience: {
    left: 0,
  },
  workExp: {
    top: 484,
    width: 285,
    height: 304,
    left: 38,
    position: "absolute",
  },
  selectChild: {
    borderWidth: 3,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    borderRadius: Border.br_3xs,
    top: 0,
    backgroundColor: Color.colorGray_100,
  },
  select1: {
    top: 5,
    left: 13,
    fontSize: FontSize.size_base,
    color: Color.colorDarkgray_200,
    width: 81,
    textAlign: "left",
    fontFamily: FontFamily.sansSerifCollection,
  },
  chevronDownIcon: {
    top: 1,
    left: 234,
    width: 47,
    height: 47,
    position: "absolute",
  },
  select: {
    top: 93,
  },
  listYourHighest: {
    left: 18,
    width: 232,
    height: 45,
  },
  education: {
    top: 312,
    left: 39,
    height: 142,
  },
  skills1: {
    left: 1,
  },
  writeAnyTop: {
    fontSize: FontSize.size_xl,
    color: Color.colorSilver_200,
    left: 8,
    textAlign: "left",
    fontFamily: FontFamily.sansSerifCollection,
    top: 0,
  },
  skillsChild: {
    top: 43,
    width: 287,
    height: 3,
    borderTopWidth: 3,
    borderColor: Color.colorGray_200,
    left: 0,
  },
  skillsItem: {
    top: 87,
    width: 287,
    height: 3,
    borderTopWidth: 3,
    borderColor: Color.colorGray_200,
    left: 0,
  },
  skills2: {
    top: 29,
    height: 87,
    left: 0,
  },
  skills: {
    top: 169,
    height: 116,
    left: 38,
  },
  progressBarChild: {
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    width: 222,
    height: 3,
    borderTopWidth: 3,
    top: 40,
  },
  progressBarItem: {
    width: 12,
    height: 12,
    top: 34,
    left: 90,
  },
  progressBarInner: {
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
  progressBarChild1: {
    left: 255,
    width: 12,
    height: 12,
    top: 34,
  },
  progressBarChild2: {
    left: 310,
    width: 12,
    height: 12,
    top: 34,
  },
  rectangleLineargradient: {
    borderRadius: Border.br_11xl,
    borderColor: Color.colorGray_100,
    borderWidth: 0.2,
    width: 122,
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
  startsy54: {
    width: 83,
    top: 0,
    left: 0,
  },
  progressBar: {
    top: 16,
    left: 12,
    width: 322,
  },
  createAccountFounder4: {
    backgroundColor: Color.colorGray_200,
    flex: 1,
    height: 889,
    overflow: "hidden",
    width: "100%",
  },
});

export default CreateFounder1;*/
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView,Alert, TouchableOpacity , StyleSheet, View, Text,Pressable,Image } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Input } from "@rneui/themed";
import { Icon } from "@rneui/themed";
import * as ImagePicker from 'expo-image-picker';


const CreateFounder1 = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { userType, username, password } = route.params;  // Retrieve the passed parameters


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [profileImageUri, setProfileImageUri] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

const handleCountrySelect = (country) => {
  setSelectedCountry(country);
  setIsDropdownOpen(false); 
};
useEffect(() => {
  (async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        "Permission Required",
        "We need permission to access your media library to allow you to upload a profile picture.",
        [{ text: "OK" }]
      );
    }
  })();
}, []);
    // Function to handle image picking
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
   
   
     // Check if the user canceled the image picker
     if (!result.cancelled) {
      setProfileImageUri(result.uri);  // Use 'result.uri' for the selected image
    } else {
      console.log('Image picker was canceled');
    }
  };

  return (
    <View style={styles.createAccount4}>
      
      <Text>User Type: {userType}</Text>
      <Text>Username: {username}</Text>
      <Text>Password: {password}</Text>
      <View style={styles.createAccount4Child} />
      
      <View style={styles.uploadPfp}>
        <Pressable onPress={pickImage}>
          {profileImageUri ? (
            <Image
              style={styles.profileImage}
              source={{ uri: profileImageUri }} // Display selected image
            />
          ) : (
            <Image
              style={styles.userLightIcon}
              source={require("../assets/user-light.png")}
              contentFit="cover" // Default icon if no image is selected
            />
          )}
        </Pressable>
        <Text style={[styles.uploadAProfile, styles.fullNameFlexBox]}>
          Upload a profile picture
        </Text>
      </View>
      <View style={[styles.name, styles.ageLayout]}>
        <Input
          placeholder="Full Name"
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          leftIcon={{ type: "font-awesome", color: "#828282" }}
          value={fullName}
          onChangeText={setFullName}
        />
        <View style={[styles.nameChild, styles.childLayout]} />
      </View>
      <View style={[styles.emailAddress, styles.ageLayout]}>
        <Input
          placeholder="Email_id"
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          leftIcon={{ type: "font-awesome", color: "#828282" }}
          value={email}
          onChangeText={setEmail}
        />
        <View style={[styles.nameChild, styles.childLayout]} />
      </View>
      <View style={[styles.phoneNo, styles.ageLayout]}>
       <Input
          placeholder="Phone Number"
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          leftIcon={{ type: "font-awesome", color: "#828282" }}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <View style={[styles.nameChild, styles.childLayout]} />
     </View>
     <View style={[styles.countryWrapper, styles.ageLayout]}>
        <Input
           placeholder={selectedCountry || "Select Country"}
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          leftIcon={{ type: "font-awesome", color: "#828282" }}
          editable={false} // Make it non-editable since it's a dropdown
        />
        <Pressable
          style={styles.dropdownIconContainer}
          onPress={handleDropdownToggle}
        >
          <Icon
            name={isDropdownOpen ? "chevron-up" : "chevron-down"}
            type="font-awesome"
            color="#828282"
            containerStyle={styles.dropdownIcon}
          />
        </Pressable>
      </View>
      {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <ScrollView style={styles.dropdownList}>
            {["India", "United States", "United Kingdom", "Canada", "Germany", "Australia", "Singapore", "Israel", "Brazil", "Sweden"].map((country) => (
              <Pressable
                key={country}
                style={[styles.ind, styles.indLayout]}
                onPress={() => handleCountrySelect(country)}
              >
                <View style={[styles.indChild, styles.indLayout]} />
                <Text
                  style={[
                    styles.dropdownItemText,
                    selectedCountry === country && styles.selectedCountry
                  ]}
                >
                  {country}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

        <View style={[styles.nameChild, styles.childLayout]} />
        
      
      <View style={[styles.age, styles.ageLayout]}>
      
      <View style={[styles.ageChild, styles.childLayout]} />
        <Input
          placeholder="Age"
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          leftIcon={{ type: "font-awesome", color: "#828282" }}
          value={age}
          onChangeText={setAge}
        />
      </View>
   
    <View style={[styles.gender, styles.ageLayout]}>
      <Input
          placeholder="Gender"
          inputStyle={styles.inputText}
          containerStyle={styles.inputContainer}
          leftIcon={{ type: "font-awesome", color: "#828282" }}
          value={gender}
          onChangeText={setGender}
        />
     


      
        
      </View>
      <View style={[styles.progress, styles.progressLayout]}>
        <View style={[styles.progressChild, styles.childLayout]} />
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
       
       <Pressable
           style={styles.icon2}
            onPress={() => navigation.navigate("CreateFounder2", { userType, username, password, fullName, email,phoneNumber,age, gender,selectedCountry,profileImageUri})}
        >
        <Image
          style={styles.icon1}
          contentFit="cover"
          source={require("../assets/expand-right.png")}
        />
        </Pressable>
      
        

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  defaultImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    tintColor: "#888",
  },
  instructions: {
    fontSize: 14,
    color: "#555",
  },
  icon1: {
    height: "100%",
    width: "100%",
  },
  icon: {
    left: 1,
    top: 600,
    width: 76,
    height: 76,
    position: "absolute",
  },
  countryWrapper: {
    top: 410,
    left: 38,
    width: 284,
   
    flexDirection: "row",
    alignItems: "center",
   
  },
  dropdownContainer: {
    backgroundColor: "rgba(128, 128, 128, 0.6)",
   borderradius: 10,
    backdropfilter: 12.5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 390,
    zIndex: 1,
    gap:5,
    left: 38,
    width: 284,
  },
  dropdownList: {
    paddingVertical: 10,
  
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 6, // Gap of 10 between elements
    flexDirection: 'row',
    alignItems: 'center',


  },
  indLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10, // Gap between dropdown elements
  },
  indiaTypo: {
    fontSize: 18, // Increase font size for each country
    color: 'black',
  },
  uk1: {
    fontSize: 18, // Increase font size for each country
    color: 'black',
  },
  indChild: {
    width: 10,
    height: 10,
    marginRight: 10,
  },
  selectedCountry: {
    fontWeight: 'bold', // Make selected country bold
    color: 'blue', // Optional: change color for selected country
  },
  
  dropdownIcon: {
    paddingHorizontal: 10,
  },
  inputContainerCountry: {
    flex: 1,
  },
  dropdownIconContainer: {
    position: "absolute",
    right: 0,
  },
 
  
  inputText:{
 color:"#ffffff"
  },
 
  icon2: {
    left: 285,
    height: 76,
    width: 76,
    top: 600,
    position: "absolute",
  },
  fullNameFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  ageLayout: {
    height: 49,
    width: 284,
    position: "absolute",
  },
  childLayout: {
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
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
  createAccount4Child: {
    top: 118,
    borderTopLeftRadius: Border.br_41xl,
    backgroundColor: "#24272A",
    width: 460,
    height: 700,
    left: 0,
    position: "absolute",
  },
  icon1: {
    height: "100%",
    width: "100%",
  },
  
  userLightIcon: {
    left: 22,
    width: 101,
    height: 101,
    top: 0,
    position: "absolute",
    paddingTop:110
  },
  uploadAProfile: {
    top: 102,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorLightslategray,
    height: 50,
    width: 144,
    left: 30,
  },
  uploadPfp: {
    top: 137,
    left: 108,
    height: 118,
    width: 144,
    position: "absolute",
  },
  fullName: {
    left: 8,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.sansSerifCollection,
    color: Color.colorSilver_200,
    top: 0,
  },
  nameChild: {
    top: 42,
    width: 287,
    borderColor: Color.colorGray_200,
    left: -1,
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
  },
  name: {
    top: 284,
    left: 38,
    width: 284,
  },
  emailAddress: {
    top: 340,
    left: 39,
  },
  phoneNo: {
    top: 455,
    left: 38,
    width: 284,
  },
  
  ageChild: {
    top: 47,
    width: 287,
    borderColor: Color.colorGray_200,
    left: -1,
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
  },
  age: {
    top: 508,
    left: 38,
    width: 284,
  },
  gender: {
    top: 558,
    left: 38,
    width: 284,
  },
  progressChild: {
    top: 40,
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    width: 222,
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
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
    borderColor: Color.colorGray_100,
    borderWidth: 0.2,
    width: 65,
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
    left: 12,
    width: 322,
  },
  createAccount4: {
  
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#16181A",
  },
});

export default CreateFounder1;
