import React from "react";
import { useState, useEffect, useRef } from "react";
import signupstyles from "../styles/signup1styles.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import Back from "../components/back.js";
// import axios from "axios"
import { url } from "../config.js"


import { SafeAreaView, View, Text, Button, TextInput, Image, StatusBar, Animated, Easing, KeyboardAvoidingView, Pressable, ActivityIndicator, } from "react-native";
import { useFocusEffect } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Signup2 = function ({ navigation, route }) {

    const { type, username } = route.params;
    const[loading , setloading] = useState(false)

    const [password, setpassword] = useState("")
    const final = {
        userName: username,
        password: password,
        role: type,
    }
    console.log(final);


    async function nextpage(navigation, type) {
        console.log("api call");
        setloading(true)



        try {
            const response = await fetch(`${url}api/register`, {
                method: 'POST',
                body: JSON.stringify(final), // Convert object to JSON string
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',

                }
            });
            // Check if the response is okay
            const data = await response.json();
            console.log(response.status);
            console.log(data);
            console.log(data.accessToken, "ye token hai");


            try {
                await AsyncStorage.setItem('accessToken', data.accessToken);
                console.log('Data saved successfully!');

                setTimeout(() => {
                    if (type == "Investor") {
                        navigation.navigate("Signup4", { type })
                    }
                    else {
                        navigation.navigate("Signup5", { type, username, password })
                    }
                    setloading(false)
                }, 1000);
            } catch (error) {
                console.error('Error saving data:', error);
                setloading(false)
            }

            if (type == "Investor") {
                navigation.navigate("Signup4", { type })
            }
            else {
                navigation.navigate("Signup5", { type, username, password })
            }





        }
        catch (err) {
            console.log(err);

        }
        finally {
            setloading(false)

        }
    }



    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#1e1e1e")
        StatusBar.setBarStyle("light-content")
    })

    return (
        <KeyboardAvoidingView style={signupstyles.container} behavior="padding" keyboardVerticalOffset={0} >
            <SafeAreaView >

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
                            secureTextEntry={true}

                            onChangeText={(text) => { setpassword(text) }}
                        />
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Confirm password"
                            placeholderTextColor="#B8B8B8"
                            style={[signupstyles.input2]}
                            secureTextEntry={true}

                        // value={username}
                        // onChangeText={(text) => { setusername(text) }}
                        />

                        <Pressable onPress={() => {
                            console.log(password, "password ");
                            nextpage(navigation, type)
                        }} style={signupstyles.next}>
                            {!loading && <Text allowFontScaling={false} style={signupstyles.nexttext}>Next</Text>}
                            {loading && <ActivityIndicator size={24} color="#000" />}
                        </Pressable>
                    </View>

                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )

}


export default Signup2