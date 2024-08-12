
import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const CreateAccount2 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.createAccount3}>
      <View style={styles.createAccount3Child} />
      <Image
        style={styles.createAccount3Item}
        contentFit="cover"
      />
      <View style={[styles.progressBar, styles.startsy53Layout]}>
        <Image
          style={[styles.progressBarChild, styles.progressChildLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressBarItem, styles.progressChildLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressBarInner, styles.progressChildLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.ellipseIcon, styles.progressChildLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressBarChild1, styles.progressChildLayout]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Text style={[styles.text, styles.textTypo]}>1</Text>
        <Text style={[styles.text1, styles.textTypo]}>2</Text>
        <Text style={[styles.text2, styles.textTypo]}>3</Text>
        <Text style={[styles.text3, styles.textTypo]}>4</Text>
        <View style={[styles.lineView, styles.lineViewBorder]} />
        <LinearGradient
          style={[styles.rectangleLineargradient, styles.lineViewBorder]}
          locations={[0, 1]}
          colors={["rgba(255, 255, 255, 0.6)", "rgba(153, 153, 153, 0.4)"]}
        />
        <Image
          style={[styles.startsy53, styles.noChildPosition]}
          contentFit="cover"
          source={require("../assets/startsy-5-3.png")}
        />
      </View>
      <View style={styles.noParent}>
        <Pressable
          style={[styles.no, styles.noLayout]}
          onPress={() => navigation.navigate("CreateAccount4")}
        >
          <View style={[styles.noChild, styles.noLayout]} />
          <Text style={[styles.yes, styles.yesTypo]}>Yes</Text>
        </Pressable>
        <Pressable
          style={[styles.yes1, styles.noLayout]}
          onPress={() => navigation.navigate("CreateAccount3")}
        >
          <View style={[styles.noChild, styles.noLayout]} />
          <Text style={[styles.yes, styles.yesTypo]}>No</Text>
        </Pressable>
        <Text style={[styles.apartFromYour, styles.yesTypo]}>
          Apart from your primary residence do you own assets worth 2cr. and
          above?
        </Text>
      </View>
      <Pressable
        style={styles.icon}
        onPress={() => navigation.navigate("CreateAccount1")}
      >
        <Image
          style={styles.icon1}
          contentFit="cover"
          source={require("../assets/expand-left.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  startsy53Layout: {
    height: 83,
    position: "absolute",
    
  },
  progressChildLayout: {
    height: 12,
    top: 34,
  },
  textTypo: {
    textAlign: "left",
    color: Color.colorSpringgreen_200,
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_mini,
    top: 48,
    position: "absolute",
  },
  lineViewBorder: {
    borderStyle: "solid",
    position: "absolute",
  },
  noChildPosition: {
    top: 0,
    left: 0,
  },
  noLayout: {
    height: 48,
    width: 189,
    position: "absolute",
    
  },
  yesTypo: {
    textAlign: "center",
    fontFamily: FontFamily.alataRegular,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  createAccount3Child: {
    top: 0,
    backgroundColor: "#000000", // Changed to black
    width: "100%",
    height: 150, // Adjust the height as needed
    position: "absolute",
  },
  createAccount3Item: {
    top: 14,
    left: 287,
    width: 188,
    height: 263,
    position: "absolute",
  },
  progressBarChild: {
    width: 12,
    height: 12,
    top: 34,
    position: "absolute",
    left: 90,
  },
  progressBarItem: {
    left: 145,
    width: 12,
    height: 12,
    top: 34,
    position: "absolute",
  },
  progressBarInner: {
    left: 200,
    width: 12,
    height: 12,
    top: 34,
    position: "absolute",
  },
  ellipseIcon: {
    left: 255,
    width: 12,
    height: 12,
    top: 34,
    position: "absolute",
  },
  progressBarChild1: {
    left: 310,
    width: 12,
    height: 12,
    top: 34,
    position: "absolute",
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
  lineView: {
    top: 40,
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    borderTopWidth: 3,
    width: 222,
    height: 3,
  },
  rectangleLineargradient: {
    borderRadius: Border.br_11xl,
    backgroundColor: "#00DF60",
    borderWidth: 0.2,
    width: 67,
    backgroundColor: "transparent",
    height: 12,
    top: 34,
    left: 90,
    borderStyle: "solid",
  },
  startsy53: {
    width: 83,
    height: 83,
    position: "absolute",
  },
  progressBar: {
    top: 16,
    left: 12,
    width: 322,
  },
  noChild: {
    borderRadius: Border.br_xl,
    backgroundColor: "#00DF60",
    textcolor:"#ffffff",
    top: 0,
    left: 0,
  },
  yes: {
    color:"#24272A",
    textalign: "center",
    justifyContent:"center",
    paddingLeft:70,
    paddingTop:9,
     
    fontfamily: "Alata",
    fontsize:" 24px",
    fontstyle:" normal",
    fontweight:" 400",
    lineheight: "16.427", /* 68.447% */
  },
  no: {
    top: 140,
    shadowOpacity: 1,
    elevation: 4,
    
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0,0, 0.25)",
    left: 39,
    width: 189,
  },
  yes1: {
    top: 218,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 39,
    width: 189,
  },
  apartFromYour: {
    lineHeight: 26,
    color: "#ffffff", // Changed to white
    height: 110,
    width: 266,
    top: 0,
    left: 0,
  },
  noParent: {
    top: 173,
    left: 47,
    height: 266,
    width: 266,
    
    position: "absolute",
  },
  icon1: {
    height: "100%",
    width: "100%",
  },
  icon: {
    left: 9,
    top: 600,
    width: 76,
    height: 76,
    position: "absolute",
  },
  createAccount3: {
    backgroundColor: "#24272A",
    
    flex: 1,
    height: 798,
    overflow: "hidden",
    width: "100%",
  },
});

export default CreateAccount2;

