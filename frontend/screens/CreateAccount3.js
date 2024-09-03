
import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const CreateAccount3 = () => {
  const navigation = useNavigation(); // Hook to manage navigation

  return (
    <View style={styles.createAccount31}>
      <View style={styles.createAccount31Child} />
      <Pressable
        style={[styles.button, styles.buttonLayout]}
        onPress={() => navigation.navigate("Login1")} // Navigate to Login1 screen
      >
        <View style={[styles.buttonChild, styles.startsy53Position]} />
        <Text style={styles.chooseAnotherRole}>Choose another role</Text>
      </Pressable>
      <Text style={styles.thankYouForContainer}>
        <Text style={styles.thankYouFor}>
          Thank you for your interest in joining Startsy as an investor. To
          ensure a high standard of investment opportunities, we require
          investors to have assets worth 2 crores and above. Unfortunately, you
          do not meet this criterion at the moment.
        </Text>
        <Text style={styles.howeverYouCan}>{`

However, you can still be a valuable part of our community by exploring other Roles

`}</Text>
      </Text>
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

export default CreateAccount3;

