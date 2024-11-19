import React, { useState, useRef, useEffect } from "react";
import { Text, View, Dimensions, StatusBar, Pressable, Image, SafeAreaView, ScrollView, Animated } from "react-native";
import { BlurView } from "expo-blur";
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "../styles/l.js";
import readmorestyles from "../styles/readmorestyles.js";
const { height } = Dimensions.get("window");
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";


const ReadMore1 = function ({ attop, setattop, animatedtop, animatedValue }) {
  const elementRef = useRef(null);
  const [top, settop] = useState(0)


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


  useEffect(() => {
    const setStatusBar = () => {
      StatusBar.setBackgroundColor("#1e1e1e"); // Set your desired color
      StatusBar.setBarStyle("light-content");
    };

    setStatusBar(); // Set it on initial render

    setTimeout(() => {
      setStatusBar()
    }, 2000)


  }, []);

  const scrollViewRef = useRef(null);

  const scrollDown = () => {
    scrollViewRef.current.scrollTo({
      y: height, // Change this value to scroll by different heights
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
            Welcome to Startsy, your gateway to the dynamic world of startups, where founders, investors, freelancers, and community members come together to innovate and collaborate. Whether you’re here to launch your idea, invest in groundbreaking ventures, find freelance opportunities, or immerse yourself in the startup ecosystem, Startsy has the perfect role for you.
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
          paddingBottom: 20,
          paddingHorizontal: 10,
        }}>

        <Pressable onPress={scrollDown}>
          <Image style={[readmorestyles.uplogo]} source={require("../assets/images/up.png")} />
        </Pressable>

        <BlurView
          style={readmorestyles.sblock}
          intensity={100}
          blurType="extradark"
          blurAmount={32}
          tint="dark"
          reducedTransparencyFallbackColor="white"

        >

          <Text allowFontScaling={false} style={readmorestyles.line1}>Why choose the role of</Text>
          <Text allowFontScaling={false} style={readmorestyles.line2}>Investor</Text>
          <Text allowFontScaling={false} style={readmorestyles.main} >
            Choose the role of Investor if you are a professional investor, such as a venture capitalist or an angel investor, looking to explore and invest in promising startups. Even if you have no prior experience in investing but have the interest and resources to support innovative ventures, this role is perfect for you! Connect with visionary founders and be part of their success stories.
          </Text>
        </BlurView>

        <BlurView
          style={readmorestyles.sblock1}
          intensity={100}
          blurType="extradark"
          blurAmount={32}
          tint="dark"
          reducedTransparencyFallbackColor="white"
        >
          <View>
            <Text allowFontScaling={false} style={readmorestyles.line1}>Why choose the role of</Text>
            <Text allowFontScaling={false} style={readmorestyles.line2}>Investor</Text>
            <Text allowFontScaling={false} style={readmorestyles.main}  >
              Choose the role of Investor if you are a professional investor, such as a venture capitalist or an angel investor, looking to explore and invest in promising startups. Even if you have no prior experience in investing but have the interest and resources to support innovative ventures, this role is perfect for you! Connect with visionary founders and be part of their success stories.
            </Text>
          </View>
        </BlurView>

        <BlurView
          style={readmorestyles.sblock1}
          intensity={100}
          blurType="extradark"
          blurAmount={32}
          tint="dark"
          reducedTransparencyFallbackColor="white"
        >
          <View>
            <Text allowFontScaling={false} style={readmorestyles.line1}>Why choose the role of</Text>
            <Text allowFontScaling={false} style={readmorestyles.line2}>Investor</Text>
            <Text allowFontScaling={false} style={readmorestyles.main}>
              Choose the role of Investor if you are a professional investor, such as a venture capitalist or an angel investor, looking to explore and invest in promising startups. Even if you have no prior experience in investing but have the interest and resources to support innovative ventures, this role is perfect for you! Connect with visionary founders and be part of their success stories.
            </Text>
          </View>
        </BlurView>


        <BlurView
          style={[readmorestyles.sblock1, readmorestyles.last]}
          intensity={100}

          blurType="extradark"
          blurAmount={32}
          tint="dark"
          reducedTransparencyFallbackColor="white"
        >
          <View>
            <Text allowFontScaling={false} style={readmorestyles.line1}>Why choose the role of</Text>
            <Text allowFontScaling={false} style={readmorestyles.line2}>Investor</Text>
            <Text allowFontScaling={false} style={readmorestyles.main}>
              Choose the role of Investor if you are a professional investor, such as a venture capitalist or an angel investor, looking to explore and invest in promising startups. Even if you have no prior experience in investing but have the interest and resources to support innovative ventures, this role is perfect for you! Connect with visionary founders and be part of their success stories.
            </Text>
          </View>



        </BlurView>
        <Pressable onPress={()=>{
          setattop(true)
          setTimeout(() => {
            scrolltozero()
          }, 1);
        }

        } style={{ zIndex: 10000000, color: "white", position: "absolute", left : "84%", bottom: 10  }}>
          <Ionicons name="arrow-forward-circle" size={48} color="#00DE62" />
        </Pressable>





      </ScrollView>

      {/* 4 boxes */}




    </Animated.View>
  )

}


export default ReadMore1