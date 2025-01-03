import CustomButton from "@/components/button";
import React, { useEffect } from "react";
import { Pressable, TextInput } from "react-native";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, Dimensions, SafeAreaView, ScrollView } from "react-native";
const ChangePassword1 = () => {


    return (

        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#16181a" barStyle={"light-content"} />
            {/* Header Section */}
            <Text allowFontScaling={false} style={styles.headerText}>Profile</Text>

            <Text style={styles.t1}>Current password</Text>
            <TextInput
                allowFontScaling={false}
                placeholder="Password"
                placeholderTextColor="#B8B8B8"
                style={styles.input}
            // value={username}
            // onChangeText={(text) => { setusername(text) }}
            />
            <Text style={styles.t2}>Forgot password</Text>
            <Pressable style={styles.btn}>
                <Text style={styles.btntext}>Next</Text>
            </Pressable>

        </SafeAreaView>
    );
};

export default ChangePassword1;

// const { width, height } = Dimensions.get("window");
const { height, width } = Dimensions.get("window");


var a = width / 360;
var b = height / 800;

const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: "#16181a",
        // padding: 20,
    },
    headerText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 20,
        color: "#00DE62",
        fontFamily: "myanmar",
        paddingHorizontal: 20

    },
    t2: {
        fontFamily: "Roboto",
        color: "#94A3B8",
        fontSize: 15,
        textAlign: "center",
        marginTop : -5
    },
    t1: {
        fontFamily: "Alata",
        color: "#ffffff",
        fontSize: 24,
        textAlign: "center",
        marginTop : 5
    }
    , input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 40,
        borderBottomWidth: 3,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#AEAFAF",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 7,
        width: "90%",
        marginHorizontal: "auto",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25,
        // borderRadius : 20
    }, 
    btn : {
        borderRadius : 20,
        height : 45,
        justifyContent : "center",
        alignItems : "center",
        width : "70%",
        marginHorizontal : "auto",
        marginVertical : 20,
        backgroundColor : "#00DF60"
    },
    btntext : {
        fontFamily : "Alata",
        color  : "#24272A",
        fontSize  : 22,
        marginTop : -5
    }

});
