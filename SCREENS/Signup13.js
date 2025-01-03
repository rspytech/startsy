
// 4.4 last of community
import React, { useState, useRef, useEffect, useContext } from "react";
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
    TouchableWithoutFeedback

} from "react-native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import signup3styles from "../styles/signup3styles.js";
import Drop from "./dropdown.js";
import Line from "./line.js";
import * as DocumentPicker from 'expo-document-picker';
import { useFocusEffect } from "expo-router";
import { GlobalContext } from "@/Global/globalcontext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Signup13 = ({ navigation, route }) => {
    const { form, image } = route.params;

    // const [final, setFormData] = useState(new FormData());
    // useFocusEffect(
    //     React.useCallback(() => {
    //         // Reset FormData to avoid duplication
    //         setFormData(new FormData());
    //     }, [])
    // );


    const [token, settoken] = useState("")
    const { globaldata, updateField } = useContext(GlobalContext);

    useEffect(() => {
        console.log(globaldata, "global data");
        settoken(globaldata.token)
    }, [])
    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#1e1e1e")
        StatusBar.setBarStyle("light-content")
    })


    const [linkedinurl, setlinkedinurl] = useState("")
    const [websiteurl, setwebsiteurl] = useState("")
    const [domainemail, setdomainemail] = useState("")
    const [panCard, setpanCard] = useState("")
    const [file, setFile] = useState(null);







    async function finalsubmit() {

        const final = new FormData();
        for (var items of form["_parts"]) {

            if (items[0] == "fullname" || items[0] == "password") continue;
            final.append(items[0], items[1]);
        }


        final.append("linkedInUrl", linkedinurl)
        final.append("websiteUrl", websiteurl)
        final.append("domainEmail", domainemail)
        final.append("panCard", panCard)

        if (file) {
            final.append("panCardPhoto", {
                uri: file,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,

            })
        }

        if (image && image != "xyz") {
            final.append("profilePhoto", {
                uri: image,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,

            })
        }
        console.log("will make final submit");






        const response = await fetch('http://192.168.1.7:5002/api/investorInfo', {
            method: 'POST',
            body: final,

            headers: {
                accept: 'application/json',
                "Authorization": token
            }
        });


        const data = await response.json();
        console.log(data, "investor");
        navigation.navigate("Main1")


    }

    const openFilePicker = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Allow all file types (you can restrict this if needed)
            });
            console.log(result.canceled);


            if (!result.canceled) {
                console.log("success in uploading pancrad ");
                setFile(result.assets[0].uri);
            } else {
                console.log('ok');

                // Alert.alert('Cancelled', 'No file selected.');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while picking the file.');
        }
    };
    <StatusBar backgroundColor="#1E1E1E" barStyle={"light-content"} />

    return (
        <TouchableWithoutFeedback >
            <SafeAreaView style={signup3styles.container}>
                <View style={signup3styles.row}>
                    {/* top */}
                    <View style={signup3styles.top}>
                        <View style={signup3styles.left}>
                            <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                        </View>
                        <View style={signup3styles.right}>
                            <Line progresswidth={"105%"} />
                        </View>
                    </View>



                    {/* bottom */}

                    <View style={styles.bottom}>

                        <Text allowFontScaling={false} style={styles.t1}>Authenticity Verification</Text>
                        <TextInput
                            allowFontScaling={false}
                            placeholder="LinkedIN URL*"
                            placeholderTextColor="#B8B8B8"
                            style={styles.input}
                            value={linkedinurl}
                            onChangeText={(text) => { setlinkedinurl(text) }}
                        />
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Website URL"
                            placeholderTextColor="#B8B8B8"
                            style={styles.input}
                            value={websiteurl}
                            onChangeText={(text) => { setwebsiteurl(text) }}
                        />
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Official Domain Email"
                            placeholderTextColor="#B8B8B8"
                            style={styles.input}
                            value={domainemail}
                            onChangeText={(text) => { setdomainemail(text) }}
                        />
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Pan Number"
                            placeholderTextColor="#B8B8B8"
                            style={styles.input}
                            value={panCard}
                            onChangeText={(text) => { setpanCard(text) }}
                        />

                        <Text allowFontScaling={false} style={styles.t11}>E-KYC document upload</Text>
                        <Pressable style={styles.upload} onPress={openFilePicker}>
                            <Text allowFontScaling={false} style={styles.nexttext}>Upload</Text>
                        </Pressable>





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


export default Signup13
const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)
const styles = StyleSheet.create({
    t1: {
        textAlign: 'left',
        marginLeft: 10,
        color: "#D9D9D9",
        fontFamily: 'Alata',
        fontSize: scalingfactor * 27,
        marginBottom: scalingfactor * 12,


    },
    t11: {
        textAlign: 'center',
        // marginLeft: 10,
        color: "#D9D9D9",
        fontFamily: 'Alata',
        fontSize: scalingfactor * 26,
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

    }
    , upload: {

        width: 229,
        height: 48,
        backgroundColor: "#00DF60",
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0, 0.5)', // Shadow color
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 1, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,
        justifyContent: 'center',
        marginHorizontal: "auto",
        marginTop: 20
    },
    input: {
        marginHorizontal: "auto",
        // padding : 10,
        borderRadius: 20,
        height: 47,
        width: "92%",
        borderWidth: 3,
        borderColor: "#16181A",
        marginTop: 10,
        paddingLeft: 20,
        color : "#B8B8B8",
        // fontFamily: "Alata",
        fontSize: scalingfactor * 16,
        marginBottom: scalingfactor * 16
    },



})