import React from "react";
import { useState, useEffect, useRef } from "react";
import signupstyles from "../styles/signup1styles.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import Back from "../components/back.js";


import { SafeAreaView, View, Text, Button, TextInput, Image, StatusBar, Animated, Easing, KeyboardAvoidingView, Pressable, } from "react-native";


const Signup2 = function ({ navigation, route }) {

    const { type , username } = route.params;
    console.log(route.params);
    
    const [password , setpassword] = useState("")
    function nextpage(navigation, type) {
        if (type == "Investor") {
            navigation.navigate("Signup4" , {type})
        }
        else {
            navigation.navigate("Signup5",  { type , username , password })
        }
    }

    return (
        <SafeAreaView style={signupstyles.container}>

            <View style={signupstyles.row}>
                <Pressable style={signupstyles.back} onPress={() => {
                    navigation.setParams({ type });
                    navigation.goBack();
                }}>
                    <Back />

                </Pressable>
                <View style={signupstyles.top}>
                    <Image style={signupstyles.logo} source={require("../assets/images/logo.png")} />
                </View>
                <View style={signupstyles.bottom}>
                    <Text allowFontScaling={false} style={signupstyles.t1}>Create a password</Text>
                    <Text allowFontScaling={false} style={signupstyles.t2}>Use a strong password </Text>
                    <TextInput
                        allowFontScaling={false}
                        placeholder="Password"
                        placeholderTextColor="#B8B8B8"
                        style={signupstyles.input}
                        value={password}
                        onChangeText={(text) => { setpassword(text) }}
                    />
                    <TextInput
                        allowFontScaling={false}
                        placeholder="Confirm password"
                        placeholderTextColor="#B8B8B8"
                        style={[signupstyles.input2]}
                    // value={username}
                    // onChangeText={(text) => { setusername(text) }}
                    />

                    <Pressable onPress={() => {
                        console.log(password , "password ");
                        
                        nextpage(navigation, type)
                    }} style={signupstyles.next}>
                        <Text allowFontScaling={false} style={signupstyles.nexttext}>Next</Text>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    )

}


export default Signup2