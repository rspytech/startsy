
import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, Color, FontSize } from "../GlobalStyles";

const CreateAccount1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.createAccountContainer}>
      <View style={[styles.vectorParent, styles.childLayout]}>
        <Image
          style={[styles.groupChild, styles.childLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-4523.png")}
        />
        <Image
          style={styles.startsy53}
          contentFit="cover"
          source={require("../assets/startsy-5-3.png")}
        />
      </View>

      <Image
        style={[styles.createAccount2Child, styles.childLayout]}
        contentFit="cover"
        source={require("../assets/rectangle-4523.png")}
      />
      <Image
        style={styles.startsy531}
        contentFit="cover"
        source={require("../assets/startsy-5-31.png")}
      />
      <View style={[styles.createAccount2Inner, styles.groupItemLayout]}>
        <View style={[styles.groupItem, styles.groupItemLayout]} />
      </View>

      <Pressable
        style={styles.iconWrapper}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Image
          style={styles.icon}
          contentFit="cover"
          source={require("../assets/group-27.png")}
        />
      </Pressable>

      <View style={styles.createAPasswordParent}>
        <Text style={[styles.createAPassword, styles.nextTypo]}>
          Create a password
        </Text>
        <View style={[styles.passwordWrapper, styles.passwordWrapperPosition]}>
          <Text style={[styles.password, styles.passwordFlexBox]}>
            Password
          </Text>
        </View>
        <View style={[styles.confirmPasswordWrapper, styles.passwordWrapperPosition]}>
          <Text style={[styles.confirmPassword, styles.passwordFlexBox]}>
            Confirm password
          </Text>
        </View>
        <Text style={[styles.useAStrong, styles.passwordFlexBox]}>
          Use a strong password
        </Text>
        <Pressable
          style={[styles.rectangleParent, styles.groupInnerLayout]}
          onPress={() => navigation.navigate("CreateAccount2")}
        >
          <View style={[styles.groupInner, styles.groupInnerLayout]} />
          <Text style={[styles.next, styles.nextTypo]}>Next</Text>
        </Pressable>
      </View>
      <Image
        style={[styles.lineIcon, styles.lineIconLayout]}
        contentFit="cover"
        source={require("../assets/line-2.png")}
      />
      <Image
        style={[styles.createAccount2Child1, styles.lineIconLayout]}
        contentFit="cover"
        source={require("../assets/line-2.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  childLayout: {
    height: 890,
    width: 360,
    left: 0,
    position: "absolute",
    backgroundColor: "#000000",
    marginTop:20
  },
  groupItemLayout: {
    height: 559,
    width: 360,
    left: 0,
    position: "absolute",
  },
  icon: {
    height: 30,  // Adjusted height for the icon
    width: 30,   // Adjusted width for the icon
    resizeMode: "contain",
  },
  iconWrapper: {
    position: "absolute",
    top: 20,     // Positioning at the top
    left: 20,    // Positioning on the left
    justifyContent: "center",
    alignItems: "center",
  },
  nextTypo: {
    textAlign: "center",
    fontFamily: FontFamily.alata,
    lineHeight: 28,
    position: "absolute",
  },
  passwordWrapperPosition: {
    height: 49,
    left: 0,
    position: "absolute",
  },
  passwordFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
  groupInnerLayout: {
    height: 48,
    width: 269,
    left: 0,
    position: "absolute",
  },
  lineIconLayout: {
    height: 2,
    width: 284,
    left: 38,
    position: "absolute",
  },
  groupChild: {
    top: 0,
  },
  startsy53: {
    top: 350,
    left: 63,
    width: 234,
    height: 234,
    position: "absolute",
  },
  vectorParent: {
    top: 741,
    backgroundColor: "#000000",
  },
  createAccount2Child: {
    top: -71,
  },
  startsy531: {
    top: 42,
    left: 93,
    width: 177,
    height: 177,
    position: "absolute",
  },
  groupItem: {
    borderTopLeftRadius: Border.br_41xl,
    backgroundColor: Color.colorGray_200,
    top: 0,
  },
  createAccount2Inner: {
    top: 259,
  },
  createAPassword: {
    left: 14,
    fontSize: FontSize.size_9xl,
    color: Color.colorWhite,
    top: 0,
  },
  password: {
    color: Color.colorSilver_200,
    fontFamily: FontFamily.sansSerifCollection,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    top: 0,
    left: 0,
  },
  passwordWrapper: {
    top: 91,
    width: 91,
  },
  confirmPassword: {
    color: Color.colorDarkgray_200,
    fontFamily: FontFamily.sansSerifCollection,
    fontSize: FontSize.size_xl,
    textAlign: "left",
    top: 0,
    left: 0,
  },
  confirmPasswordWrapper: {
    top: 185,
    width: 172,
  },
  useAStrong: {
    top: 38,
    left: 52,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.roboto,
    color: Color.colorLightslategray,
  },
  groupInner: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorSpringgreen_100,
    top: 0,
  },
  next: {
    top: 10,
    left: 60,
    fontSize: FontSize.size_5xl,
    color: Color.colorGray_200,
    width: 148,
    height: 50,
  },
  rectangleParent: {
    top: 273,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
  },
  createAPasswordParent: {
    top: 305,
    left: 48,
    height: 321,
    width: 269,
    position: "absolute",
  },
  lineIcon: {
    top: 443,
  },
  createAccount2Child1: {
    top: 537,
  },
  createAccountContainer: {
    backgroundColor: Color.colorSpringgreen_400,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#16181A",
  },
});

export default CreateAccount1;

