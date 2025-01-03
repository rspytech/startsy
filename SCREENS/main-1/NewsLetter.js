
import React, { useState, useRef, useEffect } from "react";
import {
    ScrollView,
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    Animated,
    Pressable,
    StyleSheet,
    Dimensions,
    StatusBar,
    FlatList,
    RefreshControl,

} from "react-native";
import main from "../../styles/main.js"
import { useFocusEffect } from "expo-router";
// import styles from "@/styles/l.js";

const NewsLetter = () => {
 useFocusEffect(()=>{
        StatusBar.setBackgroundColor("#16181a")
    })
    const data = [1, 2, 3]
    const renderItem = ({ item }) => {
        return (
            
            <View style={styles.box}>
                <Text allowFontScaling={false} style={styles.headline}>Headline {item}</Text>
                <Image style={styles.image} source={require("../../assets/images/template.png")} />
                <Text  style={styles.text}
                //  numberOfLines={2}
                 >
                    <Text allowFontScaling={false} style={styles.des}>Description:</Text> Welcome to Startsy, your gateway to the dynamic world of startups, where founders, investors, freelancers, and community members come together to innovate and collaborate. Whether you’re here to launch your idea, invest in groundbreaking ventures, find freelance opportunities, or immerse yourself in the startup ecosystem, Startsy has the perfect role for you.

                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View><Text allowFontScaling={false} style={styles.headerText}>Newsletter</Text></Animated.View>
            <FlatList
             showsVerticalScrollIndicator={false} 
              style = {styles.scroll}
                data={data}
                renderItem={renderItem}
            >

            </FlatList>
        </SafeAreaView>
    )
}


export default NewsLetter

const { width ,height} = Dimensions.get("window");

var a = width/360;
var b = height/800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a*b)

const styles = StyleSheet.create({
    box: {
        height : "auto",
        marginBottom : 20
    },
    container: {
        flex: 1,
        backgroundColor: "#16181a",
        // backgroundColor: "red",
        paddingVertical: 20,
    },
    des:{
        fontFamily : "Roboto",
        fontSize : scalingfactor*12,
        fontWeight : "bold",
        color :"#D9D9D9"

    },
    headerText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 20,
        fontFamily : "myanmar",
        color: "#00DE62",
        paddingLeft : 15
    },
    headline: {
        fontSize: 36,
        fontFamily: "Alata",
        color: "#B8B8B8",
        marginBottom :15
    },
    image: {
        margin: "auto",
        borderRadius: 10,
        width: width * 0.92,
        marginBottom : 15


    },
    text: {
        fontSize: 12,
        fontFamily: "Roboto",
        color: "#B8B8B8",
        lineHeight : 16
    },
    scroll : {
        // paddingTop : 60,
        maxHeight : 1* height,
        overflow : "scroll",
        width : width*0.92,
        margin : "auto",
        backgroundColor : "#16181A",
        // zIndex : 100,
        // elevation : 1000
    }

})