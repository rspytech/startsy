import * as React from "react";
import { StyleSheet, View, Text, Pressable , TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { Input, Icon } from "@rneui/themed"; 

const CreateCommunity2 = () => {
  const navigation = useNavigation(); // Hook to manage navigation

  const handleSubmit = async () => {
    const formData = new FormData();
    
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('contactInfo', contactInfo);
    formData.append('age', age);
    formData.append('gender', gender);
    formData.append('Country', Country);
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
    <View style={styles.createAccount31}>
      <View style={styles.createAccount31Child} />
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Community Participation</Text>
        <Text style={styles.sectionDescription}>
          Specify your role within the community to help tailor your experience.
        </Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Select</Text>
          <Icon name="arrow-drop-down" color="green" size={30} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle1}>Area of Interest</Text>
        <Text style={styles.sectionDescription1}>
          Indicate the specific fields or topics you are passionate about within the startup ecosystem.
        </Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Select</Text>
          <Icon name="arrow-drop-down" color="green" size={30} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle2}>Content Preference</Text>
        <Text style={styles.sectionDescription2}>
          Choose the types of content you want to see most in your feed.
        </Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Select</Text>
          <Icon name="arrow-drop-down" color="green" size={30} />
        </TouchableOpacity>

        {/* Submit Button */}
        <View style={[styles.submitButton, styles.submitLayout]}>
        <View style={[styles.submitButtonChild, styles.submitLayout]} />
        <Pressable onPress={handleSubmit}>
        <Text style={[styles.submit, styles.submitTypo]}>Submit</Text>
        </Pressable>
      </View>
      </View>

      
     
     
      <View style={[styles.progressBar, styles.startsy53Layout]}>
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
        <Image
          style={[styles.startsy53, styles.startsy53Layout]}
          contentFit="cover"
          source={require("../assets/startsy-5-3.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
  form: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "600",
   // marginBottom: 5,
    marginTop:180,
   paddingLeft:40
  },
  sectionTitle1: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "600",
   // marginBottom: 5,
    marginTop:2,
   paddingLeft:40
  },
  sectionTitle2: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "600",
   // marginBottom: 5,
    marginTop:2,
   paddingLeft:40
  },
  sectionDescription: {
    fontSize: 14,
    color: "silver",
    marginBottom: 15,
    //marginTop:10,
    paddingLeft:40
  },
  sectionDescription1: {
    fontSize: 14,
    color: "silver",
    marginBottom: 15,
    //marginTop:10,
    paddingLeft:40
  },
  sectionDescription2: {
    fontSize: 14,
    color: "silver",
    marginBottom: 15,
    //marginTop:10,
    paddingLeft:40
  },
  
/* submitButton: {
  marginTop: 200,
  backgroundColor: "#00DF60",
  paddingVertical: 10,
  paddingHorizontal: 16,
  width:150,
  left:180,
  borderRadius: 20,
  flexshrink:0,
  alignItems: "center",
  justifyContent:"center"
},*/
submitButtonText: {
  color: '#000',
  fontSize: 16,
  fontFamily: FontFamily.robotoMedium,
},
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#24272A",
    borderRadius: 8,
    paddingLeft:40,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 22,
  },
  dropdownText: {
    fontSize: 16,
    color: "#FFF",
  },
  submitButton: {
    backgroundColor: "#00FF00",
    borderRadius: 8,
    paddingVertical: 15,
    justifyContent: "center",
    
  

  },
  submitButtonText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  buttonLayout: {
    height: 48,
    width: 266,
    position: "absolute",
  },
  startsy53Position: {
    top: 0,
    left: 0,
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
    textAlign: "left",
    color: "#ffffff",
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_mini,
    top: 48,
    position: "absolute",
  },
  createAccount31Child: {
    top: 118,
    borderTopLeftRadius: Border.br_41xl,
    backgroundColor: "#24272A",
    width: 360,
    height: 680,
    left: 0,
    position: "absolute",
  },
  buttonChild: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorSpringgreen_300,
    height: 48,
    width: 266,
    position: "absolute",
    paddingTop: 20,
  },
  chooseAnotherRole: {
    top: 14,
    left: 22,
    fontSize: 22,
    lineHeight: 16,
    color: "#000000",
    height: 28,
    width: 222,
    lineHeight: 23,
    textAlign: "center",
    fontFamily: FontFamily.alataRegular,
    position: "absolute",
  },
  button: {
    top: 545,
    left: 47,
  },
  thankYouFor: {
    fontSize: FontSize.size_xl,
  },
  howeverYouCan: {
    fontSize: FontSize.size_5xl,
  },
  thankYouForContainer: {
    top: 161,
    left: 29,
    lineHeight: 26,
    color: "#ffffff",
    width: 303,
    height: 377,
    textAlign: "center",
    fontFamily: FontFamily.alataRegular,
    position: "absolute",
  },
  progressBarChild: {
    top: 40,
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    borderTopWidth: 3,
    height: 3,
    borderStyle: "solid",
    width: 222,
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
    width: 67,
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
  createAccount31: {
    backgroundColor: "#16181A",
    flex: 1,
    width: "100%",
    height: 798,
    overflow: "hidden",
  },
});

export default CreateCommunity2;

