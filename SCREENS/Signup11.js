// 2.4

import React, { useState, useRef, useEffect } from "react";
import {

    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    Animated,
    Pressable,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList,
    TouchableWithoutFeedback
} from "react-native";
// import { FlatList, ScrollView } from 'react-native-gesture-handler';

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line2 from "./line2.js";
import Line from "./line.js"
import Line3 from "./line3.js"
import Entypo from '@expo/vector-icons/Entypo';
// import { FlatList } from "react-native-gesture-handler";



const Signup11 = ({ navigation, route }) => {
    // const { type } = route.params || "Freelancer"
    // console.log(type);
    // if(type == undefined) {
    // }
    const type = "Founder"


    // function renderline() {
    //     if (type === "Investor" || type === "Founder") {
    //         return <Line progresswidth={"55.5%"} />;
    //     } else if (type === "Freelancer") {
    //         return <Line3 progresswidth={"72.5%"} />;
    //     } else {
    //         return <Line2 progresswidth={"55.5%"} />;
    //     }
    // }

    function seteducation() {
        console.log("education");

    }
    var education = [
        { label: "10th", value: "10TH" },
        { label: "12th", value: "12th" },
        { label: "Graduate", value: "Graduate" },
        { label: "Post-Graduate", value: "Post-Graduate" },
        { label: "P.H.D", value: "P.H.D" },


    ]

    const [open, setOpen] = useState(false)
    const handleOutsideTouch = () => {
        if (open) {
            setOpen(false);
        }
    };


    // multiple certificate 
    const [teammember, setteammember] = useState([{ id: Date.now(), username: '', name: '', role: "" }]);


    function addteammember() {
        setteammember(
            [...teammember, { id: Date.now(), username: '', name: '', role: '' }]
        )
    }


    function handleworkchange(id, field, value) {
        var array = teammember.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value }

            }
            else return e
        })
        setteammember(array);
    }
    return (

        <SafeAreaView style={signup3styles.container}>
            <ScrollView nestedScrollEnabled={true}>
                <View style={signup3styles.row}>
                    {/* top */}

                    <View style={signup3styles.top}>
                        <View style={signup3styles.left}>
                            <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                        </View>
                        <View style={signup3styles.right}>
                            <Line progresswidth={"105.5%"} />
                        </View>
                    </View>



                    {/* bottom */}

                    <View style={styles.bottom}>
                        <Text style={styles.t1}>Team Information</Text>
                        {teammember.map((we) => (
                            <View key={we.id} style={styles.certificate}>
                                <Pressable onPress={addteammember}>
                                    <Entypo style={styles.plus} name="plus" size={24} color="#00DE62" />
                                </Pressable>

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="@Username"
                                    placeholderTextColor="#B8B8B8"
                                    style={[styles.input, { marginTop: 20, backgroundColor: "transparent" }]}
                                    value={we.name}
                                    onChangeText={(text) => { handleworkchange(we.id, "username", text) }}
                                />
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Name"
                                    placeholderTextColor="#B8B8B8"
                                    style={styles.input}
                                    value={we.role}
                                    onChangeText={(text) => { handleworkchange(we.id, "name", text) }}
                                />
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Role"
                                    placeholderTextColor="#B8B8B8"
                                    style={styles.input}
                                    value={we.year}
                                    onChangeText={(text) => { handleworkchange(we.id, "role", text) }}
                                />

                            </View>
                        ))}
                        <View style={styles.icons} nestedScrollEnabled={true}>
                            <Pressable onPress={() => {
                                navigation.goBack()
                                // console.log(workexperience);
                            }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                             <Pressable style={styles.btn} onPress={() => { finalsubmit() }}>
                                <Text allowFontScaling={false} style={styles.nexttext}>Submit</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default Signup11;

const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
    t1: {
        textAlign: 'center',
        marginLeft: 10,
        color: "#D9D9D9",
        fontFamily: 'Alata',
        fontSize: scalingfactor * 27,
        marginBottom: scalingfactor * 3,
        zIndex: 100,
        // pointerEvents: "none",
        // backgroundColor: 'red',
        width: "auto"
    },
    t2: {
        textAlign: 'Left',
        color: "#94A3B8",
        fontFamily: 'Roboto',
        fontSize: scalingfactor * 13,
        zIndex: -1,
        marginBottom: scalingfactor * 8,
        width: "85%",
        alignSelf: "center",
        lineHeight: scalingfactor * 16
    },
    bottom: {
        width: "100%",
        // height: height*0.85,
        backgroundColor: "#24272A",
        // backgroundColor: "red",
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.06,
        // justifyContent: "center",
        alignContent: "center",
        padding: scalingfactor * 20,
        paddingTop: scalingfactor * 40,
        // overflow : "hidden",
        minHeight : height * 0.85

    },
    icons: {

    }
    ,
    btn: {
        width: 168,
        height: 48,
        // height : scalingfactor*48,
        backgroundColor: "#00DF60",
        // padding: scalingfactor * 12,
        // marginVertical: height * 0.018,
        borderRadius: 20,
        // margin: "auto",
        // marginTop: scalingfactor * 20,
        shadowColor: 'rgba(0,0,0, 0.5)', // Shadow color
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 1, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,
        justifyContent: 'center',

    }, nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 22,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4

    },
    input: {
        backgroundColor: "transparent",
        margin: scalingfactor * 12,
        marginTop: 0,
        borderBottomWidth: 3,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#16181A",
        fontSize: scalingfactor * 18,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 4,
        width: "92%",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 12,
        marginBottom: scalingfactor * 20
    }
    , icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "92%",
        margin: "auto",
        marginTop: 20,
        marginBottom: 30
    },
    certificate: {
        padding: 4,
        // height : 194,
        paddingTop: 12,
        marginTop: 10,
        margin: "auto",
        width: "92%",
        backgroundColor: "transparent",
        borderWidth: 3,
        borderColor: "#16181A",
        borderRadius: 10,
        position: "relative"
    },
    plus: {
        position: "absolute",
        right: 5,
        top: -5,
        zIndex: 100
    }


})