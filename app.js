import React from "react";
import { StatusBar } from "react-native";
import { StyleSheet,Text,View } from "react-native";


export default function app(){
    return(
        <View style={style.container}>
            <Text>hello world</Text>
            <StatusBar style="auto"></StatusBar>
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor:"#fff",
        alignItems : "center",
    }
})