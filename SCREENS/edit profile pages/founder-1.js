import { useFocusEffect } from "expo-router"
import { useState, useEffect, useRef } from "react";
import * as React from "react"
import { SafeAreaView, ScrollView, StatusBar, Animated, TouchableOpacity, Dimensions, BackHandler, Pressable, TextInput, TouchableWithoutFeedback, Image } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import Profile from "../../assets/icons/profile.js"
import Drop from "../../SCREENS/dropdown.js"
import Slider from "@react-native-community/slider";
import styles from "../commonstyles.js"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from '@expo/vector-icons/Entypo';

import * as ImagePicker from 'expo-image-picker';


const Founder1 = ({ navigation }) => {

    function gotochangepassowrd() {

        navigation.navigate("ChangePassword1")
    }
    const [sliderrange, setsliderrange] = useState(5000000)


    const [areaofinterest, setareafofinterest] = useState("")

    const [fullName, setfullname] = useState("");
    const [email, setemail] = useState("");
    const [country, setcountry] = React.useState("");
    const [phone, setphone] = useState("");
    const [skills, setskills] = useState("");
    const [education, seteducation] = useState("");
    const [image, setImage] = useState("");


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();


            return true; // This prevents the default back action
        });

        return () => backHandler.remove();
    }, []);



    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [open4, setOpen4] = React.useState(false)

    const [workexperience, setworkexperience] = useState([{ id: Date.now(), name: '', role: '', year: "" }]);


    const fileupload = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });


        if (!result.canceled) {

            const imageUri = result.assets[0].uri;
            setImage(imageUri);


        }

    }


    function nextpage() {
        var formData = new FormData();
        formData.append("country", country);
        formData.append("contactInfo", phone);
        formData.append("fullName", fullName);
        formData.append("education", education);
        formData.append("skills", skills);
        formData.append("email", email);

        var array = workexperience.map(({ id, name, ...items }) => {
            return {
                company: name,
                ...items
            }
        })

        formData.append("previousWorkExperience", JSON.stringify(array));


        navigation.navigate("Founder2", { form: formData, image: image });



    }


    var areaofinterestlist = [
        { label: "Technology", value: "Technology" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Finance", value: "Finance" },
        { label: "Consumer Goods", value: "Consumer Goods" },
        { label: "Education", value: "Education" },
        { label: "Energy", value: "Energy" },
        { label: "Real Estate", value: "Real Estate" },
        { label: "Logistics", value: "Logistics" },

    ]
    var country1 = [
        { label: "India", value: "INDIA" },
        { label: "United States", value: "UNITED_STATES" },
        { label: "Canada", value: "CANADA" },
        { label: "United Kingdom", value: "UNITED_KINGDOM" },
        { label: "Australia", value: "AUSTRALIA" },
        { label: "Singapore", value: "SINGAPORE" },
        { label: "Indonesia", value: "INDONESIA" },
        { label: "Vietnam", value: "VIETNAM" },
        { label: "Malaysia", value: "MALAYSIA" },
        { label: "UAE", value: "UAE" },
        { label: "Saudi Arabia", value: "SAUDI_ARABIA" },
        { label: "Israel", value: "ISRAEL" },
        { label: "Nigeria", value: "NIGERIA" },
        { label: "South Africa", value: "SOUTH_AFRICA" },
        { label: "Brazil", value: "BRAZIL" },
        { label: "Mexico", value: "MEXICO" },
        { label: "Others (Type)", value: "OTHERS" },

    ]



    const handleOutsideTouch = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);

    };
    const handlerole = (value1) => {

        seteducation(value1); // Update state with the selected value
    };
    const t1 = () => {
        setOpen1(!open1);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open4) setOpen4(false);
    }
    const t2 = () => {
        if (open1) setOpen1(false);
        setOpen2(!open2);
        if (open3) setOpen3(false);
        if (open4) setOpen4(false);
    }
    const t3 = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        setOpen3(!open3);
        if (open4) setOpen4(false);
    }
    const t4 = () => {
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open1) setOpen1(false);
        setOpen4(!open4);
    }



    function addworkexperience() {
        setworkexperience(
            [...workexperience, { id: Date.now(), name: '', role: '', year: '' }]
        )
    }


    function handleworkchange(id, field, value) {
        var array = workexperience.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value }

            }
            else return e
        })
        setworkexperience(array);
    }

    function deletecertificate(index){
        var new1 = [...workexperience];
        new1.splice(index, 1)
        setworkexperience(new1)
    }


    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A")
        StatusBar.setBarStyle("light-content")
    })
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a" }}>
            <ScrollView style={{ flex: 1 }}>
                <Animated.View style={styles1.header}>
                    <Text allowFontScaling={false} style={styles1.headertext}>Profile</Text>
                </Animated.View>
                <View style={{ width: width * 0.98, margin: "auto" }}>
                    <Text style={styles1.edit}>Edit Profile</Text>
                    {/* <Profile /> */}
                    <Pressable onPress={fileupload}>
                        {image != "" ? (
                            <Image style={styles1.img} source={{ uri: image }} />
                        ) : (
                            // <Image style={styles.img1} source={require("../assets/images/User_light.png")} />
                            <Profile />
                        )}
                    </Pressable>
                    <Text style={styles1.t2}>Change profile picture</Text>
                    <TouchableOpacity onPress={gotochangepassowrd} style={styles1.editButton1}>
                        <Text allowFontScaling={false} style={styles1.editButtonText}>Change Password</Text>
                    </TouchableOpacity>
                    <TextInput
                        onTouchStart={handleOutsideTouch}
                        allowFontScaling={false}
                        placeholder="Full Name"
                        placeholderTextColor="#B8B8B8"
                        style={styles1.input}
                        value={fullName}
                        onChangeText={(text) => { setfullname(text) }}
                    />
                    <TextInput
                        allowFontScaling={false}
                        placeholder="Email address"
                        placeholderTextColor="#B8B8B8"
                        style={[styles1.input, { marginBottom: 18 }]}
                        value={email}
                        onChangeText={(text) => { setemail(text) }}
                    />
                    <Drop items={country1} onValueChange={handlerole} open={open1} setOpen={t1} extra={true} edit />
                    <TextInput
                        allowFontScaling={false}
                        placeholder="Phone number"
                        placeholderTextColor="#B8B8B8"
                        style={[styles1.input, { marginTop: 28 }]}
                        value={phone}
                        onChangeText={(text) => { setphone(text) }}
                    />










                    <View style={{ width: width * 0.95, margin: "auto" }}>

                        <Text allowFontScaling={false} style={[styles.t1, { marginTop: 15, marginBottom: -10, paddingLeft: 7 }]}>Skills</Text>
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Write any Top 3"
                            placeholderTextColor="#B8B8B8"
                            style={[styles1.input, { marginTop: 25 }]}
                            value={skills}
                            onChangeText={(text) => { setskills(text) }}
                        />
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginTop: 25, marginBottom: 10, paddingLeft: 7 }]}>Education </Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>List your highest degree achieved, which helps to establish your academic background and qualifications. </Text>
                        <Drop items={areaofinterestlist} onValueChange={(value) => { seteducation(value) }} setOpen={t2} open={open2} nestedScrollEnabled={true} />


                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25, paddingLeft: 7 }]}>Previous Work Experience </Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Detail any relevant industry experience, particularly if you’ve worked in a specific company or held roles that have prepared you for your current venture.</Text>

                        {workexperience.map((we, index) => (
                            <View onTouchStart={handleOutsideTouch} key={we.id} style={styles1.certificate}>
                                <Pressable onPress={addworkexperience}>
                                    <Entypo style={styles1.plus} name="plus" size={24} color="#00DE62" />
                                </Pressable>

                                {index > 0 && <Pressable onPress={() => { deletecertificate(index) }}>
                                    <FontAwesome6 name="trash" style={styles1.minus} size={15} color="#00DE62" />
                                </Pressable>}

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Company / Oragnisation"
                                    placeholderTextColor="#B8B8B8"
                                    style={[styles1.input1, { marginTop: 20, backgroundColor: "transparent" }]}
                                    value={we.name}
                                    onChangeText={(text) => { handleworkchange(we.id, "name", text) }}
                                />
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Role"
                                    placeholderTextColor="#B8B8B8"
                                    style={styles1.input1}
                                    value={we.role}
                                    onChangeText={(text) => { handleworkchange(we.id, "role", text) }}
                                />
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Year"
                                    placeholderTextColor="#B8B8B8"
                                    style={styles1.input1}
                                    value={we.year}
                                    onChangeText={(text) => { handleworkchange(we.id, "year", text) }}
                                />

                            </View>
                        ))}






                    </View>


                    <View onTouchStart={handleOutsideTouch} style={styles1.icons}>
                        <Pressable onPress={() => { navigation.goBack() }} style={{ alignSelf: "center" }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                        <Pressable onPress={nextpage} style={{ alignSelf: "center" }}><FontAwesome6 name="chevron-right" size={40} color="#00DF60" /></Pressable>

                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>

    )
}

export default Founder1


const { height, width } = Dimensions.get("window");


var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)
const styles1 = StyleSheet.create({
    header: {
        height: 55,
        textAlign: "left",
        backgroundColor: "#16181a",
        // backgroundColor : "transparent",
        // position : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        // backgroundColor : "red",


    },
    headertext: {
        color: "#00DE62",
        fontSize: scalingfactor * 35,
        fontFamily: "myanmar",
        fontWeight: "bold",
        paddingTop: 5,
        paddingHorizontal: 20,
    },
    edit: {
        color: "#B8B8B8",
        fontFamily: "Alata",
        textAlign: "center",
        fontSize: 20,
        marginBottom: 20


    },
    t2: {
        color: "#94A3B8",
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 14,
        marginBottom: 20,
        marginTop: 10
    },
    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        // marginTop: 40,
        borderBottomWidth: 1,
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
        marginBottom: scalingfactor * 15,
        // borderRadius : 20
    },
    icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "85%",
        margin: "auto",
        // marginTop: scalingfactor * 30,
        // position: "absolute",
        // bottom: 40,
        marginTop: 60,
        marginBottom: 40,
        alignSelf: "center",
    }
    ,

    img: {
        margin: "auto",
        width: 113,
        height: 113,
        borderRadius: 100
    },
    certificate: {
        padding: 4,
        paddingTop: 15,
        marginTop: 10,
        margin: "auto",
        width: "92%",
        backgroundColor: "#24272A",
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
    },
    input1: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 3,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#16181A",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25
    },
    editButton1: {
        backgroundColor: "#00DE62",
        // paddingHorizontal: 20,
        // paddingVertical: 8,
        borderRadius: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#00DE62",
        alignItems: "center",
        verticalAlign: "middle",
        justifyContent: "center",
        width: 182,
        height: 40,
        alignSelf: "center",
        marginVertical: 12


    },
    editButtonText: {
        color: "#16181A",
        fontSize: 16,
        fontFamily: "Alata",
        textAlign: "center",
        marginLeft: -1,
        marginTop: -3
    },
    minus: {
        position: "absolute",
        right: 45,
        top: -3,
        zIndex: 100
    },



})