/*import * as React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const About = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.about}>
        <View style={[styles.welcomeToStartsy, styles.welcomePosition]}>
          <View style={[styles.welcomeToStartsyChild, styles.welcomePosition]} />
          <Text style={styles.welcomeToStartsy1}>
            Welcome to Startsy, your gateway to the dynamic world of startups,
            where founders, investors, freelancers, and community members come
            together to innovate and collaborate. Whether you’re here to launch
            your idea, invest in groundbreaking ventures, find freelance
            opportunities, or immerse yourself in the startup ecosystem, Startsy
            has the perfect role for you.
          </Text>
          <Image
            style={styles.startsy53}
            contentFit="cover"
            source={require("../assets/startsy-5-33.png")}
          />
        </View>
        <View style={[styles.investorCard, styles.investorCardLayout]}>
          <LinearGradient
            style={[styles.investorCardChild, styles.cardChildBorder]}
            locations={[0, 1]}
            colors={["rgba(36, 39, 42, 0.24)", "rgba(123, 134, 144, 0.18)"]}
          />
          <Text style={[styles.whyChooseTheContainer, styles.whyContainerLayout]}>
            <Text style={styles.whyChooseThe}>{`Why Choose the role of\n`}</Text>
            <Text style={styles.investor}>Investor</Text>
            <Text style={styles.whyChooseThe}>?</Text>
          </Text>
          <Text style={[styles.chooseTheRole, styles.joinAsATypo]}>
            Choose the role of Investor if you are a professional investor, such
            as a venture capitalist or an angel investor, looking to explore and
            invest in promising startups. Even if you have no prior experience
            in investing but have the interest and resources to support
            innovative ventures, this role is perfect for you! Connect with
            visionary founders and be part of their success stories.
          </Text>
        </View>
        <View style={[styles.founderCard, styles.founderCardLayout]}>
          <LinearGradient
            style={[styles.founderCardChild, styles.cardChildBorder]}
            locations={[0, 1]}
            colors={["rgba(36, 39, 42, 0.24)", "rgba(123, 134, 144, 0.18)"]}
          />
          <Text
            style={[styles.whyChooseTheContainer1, styles.whyContainerLayout]}
          >
            <Text style={styles.whyChooseThe}>{`Why Choose the role of\n`}</Text>
            <Text style={styles.investor}>Founder</Text>
            <Text style={styles.whyChooseThe}>?</Text>
          </Text>
          <Text style={[styles.whetherYouAre, styles.youTypo]}>
            Whether you are an established founder, a company owner, or someone
            with a groundbreaking idea seeking resources to bring it to life,
            the role of Founder is for you! Join a community of like-minded
            entrepreneurs, gain access to investors, and find the support you
            need to turn your vision into reality.
          </Text>
        </View>
        <View style={[styles.freelancerCard, styles.founderCardLayout]}>
          <LinearGradient
            style={[styles.freelancerCardChild, styles.cardChildBorder]}
            locations={[0, 1]}
            colors={["rgba(36, 39, 42, 0.24)", "rgba(123, 134, 144, 0.18)"]}
          />
          <Text
            style={[styles.whyChooseTheContainer2, styles.whyContainerPosition]}
          >
            <Text style={styles.whyChooseThe}>{`Why Choose the role of\n`}</Text>
            <Text style={styles.investor}>Freelancer</Text>
            <Text style={styles.whyChooseThe}>?</Text>
          </Text>
          <Text style={[styles.ifYouAre, styles.youTypo]}>
            If you are a freelancer or looking for new opportunities, the role
            of Freelancer is tailored for you. Showcase your skills, connect
            with startups and businesses in need of your expertise, and take on
            exciting projects that align with your professional goals.
          </Text>
        </View>
        <View style={[styles.communityMemberCard, styles.communityCardLayout]}>
          <LinearGradient
            style={[
              styles.communityMemberCardChild,
              styles.communityCardLayout,
            ]}
            locations={[0, 1]}
            colors={["rgba(36, 39, 42, 0.24)", "rgba(123, 134, 144, 0.18)"]}
          />
          <Text
            style={[styles.whyChooseTheContainer3, styles.whyContainerPosition]}
          >
            <Text style={styles.whyChooseThe}>{`Why Choose the role of\n`}</Text>
            <Text style={styles.investor}>Community member</Text>
            <Text style={styles.whyChooseThe}>?</Text>
          </Text>
          <Text style={[styles.joinAsA, styles.joinAsATypo]}>
            Join as a Community Member to immerse yourself in the vibrant
            startup ecosystem! Whether you are a student, an aspiring
            entrepreneur, a mentor, or an industry professional, this role
            allows you to stay informed, network with key players, and
            contribute to the community. Engage in discussions, attend events,
            and be part of the innovation wave shaping the future. This is your
            gateway to learning, networking, and making a difference in the
            startup world.
          </Text>
        </View>
        <Pressable
          style={styles.signIn}
          onPress={() => navigation.navigate("Login1")}
        >
          <Image
            style={styles.iconLayout}
            contentFit="cover"
            source={require("../assets/sign-in.png")}
          />
        </Pressable>
        <Pressable
          style={styles.wrapper}
          onPress={() => navigation.navigate("Login1")}
        >
          <Image
            style={[styles.icon1, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/group-27.png")}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  welcomePosition: {
    width: 360,
    left: 0,
    top: 0,
    position: "absolute",
  },
  investorCardLayout: {
    height: 687,
    width: 316,
    position: "absolute",
  },
  cardChildBorder: {
    backgroundColor: Color.previewthemeforestnetLinearGrayChateauBlueRibbon,
    borderWidth: 1,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    borderRadius: Border.br_21xl,
    left: 0,
    top: 0,
  },
  whyContainerLayout: {
    height: 76,
    width: 292,
    left: 12,
    textAlign: "center",
    fontFamily: FontFamily.alata,
    lineHeight: 35,
    position: "absolute",
  },
  joinAsATypo: {
    textAlign: "left",
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.montserrat,
    fontSize: FontSize.size_xl,
    lineHeight: 35,
    position: "absolute",
  },
  founderCardLayout: {
    width: 316,
    position: "absolute",
  },
  youTypo: {
    width: 275,
    textAlign: "left",
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.montserrat,
    fontSize: FontSize.size_xl,
    lineHeight: 35,
    position: "absolute",
  },
  whyContainerPosition: {
    top: 29,
    height: 76,
    width: 292,
    textAlign: "center",
    fontFamily: FontFamily.alata,
    position: "absolute",
  },
  communityCardLayout: {
    height: 871,
    width: 316,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  welcomeToStartsyChild: {
    height: 794,
    backgroundColor: Color.colorGray_300,
    width: 360,
    left: 0,
    top: 0,
  },
  welcomeToStartsy1: {
    top: 373,
    left: 30,
    fontSize: FontSize.size_mini,
    color: "#7a7b7c",
    width: 300,
    height: 469,
    textAlign: "center",
    fontFamily: FontFamily.alata,
    lineHeight: 35,
    position: "absolute",
  },
  startsy53: {
    top: 60,
    width: 180,
    height: 178,
    left: 92,
    position: "absolute",
  },
  welcomeToStartsy: {
    height: 845,
    width: 360,
    left: 0,
    top: 0,
    position: "absolute",
  },
  investorCardChild: {
    width: 316,
    height: 687,
    position: "absolute",
  },
  whyChooseThe: {
    fontSize: FontSize.size_2xl,
    textAlign: "center",
    color: Color.colorDarkgray_100,
  },
  investor: {
    fontSize: FontSize.size_7xl,
    textAlign: "center",
    color: Color.colorDarkgray_100,
  },
  whyChooseTheContainer: {
    top: 57,
    textAlign: "center",
    color: Color.colorDarkgray_100,
    height: 76,
    width: 292,
    left: 12,
    fontFamily: FontFamily.alata,
    lineHeight: 35,
    position: "absolute",
  },
  chooseTheRole: {
    top: 134,
    left: 20,
    width: 275,
  },
  investorCard: {
    top: 845,
    left: 22,
  },
  founderCardChild: {
    height: 710,
    borderWidth: 1,
    borderColor: "#878787",
    borderStyle: "solid",
    borderRadius: Border.br_21xl,
    backgroundColor: "rgba(36, 39, 42, 0.24)",
    width: 316,
    left: 0,
    top: 0,
  },
  whyChooseTheContainer1: {
    top: 52,
    height: 76,
    width: 292,
    left: 12,
    textAlign: "center",
    fontFamily: FontFamily.alata,
    lineHeight: 35,
    position: "absolute",
  },
  whetherYouAre: {
    top: 142,
    left: 20,
  },
  founderCard: {
    top: 1590,
    height: 710,
    left: 22,
  },
  freelancerCardChild: {
    height: 709,
    borderWidth: 1,
    borderColor: "#878787",
    borderStyle: "solid",
    borderRadius: Border.br_21xl,
    backgroundColor: "rgba(36, 39, 42, 0.24)",
    width: 316,
    left: 0,
    top: 0,
  },
  whyChooseTheContainer2: {
    height: 76,
    width: 292,
    left: 12,
    textAlign: "center",
    fontFamily: FontFamily.alata,
    lineHeight: 35,
  },
  ifYouAre: {
    top: 146,
    left: 22,
  },
  freelancerCard: {
    top: 2372,
    height: 709,
    left: 22,
  },
  communityMemberCardChild: {
    borderWidth: 1,
    borderColor: "#878787",
    borderStyle: "solid",
    borderRadius: Border.br_21xl,
    backgroundColor: "rgba(36, 39, 42, 0.24)",
    left: 0,
    top: 0,
  },
  whyChooseTheContainer3: {
    height: 76,
    width: 292,
    left: 12,
    textAlign: "center",
    fontFamily: FontFamily.alata,
    lineHeight: 35,
    top: 29,
  },
  joinAsA: {
    top: 125,
    left: 21,
    width: 275,
  },
  communityMemberCard: {
    top: 3080,
    left: 22,
  },
  signIn: {
    left: 94,
    top: 3990,
    width: 175,
    height: 66,
    position: "absolute",
  },
  icon1: {
    borderRadius: Border.br_mini,
  },
  wrapper: {
    top: 4101,
    left: 65,
    width: 250,
    height: 63,
    position: "absolute",
  },
  about: {
    height: 4454,
    backgroundColor: Color.colorWhite,
    overflow: "hidden",
    width: "100%",
  },
});

export default About;
import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "@rneui/themed";
import { Color, FontSize, Border, FontFamily, Padding } from "../GlobalStyles";

const FlashScreen2 = () => {
  return (
    <View style={styles.flashScreen3}>
      <View style={[styles.vectorParent, styles.childLayout]}>
        <Image
          style={[styles.groupChild, styles.childLayout]}
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
        style={[styles.flashScreen3Child, styles.childLayout]}
        contentFit="cover"
        source={require("../assets/rectangle-4523.png")}
      />
      <Image
        style={[styles.startsy531, styles.startsyLayout]}
        contentFit="cover"
        source={require("../assets/startsy-5-31.png")}
      />
      <View style={styles.rectangleParent}>
        <View style={[styles.componentChild, styles.groupPosition]} />
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
  childLayout: {
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
  flashScreen3Child: {
    top: -71,
  },
  startsy531: {
    top: 279,
  },
  componentChild: {
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
    backgroundColor: Color.colorGray_200,
    bottom: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
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
  flashScreen3: {
    backgroundColor: Color.colorSpringgreen_400,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default FlashScreen2;
import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

const FlashScreen2 = () => {
  return (
    <View style={styles.flashScreen3}>
      <View style={[styles.vectorParent, styles.groupLayout]}>
        <Image
          style={[styles.groupChild, styles.groupLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-4523.png")}
        />
        <Image
          style={styles.startsy53}
          contentFit="cover"
          source={require("../assets/startsy-5-3.png")}
        />
      </View>
      <View style={[styles.vectorGroup, styles.groupLayout]}>
        <Image
          style={[styles.groupChild, styles.groupLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-4523.png")}
        />
        <Image
          style={styles.startsy53}
          contentFit="cover"
          source={require("../assets/startsy-5-3.png")}
        />
      </View>
      <View style={[styles.rectangleParent, styles.groupInnerLayout]}>
        <View style={[styles.groupInner, styles.groupInnerLayout]} />
        <View style={styles.inputParent}>
          <View style={[styles.input, styles.inputLayout]} />
          <Text style={[styles.rajaschaudhari9gmailcom, styles.emailTypo]}>
            rajaschaudhari9@gmail.com
          </Text>
          <Text style={[styles.email, styles.emailTypo]}>Email</Text>
          <View style={[styles.input1, styles.inputLayout]} />
          <Text style={[styles.password, styles.forgotPosition]}>Password</Text>
          <Text style={[styles.forgot, styles.forgotTypo]}>Forgot?</Text>
          <Text
            style={[styles.dontHaveAccountContainer, styles.createNowPosition]}
          >
            <Text style={styles.dontHaveAccount}>Don’t have account?</Text>
            <Text style={styles.text}>{` `}</Text>
          </Text>
          <Text style={[styles.createNow, styles.createNowPosition]}>
            Create now
          </Text>
          <Text style={[styles.orContinueWith, styles.emailTypo]}>
            Or continue with
          </Text>
          <View style={[styles.googleAuth, styles.authBorder]}>
            <View style={styles.flatColorIconsgoogleParent}>
              <Image
                style={styles.flatColorIconsgoogle}
                contentFit="cover"
                source={require("../assets/flatcoloriconsgoogle.png")}
              />
              <Text style={[styles.google, styles.googlePosition]}>Google</Text>
            </View>
          </View>
          <View style={[styles.facebookAuth, styles.authBorder]}>
            <View style={styles.frameParent}>
              <Image
                style={styles.flatColorIconsgoogle}
                contentFit="cover"
                source={require("../assets/frame.png")}
              />
              <Text style={[styles.facebook, styles.googlePosition]}>
                Facebook
              </Text>
            </View>
          </View>
          <View style={[styles.rectangleGroup, styles.rectangleLayout]}>
            <View style={[styles.rectangleView, styles.rectangleLayout]} />
            <Text style={styles.login}>Login</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupLayout: {
    height: 890,
    width: 360,
    left: 0,
    position: "absolute",
  },
  groupInnerLayout: {
    height: 458,
    width: 360,
    left: 0,
    position: "absolute",
  },
  inputLayout: {
    height: 1,
    width: 299,
    borderTopWidth: 1,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    left: 4,
    position: "absolute",
  },
  emailTypo: {
    textAlign: "left",
    lineHeight: 20,
    fontFamily: FontFamily.robotoRegular,
    position: "absolute",
  },
  forgotPosition: {
    top: 82,
    textAlign: "left",
    lineHeight: 20,
    fontSize: FontSize.size_sm,
    position: "absolute",
  },
  forgotTypo: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
  },
  createNowPosition: {
    top: 324,
    textAlign: "left",
    fontSize: FontSize.size_sm,
    position: "absolute",
  },
  authBorder: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_17xl,
    justifyContent: "space-between",
    flexDirection: "row",
    width: 142,
    borderWidth: 1,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_3xs,
    top: 254,
    borderColor: Color.colorWhite,
    borderStyle: "solid",
    position: "absolute",
  },
  googlePosition: {
    left: 24,
    color: Color.colorLightslategray,
    textAlign: "left",
    lineHeight: 20,
    fontSize: FontSize.size_sm,
    top: 0,
    position: "absolute",
  },
  rectangleLayout: {
    height: 48,
    width: 307,
    left: 0,
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
  },
  vectorGroup: {
    top: -71,
  },
  groupInner: {
    borderTopLeftRadius: Border.br_41xl,
    backgroundColor: Color.colorGray_200,
    top: 0,
  },
  input: {
    top: 50,
  },
  rajaschaudhari9gmailcom: {
    top: 20,
    color: Color.colorGray_100,
    left: 4,
    fontSize: FontSize.size_sm,
    lineHeight: 20,
  },
  email: {
    fontSize: FontSize.size_xs,
    color: Color.colorWhite,
    left: 4,
    top: 0,
  },
  input1: {
    top: 112,
  },
  password: {
    color: Color.colorGray_100,
    left: 4,
    fontFamily: FontFamily.robotoRegular,
  },
  forgot: {
    left: 254,
    top: 82,
    textAlign: "left",
    lineHeight: 20,
    fontSize: FontSize.size_sm,
    position: "absolute",
    color: Color.colorWhite,
  },
  dontHaveAccount: {
    color: Color.colorSilver,
  },
  text: {
    color: Color.colorLightslategray,
  },
  dontHaveAccountContainer: {
    left: 53,
    fontFamily: FontFamily.robotoRegular,
  },
  createNow: {
    left: 181,
    color: Color.colorSpringgreen_100,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
  },
  orContinueWith: {
    top: 218,
    left: 102,
    color: Color.colorSilver,
    fontSize: FontSize.size_sm,
    lineHeight: 20,
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
    fontWeight: "600",
    fontFamily: FontFamily.robotoBold,
  },
  flatColorIconsgoogleParent: {
    width: 69,
    height: 20,
  },
  googleAuth: {
    left: 4,
  },
  facebook: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
  },
  frameParent: {
    width: 85,
    height: 20,
  },
  facebookAuth: {
    left: 161,
  },
  rectangleView: {
    borderRadius: Border.br_mid_6,
    backgroundColor: Color.colorGray_300,
    top: 0,
  },
  login: {
    top: 16,
    left: 131,
    fontSize: FontSize.size_lg_8,
    lineHeight: 16,
    fontFamily: FontFamily.alataRegular,
    textAlign: "center",
    color: Color.colorWhite,
    position: "absolute",
  },
  rectangleGroup: {
    top: 144,
  },
  inputParent: {
    top: 58,
    left: 27,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    height: 340,
    width: 307,
    position: "absolute",
  },
  rectangleParent: {
    top: 741,
  },
  flashScreen3: {
    backgroundColor: Color.colorSpringgreen_300,
    flex: 1,
    width: "100%",
    height: 800,
    overflow: "hidden",
  },
});

export default FlashScreen2;*/
import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Text } from "react-native";
import { Input } from "@rneui/themed";
import { Color, FontSize, Border, FontFamily, Padding } from "../GlobalStyles";

const FlashScreen2 = () => {
  return (
    <View style={styles.flashScreen3}>
      <View style={[styles.vectorParent, styles.childLayout]}>
        <Image
          style={[styles.groupChild, styles.childLayout]}
          contentFit="cover"
          source={require("../assets/rectangle-4523.png")}
        />
        <Image
          style={[styles.startsy53, styles.startsyLayout]}
          contentFit="cover"
          source={require("../assets/startsy-5-32.png")}
        />
      </View>
      <Image
        style={[styles.flashScreen3Child, styles.childLayout]}
        contentFit="cover"
        source={require("../assets/rectangle-4523.png")}
      />
      <Image
        style={[styles.startsy531, styles.startsyLayout]}
        contentFit="cover"
        source={require("../assets/startsy-5-32.png")}
      />
      <View style={styles.rectangleParent}>
        <View style={[styles.componentChild, styles.groupPosition]} />
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
  childLayout: {
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
  flashScreen3Child: {
    top: -71,
  },
  startsy531: {
    top: 279,
  },
  componentChild: {
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
    backgroundColor: Color.colorGray_200,
    bottom: "0%",
    height: "100%",
    left: "0%",
    right: "0%",
    top: "0%",
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
  flashScreen3: {
    backgroundColor: Color.colorSpringgreen_300,
    flex: 1,
    height: 800,
    overflow: "hidden",
    width: "100%",
  },
});

export default FlashScreen2;
