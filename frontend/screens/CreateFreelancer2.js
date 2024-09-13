
//professional page of freelancer

import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView ,TextInput, Pressable, Alert } from "react-native";
import { Image } from "expo-image";
import { Icon } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";

const CreateFreelancer2 = () => {


  const route = useRoute();
  const {fullName, email, contactInfo, age, gender, Country, profileImageUri,certificationName,url,skills} = route.params; 

  const [services, setservices] = React.useState("");
  const [minimumPricing, setminimumPricing] = useState('');
  const [ maximumPricing,setmaximumPricing] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentAvailability, setcurrentAvailability] = useState(null);


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlecurrentAvailabilitySelect = (currentAvailability) => {
    setcurrentAvailability(currentAvailability);
  setIsDropdownOpen(false); 
};
const handleSubmit = async () => {
  const freelancerData = {
    fullName,
    email,
    contactInfo,
    age,
    gender,
    Country,
    profileImageUri,
    certificationName,
    url,
    skills,
    services,
    minimumPricing,
    maximumPricing,
    currentAvailability
  };

  try {
    // Make an Axios POST request to submit the data
    const response = await axios.post('http://localhost:5000/api/freelancerInfo', freelancerData);
    
    if (response.status === 200) {
      Alert.alert('Success', 'Freelancer information submitted successfully!');
      // Navigate or take further action after successful submission
    } else {
      Alert.alert('Error', 'Failed to submit. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting freelancer data:', error);
    Alert.alert('Error', 'An error occurred while submitting. Please try again.');
  }
};




  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.createAccountFreelancer5}>
         {/* Displaying passed props */}
        <Text>fullName:{fullName}</Text>
      <Text>email:{email}</Text>
        <Text>contactInfo:{contactInfo}</Text>
        <Text>age:{age}</Text>
        <Text>gender:{gender}</Text>
        <Text> Country:{ Country}</Text>
        <Text> profileImageUri:{ profileImageUri}</Text>
        <Text> certificationName:{ certificationName}</Text>
        <Text> url:{ url}</Text>
        <Text> skills:{ skills}</Text>
        
        <View style={styles.createAccountFreelancer5Child} />
        <View style={styles.submitButton}>
          <View style={styles.submitButtonChild} />
          <Pressable  onPress={handleSubmit}>
          <Text style={styles.submit}>Submit</Text>
          </Pressable>
        </View>
        <Image
          style={styles.icons}
          contentFit="cover"
          //source={require("../assets/icons.png")}
        />
        <View style={styles.fundingStatus}>
          <View style={[styles.number, styles.numberLayout]}>
            <View style={[styles.numberParent, styles.numberLayout]}>
              <View style={[styles.number1, styles.number1Layout]}>
                <View style={styles.numberChild} />
                 <TextInput
          style={styles.minimum}
          placeholder={value === '' ? 'Minimum' : ''}
          value={minimumPricing}
          onChangeText={(text) => setminimumPricing(text)} // Update state with new text input
          keyboardType="numeric" // Numeric keyboard
          placeholderTextColor= "#00FF66"
        />
                
              </View>
              <View style={[styles.rectangleParent, styles.number1Layout]}>
                <View style={styles.numberChild} />
                
                <TextInput
          style={styles.minimum}
          placeholder={Max === '' ? 'Maximum' : ''}
          value={maximumPricing}
          onChangeText={(text) => setmaximumPricing(text)} // Update state with new text input
          keyboardType="numeric" // Numeric keyboard
          placeholderTextColor= "#00FF66"
        />
              </View>
            </View>
          </View>
          <Text style={styles.pricing}>Pricing</Text>
        </View>
        <View style={[styles.startupSector, styles.startupSectorLayout]}>
          <View style={[styles.dropdown1Parent, styles.startupSectorLayout]}>
            <View style={[styles.dropdown1, styles.dropdown1Layout]}>
           
              
              <Text style={styles.select}> {currentAvailability  ? currentAvailability: 'Select your availability'}</Text>
              <Pressable 
                  style={[styles.countryWrapper, styles.ageLayout]}
                  onPress={handleDropdownToggle}
                >
              <Icon
             name={isDropdownOpen ? "chevron-up" : "chevron-down"}
             type="font-awesome"
             color= "#00FF66"
             containerStyle={styles.dropdownIcon}
          />
          </Pressable>
            </View>
            {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <ScrollView style={styles.dropdownList}>
            {["Full-Time", "Part-Time", "Project-Based"].map((currentAvailability) => (
              <Pressable
                key={currentAvailability}
                style={[styles.ind, styles.indLayout]}
                onPress={() => handlecurrentAvailabilitySelect(currentAvailability)}
              >
                <View style={[styles.indChild, styles.indLayout]} />
                <Text
                  style={[
                    styles.dropdownItemText,
                    currentAvailability === currentAvailability && styles.selectedCountry
                  ]}
                >
                  {currentAvailability}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

            <Text style={styles.pricing}>Current Availability</Text>
          </View>
        </View>
        <View style={styles.descriptionParent}>
          <View style={[styles.description, styles.descriptionLayout]}>
          
            <View style={[styles.description1, styles.descriptionLayout]}>
            <TextInput
              style={[styles.textInput, styles.textTypo1]}
              multiline
              numberOfLines={4}
              maxLength={1000}
              placeholder="Write  here..."
              placeholderTextColor="silver"
              value={services}
               onChangeText={setservices}
             />
             <View style={styles.characterCountContainer}>
               <Text style={styles.characterCount}>{description.length}/1000</Text>
             </View>
            </View>
          </View>
         
          <Text style={styles.pricing}>Services</Text>
          <Text style={[styles.provideAConcise, styles.textTypo1]}>
            Provide a concise overview of the service, including specific skills,
            techniques, or tools used. Highlights the unique benefits and value
            the service offers. This section aims to attract potential clients by
            clearly outlining how the service meets their needs.
          </Text>
        </View>

         
        </View>
        <View style={[styles.progress, styles.progressLayout1]}>
          <View style={styles.progressChild} />
          <Image
            style={[styles.progressItem, styles.progressPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={[styles.progressInner, styles.progressPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={[styles.ellipseIcon, styles.progressPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={[styles.progressChild1, styles.progressPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <LinearGradient
            style={[styles.rectangleLineargradient, styles.progressPosition]}
            locations={[0, 1]}
            colors={["rgba(255, 255, 255, 0.6)", "rgba(153, 153, 153, 0.4)"]}
          />
          <Text style={[styles.text1, styles.textTypo]}>1</Text>
          <Text style={[styles.text2, styles.textTypo]}>2</Text>
          <Text style={[styles.text3, styles.textTypo]}>3</Text>
          <Image
            style={[styles.startsy53, styles.progressLayout1]}
            contentFit="cover"
            source={require("../assets/startsy-5-3.png")}
          />
        </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdownIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:240, // Corrected from 'paddingleft' to 'paddingLeft'
    justifyContent: 'space-between',
   paddingTop:4,
     top:0,
     
    
  },
  dropdownContent: {
    backgroundColor: "rgba(128, 128, 128, 0.6)",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 150,
    zIndex: 1,
    gap:20,
    height:150,
    left: 0,
    width: 284,
  },
  dropdownContainer: {
    backgroundColor: "rgba(128, 128, 128, 0.6)",
   borderradius: 10,
    backdropfilter: 12.5,
    
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
    zIndex: 1,
   
    left: 13,
    width: 284,
  },
  dropdownList: {
    paddingVertical: 60,
  
  },
  dropdownIcon:{
  left:120,
  top:6,
  
  },
  characterCountContainer: {
    position: 'absolute',
    bottom: 10, // Distance from the bottom
    left: 230, // Distance from the left
    padding: 5, // Optional: adds some space around the text
    
  },
  
  characterCount: {
    fontSize: FontSize.size_xs,
    color: "silver",
  },
  numberLayout: {
    height: 110,
    width: 280,
    position: "absolute",
  },
  number1Layout: {
    height: 49,
    width: 280,
    left: 0,
    position: "absolute",
  },
  startupSectorLayout: {
    height: 84,
    width: 287,
    position: "absolute",
  },
  dropdown1Layout: {
    height: 47,
    position: "absolute",
  },
  description1Border: {
    borderRadius: Border.br_3xs,
    borderWidth: 3,
    borderColor: "black",
    borderStyle: "solid",
    top: 0,
    left: 0,
  },
  descriptionLayout: {
    height: 194,
    width: 284,
    position: "absolute",
  },
  textTypo1: {
    color: Color.colorLightslategray,
    fontFamily: FontFamily.robotoRegular,
    textAlign: "left",
    position: "absolute",
  },
  progressLayout1: {
    height: 83,
    position: "absolute",
  },
  progressPosition: {
    height: 12,
    top: 34,
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_mini,
    top: 48,
    textAlign: "left",
    color: Color.colorSpringgreen_200,
    position: "absolute",
  },
  createAccountFreelancer5Child: {
    top: 118,
    borderTopLeftRadius: Border.br_41xl,
    width: 360,
    height: 1249,
    backgroundColor: "#24272A",
    borderColor:"black",
    left: 0,
    position: "absolute",
  },
  submitButtonChild: {
    backgroundColor: Color.colorSpringgreen_100,
    borderRadius: Border.br_xl,
    top: 0,
    height: 48,
    width: 168,
    left: 0,
    position: "absolute",
  },
  submit: {
    top: 15,
    left: 45,
    lineHeight: 24,
    color: "black",//Color.colorGray_100
    width: 79,
    height: 18,
    textAlign: "center",
    fontFamily: FontFamily.alataRegular,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  submitButton: {
    top: 793,
    left: 157,
    height: 48,
    width: 168,
    position: "absolute",
  },
  icons: {
    top: 779,
    left: 10,
    width: 76,
    height: 76,
    position: "absolute",
  },
  numberChild: {
    borderWidth: 3,
    borderColor: "black",
    borderStyle: "solid",
    height: 49,
    width: 280,
    borderRadius: Border.br_xl,
    top: 0,
    backgroundColor: Color.colorGray_100,
    left: 0,
    position: "absolute",
  },
  minimum: {
    left: 53,
    width: 163,
    color: Color.colorSpringgreen_200,
    lineHeight: 26,
    top: 16,
    textAlign: "center",
    fontFamily: FontFamily.alataRegular,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  number1: {
    top: 0,
  },
  rectangleParent: {
    top: 61,
  },
  numberParent: {
    top: 0,
    left: 0,
  },
  number: {
    top: 38,
    left: 2,
  },
  pricing: {
    color: Color.colorGainsboro,
    lineHeight: 26,
    textAlign: "center",
    fontFamily: FontFamily.alataRegular,
    fontSize: FontSize.size_5xl,
    top: 0,
    left: 0,
    position: "absolute",
  },
  fundingStatus: {
    top: 612,
    left: 41,
    width: 282,
    height: 148,
    position: "absolute",
  },
  dropdown1Child: {
    height: 47,
    position: "absolute",
    width: 280,
    backgroundColor: Color.colorGray_100,
  },
  select: {
    top: 4,
    left: 16,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.sansSerifCollection,
    color: Color.colorDarkgray_200,// Color.colorDarkgray_200
    width: 80,
    height: 37,
    textAlign: "left",
    position: "absolute",
  },
  chevronDownIcon: {
    left: 233,
    width: 47,
    top: 0,
  },
  dropdown1: {
    top: 37,
    left: 7,
    width: 280,
    height: 47,
  },
  dropdown1Parent: {
    top: 0,
    left: 0,
  },
  startupSector: {
    top: 509,
    left: 36,
  },
  text: {
    top: 169,
    fontSize: FontSize.size_sm,
    width: 46,
    height: 16,
    left: 227,
  },
  description1: {
    borderRadius: Border.br_3xs,
    borderWidth: 3,
    borderColor:"black",
    borderStyle: "solid",
    top: 0,
    left: 0,
    overflow: "hidden",
  },
  description: {
    top: 133,
    left: 5,
  },
  provideAConcise: {
    top: 30,
    left: 19,
    fontSize: FontSize.size_smi,
    width: 277,
    height: 120,
  },
  descriptionParent: {
    top: 159,
    width: 289,
    height: 327,
    left: 36,
    position: "absolute",
  },
  progressChild: {
    top: 40,
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    borderTopWidth: 3,
    width: 222,
    height: 3,
    borderStyle: "solid",
    position: "absolute",
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
    width: 12,
    height: 12,
    top: 34,
    left: 227,
  },
  progressChild1: {
    left: 309,
    width: 12,
    height: 12,
    top: 34,
  },
  rectangleLineargradient: {
    borderRadius: Border.br_11xl,
    borderColor: Color.colorGray_100,
    borderWidth: 0.2,
    width: 231,
    backgroundColor: "transparent",
    left: 90,
    height: 12,
    top: 34,
    borderStyle: "solid",
  },
  text1: {
    left: 148,
  },
  text2: {
    left: 229,
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
    left: 17,
    width: 321,
    top: 16,
    height: 83,
  },
  createAccountFreelancer5: {
    backgroundColor: "black",
    flex: 1,
    width: "100%",
    height: 869,
    overflow: "hidden",
  },
});

export default CreateFreelancer2;
