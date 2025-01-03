import React from "react";
import { Dimensions, StyleSheet, PixelRatio } from "react-native"


const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)



const s5 = StyleSheet.create({
    t1: {
        textAlign: 'center',
        color: "#94A3B8",
        fontFamily: "Roboto",
        fontSize: scalingfactor * 16,
        marginTop: 5,
        // zIndex : 100,
        // backgroundColor : "red"
    }

    , input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 3,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#16181A",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25
    }, 
    
    bottom: {
        width: "100%",
        // height: height * 0.85,
        flex  : 1,
        backgroundColor: "#24272A",
        borderTopLeftRadius: 70,
        alignContent: "center",
        padding: scalingfactor * 20,
        paddingTop: scalingfactor * 25
    },icons:{
        display : "flex",
        flexDirection : "row",
        justifyContent : "space-between",
        width : "92%",
        margin : "auto",
    },dropdown:{
        position : "absolute",
        right : 20,
        top : 3,
        // transform: [{ rotate: '180deg' }]
    },
    dropdownbox:{
        position : "absolute",
        backgroundColor : "gray",
        width : "82%",
        borderRadius : 10,
        // margin : "auto",
        alignSelf : "center",
        zIndex : 3,
        height : 200,
        opacity : 0.98,
        elevation : 3,
        overflow : "hidden"

    },
    
    dropdownItem: {
        padding: 10,
        borderBottomColor : "black",
        borderBottomWidth : 1
    },
    dropdownText: {
        color: '#B8B8B8',
        fontFamily  : "abeeze",
        fontSize : scalingfactor* 20
    },
})


export default s5