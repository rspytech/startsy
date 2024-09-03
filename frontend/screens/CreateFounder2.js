/*import * as React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const CreateFounder2 = () => {
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
};*/
import React, { useState } from "react";
import { StyleSheet, View, Pressable, Text, ScrollView,TextInput } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import { Icon } from '@rneui/themed';
import { Input } from '@rneui/themed';

const CreateFounder2 = () => {
  const navigation = useNavigation();
  const [companyname, setCompanyName] = React.useState("");
  const [year, setYear] = React.useState("");
  const [role, setRole] = React.useState("");
  const [skills, setSkills] = React.useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState(null);


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle dropdown visibility
  };
  const handleEducationSelect = (Education) => {
    setSelectedEducation(Education);
    setShowDropdown(false); 
  };


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.createAccountFounder4}>
        <View style={styles.createAccountFounder4Child} />
        <View style={styles.icons}>
          <Pressable
            style={[styles.icon, styles.iconLayout]}
            onPress={() => navigation.navigate("CreateFounder1")}
          >
            <Image
              style={styles.navigationIcon}
              source={require("../assets/expand-left.png")}
            />
          </Pressable>
          <Pressable style={styles.navigationButton1} 
          onPress={() => navigation.navigate("CreateFounder3")}>
            <Image
              style={styles.navigationIcon}
              source={require("../assets/expand-right.png")}
            />
          </Pressable>
       
        </View>

        <View style={styles.workExp}>
          <View style={[styles.expCard, styles.expCardLayout]}>
            <View style={[styles.expCardChild, styles.childBorder]} />
            <Image
              style={styles.plus02Icon}
              contentFit="cover"
              // source={require("../assets/plus02.png")}
            />
             
            <View style={styles.groupParent}>
              <View style={[styles.companyOrganisationParent, styles.parentLayout]}>
                
                <TextInput
                 style={[styles.companyOrganisation, styles.roleTypo]}
                 placeholder="  Company / Organisation"
                v alue={companyname}
                 onChangeText={(text) => setCompanyName(text)}
              />
                <View style={styles.groupChild} />
              </View>
              <View style={[styles.roleParent, styles.parentLayout]}>
                  
                <TextInput
                   style={[styles.role, styles.roleTypo]}
                  placeholder="Role"
                  value={role}
                  onChangeText={(text) => setRole(text)}
               />
                <View style={styles.groupChild} />
              </View>
              <View style={[styles.yearParent, styles.parentLayout]}>
                
                <TextInput
                 style={[styles.name1, styles.name1Typo]}
                 placeholder="year"
                 value={year}
                 onChangeText={(text) => setYear(text)}
              />
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
        <Pressable style={[styles.select, styles.selectLayout]} onPress={toggleDropdown}>
        <View style={[styles.selectChild, styles.selectLayout]} />
        
        {/* Display selected education or default 'Select' text */}
        <Text style={[styles.select1, styles.roleTypo]}>
          {selectedEducation ? selectedEducation : "Select"}
        </Text>
            
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
             {["India", "United States", "United Kingdom", "Canada", "Germany", "Australia", "Singapore", "Israel", "Brazil", "Sweden"].map((Education) => (
               <Pressable
                 key={Education}
                 style={[styles.ind, styles.indLayout]}
                 onPress={() => handleEducationSelect(Education)}
               >
                 <View style={[styles.indChild, styles.indLayout]} />
                 <Text
                   style={[
                     styles.dropdownItemText,
                     selectedEducation === Education && styles.selectedEducation
                   ]}
                 >
                   {Education}
                 </Text>
               </Pressable>
             ))}
           </ScrollView>
         </View>
       )}
 
 
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
           
            <TextInput
            style={[styles.writeAnyTop, styles.roleTypo]}
            placeholder="write any top 3"
            value={skills}
            onChangeText={(text) => setSkills(text)}
          />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  //
  dropdownIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:240, // Corrected from 'paddingleft' to 'paddingLeft'
    justifyContent: 'space-between',
   paddingTop:4,
     top:0,
     
    
  },
  dropdownItem:{
 gap:10
  },
  dropdownContent: {
    backgroundColor: "rgba(128, 128, 128, 0.6)",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 150,
    zIndex: 1,
    gap:20,
    height:420,
    left: 0,
    width: 284,
  },

    navigationButton1: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
         marginTop:8,
         marginLeft:290,
       
          },
      navigationIcon: {
        width: 80,
        height: 50,
      },
  iconLayout: {
    width: 76,
    top: 300,
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
    lineHeight: 26,
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

export default CreateFounder2;