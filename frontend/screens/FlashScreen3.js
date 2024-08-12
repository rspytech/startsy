import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "@rneui/themed";
import { Color, FontSize, Border, FontFamily, Padding } from "../GlobalStyles";

const FlashScreen3 = () => {
  return (
    <View style={styles.flashScreen4}>
      <View style={[styles.vectorParent, styles.groupChildLayout]}>
        <Image
          style={[styles.groupChild, styles.groupChildLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-4523.png")}
        />
        <Image
          style={[styles.startsy53, styles.startsyLayout]}
          contentFit="cover"
          source={require("../assets/startsy-5-31.png")}
        />
      </View>
      <Image
        style={[styles.startsy531, styles.startsyLayout]}
        contentFit="cover"
        source={require("../assets/startsy-5-31.png")}
      />
      <View style={styles.rectangleParent}>
        <View style={[styles.instanceChild, styles.groupPosition]} />
        <View style={[styles.inputParent, styles.googleAuthShadowBox]}>
          <Image
            style={[styles.inputIcon, styles.emailPosition]}
            contentFit="cover"
            source={require("../assets/input.png")}
          />
          <Input
            placeholder="E-Mail ID"
            inputStyle={{ color: "#828282" }}
            containerStyle={styles.rajaschaudhari9gmailcomTextInputInput}
          />
          <Text style={[styles.email, styles.emailFlexBox]}>Email</Text>
          <View style={[styles.input, styles.inputBorder]} />
          <Input
            placeholder="Password"
            inputStyle={{ color: "#828282" }}
            containerStyle={styles.passwordTextInputInput}
          />
          <Text style={[styles.forgot, styles.forgotTypo]}>Forgot?</Text>
          <Text style={[styles.dontHaveAccountContainer, styles.forgotTypo]}>
            <Text style={styles.dontHaveAccount}>Don’t have account?</Text>
            <Text style={styles.text}>{` `}</Text>
          </Text>
          <Text style={[styles.orContinueWith, styles.forgotTypo]}>
            Or continue with
          </Text>
          <View style={[styles.googleAuth, styles.inputBorder]}>
            <View style={styles.flatColorIconsgoogleParent}>
              <Image
                style={styles.flatColorIconsgoogle}
                contentFit="cover"
                source={require("../assets/flatcoloriconsgoogle.png")}
              />
              <Text style={[styles.google, styles.loginTypo]}>Google</Text>
            </View>
          </View>
          <View style={[styles.rectangleGroup, styles.groupPosition]}>
            <View style={[styles.groupItem, styles.groupPosition]} />
            <Text style={[styles.login, styles.loginTypo]}>Login</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rajaschaudhari9gmailcomTextInputInput: {
    left: "1.3%",
    top: "5.88%",
    position: "absolute",
  },
  passwordTextInputInput: {
    left: "1.3%",
    top: "24.12%",
    position: "absolute",
  },
  groupChildLayout: {
    height: 890,
    width: 360,
    left: 0,
    position: "absolute",
  },
  startsyLayout: {
    height: 234,
    width: 234,
    left: 63,
    position: "absolute",
  },
  groupPosition: {
    left: "0%",
    right: "0%",
    position: "absolute",
    width: "100%",
  },
  googleAuthShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  emailPosition: {
    left: "1.3%",
    position: "absolute",
  },
  emailFlexBox: {
    textAlign: "left",
    lineHeight: 20,
  },
  inputBorder: {
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    position: "absolute",
  },
  forgotTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  loginTypo: {
    fontSize: FontSize.size_lg_8,
    position: "absolute",
  },
  groupChild: {
    top: 0,
  },
  startsy53: {
    top: 350,
  },
  vectorParent: {
    top: 741,
    height: 890,
  },
  startsy531: {
    top: 279,
  },
  instanceChild: {
    borderTopLeftRadius: Border.br_41xl,
    backgroundColor: Color.colorGray_100,
    bottom: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
  },
  inputIcon: {
    width: "97.07%",
    top: "14.56%",
    right: "1.63%",
    maxWidth: "100%",
    height: 0,
    overflow: "hidden",
  },
  email: {
    fontSize: FontSize.size_xs,
    color: Color.colorWhite,
    fontFamily: FontFamily.robotoRegular,
    left: "1.3%",
    position: "absolute",
    top: "0%",
    textAlign: "left",
  },
  input: {
    height: "0.29%",
    width: "97.39%",
    top: "32.79%",
    right: "1.47%",
    bottom: "66.91%",
    left: "1.14%",
    borderTopWidth: 1,
  },
  forgot: {
    top: "24.12%",
    left: "82.74%",
    fontWeight: "500",
    fontFamily: FontFamily.robotoMedium,
    color: Color.colorWhite,
    lineHeight: 20,
    fontSize: FontSize.size_sm,
  },
  dontHaveAccount: {
    color: Color.colorSilver_100,
  },
  text: {
    color: Color.colorLightslategray,
  },
  dontHaveAccountContainer: {
    top: "95.29%",
    left: "17.26%",
    fontFamily: FontFamily.robotoRegular,
  },
  orContinueWith: {
    top: "64.12%",
    left: "33.22%",
    color: Color.colorSilver_100,
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 20,
    fontSize: FontSize.size_sm,
  },
  flatColorIconsgoogle: {
    top: 2,
    width: 16,
    height: 16,
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  google: {
    left: 24,
    fontWeight: "600",
    fontFamily: FontFamily.robotoBold,
    color: Color.colorLightslategray,
    textAlign: "left",
    lineHeight: 20,
    top: 0,
  },
  flatColorIconsgoogleParent: {
    width: 84,
    height: 20,
  },
  googleAuth: {
    height: "12.06%",
    width: "51.14%",
    top: "74.85%",
    right: "24.27%",
    bottom: "13.09%",
    left: "24.59%",
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorWhite,
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: Padding.p_17xl,
    paddingVertical: Padding.p_3xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  groupItem: {
    borderRadius: Border.br_mid_6,
    bottom: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
    backgroundColor: Color.colorGray_200,
  },
  login: {
    top: "33.61%",
    left: "42.54%",
    lineHeight: 16,
    fontFamily: FontFamily.alataRegular,
    textAlign: "center",
    color: Color.colorWhite,
  },
  rectangleGroup: {
    height: "14.09%",
    top: "42.35%",
    bottom: "43.56%",
    left: "0%",
    right: "0%",
  },
  inputParent: {
    height: "74.24%",
    width: "85.28%",
    top: "12.66%",
    right: "7.22%",
    bottom: "13.1%",
    left: "7.5%",
    position: "absolute",
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  rectangleParent: {
    marginLeft: -180,
    left: "50%",
    height: 458,
    width: 360,
    top: 741,
    position: "absolute",
  },
  flashScreen4: {
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorGray_200,
  },
});

export default FlashScreen3;
