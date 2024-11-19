import React from "react";
import { useState, useEffect, useRef } from "react";
import signupstyles from "../styles/signup1styles.js";
import s5 from "@/styles/s5.js";
import Ionicons from '@expo/vector-icons/Ionicons';
import Back from "@/components/back.js";


import { SafeAreaView, View, Text, Button, TextInput, Image, StatusBar, Animated, Easing, KeyboardAvoidingView, Pressable, } from "react-native";


const Signup1 = function ({ navigation, route }) {
    const { type } = route.params;
    console.log(route.params);
    console.log(type);
    const [username, setusername] = useState("")

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
                        <Text allowFontScaling={false} style={signupstyles.t2}>You can always change it later.</Text>
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Username"
                            placeholderTextColor="#B8B8B8"
                            style={s5.input}
                            value={username}
                            onChangeText={(text) => { setusername(text) }}
                        />

                        <Pressable style={signupstyles.next}
                            onPress={() => {
                                console.log(username, "username");
                                navigation.navigate("Signup2", { type, username })
                            }}

                        >
                            <Text allowFontScaling={false} style={signupstyles.nexttext}>Next</Text>
                        </Pressable>
                    </View>

                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>

    )

}


export default Signup1