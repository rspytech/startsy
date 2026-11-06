import React, { useState, useRef, useEffect } from "react";
import { Text, View, Dimensions, StatusBar, Pressable, Image, SafeAreaView, BackHandler, ScrollView, Animated } from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "../styles/l.js";
import readmorestyles from "../styles/readmorestyles.js";
const { height } = Dimensions.get("window");
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFocusEffect } from "expo-router";

import Up from "../assets/icons/up.js"
// import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";


const ReadMore1 = function ({ attop, setattop, animatedtop, animatedValue }) {
  const elementRef = useRef(null);
  const [top, settop] = useState(0)

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log(attop, "attop");
      console.log("hiiiiiiiiiii");

      if (attop == false) {
        setattop(true)
        return true; // This prevents the default back action
      }


    });

    return () => backHandler.remove();
  });


  useEffect(() => {

    const getTopCoordinate = () => {
      elementRef.current.measure((fx, fy, width, height, px, py) => {
        // console.log("Top coordinate:", py);
        settop(py);
      });
    };

    // Call getTopCoordinate when the component mounts
    getTopCoordinate();
  }, [animatedtop]);
  useFocusEffect(() => {
    StatusBar.setBackgroundColor("#16181a")
    StatusBar.setBarStyle("light-content")
  })

  const scrollViewRef = useRef(null);

  const scrollDown = () => {
    scrollViewRef.current.scrollTo({
      y: height + 100, // Change this value to scroll by different heights
      animated: true, // Smooth scrolling
    });

  };

  const scrolltozero = () => {
    scrollViewRef.current.scrollTo({
      y: 0, // Change this value to scroll by different heights
      animated: false, // Smooth scrolling
    });
  }






  return (


    // <SafeAreaView style={{ flex: 1 }}>
    <Animated.View style={[readmorestyles.container, animatedtop]}>


      <Pressable style={readmorestyles.back} onPress={() => {
        // console.log("back button pressed");
        scrolltozero()
        setattop(true)

      }}>
        <View style={readmorestyles.backicon}>
          {/* <Image source={require("../assets/images/backicon.png")} /> */}
          <Ionicons name="arrow-back-circle-outline" size={50} color="#00DE62" />

        </View>
      </Pressable>

      {/* startsy info which will be fixed  */}
      <Animated.View style={[readmorestyles.block]}>

        {/* back button */}

        {/* back button */}
        <View style={readmorestyles.top}>
          <Image
            style={readmorestyles.logo}
            source={require("../assets/images/logo.png")}
          />
        </View>
        <View style={readmorestyles.bottom}>
          <Text style={readmorestyles.para} allowFontScaling={false}>

            Welcome to Startsy, your gateway to the dynamic world of startups, where founders, investors, job seekers and community members come together to innovate and collaborate. Whether you’re here to launch your idea, invest in groundbreaking ventures, find job opportunities in startups, or immerse yourself in the startup ecosystem, Startsy has the perfect role for you.
          </Text>
          <Text ref={elementRef} ></Text>
        </View>
      </Animated.View>
      {/* startsy info which will be fixed  */}

      {/* 4 boxes */}

      <ScrollView ref={scrollViewRef} style={readmorestyles.scrollparent}
        bounces={true}

        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 10,
          // paddingHorizontal: 10,
        }}>

        <Pressable onPress={scrollDown}>
          <Up />
          {/* <Image style={[readmorestyles.uplogo]} source={require("../assets/images/up.png")} /> */}
        </Pressable>
        {/* <View style={{flex : 1 , borderRadius : 100 , backgroundColor : "red", height : height}}> */}

        <BlurView
          style={readmorestyles.sblock}
          intensity={90}
          blurAmount={32}
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={12}
          tint="systemChromeMaterialDark"


        >


          <Text allowFontScaling={false} style={readmorestyles.line1}>Why choose the role of</Text>
          <Text allowFontScaling={false} style={readmorestyles.line2}>Investor ?</Text>
          <Text allowFontScaling={false} style={readmorestyles.main} >
            Choose the role of Investor if you are a professional investor, such as a venture capitalist or an angel investor, looking to explore and invest in promising startups. Even if you have no prior experience in investing but have the interest and resources to support innovative ventures, this role is perfect for you! Connect with visionary founders and be part of their success stories.
          </Text>
        </BlurView>

        {/* </View> */}

        <BlurView
          style={readmorestyles.sblock1}


          intensity={90}
          blurAmount={32}
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={12}
          tint="systemChromeMaterialDark"
        >
          <View>
            <Text allowFontScaling={false} style={readmorestyles.line1}>Why choose the role of</Text>
            <Text allowFontScaling={false} style={readmorestyles.line2}>Founder ?</Text>
            <Text allowFontScaling={false} style={readmorestyles.main}  >
              Whether you are an established founder, a company owner, or someone with a groundbreaking idea seeking resources to bring it to life, the role of Founder is for you! Join a community of like-minded entrepreneurs, gain access to investors, and find the support you need to turn your vision into reality.
            </Text>
          </View>
        </BlurView>

       


        <BlurView
          style={[readmorestyles.sblock1, readmorestyles.last]}



          intensity={90}
          blurAmount={32}
          experimentalBlurMethod="dimezisBlurView"
          blurReductionFactor={12}
          tint="systemChromeMaterialDark"
        >
          <View>
            <Text allowFontScaling={false} style={readmorestyles.line1}>Why choose the role of</Text>
            <Text allowFontScaling={false} style={readmorestyles.line2}>Community member ?</Text>
            <Text allowFontScaling={false} style={readmorestyles.main}>
              Join as a Community Member to immerse yourself in the vibrant startup ecosystem! Whether you are a Startup job seeker, student, an aspiring entrepreneur, a mentor, or an industry professional, this role allows you to stay informed, network with key players, and contribute to the community. Engage in discussions, attend events, and be part of the innovation wave shaping the future. This is your gateway to learning, networking, and making a difference in the startup world.
            </Text>
          </View>



        </BlurView>


        <Pressable onPress={() => {
          setattop(true)
          setTimeout(() => {
            scrolltozero()
          }, 1);
        }

        } style={{ zIndex: 10000000, color: "white", position: "absolute", left: "84%", bottom: 0 }}>
          <Ionicons name="arrow-forward-circle" size={48} color="#00DE62" />
        </Pressable>





      </ScrollView>

      {/* 4 boxes */}




    </Animated.View>
    // </SafeAreaView>
  )

}


export default ReadMore1