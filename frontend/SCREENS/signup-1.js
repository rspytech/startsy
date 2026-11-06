import React, { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import signupstyles from "../styles/signup1styles.js";
import s5 from "@/styles/s5.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import Back from "@/components/back.js";
import { url } from "../config.js"



import { SafeAreaView, View, Text, Button, TextInput, Image, StatusBar, Animated, Easing, KeyboardAvoidingView, Pressable, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import { GlobalContext } from "@/Global/globalcontext.js";


const Signup1 = function ({ navigation, route }) {

    console.log(url);


    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
        StatusBar.setBarStyle("light-content")
    })

    const { type } = route.params;
    const [username, setusername] = useState("")
    const { globaldata } = useContext(GlobalContext)
    const [message, setmessage] = useState("* username already taken")
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)
    // console.log(globaldata);
    // console.log(globaldata.token);








    async function checkusername() {
        console.log(username, "username");
        setloading(true)
        if (username == "" || username.trim().length == 0) {
            setmessage('* username required')
            console.log("hi");
            seterror(true)
            setloading(false)
            return
        }

        console.log(`${url}api/checkUserName`);

        const response = await fetch(`${url}api/checkUserName`, {
            method: 'POST',
            body: JSON.stringify({ username: username }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        if (response.status === 200) {
            navigation.navigate("Signup2", { username , type })
            // navigation.navigate("Signup2", { type, username })
        }
        else if (response.status === 400) {
            setmessage("username already taken")
            seterror(true)
        }
        setloading(false)


    }

    return (

        <KeyboardAvoidingView style={signupstyles.container} behavior="padding" keyboardVerticalOffset={-100} >
            <SafeAreaView >

                <View style={signupstyles.row}>
                    <Pressable style={signupstyles.back} onPress={() => {
                        navigation.setParams({ type });
                        navigation.goBack();
                    }

                    }>
                        <Back />
                    </Pressable>
                    <View style={signupstyles.top}>
                        <Image style={signupstyles.logo} source={require("../assets/images/logo.png")} />
                    </View>
                    <View style={signupstyles.bottom}>
                        <Text allowFontScaling={false} style={signupstyles.t1}>Choose username</Text>
                        {!error && <Text allowFontScaling={false} style={signupstyles.t2}>You can always change it later.</Text>}
                        {error && <Text style={signupstyles.error}>{message}</Text>}



                        <TextInput
                            allowFontScaling={false}
                            placeholder="Username"
                            placeholderTextColor="#B8B8B8"
                            style={s5.input}
                            value={username}
                            onChangeText={(text) => {
                                seterror(false)
                                setusername(text) }}
                        />


                        <Pressable style={signupstyles.next}
                            onPress={() => {
                                checkusername()
                            }}

                        >
                            {loading && <ActivityIndicator size={24} color="#16181a" />}
                            {!loading && <Text allowFontScaling={false} style={signupstyles.nexttext}>Next</Text>}
                        </Pressable>
                    </View>

                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>

    )

}


export default Signup1