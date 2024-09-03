
import * as React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";

const About = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null); // Reference for the ScrollView

  // Function to scroll to the InvestorCard
  const scrollToInvestorCard = () => {
    scrollViewRef.current?.scrollTo({
      y: 845, // Y position of the InvestorCard
      animated: true, // Smooth scroll
    });
  };

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.contentContainer}>
      <View style={styles.about}>
        <View style={[styles.welcomeToStartsy, styles.welcomePosition]}>
          <View style={[styles.welcomeToStartsyChild, styles.welcomePosition]} />
          <Pressable
            style={[styles.iconWrapper, styles.wrapperPosition]}
            onPress={() => navigation.navigate("Login1")} // Example navigation
          >
            <Image
              style={[styles.icon, styles.iconLayout]}
              contentFit="cover"
              source={require("../assets/group-27.png")}
            />
          </Pressable>

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
        <View style={[styles.freelancerCard, styles.freelancerCardLayout]}>
          <LinearGradient
            style={[styles.freelancerCardChild, styles.cardChildBorder]}
            locations={[0, 1]}
            colors={["rgba(36, 39, 42, 0.24)", "rgba(123, 134, 144, 0.18)"]}
          />
          <Text style={[styles.whyChooseTheContainer1, styles.whyContainerLayout2]}>
          <Text style={styles.whyChooseThe}>{`Why Choose the role of\n`}</Text>
          <Text style={styles.investor}>Freelancer</Text>
            <Text style={styles.whyChooseThe}>?</Text>
          </Text>
          <Text style={[styles.chooseTheRole, styles.joinAsATypo]}>
          If you are a freelancer or looking for new opportunities, the role
            of Freelancer is tailored for you. Showcase your skills, connect
            with startups and businesses in need of your expertise, and take on
            exciting projects that align with your professional goals.
          </Text>
        </View>
        <View style={[styles.communitymemeberCard, styles.communitymemeberCardLayout]}>
          <LinearGradient
            style={[styles.communitymemeberCardChild, styles.cardChildBorder]}
            locations={[0, 1]}
            colors={["rgba(36, 39, 42, 0.24)", "rgba(123, 134, 144, 0.18)"]}
          />
          <Text style={[styles.whyChooseTheContainer1, styles.whyContainerLayout2]}>
          <Text style={styles.whyChooseThe}>{`Why Choose the role of\n`}</Text>
          <Text style={styles.investor}>Community member</Text>
            <Text style={styles.whyChooseThe}>?</Text>
          </Text>
          <Text style={[styles.chooseTheRole, styles.joinAsATypo]}>
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
          style={[styles.iconW, styles.WrapperP]}
          onPress={scrollToInvestorCard} // Scroll to InvestorCard when pressed
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require("../assets/icon1.png")}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
 
  youTypo: {
    width: 275,
    textAlign: "left",
    color: Color.colorDarkgray_100,
    fontFamily: FontFamily.montserrat,
    fontSize: FontSize.size_sm,
    lineHeight: 35,
    position: "absolute",
  },
   
  ifYouAre: {
    top: 146,
    left: 22,
  },
  freelancerCard: {
    backgroundColor: "#24272A", // Dark background color for the founder card
    borderRadius: 20,
    padding: 40,
    margin: 10,
  },
  communitymemeberCard: {
    backgroundColor: "#24272A", // Dark background color for the founder card
    borderRadius: 20,
    padding: 40,
    margin: 10,
  },

  freelancerCardLayout:{
    height: 587,
    width: 316,
    position: "absolute",
    top: 2322, // Position it directly below the investor card
    left: 12,
  },
  communitymemeberCardLayout:{
    height: 887,
    width: 316,
    position: "absolute",
    top: 2975, // Position it directly below the investor card
    left: 12,
  },

  founderCardLayout: {
    height: 687,
    width: 316,
    position: "absolute",
    top: 1592, // Position it directly below the investor card
    left: 12,
  },
  founderCard: {
    backgroundColor: "#24272A", // Dark background color for the founder card
    borderRadius: 20,
    padding: 20,
    margin: 10,
    
  },
  
  whyChooseTheContainer1: {
    top: 57,
    textAlign: "center",
    color: Color.colorDarkgray_100,
    height: 76,
    width: 292,
    left: 20,
    fontFamily: FontFamily.alata,
    lineHeight: 35,
    position: "absolute",
  },

  founder: {
    textAlign: "center",
    color: "#00FF7F", // The green color for "Founder"
    fontFamily: FontFamily.alata,
    fontSize: FontSize.size_xl * 1.5,
  },
  whetherYouAre: {
    top: 144,
    left: 20,
    width: 275,
    color: "#FFFFFF",
    textAlign: "left",
    fontSize: FontSize.size_xl*1.2
  },
  contentContainer: {
    flexGrow: 1,
  },
  icon: {
    height: 29,
    width: 29,
    resizeMode: "contain",
  },
  iconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  iconWrapper: {
    position: "absolute",
    top: 20,
    left: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconW: {
    position: "absolute",
    top: 20,
    left: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  WrapperP: {
    height: "4.06%",
    width: "9.03%",
    bottom: "809.31%",
    right: "85.42%",
    top: "11.63%",
    left: "46.56%",
    position: "absolute",
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
    color: "#909090",
    fontFamily: FontFamily.montserrat,
    fontSize: FontSize.size_xl,
    lineHeight: 35,
    position: "absolute",
  },
  youTypo:{
    textAlign: "left",
    color: "#909090",
    fontFamily: FontFamily.montserrat,
    fontSize: FontSize.size_xl,
    lineHeight: 35,
    position: "absolute",
  },
  welcomeToStartsyChild: {
    height: 794,
    backgroundColor: Color.colorGray_300,
    width: 360,
    left: 0,
    top: 0,
  },
  welcomeToStartsy1: {
    top: 250,
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
    height: 794,
    width: 360,
    left: 0,
    top: 0,
    position: "absolute",
  },
  
  whyChooseThe: {
    fontSize: FontSize.size_2xl,
    textAlign: "center",
    color: "#ffffff",
    fontSize: FontSize.size_xl * 1.2,
  },
  investor: {
    textAlign: "center",
    color: "#00FF7F",
    fontFamily: FontFamily.alata,
    fontSize: FontSize.size_xl * 1.5,
  },
  whyChooseTheContainer: {
    top: 57,
    textAlign: "center",
    color: Color.colorDarkgray_100,
    height: 76,
    width: 292,
    left: 20,
    fontFamily: FontFamily.alata,
    lineHeight: 35,
    position: "absolute",
  },
  chooseTheRole: {
    top: 134,
    left: 20,
    width: 275,
    color: "#FFFFFF",
  },
  investorCard: {
    top: 845, // Y position for InvestorCard (adjust according to your layout)
    left: 12,
    backgroundColor: "#24272A", // Dark background color for the investor card
    borderRadius: 20,
    padding: 20,
    margin: 10,
  },
  about: {
    height: 4454,
    backgroundColor: "#000000", // Set the background color to black
    overflow: "hidden",
    width: "100%",
    flex: 1,
  },
});

export default About;

