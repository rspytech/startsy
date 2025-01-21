import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import { SafeAreaView, Text, Pressable, TextInput, View, Image, StyleSheet, StatusBar, Animated, Easing, Dimensions } from "react-native";
// const { height , width } = Dimensions.get('window');
import greenstyle from "../styles/greenstyle.js"
import Login1 from "./logintrial.js";
const { width, height } = Dimensions.get('window');
import { motion } from 'framer-motion';
import Svg, { Text as SvgText } from 'react-native-svg';
import { useFocusEffect } from "expo-router";
// import  {Global}  from "../app/(tabs)/index.tsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";


const Green = ({ navigation }) => {

    // const {globaldata} = useContext(Global);
    // useEffect(() => {
    //     console.log(globaldata, "global data");
    // }, [globaldata]);

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
    })

    const [state, setstate] = useState("")
    const [animationover, setanimationover] = useState(false)

    useEffect(() => {
        async function getToken() {
            const temp = await AsyncStorage.getItem("accessToken");
            if (temp) {
                var decode = jwtDecode(temp)
                console.log(decode);

                if (decode && decode.role == "Investor") {
                    setstate("Investor")
                }
                else if (decode && decode.role == "Founder") {
                    setstate("Founder")
                }
                else if (decode && decode.role == "CommunityMember") {
                    setstate("CommunityMember")
                }

            }
        }
        getToken();
    }, []);

    useEffect(() => {
        if (state == "Investor" && animationover) {
            navigation.navigate("Main1")
        }
        else if ((state == "Founder" || state == "CommunityMember") && animationover) {
            navigation.navigate("Main2")

        }

    }, [state, animationover])



    const animatedtop1 = useRef(new Animated.Value(height)).current;
    useEffect(() => {
        // Delay for 2 seconds, then move the login up with a 1 second animation
        setTimeout(() => {
            Animated.timing(animatedtop1, {
                toValue: 0, // Move to 0% (top of the screen)
                duration: 200, // 1 second transition
                easing: Easing.linear,
                useNativeDriver: false,
            }).start();


        }, 2000); // 2 second delay
    }, [animatedtop1]);


    useFocusEffect(() => {
        // StatusBar.setBackgroundColor("#00DF60"); // Set your desired color
        // StatusBar.setBarStyle("light-content");
    })


    // setTimeout(function(){
    //     navigation.replace("LoginTrial")

    // },1500)

    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setTimeout(function () {
            Animated.timing(animatedWidth, {
                toValue: width, // Animate to full width of the screen
                duration: 800, // Duration of the animation
                useNativeDriver: false,
                // SVG doesn't support native driver
                easing: Easing.elastic(3)
                // easing : ,
            }).start();
        }, 800)

    }, [animatedWidth])

    useEffect(() => {
        setTimeout(() => {
            setanimationover(true)
        }, 1200);
    }, [])



    return (
        <SafeAreaView style={{flex : 1 , backgroundColor : "#000"}}>
            <View style={greenstyle.green}>
                <StatusBar backgroundColor="#16181a" barStyle={"light-content"} />
                {/* <StatusBar translucent={true} /> */}
                <View style={styles.main}>
                    {/* <Text style={{fontFamily: "Alata"}}>hello</Text> */}
                    <Animated.View style={{ overflow: 'hidden', width: animatedWidth, position: "absolute", alignSelf: "center", left: -width * 0.31, alignContent: "center", top: -50, }}>
                        <Svg height="80" width={width}>
                            <SvgText
                                // style={{ fontFamily: "Arial"  }}
                                x="0"
                                y="50"
                                // fontFamily="Roboto"
                                // fontFamily="Arial"
                                fontSize="70"
                                alignItems="center"
                                fontWeight="bold"
                                fill="#00DF60"
                            >
                                startsy
                            </SvgText>
                        </Svg>
                    </Animated.View>
                </View>



                {state == "" && <Animated.View style={[greenstyle.login, { top: animatedtop1 }]}>
                    <Login1 navigation={navigation} />
                </Animated.View>}
                {/* <Animated.View style={[greenstyle.login, { top: animatedtop1 }]}>
                <Login1 navigation={navigation} />
            </Animated.View> */}

            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    main: {
        position: 'relative',
        top: "0%",
        backgroundColor: "red",
        alignItems: 'flex-start',
        // left : "-19%"

    },
});

export default Green;
