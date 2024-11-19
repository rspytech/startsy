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
// import { LinearGradient } from "expo-linear-gradient";
import signup3styles from "../styles/signup3styles.js";
import s5 from "../styles/s5.js";
import { BlurView } from "expo-blur";
import { LinearGradient } from 'expo-linear-gradient';
import Line from "./line.js";
// import Line2 from "./line2.js";
import Line3 from "./line3.js";
import Line2 from "./line2.js";

// const FormData = global.FormData;
import * as DocumentPicker from 'expo-document-picker';

import * as ImagePicker from 'expo-image-picker';

const Signup5 = ({ navigation , route }) => {
    
    
    const {type , username , password} = route.params
    console.log(route.params);

    const [fullname , setfullname] = useState("")
    const [email , setemail] = useState("")

    const [country, setcountry] = useState("")
    const [number, setnumber] = useState("")
    const [age, setage] = useState("")
    const [gender, setgender] = useState("")
    const [image, setImage] = useState(null);


    const formData = new FormData();
    formData.append("username" , username)
    formData.append("password" , password)
    formData.append("fullname" , fullname)
    formData.append("email" , email)
    formData.append("country" , country)
    formData.append("number" , number)
    formData.append("age" , age)
    formData.append("gender" , gender)
    formData.append("image1" , image)
    
    // const type = "Freelancer"
    const rotateValue = useRef(new Animated.Value(0)).current;
    const [rotated, setRotated] = useState(true);
    const [inputLayout, setInputLayout] = useState({ height: 0, y: 0 });
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [afterinput, setafterinput] = useState(0)



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
            setImage(imageUri); // Set the selected image URI
            console.log("Image URI:", imageUri);
            // formData.append("image" , image);
            console.log(formData);
            
            setTimeout(() => {
                formData.append('image', {
                    uri: image,
                    type: 'image/jpeg', // Change this based on your image type
                    name: `image_${Date.now()}.jpg`, // Change the name as needed
                });
            }, 100);
            // sendtobackend()

        }

    }


    async function sendtobackend() {
        try {

            
            // formData.append('image', {
            //     uri: image,
            //     type: 'image/jpeg', // Change this based on your image type
            //     name: `image_${Date.now()}.jpg`, // Change the name as needed
            // });
            const response = await fetch('http://192.168.1.5:9000/userimg', {
                method: 'POST',
                body: formData,
                headers: {
                    accept: 'application/json',
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


    function renderline(){
        if (type === "Investor" || type === "Founder") {
            return <Line progresswidth={"31.5%"} />;
        } else if (type === "Freelancer") {
            return <Line3 progresswidth={"39%"} />;
        } else {
            // return <Line3 progresswidth={"39%"} />;
            return <Line2 progresswidth={"55.5%"} />;
        }
    }


    function nextpage(navigation , type){
        console.log(type);
        
        if(type === "Community member"){
            console.log(formData);
            navigation.navigate("Signup6" , {form : formData});
        }
        else if(type == "Freelancer"){
            navigation.navigate("Signup7" , type)
        }
        else if(type == "Founder"){
            navigation.navigate("Signup9" , type)
        }

    }

    const [open, setOpen] = useState(false);
  

    const handleOutsideTouch = () => {
        if(dropdownVisible){
            setDropdownVisible(false);
        }
       
    };
    return (
        <TouchableWithoutFeedback onPress={handleOutsideTouch}>
        <SafeAreaView style={signup3styles.container}>

            {/* ------------------------------------------dropdown starts -------------------------------------- */}

            {dropdownVisible && (
                <BlurView intensity={50} blurType="extradark"
                    blurAmount={32}
                    tint="dark"
                    style={[s5.dropdownbox, { top: afterinput }]}>

                    <LinearGradient

                        locations={[0, 1]}
                        // colors={['rgba(36, 39, 42 , 0.7)', 'rgba(123 , 134 , 144 , 0.3)']}
                        colors={['#353535', '#565555']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}

                    >
                        <ScrollView>
                            {countries.map((country) => (
                                <Pressable
                                    key={country}
                                    onPress={() => handleCountrySelect(country)}
                                    style={s5.dropdownItem}
                                >
                                    <Text style={s5.dropdownText}>{country}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </LinearGradient>
                </BlurView>
            )}

            {/* ----------------------------------------- dropdown ends ---------------------------------------------- */}
            <ScrollView style={signup3styles.row}>
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
                <View style={s5.bottom}>
                    <Pressable onPress={fileupload}>
                        {image ? (
                            <Image style={styles.img} source={{ uri: image }} />
                        ) : (
                            <Image style={styles.img1} source={require("../assets/images/User_light.png")} />
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
                            onChangeText={(text)=>{setfullname(text)}}
                        />
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Email address"
                            placeholderTextColor="#B8B8B8"
                            style={s5.input}
                            value={email}
                            onChangeText={(text)=>{setemail(text)}}
                        />
                        <View>
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
                        </View>


                        <TextInput
                            allowFontScaling={false}
                            placeholder="Phone number"
                            placeholderTextColor="#B8B8B8"
                            style={s5.input}
                            value={number}
                            onChangeText={(text)=>{setnumber(text)}}
                        />
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Age (Years)"
                            placeholderTextColor="#B8B8B8"
                            style={s5.input}
                            value={age}
                            onChangeText={(text)=>{setage(text)}}
                        />
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Gender"
                            placeholderTextColor="#B8B8B8"
                            style={s5.input}
                            value={gender}
                            onChangeText={(text)=>{setgender(text)}}
                        />
                    </View>

                    <View style={s5.icons}>
                        <Pressable onPress={()=>{navigation.goBack()}}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                        <Pressable onPress={()=>{nextpage(navigation , type)}}><FontAwesome6 name="chevron-right" size={40} color="#00DF60" /></Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </TouchableWithoutFeedback>

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
        width : 113,
        height : 120,
        borderRadius : 100
    },
    img: {
        margin: "auto",
        width : 113,
        height : 113,
        borderRadius : 100
    }
});
