//educational details page of freelancer

import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";

import { Icon } from "@rneui/themed";
import { Input } from "@rneui/themed";

const CreateFreelancer1 = () => {
  const navigation = useNavigation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [education, seteducation] = useState(null);

  const { certification, url, skills } = props;

  const route = useRoute();
  const { fullName, email, contactInfo, age, gender, Country, profileImageUri } = route.params; 

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };
  const handleEducationSelect = (education) => {
    seteducation(education);
    setShowDropdown(false); 
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.createAccountFreelancer4}>
      
        <Text>fullName:{fullName}</Text>
        <Text>email:{email}</Text>
        <Text>contactInfo:{contactInfo}</Text>
        <Text>age:{age}</Text>
        <Text>gender:{gender}</Text>
        <Text> Country:{ Country}</Text>
        <Text> profileImageUri:{ profileImageUri}</Text>
        <View style={styles.createAccountFreelancer4Child} />
        <View style={styles.icons}>
        <Pressable
          style={[styles.icon, styles.iconLayout]}
          onPress={() => navigation.navigate("CreatetFreelancer2",{fullName, email, contactInfo, age, gender, Country, profileImageUri,certification,url,skills})}
        >
          <Image
            style={styles.icon1}
            contentFit="cover"
              source={require("../assets/expand-right.png")}
            />
         </Pressable>
        <Pressable
          style={[styles.expandLeft, styles.iconLayout]}
          onPress={() => navigation.navigate("CreateFreelancer",{fullName, email, contactInfo, age, gender, Country, profileImageUri})}
        >
          <Image
            style={styles.icon1}
            contentFit="cover"
              source={require("../assets/expand-left.png")}
            />
          </Pressable>
        </View>
        <View
          style={[styles.createAccountFreelancer4Item, styles.skillsLayout]}
        />
        <Image
          style={[styles.plus02Icon, styles.plus02IconLayout]}
          contentFit="cover"
          // source={require("../assets/plus02.png")}
        />
        <View style={[styles.certificationNameParent, styles.parentLayout]}>
          
       <Input
          placeholder="Certification name"
          value={certification} // Using the passed prop value
          style={[styles.certificationName,  { fontSize: 18 }]}  // Adjust the font size here
          placeholderTextColor={Color.colorSilver_200}
          inputStyle={{ color: 'gray' }} 
        />
          <View style={styles.groupChild} />
        </View>
        <View style={[styles.urlParent, styles.parentLayout]}>
    
          <Input
          placeholder="URL"
          value={url} // Using the passed prop value
         style={[ styles.urlPosition, { fontSize: 18 }]}  // Adjust the font size here
          placeholderTextColor={Color.colorSilver_200}
          inputStyle={{ color: 'silver' }} 
        />
          <View style={styles.groupChild} />
        </View>
        <Text style={[styles.aBriefCatchy, styles.aBriefCatchyTypo]}>
          A brief, catchy description of your services or specialization (e.g.,
          "Expert Graphic Designer" or "Full-Stack Developer with 5 Years of
          Experience").
        </Text>
        <View style={[styles.selectParent, styles.skillsLayout]}>
          <Pressable style={[styles.select, styles.selectLayout]}onPress={toggleDropdown}>
            <View style={[styles.selectChild, styles.selectLayout]} />
            <Text style={[styles.select1, styles.urlTypo]}>{education ? education : "Select"}</Text>
            <Icon
              name={showDropdown ? "chevron-up" : "chevron-down"} // Conditionally rendering icon based on dropdown state
              type="feather" // You can use other icon sets as well
              size={34}
              color="#00DE62"
              style={styles.dropdownIcon} // Custom style for icon
            />
          </Pressable>
          {/* Dropdown content (you can modify this part as needed) */}
          {showDropdown && (
           <View style={styles.dropdownContent}>
           <ScrollView style={styles.dropdownItem}>
             {["10th" ,"12th" , "Graduate","post-Graduate","P.H.D"].map((education) => (
               <Pressable
                 key={education}
                 style={[styles.ind, styles.indLayout]}
                 onPress={() => handleEducationSelect(education)}
               >
                 <View style={[styles.indChild, styles.indLayout]} />
                 <Text
                   style={[
                     styles.dropdownItemText,
                     education === education && styles.selectedEducation
                   ]}
                 >
                   {education}
                 </Text>
               </Pressable>
             ))}
           </ScrollView>
         </View>
       )}
          <Text style={[styles.listYourHighest, styles.aBriefCatchyTypo]}>
            List your highest degree achieved, which helps to establish your
            academic background and qualifications.
          </Text>
          <Text style={[styles.education, styles.skills1Typo]}>Education</Text>
        </View>
        <View style={[styles.skills, styles.skillsLayout]}>
          <Text style={[styles.skills1, styles.skills1Typo]}>Skills</Text>
          <View style={[styles.skills2, styles.skillsLayout]}>
            <Text style={[styles.writeAnyTop, styles.url1Typo]}>
              Write any Top 3
            </Text>
            <Input style={[styles.skillsChild, styles.skillsChildLayout]}
                inputContainerStyle={{ borderBottomWidth: 0 }} 
                value={skills[0]} // Using index for skill 1
             />
            <Input
              style={[styles.skillsChild, styles.skillsChildLayout]}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              value={skills[1]} // Using index for skill 2  // Removes the gray underline
             />
 
          </View>
        </View>
       <View>
  <Text style={[styles.tagline, styles.skills1Typo]}>Tagline</Text>

  <View
    style={{
      top: 283,   // Adjust if needed
      left: 37,
      width: 287,
      height: 3,
      borderTopWidth: 3,
      borderColor: "black",  // Use your desired black or gray color
      position: 'absolute',
    }}
  />

  {/* Input Field */}
  <Input
    placeholder=""
    style={{
      position: 'absolute',
      top: 250,  // Adjust this to position the input right above the line
      left: 37,
      width: 287,
      fontSize: 18,
    
    }}
    placeholderTextColor={Color.colorSilver_200}
    inputStyle={{ color: 'white' }}
    inputContainerStyle={{ borderBottomWidth: 0 }}  // Removes default underline
  />
</View>
        <View style={styles.socialProof}>
          <Text style={[styles.education, styles.skills1Typo]}>
            Certifications
          </Text>
        </View>
        <View style={[styles.socialProof1, styles.skillsLayout]}>
          <Text style={[styles.portfolio, styles.skills1Typo]}>Portfolio</Text>
      
          <Input
          placeholder="URL"
          style={[styles.url1, styles.url1Typo , { fontSize: 18 }]}  // Adjust the font size here
          placeholderTextColor={Color.colorSilver_200}
          inputStyle={{ color: 'white' }} 
          inputContainerStyle={{ borderBottomWidth: 0 }}  // Removes the gray underline
      
        />
        
          <View style={[styles.socialProofChild, styles.skillsChildLayout]} />
          <Image
            style={[styles.plus02Icon1, styles.plus02IconLayout]}
            contentFit="cover"
            // source={require("../assets/plus02.png")}
          />
        </View>
        <View style={[styles.progress, styles.progressLayout1]}>
          <View style={[styles.progressChild, styles.skillsChildLayout]} />
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
          <Text style={[styles.text, styles.textTypo]}>1</Text>
          <Text style={[styles.text1, styles.textTypo]}>2</Text>
          <Text style={[styles.text2, styles.textTypo]}>3</Text>
          <Image
            style={[styles.startsy53, styles.progressLayout1]}
            contentFit="cover"
            source={require("../assets/startsy-5-3.png")}
          />
        </View>
        <View style={[styles.progress, styles.progressLayout1]}>
          <View style={[styles.progressChild, styles.skillsChildLayout]} />
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
          <Text style={[styles.text, styles.textTypo]}>1</Text>
          <Text style={[styles.text1, styles.textTypo]}>2</Text>
          <Text style={[styles.text2, styles.textTypo]}>3</Text>
          <Image
            style={[styles.startsy53, styles.progressLayout1]}
            contentFit="cover"
            source={require("../assets/startsy-5-3.png")}
          />
        </View>
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
  container: {
    flexGrow: 1,
  },
  createAccountFreelancer4: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  
  iconLayout: {
    width: 76,
    top: 0,
    height: 76,
    position: "absolute",
  },
  skillsLayout: {
    width: 284,
    position: "absolute",//k
    borderColor: "black",
   
  },
  plus02IconLayout: {
    height: 28,
    width: 28,
    position: "absolute",
  },
  parentLayout: {
    height: 44,
    width: 240,
    left: 50,
    position: "absolute",
  },
  urlTypo: {
    textAlign: "left",
    fontFamily: FontFamily.sansSerifCollection,
    position: "absolute",
  },
  urlPosition: {
    left: 8,
    top: 0,
  },
  aBriefCatchyTypo: {
    height: 75,
    color: Color.colorLightslategray,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_smi,
    textAlign: "left",
    position: "absolute",
  },
  selectLayout: {
    height: 49,
    width: 284,
    left: 0,
    position: "absolute",
  },
  skills1Typo: {
    textAlign: "center",
    color: "white",
    fontFamily: FontFamily.alataRegular,
    lineHeight: 26,
    fontSize: FontSize.size_5xl,
    position: "absolute",
   
  },
  url1Typo: {
    fontSize: FontSize.size_xl,
    textAlign: "left",
    color: Color.colorSilver_200,
    fontFamily: FontFamily.sansSerifCollection,
    position: "absolute",
   
  },
  skillsChildLayout: {
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
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
    color: Color.colorSpringgreen_200,
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_mini,
    top: 48,
    textAlign: "left",
    position: "absolute",
  },
  createAccountFreelancer4Child: {
    top: 118,
    borderTopLeftRadius: Border.br_41xl,
    width: 360,
    height: 1226,
    backgroundColor: "#24272A",
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
    top: 932,
    width: 343,
    height: 76,
    left: 7,
    position: "absolute",
  },
  createAccountFreelancer4Item: {
    top: 657,
    height: 143,
    borderWidth: 3,
    borderRadius: Border.br_3xs,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_100,
    left: 28,
  },
  plus02Icon: {
    top: 669,
    left: 273,
  },
  certificationName: {
    left: 5,
    width: 230,
    color: Color.colorSilver_200,
    fontSize: FontSize.size_lg,
    textAlign: "left",
    fontFamily: FontFamily.sansSerifCollection,
    top: 0,
  },
  groupChild: {
    top: 39,
    borderTopWidth: 2,
    width: 242,
    height: 2,
    left: -1,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    position: "absolute",
  },
  certificationNameParent: {
    top: 683,
  },
  url: {
    width: 88,
    textAlign: "left",
    fontFamily: FontFamily.sansSerifCollection,
    position: "absolute",
    color: Color.colorSilver_200,
    fontSize: FontSize.size_lg,
  },
  urlParent: {
    top: 736,
  },
  aBriefCatchy: {
    top: 188,
    left: 49,
    width: 255,
  },
  selectChild: {
    borderWidth: 3,
    borderRadius: Border.br_3xs,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    backgroundColor: Color.colorGray_100,
    top: 0,
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
    top: 25,
    left: 18,
    width: 232,
  },
  education: {
    top: 0,
    left: 0,
  },
  selectParent: {
    top: 448,
    height: 142,
    left: 28,
  },
  skills1: {
    left: 1,
    top: 0,
  },
  writeAnyTop: {
    left: 8,
    top: 0,
  },
  skillsChild: {
    top: 43,
    width: 287,
    height: 3,
    borderTopWidth: 3,
    borderColor: "black",
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
    top: 308,
    height: 116,
    left: 28,
  },
  tagline: {
    top: 156,
    left: 28,
  },
  createAccountFreelancer4Inner: {
    top: 283,
    left: 37,
    width: 287,
    height: 3,
    borderTopWidth: 3,
    borderColor: Color.colorGray_200,
  },
  socialProof: {
    top: 620,
    left: 29,
    width: 146,
    height: 17,
    position: "absolute",
  
  },
  portfolio: {
    top: 0,
    left: 7,
    color: Color.colorGainsboro,
    fontFamily: FontFamily.alataRegular,
    lineHeight: 16,
    fontSize: FontSize.size_5xl,
    borderColor: "black",//
    
  },
  url1: {
    top: 25,
    left: 11,
    
  },
  socialProofChild: {
    top: 67,
    width: 287,
    height: 3,
    borderTopWidth: 3,
    borderColor: Color.colorGray_200,
    left: -1,
  },
  plus02Icon1: {
    top: 35,
    left: 251,
  },
  socialProof1: {
    top: 832,
    height: 74,
    left: 28,//
    borderColor: "black",
    
  },
  progressChild: {
    top: 40,
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    width: 222,
    height: 3,
    borderTopWidth: 3,
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
    left: 227,
    width: 12,
    height: 12,
    top: 34,
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
    width: 149,
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
    left: 229,
  },
  text2: {
    left: 311,
  },
  startsy53: {
    width: 83,
    top: 0,
    left: 0,
  },
  progress: {
    top: 15,
    left: 15,
    width: 321,
  },
  createAccountFreelancer4: {
    backgroundColor: "#16181A",
    flex: 1,
    height: 1023,
    overflow: "hidden",
    width: "100%",
  },
});

export default CreateFreelancer1;

