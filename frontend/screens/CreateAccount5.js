import * as React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const CreateAccount5 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.dropdown41}>
      <View style={styles.dropdown41Child} />
      <Pressable
        style={styles.icon}
        onPress={() => navigation.navigate("CreateAccount3")}
      >
        <Image
          style={styles.icon1Layout}
          contentFit="cover"
          source={require("../assets/icon.png")}
        />
      </Pressable>
      <View style={styles.uploadPfp}>
        <Image
          style={styles.uploadPfpChild}
          contentFit="cover"
          source={require("../assets/group-30.png")}
        />
        <Text style={styles.uploadAProfile}>Upload a profile picture</Text>
      </View>
      <View style={[styles.name, styles.ageLayout]}>
        <Text style={styles.fullName}>Full name</Text>
        <View style={[styles.nameChild, styles.childLayout]} />
      </View>
      <View style={[styles.emailAddress, styles.ageLayout]}>
        <Text style={styles.fullName}>Email address</Text>
        <View style={[styles.nameChild, styles.childLayout]} />
      </View>
      <View style={[styles.phoneNo, styles.ageLayout]}>
        <Text style={styles.fullName}>Phone number</Text>
        <View style={[styles.nameChild, styles.childLayout]} />
      </View>
      <View style={[styles.country, styles.ageLayout]}>
        <Text style={styles.fullName}>Country</Text>
        <View style={[styles.nameChild, styles.childLayout]} />
      </View>
      <View style={[styles.age, styles.ageLayout]}>
        <Text style={styles.fullName}>Age (Years)</Text>
        <View style={[styles.ageChild, styles.childLayout]} />
      </View>
      <View style={[styles.gender, styles.ageLayout]}>
        <Text style={styles.fullName}>Gender</Text>
        <View style={[styles.ageChild, styles.childLayout]} />
      </View>
      <View style={[styles.progressBar, styles.startsy53Layout]}>
        <View style={[styles.progressBarChild, styles.childLayout]} />
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
      <LinearGradient
        style={styles.countryFrame}
        locations={[0, 1]}
        colors={["rgba(36, 39, 42, 0.6)", "rgba(123, 134, 144, 0.4)"]}
      >
        <Pressable
          style={[styles.pressable, styles.icon1Layout]}
          onPress={() => navigation.navigate("CreateAccount1")}
        >
          <View style={styles.countryList}>
            <View style={[styles.ind, styles.indLayout]}>
              <View style={[styles.indChild, styles.indLayout]} />
              <Text style={[styles.india, styles.indiaTypo]}>India</Text>
            </View>
            <View style={[styles.us, styles.indLayout]}>
              <View style={[styles.indChild, styles.indLayout]} />
              <Text style={[styles.unitedStates, styles.indiaTypo]}>
                United States
              </Text>
            </View>
            <View style={[styles.uk, styles.indLayout]}>
              <View style={[styles.indChild, styles.indLayout]} />
              <Text style={styles.uk1}>United Kingdom</Text>
            </View>
            <View style={[styles.can, styles.indLayout]}>
              <View style={[styles.indChild, styles.indLayout]} />
              <Text style={styles.uk1}>Canada</Text>
            </View>
            <View style={[styles.germany, styles.indLayout]}>
              <View style={[styles.indChild, styles.indLayout]} />
              <Text style={styles.uk1}>Germany</Text>
            </View>
            <View style={[styles.aus, styles.indLayout]}>
              <View style={[styles.indChild, styles.indLayout]} />
              <Text style={styles.uk1}>Australia</Text>
            </View>
            <View style={[styles.singapore, styles.indLayout]}>
              <View style={[styles.indChild, styles.indLayout]} />
              <Text style={styles.uk1}>Singapore</Text>
            </View>
            <View style={[styles.israel, styles.indLayout]}>
              <View style={[styles.indChild, styles.indLayout]} />
              <Text style={styles.uk1}>Israel</Text>
            </View>
            <View style={[styles.brazil, styles.indLayout]}>
              <View style={[styles.indChild, styles.indLayout]} />
              <Text style={styles.uk1}>Brazil</Text>
            </View>
            <View style={[styles.sweden, styles.indLayout]}>
              <View style={[styles.indChild, styles.indLayout]} />
              <Text style={styles.uk1}>Sweden</Text>
            </View>
          </View>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
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
  icon1Layout: {
    height: "100%",
    width: "100%",
  },
  indLayout: {
    height: 48,
    width: 285,
    left: 0,
    position: "absolute",
  },
  indiaTypo: {
    height: 24,
    fontFamily: FontFamily.aBeeZeeRegular,
    left: 11,
    top: 12,
    color: Color.colorSilver_200,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    position: "absolute",
  },
  dropdown41Child: {
    top: 118,
    borderTopLeftRadius: Border.br_41xl,
    backgroundColor: Color.colorGray_100,
    width: 360,
    height: 700,
    left: 0,
    position: "absolute",
  },
  icon: {
    left: 275,
    top: 709,
    width: 76,
    height: 76,
    position: "absolute",
  },
  uploadPfpChild: {
    left: 17,
    width: 113,
    height: 123,
    top: 0,
    position: "absolute",
  },
  uploadAProfile: {
    top: 124,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorLightslategray,
    height: 16,
    textAlign: "left",
    width: 144,
    left: 0,
    position: "absolute",
  },
  uploadPfp: {
    top: 145,
    left: 108,
    height: 140,
    width: 144,
    position: "absolute",
  },
  fullName: {
    left: 8,
    fontFamily: FontFamily.sansSerifCollection,
    color: Color.colorSilver_200,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    top: 0,
    position: "absolute",
  },
  nameChild: {
    top: 42,
    width: 287,
    borderColor: Color.colorGray_200,
    left: -1,
    height: 3,
    borderTopWidth: 3,
  },
  name: {
    top: 304,
    left: 38,
    height: 49,
  },
  emailAddress: {
    top: 372,
    left: 39,
  },
  phoneNo: {
    top: 508,
    left: 38,
    height: 49,
  },
  country: {
    top: 440,
    left: 38,
    height: 49,
  },
  ageChild: {
    top: 47,
    width: 287,
    borderColor: Color.colorGray_200,
    left: -1,
    height: 3,
    borderTopWidth: 3,
  },
  age: {
    top: 576,
    left: 38,
    height: 49,
  },
  gender: {
    top: 644,
    left: 38,
    height: 49,
  },
  progressBarChild: {
    top: 40,
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    width: 222,
    height: 3,
    borderTopWidth: 3,
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
  indChild: {
    backgroundColor: Color.colorGray_500,
    borderColor: Color.colorGray_400,
    borderBottomWidth: 1,
    borderStyle: "solid",
    height: 48,
    top: 0,
  },
  india: {
    width: 108,
  },
  ind: {
    top: 0,
  },
  unitedStates: {
    width: 131,
  },
  us: {
    top: 48,
    height: 48,
  },
  uk1: {
    width: 158,
    height: 28,
    fontFamily: FontFamily.aBeeZeeRegular,
    left: 11,
    top: 12,
    color: Color.colorSilver_200,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    position: "absolute",
  },
  uk: {
    top: 96,
  },
  can: {
    top: 144,
  },
  germany: {
    top: 192,
  },
  aus: {
    top: 240,
  },
  singapore: {
    top: 280,
  },
  israel: {
    top: 320,
  },
  brazil: {
    top: 368,
  },
  sweden: {
    top: 416,
  },
  countryList: {
    top: 5,
    height: 464,
    width: 285,
    left: 0,
    position: "absolute",
  },
  pressable: {
    borderRadius: Border.br_3xs,
    backgroundColor: "transparent",
  },
  countryFrame: {
    top: 483,
    height: 283,
    width: 284,
    left: 38,
    position: "absolute",
  },
  dropdown41: {
    backgroundColor: Color.colorGray_200,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default CreateAccount5;