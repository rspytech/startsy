
//profile file
/*import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text,Pressable,Image } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const CreateAccount4 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.createAccount4}>
      <View style={styles.createAccount4Child} />
      <Pressable
        style={styles.icon}
        onPress={() => navigation.navigate("CreateAccount3")}//"CreateAccount3
      >
        <Image
          style={styles.icon1}
          contentFit="cover"
          source={require("../assets/icon.png")}
        />
      </Pressable>
      <View style={styles.uploadPfp}>
        <Image
          style={styles.userLightIcon}
          contentFit="cover"
          //source={require("../assets/user-light.png")}
        />
        <Text style={[styles.uploadAProfile, styles.fullNameFlexBox]}>
          Upload a profile picture
        </Text>
      </View>
      <View style={[styles.name, styles.ageLayout]}>
        <Text style={[styles.fullName, styles.fullNameFlexBox]}>Full name</Text>
        <View style={[styles.nameChild, styles.childLayout]} />
      </View>
      <View style={[styles.emailAddress, styles.ageLayout]}>
        <Text style={[styles.fullName, styles.fullNameFlexBox]}>
          Email address
        </Text>
        <View style={[styles.nameChild, styles.childLayout]} />
      </View>
      <View style={[styles.phoneNo, styles.ageLayout]}>
        <Text style={[styles.fullName, styles.fullNameFlexBox]}>
          Phone number
        </Text>
        <View style={[styles.nameChild, styles.childLayout]} />
      </View>
      <Pressable
        style={[styles.country, styles.ageLayout]}
        onPress={() => navigation.navigate("CreateAccount5")}//2
      >
        <Text style={[styles.fullName, styles.fullNameFlexBox]}>Country</Text>
        <View style={[styles.nameChild, styles.childLayout]} />
      </Pressable>
      <View style={[styles.age, styles.ageLayout]}>
        <Text style={[styles.fullName, styles.fullNameFlexBox]}>
          Age (Years)
        </Text>
        <View style={[styles.ageChild, styles.childLayout]} />
      </View>
      <View style={[styles.gender, styles.ageLayout]}>
        <Text style={[styles.fullName, styles.fullNameFlexBox]}>Gender</Text>
        <View style={[styles.ageChild, styles.childLayout]} />
      </View>
      <View style={[styles.progress, styles.progressLayout]}>
        <View style={[styles.progressChild, styles.childLayout]} />
        <Image
          style={[styles.progressItem, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressInner, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.ellipseIcon, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressChild1, styles.progressChildPosition]}
          contentFit="cover"
          source={require("../assets/ellipse-52.png")}
        />
        <Image
          style={[styles.progressChild2, styles.progressChildPosition]}
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
          style={[styles.startsy53, styles.progressLayout]}
          contentFit="cover"
          source={require("../assets/startsy-5-3.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullNameFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
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
  progressLayout: {
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
  createAccount4Child: {
    top: 118,
    borderTopLeftRadius: Border.br_41xl,
    backgroundColor: "#24272A",
    width: 360,
    height: 700,
    left: 0,
    position: "absolute",
  },
  icon1: {
    height: "100%",
    width: "100%",
  },
  icon: {
    left: 275,
    top: 709,
    width: 76,
    height: 76,
    position: "absolute",
  },
  userLightIcon: {
    left: 22,
    width: 101,
    height: 101,
    top: 0,
    position: "absolute",
  },
  uploadAProfile: {
    top: 102,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorLightslategray,
    height: 50,
    width: 144,
    left: 30,
  },
  uploadPfp: {
    top: 167,
    left: 108,
    height: 118,
    width: 144,
    position: "absolute",
  },
  fullName: {
    left: 8,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.sansSerifCollection,
    color: Color.colorSilver_200,
    top: 0,
  },
  nameChild: {
    top: 42,
    width: 287,
    borderColor: Color.colorGray_200,
    left: -1,
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
  },
  name: {
    top: 304,
    left: 38,
    width: 284,
  },
  emailAddress: {
    top: 372,
    left: 39,
  },
  phoneNo: {
    top: 508,
    left: 38,
    width: 284,
  },
  country: {
    top: 440,
    left: 38,
    width: 284,
  },
  ageChild: {
    top: 47,
    width: 287,
    borderColor: Color.colorGray_200,
    left: -1,
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
  },
  age: {
    top: 576,
    left: 38,
    width: 284,
  },
  gender: {
    top: 644,
    left: 38,
    width: 284,
  },
  progressChild: {
    top: 40,
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    width: 222,
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
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
    left: 200,
    width: 12,
    height: 12,
    top: 34,
  },
  progressChild1: {
    left: 255,
    width: 12,
    height: 12,
    top: 34,
  },
  progressChild2: {
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
  progress: {
    top: 16,
    left: 12,
    width: 322,
  },
  createAccount4: {
    backgroundColor: "#16181A",
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default CreateAccount4;*/
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, Pressable, Image, ScrollView } from "react-native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";

const CreateAccount4 = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.createAccount4}>
        <View style={styles.createAccount4Child} />
        <Pressable
          style={styles.icon}
          onPress={() => navigation.navigate("CreateAccount3")}
        >
          <Image
            style={styles.icon1}
            contentFit="cover"
            source={require("../assets/icon.png")}
          />
        </Pressable>
        <View style={styles.uploadPfp}>
          <Image
            style={styles.userLightIcon}
            contentFit="cover"
          />
          <Text style={[styles.uploadAProfile, styles.fullNameFlexBox]}>
            Upload a profile picture
          </Text>
        </View>
        <View style={[styles.name, styles.ageLayout]}>
          <Text style={[styles.fullName, styles.fullNameFlexBox]}>Full name</Text>
          <View style={[styles.nameChild, styles.childLayout]} />
        </View>
        <View style={[styles.emailAddress, styles.ageLayout]}>
          <Text style={[styles.fullName, styles.fullNameFlexBox]}>
            Email address
          </Text>
          <View style={[styles.nameChild, styles.childLayout]} />
        </View>
        <View style={[styles.phoneNo, styles.ageLayout]}>
          <Text style={[styles.fullName, styles.fullNameFlexBox]}>
            Phone number
          </Text>
          <View style={[styles.nameChild, styles.childLayout]} />
        </View>
        <Pressable
          style={[styles.country, styles.ageLayout]}
          onPress={() => navigation.navigate("CreateAccount5")}
        >
          <Text style={[styles.fullName, styles.fullNameFlexBox]}>Country</Text>
          <View style={[styles.nameChild, styles.childLayout]} />
        </Pressable>
        <View style={[styles.age, styles.ageLayout]}>
          <Text style={[styles.fullName, styles.fullNameFlexBox]}>
            Age (Years)
          </Text>
          <View style={[styles.ageChild, styles.childLayout]} />
        </View>
        <View style={[styles.gender, styles.ageLayout]}>
          <Text style={[styles.fullName, styles.fullNameFlexBox]}>Gender</Text>
          <View style={[styles.ageChild, styles.childLayout]} />
        </View>
        <View style={[styles.progress, styles.progressLayout]}>
          <View style={[styles.progressChild, styles.childLayout]} />
          <Image
            style={[styles.progressItem, styles.progressChildPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={[styles.progressInner, styles.progressChildPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={[styles.ellipseIcon, styles.progressChildPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={[styles.progressChild1, styles.progressChildPosition]}
            contentFit="cover"
            source={require("../assets/ellipse-52.png")}
          />
          <Image
            style={[styles.progressChild2, styles.progressChildPosition]}
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
            style={[styles.startsy53, styles.progressLayout]}
            contentFit="cover"
            source={require("../assets/startsy-5-3.png")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  fullNameFlexBox: {
    textAlign: "left",
    position: "absolute",
  },
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
  progressLayout: {
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
  createAccount4Child: {
    top: 118,
    borderTopLeftRadius: Border.br_41xl,
    backgroundColor: "#24272A",
    width: 360,
    height: 700,
    left: 0,
    position: "absolute",
  },
  icon1: {
    height: "100%",
    width: "100%",
  },
  icon: {
    left: 275,
    top: 709,
    width: 76,
    height: 76,
    position: "absolute",
  },
  userLightIcon: {
    left: 22,
    width: 101,
    height: 101,
    top: 0,
    position: "absolute",
  },
  uploadAProfile: {
    top: 102,
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.robotoRegular,
    color: Color.colorLightslategray,
    height: 50,
    width: 144,
    left: 30,
  },
  uploadPfp: {
    top: 167,
    left: 108,
    height: 118,
    width: 144,
    position: "absolute",
  },
  fullName: {
    left: 8,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.sansSerifCollection,
    color: Color.colorSilver_200,
    top: 0,
  },
  nameChild: {
    top: 42,
    width: 287,
    borderColor: Color.colorGray_200,
    left: -1,
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
  },
  name: {
    top: 304,
    left: 38,
    width: 284,
  },
  emailAddress: {
    top: 372,
    left: 39,
  },
  phoneNo: {
    top: 508,
    left: 38,
    width: 284,
  },
  country: {
    top: 440,
    left: 38,
    width: 284,
  },
  ageChild: {
    top: 47,
    width: 287,
    borderColor: Color.colorGray_200,
    left: -1,
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
  },
  age: {
    top: 576,
    left: 38,
    width: 284,
  },
  gender: {
    top: 644,
    left: 38,
    width: 284,
  },
  progressChild: {
    top: 40,
    left: 95,
    borderColor: Color.colorSpringgreen_200,
    width: 222,
    height: 3,
    borderTopWidth: 3,
    borderStyle: "solid",
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
    left: 200,
    width: 12,
    height: 12,
    top: 34,
  },
  progressChild1: {
    left: 255,
    width: 12,
    height: 12,
    top: 34,
  },
  progressChild2: {
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
    borderStyle: "solid",
    left: 60,
  },
  text: {
    left: 87,
  },
  text1: {
    left: 143,
  },
  text2: {
    left: 198,
  },
  text3: {
    left: 252,
  },
  startsy53: {
    left: 25,
    width: 325,
    top: 0,
  },
  progress: {
    top: 749,
    left: 11,
    width: 347,
  },
  createAccount4: {
    height: 844,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorSpringgreen_100,
  },
});

export default CreateAccount4;

