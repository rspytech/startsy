
import React, { useEffect, useState } from "react";
import { StyleSheet, TextInput, View, Text, Pressable, Alert, Image as RNImage } from "react-native";
import { Image } from "expo-image";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import axios from 'axios';  // Import Axios

const CreateAccount7 = () => {
  const navigation = useNavigation();
  const route = useRoute();

//  const handleSubmit = () => {
    // Add your submit logic here
  //  Alert.alert("Submit", "Your details have been submitted!");
  //};

  const {
   fullName, email,contactInfo,age, gender,selectedCountry,  investmentRange,
     startupStage,
      areaOfInterest,
      previousExperience,
      preferredSector,
      profileImageUri
  } = route.params;

  const [imageUri, setImageUri] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // New state for upload status
  const [panCardNumber, setPanCardNumber] = useState(""); 

  useEffect(() => {
    const loadImage = async () => {
      try {
        const storedImageUri = await AsyncStorage.getItem('panCardImageUri');
        if (storedImageUri) {
          setImageUri(storedImageUri);
        }
      } catch (error) {
        console.error("Failed to load image URI:", error);
      }
    };

    loadImage();
  }, []);

  const handleUploadPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'You need to grant permission to access the media library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri;
      if (selectedUri) {
        setImageUri(selectedUri);

        try {
          await AsyncStorage.setItem('panCardImageUri', selectedUri);
          setUploadStatus("Image uploaded successfully!"); // Update status on successful upload
        
        } catch (error) {
          console.error("Failed to save image URI:", error);
          setUploadStatus("Failed to upload image.");// Update status on failure
        
        }
      }
    }
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('contactInfo', contactInfo);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('selectedCountry', selectedCountry);
    formData.append('investmentRange', investmentRange);
    formData.append('startupStage', startupStage);
    formData.append('areaOfInterest', areaOfInterest);
    formData.append('previousExperience', previousExperience);
    formData.append('preferredSector', preferredSector);
    formData.append('panCardNumber', panCardNumber);

    if (imageUri) {
      formData.append('panCardImage', {
        uri: imageUri,
        name: 'panCard.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      const response = await axios.post('http:// 192.168.43.217:5000/api/investorInfo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Your details have been submitted successfully!');
      } else {
        Alert.alert('Error', 'Failed to submit your details. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'An error occurred while submitting the form.');
    }
  };


  return (
    <View style={styles.createAccount6}>
      {profileImageUri && (
        <Image
          style={styles.profileImage}
          source={{ uri: profileImageUri }}
        />
      )}
    
      <Text>Full Name: {fullName}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone Number: {contactInfo}</Text>
      <Text>Age: {age}</Text>
      <Text>Gender: {gender}</Text>
      <Text>Selected Country: {selectedCountry}</Text>
      <Text>Investment Capacity: {investmentRange}</Text>
      <Text>Selected Investor: {startupStage}</Text>
      <Text>Selected Stage: {areaOfInterest}</Text>
      <Text>Investing Experience: {previousExperience} years</Text>
      <Text>Selected Value: {preferredSector}</Text>
      <View style={styles.createAccount6Child} />
      <View style={styles.panCardPic}>
       
        <Text style={[styles.pleaseUploadA, styles.pleaseLayout]}>
          Please upload a pic of your PAN card
          
        </Text>
        
        <Pressable style={styles.uploadButton} onPress={handleUploadPress}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </Pressable>
        {uploadStatus ? (
          <Text style={styles.uploadStatus}>{uploadStatus}</Text> // Display upload status
        ) : null}
      </View>
      <View style={styles.panCardNo}>
        <View style={[styles.rectangleParent, styles.groupChildLayout]}>
          <View style={[styles.groupChild, styles.childBorder]} />
          <TextInput
            style={styles.panCardNumber}
            placeholder="PAN card number"
            placeholderTextColor="#000"
            value={panCardNumber}
            onChangeText={setPanCardNumber}
          />
        </View>
        <Text style={[styles.pleaseEnterYour, styles.pleaseLayout]}>
          Please enter your PAN card number
        </Text>
        <Text style={{ color: 'white', fontSize: 18, top: 360 }}>
          {uploadStatus}
        </Text>
      </View>
      <View style={[styles.progressBar, styles.startsy53Layout]}>
        <View style={[styles.progressBarChild, styles.childBorder]} />
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
          style={[styles.startsy53, styles.startsy53Layout]}
          contentFit="cover"
          source={require("../assets/startsy-5-3.png")}
        />
      </View>
      <View style={styles.icons}>
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/icon.png")}
        />
        <Pressable style={styles.navigation} onPress={() => navigation.navigate("CreateAccount6")}>
          <Image
            style={styles.navigationIcon}
            source={require("../assets/expand-left.png")}
          />
        </Pressable>
      </View>
      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </Pressable>
    </View>
  );
};


const styles = StyleSheet.create({
  createAccount6: {
    flex: 1,
    padding: 16,
    backgroundColor: Color.white,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  panCardPic: {
    alignItems: 'center',
    marginVertical: 20,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

 submitButton: {
    marginTop: 395,
    backgroundColor: "#00DF60",
    paddingVertical: 10,
    paddingHorizontal: 16,
    width:150,
    left:180,
    borderRadius: 20,
    flexshrink:0,
    alignItems: "center",
    justifyContent:"center"
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: FontFamily.robotoMedium,
  },
    uploadButton: {
        marginTop: 70, // Space between text and button
        backgroundColor:"#00DF60", // Button color green
        borderRadius:20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width:229,
        height:48,
        flexshrink:0,
        alignItems: "center",
        justifyContent:"center"
      },
      uploadButtonText: {
        color: "black", // Text color inside button
        fontFamily: FontFamily.alataRegular,
        fontSize: FontSize.size_base,
      },
      
  pleaseLayout: {
    height: 58,
    textAlign: "center",
    color: Color.colorWhite, // Updated text color to white
    fontFamily: FontFamily.alataRegular,
    lineHeight: 22,
    fontSize: FontSize.size_5xl,
    top: 0,
    width: 266,
    position: "absolute",
  },
  groupChildLayout: {
    height: 49,
    width: 280,
    left: 0,
  },
  childBorder: {
    borderStyle: "solid",
    borderColor: Color.colorBlack, // Updated border color to black
    position: "absolute",
  },
  startsy53Layout: {
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
  iconLayout: {
    width: 76,
    height: 76,
    top: 0,
    position: "absolute",
  },
  createAccount6Child: {
    top: 118,
    borderTopLeftRadius: Border.br_41xl,
    width: 360,
    height: 680,
    backgroundColor: "#24272A",
    left: 0,
    position: "absolute",
  },
  imgLoadBoxDuotoneLineIcon: {
    top: 83,
    left: 45,
    width: 177,
    height: 177,
    position: "absolute",
  },
  pleaseUploadA: {
    left: 0,
  },
  panCardPic: {
    top: 405,
    left: 47,
    height: 260,
    width: 266,
    position: "absolute",
  },
  groupChild: {
    borderRadius: Border.br_3xs,
    borderColor: Color.colorBlack, // Updated border color to black
    borderWidth: 3,
    height: 49,
    width: 280,
    left: 0,
    top: 0,
    backgroundColor: Color.colorGray_100,
  },
  panCardNumber: {
    top: 5,
    left: 13,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.sansSerifCollection,
    color: "white",
    textAlign: "left",
    position: "absolute",
  },
  rectangleParent: {
    top: 94,
    position: "absolute",
  },
  pleaseEnterYour: {
    left: 7,
  },
  panCardNo: {
    top: 178,
    left: 40,
    height: 143,
    width: 280,
    position: "absolute",
  },
  progressBarChild: {
    top: 40,
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    borderTopWidth: 3,
    width: 222,
    height: 3,
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
  progressBar: {
    top: 16,
    left: 12,
    width: 322,
  },
  icon: {
    left: 267,
  },
  icon1: {
    height: "100%",
    width: "100%",
  },
 
  icons: {
    top: 701,
    left: 9,
    width: 343,
    height: 76,
    position: "absolute",
  },
  createAccount6: {
    backgroundColor: "#16181A",
    flex: 1,
    height: 798,
    overflow: "hidden",
    width: "100%",
  },
});

export default CreateAccount7;

