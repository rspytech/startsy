
// 2.5 second last  of startup founder
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
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import Slider from '@react-native-community/slider';
import Slider from "@react-native-community/slider";

import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line3 from "./line3.js"
import Line from "./line.js";

const Signup10 = ({ navigation, route }) => {


    const [startupsector, setstartupsector] = useState("")
    const [setstartupstage, setsetstartupstage] = useState("")
    const [investmentvalue, setinvestmentvalue] = useState(0)
    const { type } = route.params || "Freelancer"
    // const type = "Freelancer"
    function nextpage(navigation, type) {
        navigation.navigate("Signup11")
    }
    function finalsubmit() {
        console.log("final submit");

    }


    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const handleOutsideTouch = () => {
        if (open1) { setOpen1(false) }
        if (open2) { setOpen2(false) }
    };
    function setAvailability() {
        console.log("education");

    }
    const [textlength, settextlength] = useState(0);
    var ss = [
        { label: "Vertical Sector", value: "Vertical Sector" },
        { label: "Horizontal Sector", value: "Horizontal Sector" },

    ]
    var stage = [
        { label: "Ideation Stage", value: "Ideation Stage" },
        { label: "Pre-Seed Stage", value: "Pre-Seed Stage" },
        { label: "Seed Stage ", value: "Seed Stage" },
        { label: "Early Stage", value: "Early Stage" },
        { label: "Growth Stage", value: "Growth Stage" },
        { label: "Mature Stage", value: "Mature Stage" },

    ]


    const [sliderrange, setsliderrange] = useState(5000000)

    function counttext(text) {

        settextlength(text.length)

    }
    const sliderImage = require("../assets/images/slider.png");
    return (

        < SafeAreaView style={[signup3styles.container, { position: "relative" }]} >
            <ScrollView nestedScrollEnabled={true}
            >
                <TouchableWithoutFeedback onPress={handleOutsideTouch}>
                    <View
                        style={[signup3styles.row, { position: "relative" }]}>
                        {/* <View style={[styles.modal]}></View> */}
                        {/* top */}
                        <View style={signup3styles.top}>
                            <View style={signup3styles.left}>
                                <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                            </View>
                            <View style={signup3styles.right}>
                                <Line progresswidth={"81%"} />
                            </View>
                        </View>



                        {/* bottom */}

                        <View style={styles.bottom}>
                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 15 }]}>About Startup/Organisation</Text>
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Name"
                                placeholderTextColor="#B8B8B8"
                                style={styles.input1}
                            // value={username}
                            // onChangeText={(text) => { setusername(text) }}
                            />
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Goal"
                                placeholderTextColor="#B8B8B8"
                                style={styles.input1}
                            // value={username}
                            // onChangeText={(text) => { setusername(text) }}
                            />
                            <Text allowFontScaling={false} style={styles.des}>Description:</Text>
                            <View allowFontScaling={false} style={{ position: "relative" }}>
                                <Text allowFontScaling={false} style={[styles.t2, styles.count]}>{textlength}/1000</Text>

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder=""
                                    placeholderTextColor="#B8B8B8"
                                    style={styles.input}
                                    maxLength={1000}
                                    multiline={true}
                                    onFocus={handleOutsideTouch}
                                    onPress={handleOutsideTouch}
                                    // value={username}
                                    onChangeText={(text) => { counttext(text) }}
                                />
                            </View>

                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 10 }]}>Startup sector </Text>
                            <Text allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Define your startup’s focus: horizontal sectors serve multiple industries, while vertical sectors target a specific niche.</Text>
                            <Drop items={ss} onValueChange={(value) => { setstartupsector(value) }} setOpen={setOpen1} open={open1} nestedScrollEnabled={true} />


                            <Text allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25 }]}>Startup stage </Text>
                            <Text allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Identify where your startup is in its journey—whether you’re in ideation, have a prototype, or are generating revenue.</Text>
                            <Drop items={stage} onValueChange={(value) => { setsetstartupstage(value) }} setOpen={setOpen2} open={open2} nestedScrollEnabled={true} />




                            <Text allowFontScaling={false} style={[styles.t1, { marginTop: 15, marginBottom: 12 }]}>Funding Status</Text>
                            <Text allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Indicate the amount of funding your startup has received so far. This information will only be visible to verified investors and helps them assess your startup's financial backing and growth potential.</Text>
                            <Pressable onPress={() => { handleOutsideTouch() }} style={styles.btn}>
                                <Text allowFontScaling={false} style={styles.nexttext}>{sliderrange.toLocaleString("en-IN")}</Text>
                            </Pressable>

                            {/* slider */}
                            <View style={[styles.box, { left: 10 }]}></View>
                            <View style={[styles.box1, { right: 10 }]}></View>
                            <Slider
                                // style={styles.sliderbox}
                                style={{marginTop:-7}}
                                minimumValue={0}
                                maximumValue={10000000}
                                value={5000000}
                                step={1000}
                                minimumTrackTintColor="#00DE62"
                                maximumTrackTintColor="#00DE62"
                                // step={100}
                                // thumbTintColor="#737373" // Color of the slider thumb
                                // trackImage={require("../assets/images/slider.png")}
                                // trackImage={require("../assets/images/slider3.png")}
                                thumbImage={require("../assets/images/slider3.png")}
                                onValueChange={(value) => { setsliderrange(value) }}
                            hitSlop={{ top: 50, left: 50, right: 50, bottom: 50 }}
                            thumbTouchSize={{ width: 100, height: 100 }}
                            />
                            {/* <Slider
                                style={{ marginTop: 100 }}
                            /> */}


                            <Text allowFontScaling={false} style={[styles.t1, { marginTop: 20, marginBottom: 10 }]}>Social proof</Text>
                            <TextInput

                                allowFontScaling={false}
                                placeholder="URL"
                                placeholderTextColor="#B8B8B8"
                                style={styles.input1}
                            // value={username}
                            // onChangeText={(text) => { setusername(text) }}
                            />






                            <View style={styles.icons}>
                                <Pressable style={{ marginTop: 5 }} onPress={() => { navigation.goBack() }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                                <Pressable onPress={() => { nextpage(navigation, type) }}><FontAwesome6 name="chevron-right" size={40} color="#00DF60" /></Pressable>

                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </ SafeAreaView>
    )
}

export default Signup10


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
        fontSize: scalingfactor * 24,
        // backgroundColor : "red",
        width: "97%",
        marginBottom: scalingfactor * 3,
    },
    thumb: {
        width: 30,
        height: 30
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

    },

    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderWidth: 3,
        borderRadius: 20,
        borderColor: "#16181A",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25,
        height: 190,
        marginTop: 10,
        padding: 10,
        textAlignVertical: "top",
        paddingBottom: 30,

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

    btn: {
        width: "92%",
        height: 48,
        margin: "auto",
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 3,
        borderColor: "#16181A",
        borderRadius: 10,
        marginBottom: 15,

        // elevation: 5,
        justifyContent: 'center',

    }, nexttext: {
        color: "#00DE62",
        fontFamily: "Alata",
        fontSize: scalingfactor * 22,
        textAlign: "center",
        marginTop: -4

    },

    count: {
        fontSize: 14,
        position: "absolute",
        bottom: 25,
        right: 25,
        // backgroundColor: "red",
        width: "auto"
    },
    modal: {
        width: width,
        height: height,
        backgroundColor: "yellow",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,

    }
    , input1: {
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
    des: {
        width: "92%",
        paddingLeft: scalingfactor * 10,
        fontFamily: "Roboto",
        textAlign: "left",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        alignSelf: "center",
    }, box: {
        // position: "absolute",
        width: 14,
        height: 14,
        borderRadius: 3,
        backgroundColor: "#00DE62",
        // top: -3,
        top: 22,
        elevation : 10
    },
    box1: {
        width: 14,
        elevation : 10,
        height: 14,
        borderRadius: 3,
        backgroundColor: "#00DE62",
        // top: -3,
        top: 8,
        backfaceVisibility: "hidden",

        left: "98%",
        marginLeft: -scalingfactor * 20
    }
    , sliderbox: {
        width: "90%",
        marginTop: -1,
        height: 5,
        margin: "auto",
        // borderWidth: 2,
        borderColor: "#00DE62",
        borderColor: "#00DE62",
        zIndex: 101,
        backgroundColor: "#00DE62",
        borderRadius: 20,
        pointerEvents: "auto",
        // elevation : 10
    }

})