
//investing information

import React, { useState } from "react";
import { StyleSheet, View, Text,  TouchableOpacity,Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { CurrentRenderContext, useNavigation, useRoute  } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import Slider from '@react-native-community/slider';
import { Icon } from "@rneui/themed";

import { Input } from "@rneui/themed";
const CreateAccount6 = () => {

  const route = useRoute();
  const  { role, userName, password, fullName, email,contactInfo,age, gender,selectedCountry,profileImageUri} = route.params;

  const navigation = useNavigation();
  const [previousExperience, setpreviousExperience] = React.useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [areaOfInterest, setareaOfInterest] = React.useState("");
  const [isDropdownStart, setIsDropdownStart] = React.useState(false);
  const [investmentRange, setinvestmentRange] = React.useState(1);
  const [startupStage, setstartupStage] = React.useState("");
  const [isDropdown, setIsDropdown] = React.useState(false);
  const [preferredSector, setpreferredSector] = React.useState("");
  
  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

  };
  
  const handletoggleDropdown = () => {
    setIsDropdown(!isDropdown);

  };


  // Navigate to CreateAccount6 when pressing the left chevron
  
  const handleDropdownToggle = () => {
    setIsDropdownStart(!isDropdownStart);
  };
 

  const handleSliderChange = (value) => {
    setpreviousExperience(value);
  };
  const handleChange = (value) => {
    setinvestmentRange(value);
  };
  const handleSelect = (area) => {
    setstartupStage(area);
    setIsDropdownStart(false); 
  };
  const handleSelectinterest = (interest) => {
    setpreferredSector(interest);
    setIsDropdown(false); 
  };
  const handleStageSelect = (stage) => {
    setareaOfInterest(stage);
    setIsDropdownOpen(false); 
  };
 

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.dropdown52}>
      {/* Displaying the profile image */}
      {profileImageUri && (
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={{ uri: profileImageUri }}
        />
      )}
     
    
      <Text>Full Name: {fullName}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone Number: {contactInfo}</Text>
      <Text>Age: {age}</Text>
      <Text>Gender: {gender}</Text>
      <Text>selected Country:{selectedCountry}</Text>

   
   
        <View style={styles.dropdown52Child} />
        <View
          style={[styles.investmentCapacity, styles.investmentCapacityPosition]}
        >
          <Image
            style={[styles.investmentCapacityChild, styles.groupIconLayout]}
            contentFit="cover"
            //source={require("../assets/group-34.png")}
          />
          <View style={styles.rectangleParent}>
            <View style={[styles.groupChild, styles.groupChildBorder]} />
            <Text style={[styles.thousand, styles.yearTypo]}>{Math.round(investmentRange)} </Text>
          </View>
          <Text style={styles.investmentCapacity1Typo}>Investment capacity</Text>
          <Slider
          style={styles.slider}
          minimumValue={1000}
          maximumValue={100000}
          step={1}
          value={investmentRange}
          onValueChange={handleChange}
          thumbTintColor="white"
          minimumTrackTintColor="#00DE62"
          maximumTrackTintColor="white"
        />
        
        </View>
        <View style={styles.preferredStartupSector}>
          <View style={styles.rectangleGroup}>
            <View style={[styles.groupItem, styles.groupBorder]} />
            
            <Pressable
            style={[styles.dropdownIconContainer, {paddingleft:10}]}
            onPress={handletoggleDropdown} // Toggle dropdown visibility
          >
           <Input
                placeholder={preferredSector || "Select startup sectorr"}
                inputStyle={styles.inputText}
                containerStyle={styles.inputContainer}
                leftIcon={{ type: "font-awesome", color: "#828282" }}
                edit
           />
      <Pressable style={styles.dropdownIconContainer} onPress={handletoggleDropdown}>
                <Icon
                  name={isDropdown ? "chevron-up" : "chevron-down"}
                  type="font-awesome"
                  color="#00DE62"
                  containerStyle={styles.dropdownIcon}
                />
              </Pressable>
            </Pressable>
            {isDropdown && (
                <View style={styles.dropdownContainer}>
                  <ScrollView style={styles.dropdownList} contentContainerStyle={styles.dropdownContent}>
                     {["Horizontal sector", "Vertical sector"].map((interest) => (
                       <Pressable
                          key={interest}
                          style={styles.dropdownItem}
                          onPress={() =>handleSelectinterest(interest)}
                        >
                         <Text style={[styles.dropdownItemText, preferredSector === interest && styles.preferredSector]}>
                            {interest}
                          </Text>
                       </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <Text
            style={[
              //styles.preferredStartupSector1,
              styles.investmentCapacity1Typo,
            ]}
          >{`Preferred startup sector `}</Text>
          <Text
            style={styles.thisDistinctionHelps}
          >{`This distinction helps founders understand the scope and nature of your investment interests, ensuring that you receive opportunities that align with your strategic preferences and expertise. 
          `}</Text>
        </View>
        <View
          style={[styles.preferredStartupStage, styles.areaOfInterestPosition]}
        >
          <View style={[styles.rectangleContainer, styles.ideationStagePosition]}>
            <View style={[styles.groupInner, styles.groupBorder]} />
            <Pressable
            style={[styles.dropdownIconContainer, {paddingleft:10}]}
            onPress={handleDropdownToggle} // Toggle dropdown visibility
          >
           <Input
                placeholder={startupStage || "select startup stage"}
                inputStyle={styles.inputText}
                containerStyle={styles.inputContainer}
                leftIcon={{ type: "font-awesome", color: "#828282" }}
                editable={false}
              />
              <Pressable style={styles.dropdownIconContainer} onPress={handleDropdownToggle}>
                <Icon
                  name={isDropdownStart ? "chevron-up" : "chevron-down"}
                  type="font-awesome"
                  color="#00DE62"
                  containerStyle={styles.dropdownIcon}
                />
              </Pressable>
            </Pressable>
            {isDropdownStart && (
                <View style={styles.dropdownContainer}>
                  <ScrollView style={styles.dropdownList} contentContainerStyle={styles.dropdownContent}>
                     {["Ideation", "Seed", "Early", "Growth", "Mature"].map((area) => (
                       <Pressable
                          key={area}
                          style={styles.dropdownItem}
                          onPress={() => handleSelect(area)}
                        >
                         <Text style={[styles.dropdownItemText,startupStage === area && styles.startupStage]}>
                            {area}
                          </Text>
                       </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

          </View>
          <Text
            style={styles.investmentCapacity1Typo}
          >{`Preferred startup stage `}</Text>
          <Text style={[styles.indicateTheStages, styles.inThisSectionPosition]}>
            Indicate the stages of development at which you prefer to invest.
       
          </Text>
         </View>
      
         <View 
          style={[styles.areaOfInterest, styles.areaOfInterestPosition]}
        >    
          <View style={[styles.rectangleContainer, styles.ideationStagePosition]}>
            <View style={[styles.groupInner, styles.groupBorder]} />
            
           

            <View style={[styles.groupInner, styles.groupBorder]} />
         
            <Pressable
            style={[styles.dropdownIconContainer, {paddingleft:10}]}
            onPress={toggleDropdown} // Toggle dropdown visibility
          >
           <Input
                placeholder={areaOfInterest || "Select area of interest"}
                inputStyle={styles.inputText}
                containerStyle={styles.inputContainer}
                leftIcon={{ type: "font-awesome", color: "#828282" }}
                edit
           />
      <Pressable style={styles.dropdownIconContainer} onPress={toggleDropdown}>
                <Icon
                  name={isDropdownOpen ? "chevron-up" : "chevron-down"}
                  type="font-awesome"
                  color="#00DE62"
                  containerStyle={styles.dropdownIcon}
                />
              </Pressable>
            </Pressable>
            {isDropdownOpen && (
                <View style={styles.dropdownContainer1}>
                  <ScrollView style={styles.dropdownList1} contentContainerStyle={styles.dropdownContent}>
                     {["Technology", "Healthcare", "Finance", "Consumer goods", "Education","Energy","Real State","Logistic","Agriculture","Manufacturing","environmental & social impact","Travel","Telecommunicaton","Automative1"].map((stage) => (
                       <Pressable
                          key={stage}
                          style={styles.dropdownItem}
                          onPress={() => handleStageSelect(stage)}
                        >
                         <Text style={[styles.dropdownItemText,  areaOfInterest === stage && styles. setareaOfInterest]}>
                            {stage}
                          </Text>
                       </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}
            </View>
           
          <Text style={styles.investmentCapacity1Typo}>Area of interest</Text>
          <Text
            style={[styles.inThisSection, styles.inThisSectionPosition]}
          >{`In this section, specify the fields and industries that capture your investment interest. `}</Text>
        </View>
        <View
          style={[styles.investingExperience, styles.investmentCapacityPosition]}
        >
          <View
            style={[styles.investingExperienceInner, styles.groupParentLayout]}
          >
            <View style={[styles.groupParent, styles.groupParentLayout]}>
              <View style={[styles.groupView, styles.groupLayout]}>
                <View style={[styles.groupChild1, styles.groupLayout]} />
                <Text style={[styles.year, styles.yearTypo]}>{Math.round(previousExperience)} years</Text>
              </View>
              
            </View>
          </View>
          <Text style={styles.investmentCapacity1Typo}>Investing experience</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={20}
          step={1}
          value={previousExperience}
          onValueChange={handleSliderChange}
          thumbTintColor="white"
          minimumTrackTintColor="#00DE62"
          maximumTrackTintColor="white"
        />
        <View style={[styles.progressBar, styles.startsy54Layout]}>
          
          <Image
            style={[styles.startsy54, styles.startsy54Layout]}
            contentFit="cover"
            source={require("../assets/startsy-5-3.png")}
          />
          <View style={styles.progressBarChild} />
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
        </View>
       
          <Pressable style={styles.navigation} onPress={() => navigation.navigate("CreateAccount4")}>
            <Image
              style={styles.navigationIcon}
              source={require("../assets/expand-left.png")}
            />
          </Pressable>
          <Pressable style={styles.navigationButton1} 
          onPress={() => navigation.navigate("CreateAccount7" ,{fullName, email,contactInfo,age, gender,selectedCountry,  investmentRange,
            startupStage,
            areaOfInterest,
            previousExperience,
            preferredSector,
            profileImageUri
            })}>
            <Image
              style={styles.navigationIcon}
              source={require("../assets/expand-right.png")}
            />
          </Pressable>
       
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

  navigationButton1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
     marginTop:890,
     marginLeft:300,
      },
  navigationIcon: {
    width: 50,
    height: 50,
  },
  navigation:{
  top:980
  },
  
  dropdownIcon:{
  margintop:190
  },
   
    
  slider:{
    top:167,
    width:280,
    alignItems:"center",
    justifyContent:"center",
   paddingLeft:50
  },
 
  
  dropdownContainer1: {
    backgroundColor: "rgba(128, 128, 128, 0.6)",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 480,
    zIndex: 1,
    gap:10,
    height:80,
    left: 38,
    width: 284,
  },
  
  dropdownIconContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:180, // Corrected from 'paddingleft' to 'paddingLeft'
    justifyContent: 'space-between',
   paddingTop:0,
     top:0
    
  },
  dropdownList1: {
    paddingVertical: 15,
    
  
  },
  dropdownIcon1: {
    marginLeft: 0,
    alignItems:"center",
    justifyContent:"center",
    paddingHorizontal:20,
    paddingBottom:19

  },
  dropdownItem1: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10, // Gap of 10 between elements
    flexDirection: 'row',
    alignItems: 'center',


  },
  navigationButtons: {
    flexDirection: "row", // Arrange the buttons in a row
    justifyContent: "space-between", // Space the buttons evenly
    alignItems: "center", // Center the buttons vertically
    marginHorizontal: 5, // Add horizontal margin to the container
    marginTop: 1100, // Add some top margin
  },
  navigationIcon: {
    width:80, // Set the width of the icons
    height: 80, // Set the height of the icons
    resizeMode: "contain", // Ensure the icons maintain their aspect ratio
  },
  //
  dropdownIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10, // Corrected from 'paddingleft' to 'paddingLeft'
    justifyContent: 'space-between',
    
  },
  inputText: {
    fontSize: 16,
     color:"black"
  },
  inputContainer: {
    flex: 1,
    borderBottomWidth: 0, // Removes the underline from the Input field
  },
  dropdownIcon: {
    marginLeft: 0,
    alignItems:"center",
    justifyContent:"center",
    paddingHorizontal:20,
    paddingBottom:19

  },
  dropdownContainer1: {
    marginTop: 5,
    backgroundColor: "rgba(128, 128, 128, 0.6)",
    borderRadius: 10,
    height:600,
    borderWidth: 1,
   gap:5,
    fontSize:"bold",
    width: 284,
    zIndex: 1, // Ensures the dropdown appears above other elements
  },
  
  dropdownContainer: {
    marginTop: 5,
    backgroundColor: "rgba(128, 128, 128, 0.6)",
    borderRadius: 10,
    height:200,
    borderWidth: 1,
   gap:5,
    fontSize:"bold",
    width: 284,
    zIndex: 1, // Ensures the dropdown appears above other elements
  },
  dropdownList: {
    maxHeight: 200, // Limits the height of the dropdown list
  },
  dropdownItem: {
    padding: 9,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128, 128, 128, 0.6)",
    color:"white"
  },
  dropdownItemText: {
    fontSize: 16,
    
    
  },
  selectedStage: {
    fontWeight: 'bold',
    color: '#000000', // Changes the color of the selected item
  },

  
  
  
  investmentCapacityPosition: {
    width: 295,
    left: 29,
    position: "absolute",
  },
  groupIconLayout: {
    height: 20,
    width: 285,
    position: "absolute",
  },
  groupChildBorder: {
    borderWidth: 3,
    borderColor: "black",
    borderRadius: Border.br_xl,
    borderStyle: "solid",
    backgroundColor: "#24272A",
    left: 0,
  },
  yearTypo: {
    textAlign: "center",
    color: Color.colorSpringgreen_200,
    fontFamily: FontFamily.alataRegular,
    lineHeight: 26,
    fontSize: FontSize.size_5xl,
    top: 16,
    position: "absolute",
  },
  groupBorder: {
    borderRadius: Border.br_11xs,
    borderWidth: 3,
    borderColor:"#16181A",
    borderStyle: "solid",
    top: 0,
    width: 280,
    backgroundColor:"#24272A",
    left: 0,
    position: "absolute",
  },
  dropdownFlexBox: {
    textAlign: "left",
    color: Color.colorDarkgray_200,
  },
  investmentCapacity1Typo: {
    color: "white",
    textAlign: "center",
    fontFamily: FontFamily.alataRegular,
    lineHeight: 28,
    fontSize: FontSize.size_5xl,
    top: 0,
    left: 0,
    position: "absolute",
  },
  areaOfInterestPosition: {
    width: 291,
    left: 29,
    position: "absolute",
  },
  ideationStagePosition: {
    left: 11,
    position: "absolute",
  },
  inThisSectionPosition: {
    top: 33,
    color: Color.colorLightslategray,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_smi,
    left: 26,
    lineHeight:16,
    textAlign: "left",
    position: "absolute",
  },
  seedWrapperLayout: {
    height: 48,
    width: 280,
    left: 0,
    position: "absolute",
  },
  groupParentLayout: {
    height: 100,
    width: 285,
    position: "absolute",
  },
  groupLayout: {
    width: 173,
    top: 0,
    height: 49,
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
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_mini,
    textAlign: "left",
    color: Color.colorSpringgreen_200,
    top: 48,
    position: "absolute",
  },
  iconLayout: {
    width: 76,
    height: 76,
    top: 0,
    position: "absolute",
  },
  dropdown52Child: {
    borderTopLeftRadius: Border.br_41xl,
    width: 360,
    height: 1070,
    backgroundColor: "#24272A",
    left: 0,
    top: 118,
    position: "absolute",
  },
  investmentCapacityChild: {
    top: 130,
    left: 10,
  },
  groupChild: {
    top: 0,
    height: 49,
    width: 280,
    position: "absolute",
  },
  thousand: {
    left: 59,
    width: 163,
  },
  rectangleParent: {
    height: 49,
    width: 280,
    top: 48,
    left: 10,
    position: "absolute",
  },
  investmentCapacity: {
    top: 924,
    height: 150,
  },
  groupItem: {
    height: 47,
  },
  dropdown: {
    top: 4,
    left: 16,
    width: 80,
    height: 37,
    fontFamily: FontFamily.sansSerifCollection,
    fontSize: FontSize.size_base,
    textAlign: "left",
    color: Color.colorDarkgray_200,
    position: "absolute",
  },
  rectangleGroup: {
    height: 47,
    width: 280,
    left: 10,
    top: 118,
    position: "absolute",
  },
  preferredStartupSector1: {
    width: 257,
    height: 16,
    
  },
  thisDistinctionHelps: {
    top: 30,
    height: 99,
    width: 264,
    color: Color.colorLightslategray,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_smi,
    left: 26,
    textAlign: "left",
    position: "absolute",
  },
  preferredStartupSector: {
    top: 721,
    width: 290,
    height: 165,
    left: 29,

    position: "absolute",
  },
  groupInner: {
    height: 49,
  },
  dropdown1: {
    top: 5,
    left: 13,
    fontFamily: FontFamily.sansSerifCollection,
    fontSize: FontSize.size_base,
    textAlign: "left",
    color: Color.colorDarkgray_200,
    position: "absolute",
  },
  rectangleContainer: {
    top: 83,
    height: 49,
    width: 280,
  },
  indicateTheStages: {
    height: 34,
    width: 264,
  },
  ideationChild: {
    backgroundColor: Color.colorGray_500,
    borderColor: Color.colorGray_300,
    borderBottomWidth: 1,
    borderStyle: "solid",
    top: 0,
  },
  ideationStage: {
    top: 12,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.aBeeZeeRegular,
    textAlign: "left",
    color: Color.colorDarkgray_200,
  },
  ideationWrapper: {
    top: 0,
  },
  preSeedWrapper: {
    top: 48,
  },
  seedWrapper: {
    top: 96,
  },
  earlyWrapper: {
    top: 144,
  },
  growthWrapper: {
    top: 192,
  },
  matureStageWrapper: {
    top: 238,
  },
  preferredStartupStage2: {
    backgroundColor: "transparent",
    height: 286,
    borderRadius: Border.br_3xs,
    top: 0,
    width: 280,
    left: 0,
    position: "absolute",
  },
  dropdown2: {
    top: 132,
    width: 279,
    height: 286,
    left: 11,
    position: "absolute",
    overflow: "hidden",
  },
  preferredStartupStage: {
    top: 546,
    height: 418,
  },
  groupPressable: {
    top: 94,
    height: 49,
    width: 280,
  },
  inThisSection: {
    width: 232,
    height: 45,
  },
  areaOfInterest: {
    top: 359,
    height: 143,
  },
  groupChild1: {
    borderWidth:3,
    borderColor: "#16181A",
    borderRadius: Border.br_xl,
    borderStyle: "solid",
    backgroundColor: "#24272A",
    left: 0,
  },
  year: {
    left: 55,
  },
  groupView: {
    left: 57,
  },
  groupIcon: {
    top: 80,
    left: 0,
  },
  groupParent: {
    top: 0,
    left: 0,
  },
  investingExperienceInner: {
    top: 58,
    left: 10,
  },
  investingExperience: {
    top: 161,
    height: 158,
  },
  startsy54: {
    width: 83,
    top: 0,
    left: 0,
  },
  progressBarChild: {
    top: 40,
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    borderTopWidth: 3,
    width: 222,
    height: 3,
    borderStyle: "solid",
    position: "absolute",
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
    width: 177,
    left: 90,
    height: 12,
    top: 34,
    backgroundColor: "transparent",
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
  progressBar: {
    left: 12,
    width: 322,
    top: 16,
    height: 83,
  },
 
  dropdown52: {
    backgroundColor: "#16181A",
    flex: 1,
    width: "100%",
    height: 1188,
    overflow: "hidden",
  },
});

export default CreateAccount6;
/*
import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import Slider from "@react-native-community/slider";
import { Icon, Input } from "@rneui/themed";

const CreateAccount6 = () => {
  const route = useRoute();
  const {
    userType,
    username,
    password,
    fullName,
    email,
    phoneNumber,
    age,
    gender,
    selectedCountry,
  } = route.params;

  const navigation = useNavigation();
  const [progress, setProgress] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState("");
  const [investingExperience, setInvestingExperience] = useState(1); // Adding state to track the investing experience

  const progressPosition = ((progress - 1) / 19) * 280;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStageSelect = (stage) => {
    setSelectedStage(stage);
    setIsDropdownOpen(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.dropdown52}>
       
          <Text>User Type: {userType}</Text>
          <Text>Username: {username}</Text>
          <Text>Password: {password}</Text>
          <Text>Full Name: {fullName}</Text>
          <Text>Email: {email}</Text>
          <Text>Phone Number: {phoneNumber}</Text>
          <Text>Age: {age}</Text>
          <Text>Gender: {gender}</Text>
       

        <View style={styles.preferredStartupStage}>
          <View style={styles.dropdownContainer}>
            <Pressable onPress={toggleDropdown}>
              <Input
                placeholder={selectedStage || "Select stage"}
                inputStyle={styles.inputText}
                containerStyle={styles.inputContainer}
                editable={false}
              />
              <Pressable onPress={toggleDropdown}>
                <Icon
                  name={isDropdownOpen ? "chevron-up" : "chevron-down"}
                  type="font-awesome"
                  color="#00DE62"
                />
              </Pressable>
            </Pressable>
            {isDropdownOpen && (
              <View style={styles.dropdownMenu}>
                <ScrollView>
                  {["Ideation", "Seed", "Early", "Growth", "Mature"].map(
                    (stage) => (
                      <Pressable
                        key={stage}
                        onPress={() => handleStageSelect(stage)}
                      >
                        <Text
                          style={[
                            styles.dropdownItem,
                            selectedStage === stage && styles.selectedStage,
                          ]}
                        >
                          {stage}
                        </Text>
                      </Pressable>
                    )
                  )}
                </ScrollView>
              </View>
            )}
          </View>
          <Text style={styles.investmentCapacity1Typo}>
            Preferred startup stage
          </Text>
          <Text style={styles.indicateTheStages}>
            Indicate the stages of development at which you prefer to invest.
          </Text>
        </View>

        <View style={styles.investingExperience}>
          <View style={styles.investingExperienceInner}>
            <View style={styles.investingExperienceDetails}>
              <View style={styles.investingExperienceBar}>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={investingExperience}
                  onValueChange={(value) => setInvestingExperience(value)}
                  minimumTrackTintColor="#00DE62"
                  maximumTrackTintColor="#E1E1E1"
                  thumbTintColor="#00DE62"
                />
                <Text style={styles.year}>{investingExperience} year</Text>
              </View>
              <Image
                style={styles.investingExperienceIcon}
                source={require("../assets/group-34.png")}
              />
            </View>
          </View>
          <Text style={styles.investmentCapacity1Typo}>Investing experience</Text>
          <Text style={styles.indicateExperience}>
            Adjust the slider to specify how many years of investing experience
            you have.
          </Text>
        </View>

        <View style={styles.progressBar}>
          <Image
            style={styles.progressBarImage}
            source={require("../assets/startsy-5-3.png")}
          />
          <View style={styles.progressBarChild} />
          <Image
            style={styles.progressBarItem}
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={styles.progressBarItem}
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={styles.progressBarItem}
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={styles.progressBarItem}
            source={require("../assets/ellipse-52.png")}
          />
          <LinearGradient
            style={styles.progressGradient}
            locations={[0, 1]}
            colors={["rgba(255, 255, 255, 0.6)", "rgba(153, 153, 153, 0.4)"]}
          />
          <Text style={styles.progressText}>1</Text>
          <Text style={styles.progressText}>2</Text>
          <Text style={styles.progressText}>3</Text>
          <Text style={styles.progressText}>4</Text>
        </View>

        <View style={styles.navigationButtons}>
          <Pressable onPress={() => navigation.navigate("CreateAccount4")}>
            <Image
              style={styles.navigationIcon}
              source={require("../assets/expand-left.png")}
            />
          </Pressable>
          <Pressable onPress={() => navigation.navigate("CreateAccount7")}>
            <Image
              style={styles.navigationIcon}
              source={require("../assets/expand-right.png")}
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  dropdown52: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  preferredStartupStage: {
    marginBottom: 20,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdownMenu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    elevation: 2,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
  selectedStage: {
    fontWeight: "bold",
  },
  inputText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    backgroundColor: "#E1E1E1",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  investmentCapacity1Typo: {
    fontSize: 16,
    color: "#828282",
    marginBottom: 5,
  },
  indicateTheStages: {
    fontSize: 14,
    color: "#828282",
    marginBottom: 20,
  },
  investingExperience: {
    marginBottom: 30,
  },
  investingExperienceInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  investingExperienceBar: {
    flex: 1,
    marginRight: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  year: {
    fontSize: 16,
    color: "#000",
  },
  investingExperienceIcon: {
    width: 40,
    height: 40,
  },
  indicateExperience: {
    fontSize: 14,
    color: "#828282",
    marginTop: 10,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  progressBarImage: {
    width: "100%",
    height: 10,
  },
  progressGradient: {
    position: "absolute",
    width: "100%",
    height: 10,
  },
  progressBarChild: {
    width: "100%",
    height: 10,
    backgroundColor: "#E1E1E1",
  },
  progressBarItem: {
    width: 20,
    height: 20,
  },
  progressText: {
    fontSize: 12,
    color: "#000",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  navigationIcon: {
    width: 40,
    height: 40,
  },
});

export default CreateAccount6;*/

