import * as React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const About = () => {
  const navigation = useNavigation();

  return (
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
          <Text style={styles.whyChooseThe}>{`Why Choose the role of
`}</Text>
          <Text style={styles.investor}>Investor</Text>
          <Text style={styles.whyChooseThe}>?</Text>
        </Text>
        <Text style={[styles.chooseTheRole, styles.joinAsATypo]}>
          Choose the role of Investor if you are a professional investor, such
          as a venture capitalist or an angel investor, looking to explore and
          invest in promising startups. Even if you have no prior experience in
          investing but have the interest and resources to support innovative
          ventures, this role is perfect for you! Connect with visionary
          founders and be part of their success stories.
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
          <Text style={styles.whyChooseThe}>{`Why Choose the role of
`}</Text>
          <Text style={styles.investor}>Founder</Text>
          <Text style={styles.whyChooseThe}>?</Text>
        </Text>
        <Text style={[styles.whetherYouAre, styles.youTypo]}>
          Whether you are an established founder, a company owner, or someone
          with a groundbreaking idea seeking resources to bring it to life, the
          role of Founder is for you! Join a community of like-minded
          entrepreneurs, gain access to investors, and find the support you need
          to turn your vision into reality.
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
          <Text style={styles.whyChooseThe}>{`Why Choose the role of
`}</Text>
          <Text style={styles.investor}>Freelancer</Text>
          <Text style={styles.whyChooseThe}>?</Text>
        </Text>
        <Text style={[styles.ifYouAre, styles.youTypo]}>
          If you are a freelancer or looking for new opportunities, the role of
          Freelancer is tailored for you. Showcase your skills, connect with
          startups and businesses in need of your expertise, and take on
          exciting projects that align with your professional goals.
        </Text>
      </View>
      <View style={[styles.communityMemberCard, styles.communityCardLayout]}>
        <LinearGradient
          style={[styles.communityMemberCardChild, styles.communityCardLayout]}
          locations={[0, 1]}
          colors={["rgba(36, 39, 42, 0.24)", "rgba(123, 134, 144, 0.18)"]}
        />
        <Text
          style={[styles.whyChooseTheContainer3, styles.whyContainerPosition]}
        >
          <Text style={styles.whyChooseThe}>{`Why Choose the role of
`}</Text>
          <Text style={styles.investor}>Community member</Text>
          <Text style={styles.whyChooseThe}>?</Text>
        </Text>
        <Text style={[styles.joinAsA, styles.joinAsATypo]}>
          Join as a Community Member to immerse yourself in the vibrant startup
          ecosystem! Whether you are a student, an aspiring entrepreneur, a
          mentor, or an industry professional, this role allows you to stay
          informed, network with key players, and contribute to the community.
          Engage in discussions, attend events, and be part of the innovation
          wave shaping the future. This is your gateway to learning, networking,
          and making a difference in the startup world.
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
  );
};

const styles = StyleSheet.create({
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
    top: 80,
    left: 59,
    width: 247,
    height: 247,
    position: "absolute",
  },
  welcomeToStartsy: {
    height: 842,
  },
  investorCardChild: {
    height: 687,
    width: 316,
    position: "absolute",
  },
  whyChooseThe: {
    fontSize: FontSize.size_5xl,
    color: Color.colorWhite,
  },
  investor: {
    fontSize: FontSize.size_17xl,
    color: Color.colorSpringgreen_300,
  },
  whyChooseTheContainer: {
    top: 28,
  },
  chooseTheRole: {
    top: 104,
    width: 274,
    height: 472,
    left: 21,
  },
  investorCard: {
    top: 812,
    left: 24,
  },
  founderCardChild: {
    height: 586,
    width: 316,
    position: "absolute",
  },
  whyChooseTheContainer1: {
    top: 32,
  },
  whetherYouAre: {
    top: 109,
    left: 25,
    height: 541,
  },
  founderCard: {
    top: 1558,
    height: 650,
    left: 24,
  },
  freelancerCardChild: {
    height: 534,
    width: 316,
    position: "absolute",
  },
  whyChooseTheContainer2: {
    left: 4,
    lineHeight: 37,
  },
  ifYouAre: {
    top: 118,
    height: 430,
    left: 21,
  },
  freelancerCard: {
    top: 2208,
    height: 548,
    left: 24,
  },
  communityMemberCardChild: {
    backgroundColor: Color.previewthemeforestnetLinearGrayChateauBlueRibbon,
    borderWidth: 1,
    borderColor: Color.colorGray_200,
    borderStyle: "solid",
    borderRadius: Border.br_21xl,
    left: 0,
    top: 0,
  },
  whyChooseTheContainer3: {
    lineHeight: 38,
    left: 12,
    top: 29,
  },
  joinAsA: {
    top: 143,
    left: 17,
    width: 284,
    height: 488,
  },
  communityMemberCard: {
    top: 2806,
    left: 24,
  },
  signIn: {
    left: 301,
    top: 3687,
    width: 43,
    height: 43,
    position: "absolute",
  },
  icon1: {
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
  },
  wrapper: {
    left: "5.56%",
    top: "0.56%",
    right: "85.42%",
    bottom: "98.57%",
    width: "9.03%",
    height: "0.87%",
    position: "absolute",
  },
  about: {
    flex: 1,
    height: 3750,
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.colorGray_300,
  },
});

export default About;
