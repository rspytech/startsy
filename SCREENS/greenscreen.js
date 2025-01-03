import * as React from "react";
import { useState, useEffect, useRef , useContext } from "react";
import { SafeAreaView, Text, Pressable, TextInput, View, Image, StyleSheet, StatusBar, Animated, Easing, Dimensions } from "react-native";
// const { height , width } = Dimensions.get('window');
import greenstyle from "../styles/greenstyle.js"
import Login1 from "./logintrial.js";
const { width, height } = Dimensions.get('window');
import { motion } from 'framer-motion';
import Svg, { Text as SvgText } from 'react-native-svg';
import { useFocusEffect } from "expo-router";
// import  {Global}  from "../app/(tabs)/index.tsx";


const Green = ({navigation}) => {

    // const {globaldata} = useContext(Global);
    // useEffect(() => {
    //     console.log(globaldata, "global data");
    // }, [globaldata]);
    

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

   
    useFocusEffect(()=>{
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

    return (
        <View style={greenstyle.green}>
            <StatusBar translucent={true} />
            <View style={styles.main}>
                <Animated.View style={{ overflow: 'hidden', width: animatedWidth, position: "absolute", alignSelf : "center" , left : -width*0.31 ,alignContent: "center", top: -50,}}>
                    <Svg height="80" width={width}>
                        <SvgText
                            x="0"
                            y="50"
                            fontSize="70"
                            alignItems="center"
                            fontWeight="bold"
                            fill="black"
                        >
                            startsy
                        </SvgText>
                    </Svg>
                </Animated.View>
            </View>



            <Animated.View style={[greenstyle.login, { top: animatedtop1 }]}>
                <Login1  navigation={navigation}/>
            </Animated.View>

        </View>
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
