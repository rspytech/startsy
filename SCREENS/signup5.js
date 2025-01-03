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
    TouchableWithoutFeedback,
    KeyboardAvoidingView

} from "react-native";
import Profile from "../assets/icons/profile.js"
import Drop from "./dropdown.js";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import { LinearGradient } from "expo-linear-gradient";
import signup3styles from "../styles/signup3styles.js";
import s5 from "../styles/s5.js";
import { BlurView } from "expo-blur";
import { LinearGradient } from 'expo-linear-gradient';
import Line from "./line.js";
// import Line2 from "./line2.js";
import Line3 from "./line3.js";
import Line2 from "./line2.js";


import * as DocumentPicker from 'expo-document-picker';

import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { GlobalContext } from "@/Global/globalcontext.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Signup5 = ({ navigation, route }) => {



    const [token, settoken] = useState("")
    const { globaldata, updateField } = useContext(GlobalContext);


    useEffect(() => {
        async function getToken() {
            const temp = await AsyncStorage.getItem("accessToken");
            updateField("token", temp);

            console.log(temp, "yeh temp hai");
            // console.log(globaldata.token, "yeh globally saved me se aa raah");
            console.log(globaldata.token, "yeh globally saved me se aa raah");

        }
        getToken();
    }, []);


    const { type, username, password } = route.params
    console.log(route.params);

    const [fullname, setfullname] = useState("")
    const [email, setemail] = useState("")
    const [country, setcountry] = useState("")
    const [number, setnumber] = useState("")
    const [age, setage] = useState("")
    const [gender, setgender] = useState("")
    const [image, setImage] = useState("xyz");




    const formData = new FormData();
    formData.append("fullName", fullname)
    formData.append("password", password)
    formData.append("fullname", fullname)
    formData.append("email", email)
    formData.append("country", country)
    formData.append("contactInfo", number)
    formData.append("age", age)
    formData.append("gender", gender)


    const rotateValue = useRef(new Animated.Value(0)).current;
    const [rotated, setRotated] = useState(true);
    const [inputLayout, setInputLayout] = useState({ height: 0, y: 0 });
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [afterinput, setafterinput] = useState(0)
    const [message, setmessage] = useState("")
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(false)



    const countries = ["United States", "Canada", "Australia", "India", "Japan"];
    const myElementRef = useRef(null);
    const handleRotate = () => {
        myElementRef.current.measure((x, y, width, height, pageX, pageY) => {
            console.log(x, y, width, height, pageX, pageY);
            const value = pageY
            setafterinput(value)
            setDropdownVisible(!dropdownVisible);
            console.log(afterinput);
            setRotated(!rotated);
        });
    };

    useEffect(() => {
        Animated.timing(rotateValue, {
            toValue: rotated ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [rotated])

    const rotation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    const handleCountrySelect = (country) => {
        setcountry(country)
        setRotated(!rotated);
        setDropdownVisible(false);
    };



    const fileupload = async () => {

        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow all media types
            allowsEditing: true, // Allows cropping the image
            aspect: [4, 3], // Aspect ratio of the image
            quality: 1, // Image quality (0 to 1)

        });


        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            setImage(imageUri);

        }

    }


    async function sendtobackend() {
        try {

            const response = await fetch('http://192.168.1.7:9000/userimg', {
                method: 'POST',
                body: formData,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                }
            });

            // Check if the response is okay
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data); // Log the response from the server
        } catch (error) {
            console.error('Error uploading image:', error); // Handle the error
        }
    }


    function renderline() {
        if (type === "Investor" || type === "Founder") {
            return <Line progresswidth={"31.5%"} />;
        } else if (type === "Freelancer") {
            return <Line3 progresswidth={"39%"} />;
        } else {
            // return <Line3 progresswidth={"39%"} />;
            return <Line2 progresswidth={"55.5%"} />;
        }
    }

    // useEffect(() => {
    //     const setStatusBar = () => {
    //         StatusBar.setBackgroundColor("#16181A"); // Set your desired color
    //         StatusBar.setBarStyle("light-content");
    //     };


    //     setStatusBar();
    //     setTimeout(() => {
    //         setStatusBar()
    //     }, 0);
    // }, [])

    async function nextpage(navigation, type) {
        console.log(type);



        // setloading(true)
        // const response = await fetch('http://192.168.1.3:9000/api/checkemail', {
        //     method: 'POST',
        //     body: { email },
        //     headers: {
        //         accept: 'application/json',
        //         "content": "application/json"
        //     }
        // });
        // const data = await response.json();
        // setloading(false)
        // console.log(data);
        // if (data.status === 200) {
        //     if (type === "Community member") {
        //         console.log(formData);
        //         // navigation.navigate("Signup6" , {form : formData});
        //         navigation.navigate("Signup6", { form: formData });
        //     }
        //     else if (type == "Freelancer") {
        //         navigation.navigate("Signup7", { type: type })
        //     }
        //     else if (type == "Founder") {
        //         navigation.navigate("Signup9", { type: type })
        //     }
        //     else if (type == "Investor") {
        //         navigation.navigate("Signup12", { type: type })
        //     }
        // }
        // else if (data.status === 400) {
        //     setmessage("email already taken")

        // }




        if (type === "CommunityMember") {
            // console.log(formData, "signup 6 pe ja raha hu");
            // sendtobackend()
            navigation.navigate("Signup6", { form: formData, image: image })
            // navigation.navigate("Signup6", { form: formData , image });
        }
        else if (type == "Freelancer") {
            navigation.navigate("Signup7", { form: formData, image: image })
        }
        else if (type == "Founder") {
            navigation.navigate("Signup9", { form: formData, image: image })
        }
        else if (type == "Investor") {
            navigation.navigate("Signup12", { form: formData, image: image })
        }





    }

    // const [open, setOpen] = useState(false);


    const handleOutsideTouch = () => {
        if (dropdownVisible) {
            setDropdownVisible(false);
        }

    };

    var country1 = [
        { label: "10th", value: "10TH" },
        { label: "12th", value: "12th" },
        { label: "Graduate", value: "Graduate" },
        { label: "Post-Graduate", value: "Post-Graduate" },
        { label: "P.H.D", value: "P.H.D" },


    ]
    // const [open , setOpen] = useState(true)
    function seteducation() {
        console.log("education");
    }

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#1E1E1E")
        StatusBar.setBarStyle("light-content")
    })
    const [open, setOpen] = useState(false)
    return (


        <SafeAreaView  style={{flex:1}}>
            <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={0} extraScrollHeight={100} enableAutomaticScroll={true} style={signup3styles.container}>
                {/* <ScrollView style={signup3styles.row}> */}



                {/* Top Section */}
                <View style={signup3styles.top}>
                    <View style={signup3styles.left}>
                        <Image style={signup3styles.logo} source={require("../assets/images/logo.png")} />
                    </View>
                    <View style={signup3styles.right}>
                        {renderline()}
                    </View>
                </View>

                {/* Bottom Section */}
                <ScrollView style={s5.bottom}>
                    <View style={{ paddingBottom: 10, flex: 1 }}>
                        <Pressable onPress={fileupload}>
                            {image != "xyz" ? (
                                <Image style={styles.img} source={{ uri: image }} />
                            ) : (
                                // <Image style={styles.img1} source={require("../assets/images/User_light.png")} />
                                <Profile />
                            )}
                        </Pressable>
                        <Text style={s5.t1}>Upload a profile picture</Text>
                        <View style={{ marginTop: 30 }}>
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Full name"
                                placeholderTextColor="#B8B8B8"
                                style={s5.input}
                                value={fullname}
                                onChangeText={(text) => { setfullname(text) }}
                            />
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Email address"
                                placeholderTextColor="#B8B8B8"
                                style={[s5.input, { marginBottom: 12 }]}
                                value={email}
                                onChangeText={(text) => { setemail(text) }}
                            />
                            {/* <View>
                                        <Pressable onPress={handleRotate}>
                                            <TextInput
                                                ref={myElementRef}
                                                allowFontScaling={false}
                                                placeholder="Country"
                                                placeholderTextColor="#B8B8B8"
                                                style={s5.input}
                                                value={country}
                                                editable={false} // Disable keyboard input
                                                onLayout={(event) => {
                                                    const { height, y } = event.nativeEvent.layout;
                                                    console.log(height, y, "cooordd");
                                                    setInputLayout({ height, y });
                                                }}
                                            />
                                        </Pressable>

                                        <Pressable style={s5.dropdown} onPress={handleRotate}>
                                            <Animated.View
                                                style={[{ transform: [{ rotate: rotation }] }]}
                                            >
                                                <FontAwesome6
                                                    name="chevron-down"
                                                    size={20}
                                                    color="#00DF60"
                                                />
                                            </Animated.View>
                                        </Pressable>
                                    </View> */}

                            <Drop items={country1} open={open} setOpen={setOpen} onValueChange={setcountry} nestedScrollEnabled={true} extra={true} />




                            <TextInput


                                allowFontScaling={false}
                                placeholder="Phone number"
                                placeholderTextColor="#B8B8B8"
                                style={[s5.input, { marginTop: 20 }]}
                                value={number}
                                onChangeText={(text) => { setnumber(text) }}
                            />
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Age (Years)"
                                placeholderTextColor="#B8B8B8"
                                style={s5.input}
                                value={age}
                                onChangeText={(text) => { setage(text) }}
                            />
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Gender"
                                placeholderTextColor="#B8B8B8"
                                style={s5.input}
                                value={gender}
                                onChangeText={(text) => { setgender(text) }}
                            />

                        </View>

                        <View style={s5.icons}>
                            <Pressable onPress={() => { navigation.goBack() }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                            <Pressable onPress={() => { nextpage(navigation, type) }}><FontAwesome6 name="chevron-right" size={40} color="#00DF60" /></Pressable>
                        </View>
                    </View>
                </ScrollView>
                {/* </ScrollView> */}
            </KeyboardAwareScrollView>
        </SafeAreaView>


    );


};





export default Signup5;

const { height, width } = Dimensions.get("window");
const scalingFactor = Math.sqrt((width / 360) * (height / 800));

const styles = StyleSheet.create({
    progress: {
        position: "absolute",
        left: -5,
        borderWidth: 0.2,
        width: "56.5%",
        backgroundColor: "transparent",
        height: 14,
        top: -5,
        opacity: 1,
        borderRadius: 20,
    },
    img1: {
        margin: "auto",
        width: 113,
        height: 120,
        borderRadius: 100
    },
    img: {
        margin: "auto",
        width: 113,
        height: 113,
        borderRadius: 100
    }
});
