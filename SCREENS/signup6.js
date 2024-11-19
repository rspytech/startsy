
// 4.4 last of community
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
    TouchableWithoutFeedback

} from "react-native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line2 from "./line2.js";

const Signup6 = ({ navigation, route }) => {
    const { form } = route.params;
    // console.log(formData);
    // console.log(route.params);
    console.log(form);
    // for(var keys in route.params) {
    //     console.log(keys);
    // }



    const type = "Freelancer"
    const [role1, setrole] = useState("")
    const [interest, setinterest] = useState("")
    const [prefference, setprefference] = useState("")

    // form.append("role"  , role1)
    // form.append("interest"  , interest)
    // form.append("prefference"  , prefference)
    // form["role"] = role1
    // form["interest"] = interest
    // form["preferrence"] = prefference

    var role = [
        { label: "Learner", value: "Learner" },
        { label: "Startup Enthusiast", value: "Startup Enthusiast" },
        { label: "Mentor", value: "Mentor" },
        { label: "Networker", value: "Networker" },
        { label: "Contributor", value: "Contributor" },


    ]



    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);

    const t1 = () => {
        setOpen1(!open1);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
    }
    const t2 = () => {
        if (open1) setOpen1(false)
        setOpen2(!open2);

        if (open3) setOpen3(false);
    }
    const t3 = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        setOpen3(!open3);
    }
    const handleOutsideTouch = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
    };
    const handlerole = (value1) => {
        console.log("Selected Value:", value1); // Optional: Log the selected value
        setrole(value1); // Update state with the selected value
    };
    const handleinterest = (value1) => {
        console.log("Selected Value:", value1); // Optional: Log the selected value
        setinterest(value1); // Update state with the selected value
    };
    const handleprefference = (value1) => {
        console.log("Selected Value:", value1); // Optional: Log the selected value
        setprefference(value1); // Update state with the selected value
    };


    async function finalsubmit() {
        console.log("will make final submit");
        console.log(form);

        // fetch("http://192.168.1.5:9000/userimg")
        const response = await fetch('http://192.168.1.5:9000/userimg', {
            method: 'POST',
            body: form,
            headers: {
                accept: 'application/json',
            }
        });
        // Check if the response is okay


        const data = await response.json();
        console.log(data);


    }

    return (
        <TouchableWithoutFeedback onPress={handleOutsideTouch}>
            <SafeAreaView style={signup3styles.container}>
                <View style={signup3styles.row}>
                    {/* top */}
                    <View style={signup3styles.top}>
                        <View style={signup3styles.left}>
                            <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                        </View>
                        <View style={signup3styles.right}>
                            <Line2 progresswidth={"105%"} />
                        </View>
                    </View>



                    {/* bottom */}

                    <View style={styles.bottom}>

                        <Text allowFontScaling={false} style={styles.t1}>Community Participation</Text>
                        <Text allowFontScaling={false} style={styles.t2}>Specify your role within the community to help tailor your experience.</Text>
                        {/* <TouchableWithoutFeedback onPress={handleOutsideTouch}>  */}
                        <Drop items={role} onValueChange={handlerole} open={open1} setOpen={t1} />
                        {/* </TouchableWithoutFeedback> */}


                        <Text allowFontScaling={false} style={[styles.t1, { marginTop: scalingfactor * 18 }]}>Area of Interest</Text>
                        <Text allowFontScaling={false} style={styles.t2}>Indicate the specific fields or topics you are passionate about within the startup ecosystem.</Text>
                        <Drop items={role} onValueChange={handleinterest} open={open2} setOpen={t2} />


                        <Text allowFontScaling={false} style={[styles.t1, { marginTop: scalingfactor * 18 }]}>Content Preference</Text>
                        <Text allowFontScaling={false} style={styles.t2}>Choose the types of content you want to see most in your feed.</Text>
                        <Drop items={role} onValueChange={handleprefference} open={open3} setOpen={t3} />


                        <View style={styles.icons}>
                            <Pressable onPress={() => {

                                navigation.goBack();
                            }}><FontAwesome6 name="chevron-left" size={45} color="#00DF60" /></Pressable>
                            <Pressable style={styles.btn} onPress={() => { finalsubmit() }}>
                                <Text allowFontScaling={false} style={styles.nexttext}>Submit</Text>
                            </Pressable>
                        </View>


                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}


export default Signup6
const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
    t1: {
        textAlign: 'Left',
        marginLeft: 10,
        color: "#D9D9D9",
        fontFamily: 'Alata',
        fontSize: scalingfactor * 27,
        marginBottom: scalingfactor * 3,
    },
    t2: {
        textAlign: 'Left',
        color: "#94A3B8",
        fontFamily: 'Roboto',
        fontSize: scalingfactor * 13,

        marginBottom: scalingfactor * 8,
        width: "85%",
        alignSelf: "center",
        lineHeight: scalingfactor * 16
    },
    bottom: {
        width: "100%",
        height: height * 0.85,
        backgroundColor: "#24272A",
        borderTopLeftRadius: 70,
        padding: height * 0.03,
        paddingTop: height * 0.06,
        // justifyContent: "center",
        alignContent: "center",
        padding: scalingfactor * 20,
        paddingTop: scalingfactor * 40
    },
    icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "92%",
        margin: "auto",
        // marginTop: scalingfactor * 30,
        position: "absolute",
        bottom: 40,
        alignSelf: "center",
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


})