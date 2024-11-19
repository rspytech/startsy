import React from "react";
import { useState, useEffect, useRef } from "react";
import signup3styles from "../styles/signup3styles.js";
import signupstyles from "@/styles/signup1styles.js";
import Custombutton from "../components/button.js"


import { SafeAreaView, View, Text, Button, TextInput, Image, StatusBar, Animated, Easing, KeyboardAvoidingView, Pressable, } from "react-native";


import { LinearGradient } from "expo-linear-gradient";
const Signup3 = ({ navigation }) => {

    function nav(){

    }
    return (

        <SafeAreaView style={signup3styles.container}>
            <View style={signup3styles.row}>
                {/* top */}
                <View style={signup3styles.top}>
                    <View style={signup3styles.left}>
                        <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                    </View>
                    <View style={signup3styles.right}>
                        <View style={signup3styles.line}>
                            <View style={[signup3styles.c, signup3styles.c1]}></View>
                            <View style={[signup3styles.c, signup3styles.c2]}></View>
                            <View style={[signup3styles.c, signup3styles.c3]}></View>
                            <View style={[signup3styles.c, signup3styles.c4]}></View>
                            <View style={[signup3styles.c, signup3styles.c5]}></View>
                            <View style={[signup3styles.n, signup3styles.n1]}><Text style={signup3styles.ntext}>1</Text></View>
                            <View style={[signup3styles.n, signup3styles.n2]}><Text style={signup3styles.ntext}>2</Text></View>
                            <View style={[signup3styles.n, signup3styles.n3]}><Text style={signup3styles.ntext}>3</Text></View>
                            <View style={[signup3styles.n, signup3styles.n4]}><Text style={signup3styles.ntext}>4</Text></View>
                            <LinearGradient
                                style={[signup3styles.progress]}
                                locations={[0, 0.8]}
                                colors={['#8CBEA2', '#79b896']}
                                start={{ x: 0, y: 0 }} // Starting point of the gradient
                                end={{ x: 1, y: 0 }}
                            />
                        </View>
                    </View>
                </View>



                {/* bottom */}
                <View style={signup3styles.bottom}>

                    <Text style={signup3styles.t1}>
                        Thank you for your interest in joining Startsy as an investor. To ensure a high standard of investment opportunities, we require investors to have assets worth 2 crores and above. Unfortunately, you do not meet this criterion at the moment.
                    </Text>
                    <Text style={signup3styles.t2}>
                        However, you can still be a valuable part of our community by exploring other Roles
                    </Text>

                    <Custombutton title="Choose another option" onpress={nav} />


                </View>
            </View>
        </SafeAreaView>
    )
}

export default Signup3