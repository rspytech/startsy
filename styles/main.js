import React from "react";
import { Dimensions, StyleSheet, PixelRatio } from "react-native"


const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const main = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16181A"
    },
    header: {
        height: 55,
        textAlign: "left",
        backgroundColor: "#16181a",
        // backgroundColor : "transparent",
        // position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1,
        // backgroundColor : "red",


    },
    header1: {
        height: 55,
        textAlign: "left",
        backgroundColor: "#16181a",
        // backgroundColor : "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1,
        // backgroundColor : "red",


    },

    headertext: {
        color: "#00DE62",
        fontSize: scalingfactor * 35,
        fontFamily: "myanmar",
        fontWeight: "bold",
        paddingTop: 5,
        paddingHorizontal: 20,
        zIndex: 100
    },
    scroll: {
        paddingTop: 60,
        // position : "absolute",
        // top : 60,
        maxHeight: 1 * height,
        overflow: "scroll",
        backgroundColor: "#16181A",
        // zIndex : 100,
        // backgroundColor : "red"
        // elevation : 1000
    },
    scroll1: {


        maxHeight: 1 * height,
        zIndex : 1,
        overflow: "scroll",
        backgroundColor: "#16181A",
    }
})


export default main