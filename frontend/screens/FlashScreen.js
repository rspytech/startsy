import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const FlashScreen = () => {
  return (
    <View style={styles.flashScreen1}>
      <View style={styles.startsyWrapper}>
        <Text style={styles.startsy}>startsy</Text>
      </View>
      <View style={styles.startsyWrapper}>
        <Text style={styles.startsy}>startsy</Text>
      </View>
      <Image
        style={styles.flashScreen1Child}
        contentFit="cover"
        source={require("../assets/rectangle-4523.png")}
      />
      <Image
        style={styles.startsy53}
        contentFit="cover"
        source={require("../assets/startsy-5-31.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  startsy: {
    top: 48,
    left: 11,
    fontSize: FontSize.size_45xl,
    lineHeight: 20,
    fontWeight: "700",
    fontFamily: FontFamily.myanmarText,
    color: Color.colorGray_200,
    textAlign: "center",
    position: "absolute",
  },
  startsyWrapper: {
    top: 342,
    left: 69,
    width: 11,
    height: 116,
    position: "absolute",
    overflow: "hidden",
  },
  flashScreen1Child: {
    top: 800,
    left: 0,
    width: 360,
    height: 890,
    position: "absolute",
  },
  startsy53: {
    top: 1150,
    left: 63,
    width: 234,
    height: 234,
    position: "absolute",
  },
  flashScreen1: {
    backgroundColor: Color.colorSpringgreen_400,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default FlashScreen;