


import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
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
    StatusBar,
    FlatList,
    RefreshControl,
    Dimensions, PixelRatio,
    TouchableWithoutFeedback

} from "react-native";
import { Video } from 'expo-av';
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { NativeViewGestureHandler } from 'react-native-gesture-handler'
import Octicons from '@expo/vector-icons/Octicons';
import main from "../../styles/main.js"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import CustomButton from "@/components/button.js";
import AntDesign from '@expo/vector-icons/AntDesign';
// import BottomSheet from '@gorhom/bottom-sheet';

import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput, BottomSheetDraggableView, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFocusEffect } from "expo-router";

import B1 from "../../assets/icons/b1.js"
import B2 from "../../assets/icons/b2.js"
import B3 from "../../assets/icons/b3.js"
import B4 from "../../assets/icons/b4.js"
import { color } from "framer-motion";
import Drop from "../dropdown.js";
import * as ImagePicker from 'expo-image-picker';

import Upvote from "@/assets/icons/upvote.js";
import Share from "@/assets/icons/share.js";
import { GlobalContext } from "@/Global/globalcontext.js";

import {url} from "../../config.js"
const Foryou = ({ scroll }) => {

    const [token, settoken] = useState("")
    const { globaldata, updateField } = useContext(GlobalContext);

    useEffect(() => {
        console.log(globaldata, "global data");
        settoken(globaldata.token)
    }, [])
    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A");
        StatusBar.setBarStyle("light-content");
    })




    const [uri, setImage] = useState(null)
    const [status1, setstatus] = useState(false)
    const [bg, setbg] = useState("#16181a")
    const [refreshing, setRefreshing] = useState(false);
    const [textlength, settextlength] = useState(0);
    const [rule1, setrule] = useState("")
    const [open1, setOpen1] = useState(false);
    const [list, setlist] = useState(false)

    const [communityname, setcommunityname] = useState("")
    const [description, setdescription] = useState("")
    const [rules, setrules] = useState("")
    const [caption, setcaption] = useState("")
    const [content, setcontent] = useState("")
    const [c2, setc2] = useState("")
    const [type, settype] = useState("")


    const [role4, setrole4] = useState("")
    const [description4, setdescription4] = useState("")
    const [duration4, setduration4] = useState("")
    const [pay4, setpay4] = useState("")




    const scrollY = new Animated.Value(0);
    const diffclamp = Animated.diffClamp(scrollY, 0, 55);
    const translateY = diffclamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, -55],
        extrapolate: "clamp",
    })

    const bottomSheetRef = useRef(null);
    const bottomSheetRef1 = useRef(null);
    const bottomSheetRef2 = useRef(null);
    const bottomSheetRef3 = useRef(null);
    const bottomSheetRef4 = useRef(null);

    // Snap points for the bottom sheet
    const snapPoints = useMemo(() => ['25%'], []);
    const snapPoints1 = useMemo(() => ['120%'], []);
    const snapPoints2 = useMemo(() => ['120%'], []);
    const snapPoints3 = useMemo(() => ['120%'], []);
    const snapPoints4 = useMemo(() => ['120%'], []);

    const [err1, seterr1] = useState(false)
    const [err2, seterr2] = useState(false)
    const [err3, seterr3] = useState(false)
    const [err4, seterr4] = useState(false)
    const [err5, seterr5] = useState(false)
    const [err6, seterr6] = useState(false)
    const [err7, seterr7] = useState(false)
    const [err, seterr] = useState(false)

    function removeerr() {
        seterr(false)
        seterr1(false)
        seterr2(false)
        seterr3(false)
    }



    const post1 = async function () {
        let hasError = false;
        if (communityname == "") {
            console.log("1");

            seterr1(true)
            hasError = true
        }
        if (description == "") {
            console.log("2");

            seterr2(true)
            hasError = true
        }
        if (rule1 == "") {
            console.log("3");

            seterr3(true)
            hasError = true
        }

        if (hasError) { return };

        const postType = "communityPost"; // Define postType value
        const finaldata = {
            "communityName": communityname,
            "communityDescription": description,
            "communityRules": rule1
        };

        try {
            const response = await fetch(`${url}posts/createCommunityPost/${postType}`, {
                method: 'POST',
                body: JSON.stringify(finaldata), // Convert object to JSON string
                headers: {
                    'Content-Type': 'application/json', // Explicitly set content type
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log(data);
            bottomSheetRef.current?.close()
            setTimeout(() => {
                bottomSheetRef1.current?.close();
            }, 3000);
        } catch (err) {
            console.error("Error:", err);
        }
    };



    const post2 = async function () {
        let hasError = false;
        if (content == "") {
            seterr4(true)
            hasError = true
        }
        if (caption == "") {
            console.log("3");
            seterr5(true)
            hasError = true
        }

        if (hasError) { return };

        const postType = "textBlog"; // Define postType value
        const finaldata = {
            "caption": caption,
            "content": content,
        };

        try {
            const response = await fetch(`${url}posts/createPost/${postType}`, {
                method: 'POST',
                body: JSON.stringify(finaldata), // Convert object to JSON string
                headers: {
                    'Accept': 'application/json',
                   'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log(data);
            bottomSheetRef.current?.close()
            setTimeout(() => {
                bottomSheetRef2.current?.close();
            }, 3000);
        } catch (err) {
            console.error("Error:", err);
        }
    };
    const post4 = async function () {

        console.log('====================================');
        console.log(token , "ye chutiya 4th one hai ");
        console.log('====================================');
       
        const postType = "jobPost"; // Define postType value
        const finaldata = {
            "role": role4,
            "description": description4,
            "duration": duration4,
            "pay": pay4,
        };

        try {
            const response = await fetch(`${url}posts/createJobPost/${postType}`, {
                method: 'POST',
                body: JSON.stringify(finaldata), // Convert object to JSON string
                headers: {
                    'Accept': 'application/json',
                   'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log(data);
            bottomSheetRef.current?.close()
            setTimeout(() => {
                bottomSheetRef4.current?.close();
            }, 3000);
        } catch (err) {
            console.error("Error:", err);
        }
    };



    const post3 = async function () {
        let hasError = false;
        if (uri == "") {
            seterr6(true)
            hasError = true
        }
        if (c2 == "") {
            seterr7(true)
            hasError = true
        }

        if (hasError) { return };

        // Define postType value

        const finaldata = new FormData()
        if (uri) {
            finaldata.append("media", {
                uri: uri,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,
            })
        }
        finaldata.append("caption", c2)

        try {
            if (type == "images") {
                settype("photo")
            }
            const response = await fetch(`${url}posts/createPost/${type}`, {
                method: 'POST',
                body: finaldata, // Convert object to JSON string
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log(data);
            bottomSheetRef.current?.close()
            setTimeout(() => {
                bottomSheetRef2.current?.close();
            }, 3000);
        } catch (err) {
            console.error("Error:", err);
        }
    };


    // Function to open the bottom sheet
    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
        setstatus(true)
    };
    const openBottomSheet1 = () => {
        bottomSheetRef1.current?.expand();
        setstatus(true)
    };
    const openBottomSheet2 = () => {
        bottomSheetRef2.current?.expand();
        setstatus(true)
    };
    const openBottomSheet3 = () => {
        bottomSheetRef3.current?.expand();
        setstatus(true)
    };
    const openBottomSheet4 = () => {
        bottomSheetRef4.current?.expand();
        setstatus(true)
    };


    function closebottomsheet() {
        bottomSheetRef1.current?.close();
        bottomSheetRef.current?.close();

    }












    const BottomSheetContent = () => (
        <View style={styles.bottomSheetContent}>
            <Pressable style={styles.iconButton} onPress={openBottomSheet1}>
                <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                    <B1 />
                </View>
                <Text style={styles.bottomsheettext}>Community</Text>
            </Pressable>
            <Pressable style={styles.iconButton} onPress={openBottomSheet2}>

                <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                    <B2 />
                </View>
                <Text style={styles.bottomsheettext}>Blog</Text>
            </Pressable>
            <Pressable style={styles.iconButton} onPress={() => {
                fileupload().then(() => openBottomSheet3)
            }
            }>
                <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                    <B3 />
                </View>
                <Text style={styles.bottomsheettext}>Media</Text>
            </Pressable>
            <Pressable style={styles.iconButton} onPress={openBottomSheet4}>

                <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
                    <B4 />
                </View>
                <Text style={styles.bottomsheettext}>Job Posting</Text>
            </Pressable>
        </View>
    );



    const renderItem = ({ item }) => {
        if (item.type == "normal" || item.type == "blog") {
            return (
                <View onTouchStart={closebottomsheet} style={styles.box}>
                    <View style={styles.top} >
                        <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <Image style={styles.userimg} source={require("../../assets/images/p1.png")} />
                            <View style={styles.userdetail}>
                                <Text allowFontScaling={false} style={styles.u1}>raz.shhh</Text>
                                <Text allowFontScaling={false} style={styles.u2}>Founder</Text>
                            </View>
                        </View>
                    </View>
                    <Image style={styles.template} source={require("../../assets/images/template.png")} />

                    <View style={styles.iconcontainer}>
                        <View style={styles.icon2}>
                            <Upvote width={36} height={36} style={{ marginHorizontal: 22 }} />
                            <FontAwesome name="comment-o" size={30} color="#00DE62" />
                        </View>
                        <Share style={{ marginTop: 5, marginRight: 10, right: 0 }} />


                    </View>
                    <View style={styles.lower}>
                        <Text allowFontScaling={false} style={styles.u3}>caption caption caption caption caption.</Text>
                        <Text allowFontScaling={false} style={styles.u4}>View 16 comments</Text>

                    </View>

                </View>
            )
        }
        else if (item.type == "community") {
            return (
                <View onTouchStart={closebottomsheet} style={styles.box}>
                    <View style={styles.top} >
                        <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <Image style={styles.userimg} source={require("../../assets/images/p1.png")} />
                            <View style={styles.userdetail}>
                                <Text allowFontScaling={false} style={styles.u1}>raz.shhh</Text>
                                <Text allowFontScaling={false} style={styles.u2}>Community Member</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.lower}>
                        <Text style={styles.com1}>Founders cafe</Text>
                        <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>To bring all the crucial players in the startup ecosystem on a single platform To bring all the crucial players in the startup ecosystem on a single platform.</Text>
                        <Text allowFontScaling={false} style={styles.u6}><Text style={styles.desc1}>Members Count:</Text> 30</Text>
                        <Text allowFontScaling={false} style={styles.u7}>Rules & Guidelines: Only for founders.</Text>

                        <Pressable style={[styles.next]} >
                            <Text allowFontScaling={false} style={styles.nexttext}>Join Community</Text>
                        </Pressable>
                    </View>

                </View>
            )
        }
        else if (item.type == "job") {
            return (
                <View onTouchStart={closebottomsheet} style={styles.box}>
                    <View style={styles.top} >
                        <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                            <Image style={styles.userimg} source={require("../../assets/images/p1.png")} />
                            <View style={styles.userdetail}>
                                <Text allowFontScaling={false} style={styles.u1}>raz.shhh</Text>
                                <Text allowFontScaling={false} style={styles.u2}>Community Member</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.lower}>
                        <Text style={styles.com1}>Role: Designer</Text>
                        <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>To bring all the crucial players in the startup ecosystem on a single platform To bring all the crucial players in the startup ecosystem on a single platform.</Text>
                        <Text allowFontScaling={false} style={styles.u8}>Duration: 6 months</Text>
                        <Text allowFontScaling={false} style={styles.u8}>Pay: 30,000 Rs</Text>

                        <Pressable style={[styles.next]} >
                            <Text allowFontScaling={false} style={styles.nexttext}>Apply</Text>
                        </Pressable>
                    </View>

                </View>
            )
        }
    };



    const handlePullStart = (offsetY) => {
        if (offsetY < 10) {
            setbg("transparent");
        }
        else setbg("#16181a")
    };


    const data = [
        { type: "normal" },
        { type: "blog" },
        { type: "community" },
        { type: "job" }
    ]



    // var tree;
    function counttext(text) {
        settextlength(text.length)
        // tree = text.length

    }





    var role = [
        { label: "Learner", value: "Learner" },
        { label: "Startup Enthusiast", value: "Startup Enthusiast" },
        { label: "Mentor", value: "Mentor" },
        { label: "Networker", value: "Networker" },
        { label: "Contributor", value: "Contributor" },
        { label: "Learner", value: "Learner" },
        { label: "Startup Enthusiast", value: "Startup Enthusiast" },
        { label: "Mentor", value: "Mentor" },
        { label: "Networker", value: "Networker" },
        { label: "Contributor", value: "Contributor" },
    ]
    const handlerule = (value1) => {
        console.log("Selected Value:", value1); // Optional: Log the selected value
        setrule(value1); // Update state with the selected value
    };




    const t1 = () => {
        setOpen1(!open1);
    }

    var role = [
        { label: "Learner", value: "Learner" },
        { label: "Startup Enthusiast", value: "Startup Enthusiast" },
        { label: "Mentor", value: "Mentor" },
        { label: "Networker", value: "Networker" },
        { label: "Contributor", value: "Contributor" },


    ]
    const handlerole = (value1) => {
        console.log("Selected Value:", value1); // Optional: Log the selected value
        setrole1(value1); // Update state with the selected value
    };

    function setdropdownvalue(items) {
        setlist(false)
        setrule(items.value)
        console.log("hi");

    }


    function listitem({ item }) {
        return (
            <Pressable onPress={() => { setdropdownvalue(item) }}>
                <Text style={{
                    color: '#AEAFAF',
                    textAlign: 'left',
                    fontSize: 20,
                    fontFamily: "abeeze",
                    includeFontPadding: false,
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    height: 50,
                    paddingLeft: 10,
                    textAlignVertical: 'center'
                    , includeFontPadding: false,
                }}>{item.label}</Text>
            </Pressable>
        )
    }



    const fileupload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,

        });


        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            console.log('====================================');
            console.log(result.assets[0].type);
            console.log(result.assets[0].mimeType);
            console.log('====================================');

            setImage(imageUri); // Set the selected image URI

            if (result.assets[0].type == "image") {
                settype("photo")
            }
            else settype(result.assets[0].type)
            // setfilename(result.assets)


            openBottomSheet3()
            console.log("Image URI:", imageUri);


        }

    }


    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1} // Backdrop disappears when BottomSheet is closed
            appearsOnIndex={0} // Backdrop appears when BottomSheet is open
            opacity={0.7} // Set opacity for the backdrop
        />
    );



    var timeout;
    return (
        <SafeAreaView style={styles.container}>
            <GestureHandlerRootView style={{ flex: 1 }} >

                <TouchableWithoutFeedback>
                    <Animated.View
                        style={[{ transform: [{ translateY }] }, main.header, { backgroundColor: "#16181a" }]}>
                        <Text allowFontScaling={false} style={main.headertext}>For you</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>


                {/* <TouchableWithoutFeedback onPress={closebottomsheet}> */}
                {/* <View style={{ position: "absolute" }}> */}
                <FlatList

                    scrollEventThrottle={10}
                    showsVerticalScrollIndicator={false}
                    style={main.scroll}
                    onScroll={(e) => {
                        // scroll(e.nativeEvent.contentOffset.y)
                        scrollY.setValue(e.nativeEvent.contentOffset.y)
                        // handlePullStart(e.nativeEvent.contentOffset.y);
                        // clearTimeout(timeout)
                        // timeout = setTimeout(() => {
                        //     closebottomsheet()
                        // }, 10);
                        // closebottomsheet()
                    }}

                    contentContainerStyle={{
                        // marginTop : 200,
                        paddingBottom: 100
                    }}
                    data={data}
                    renderItem={renderItem}


                    refreshControl={



                        <RefreshControl progressViewOffset={55} refreshing={refreshing}
                            onRefresh={() => {
                                // console.log("start");

                                setRefreshing(true);
                                setbg("transparent")

                                setTimeout(() => {
                                    setRefreshing(false); // Stop refreshing after fetching data
                                }, 2000); // Adjust the delay as needed
                            }} />}

                    bounces={true}
                    contentInset={{ top: 10 }}
                >

                </FlatList>
                {/* </View> */}

                {/* </TouchableWithoutFeedback> */}

                <Pressable onPress={openBottomSheet} style={styles.add}>
                    <AntDesign name="pluscircle" size={50} color="#00de62" />
                </Pressable>


                <BottomSheet


                    overlayColor="rgba(0, 0, 0, 0.9)"
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#222222', borderRadius: 30 }} // Changes the background of the sheet itself
                    handleIndicatorStyle={{ backgroundColor: '#00de62' }}

                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    onClose={() => setstatus(false)}
                    index={-1} // Initially closed


                >
                    <BottomSheetContent />
                </BottomSheet>



                {/* bottomsheet 1 */}


                <BottomSheet
                    nestedScrollEnabled={true}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#222222', borderRadius: 30 }}
                    // backgroundStyle={{ backgroundColor: 'red', borderRadius: 30 }}
                    // height={100}
                    handleIndicatorStyle={{
                        backgroundColor: '#00de62',
                        width: 70,
                        marginTop: 20

                    }}
                    style={{ marginTop: 60 }}

                    ref={bottomSheetRef1}
                    snapPoints={snapPoints1}
                    index={-1} // Initially closed

                >

                    <View style={{ height: 80, marginTop: -5 }} ><B1 /></View>
                    <BottomSheetScrollView
                        nestedScrollEnabled={true} style={{
                            flex: 1,
                            minHeight: 2000,
                            // backgroundColor: "red",
                            flexGrow: 1

                        }}>
                        <BottomSheetTextInput
                            allowFontScaling={false}
                            placeholder="Community name"
                            placeholderTextColor="#B8B8B8"
                            style={styles.input}
                            value={communityname}
                            onTextInput={() => {
                                if (err1) seterr1(false)
                                if (err2) seterr2(false)
                                if (err3) seterr3(false)
                            }
                            }
                            onChangeText={(text) => { setcommunityname(text) }}
                        />
                        {err1 && <Text style={styles.error}> *please enter this field</Text>}


                        <Text style={{
                            fontSize: 20,
                            width: "92%",
                            paddingLeft: 10,
                            marginHorizontal: "auto",
                            color: "#B8B8B8"
                        }}>Description:</Text>

                        <BottomSheetView style={{ position: "relative" }}>
                            <Text style={[styles.t2, styles.count]}>{textlength}/100</Text>
                            <BottomSheetTextInput
                                keyboardBehavior="interactive"

                                allowFontScaling={false}
                                placeholder=""
                                placeholderTextColor="#B8B8B8"
                                style={styles.input1}
                                maxLength={100}
                                multiline={true}
                                // onFocus={handleOutsideTouch}
                                // onPress={handleOutsideTouch}
                                value={description}
                                onTextInput={() => {
                                    if (err1) seterr1(false)
                                    if (err2) seterr2(false)
                                    if (err3) seterr3(false)
                                }
                                }
                                onChangeText={(text) => {
                                    setdescription(text)
                                    counttext(text)
                                }}
                            />

                        </BottomSheetView>
                        {err2 && <Text style={styles.error}> *please enter this field</Text>}

                        {/* <Drop items={role} onValueChange={handlerule} open={open1} setOpen={setOpen1} nestedScrollEnabled={true} extra={true} bottomsheet /> */}
                        <Pressable style={styles.dropdownbox} onPress={() => {
                            if (err1) seterr1(false)
                            if (err2) seterr2(false)
                            if (err3) seterr3(false)
                            setlist(!list)
                        }}>
                            <TextInput
                                editable={false}


                                placeholder="Rules"
                                placeholderTextColor={"#AEAFAF"}
                                value={rule1}
                                style={{
                                    color: '#AEAFAF',
                                    fontFamily: 'Alata',
                                    fontSize: 20,
                                    marginTop: -3,
                                }}

                            />
                            {!list && <FontAwesome6 style={styles.icon} name="chevron-down" size={20} color="#00DE62" />}
                            {list && <FontAwesome6 style={styles.icon} name="chevron-up" size={20} color="#00DE62" />}
                        </Pressable>
                        {list && <BottomSheetScrollView
                            nestedScrollEnabled

                            vertical

                            style={{
                                height: 200,
                                width: "90%",
                                margin: "auto",
                                // justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                borderBottomColor: 'black',
                                borderBottomWidth: 1,
                                height: 200,
                                includeFontPadding: false,
                            }}
                        >

                            {role.map(item => {
                                return (
                                    <Pressable key={item.value} onPress={() => {
                                        setrules(rules)
                                        setdropdownvalue(item)
                                    }}>
                                        <Text style={{
                                            color: '#AEAFAF',
                                            textAlign: 'left',
                                            fontSize: 20,
                                            fontFamily: "abeeze",
                                            includeFontPadding: false,
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                            borderBottomColor: 'black',
                                            borderBottomWidth: 1,
                                            height: 50,
                                            paddingLeft: 10,
                                            textAlignVertical: 'center'
                                            , includeFontPadding: false,
                                        }}>{item.label}</Text>
                                    </Pressable>
                                )
                            })}


                        </BottomSheetScrollView>}
                        {err3 && <Text style={styles.error1}> *please enter this field</Text>}

                        <Pressable onPress={post1} style={styles.post}>
                            <Text style={styles.posttext}>Post</Text>
                        </Pressable>


                    </BottomSheetScrollView>



                </BottomSheet>
                {/* bottomsheet1  */}




                {/* bottomsheet 2 */}

                <BottomSheet
                    nestedScrollEnabled={true}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#222222', borderRadius: 30 }}
                    // backgroundStyle={{ backgroundColor: 'red', borderRadius: 30 }}
                    // height={100}
                    handleIndicatorStyle={{
                        backgroundColor: '#00de62',
                        width: 70,
                        marginTop: 20

                    }}
                    style={{ marginTop: 60 }}

                    ref={bottomSheetRef2}
                    snapPoints={snapPoints2}
                    index={-1} // Initially closed

                >

                    <View style={{ height: 80, marginTop: -5 }} ><B2 /></View>
                    <BottomSheetScrollView
                        nestedScrollEnabled={true} style={{
                            flex: 1,
                            minHeight: 2000,
                            // backgroundColor: "red",
                            flexGrow: 1

                        }}>


                        <Text style={{
                            fontSize: 20,
                            width: "92%",
                            paddingLeft: 10,
                            marginHorizontal: "auto",
                            color: "#B8B8B8"
                        }}>Write a Blog:</Text>

                        <BottomSheetView style={{ position: "relative" }}>
                            <Text style={[styles.t2, styles.count]}>{content.length}/100</Text>
                            <BottomSheetTextInput

                                allowFontScaling={false}
                                placeholder=""
                                placeholderTextColor="#B8B8B8"
                                style={styles.input1}
                                maxLength={100}
                                multiline={true}
                                // onFocus={handleOutsideTouch}
                                // onPress={handleOutsideTouch}
                                value={content}
                                onTextInput={() => {
                                    if (err4) seterr4(false)
                                    if (err5) seterr5(false)
                                }}
                                onChangeText={(text) => {
                                    setcontent(text)
                                    // counttext(text)
                                }}
                            />
                        </BottomSheetView>
                        {err4 && <Text style={styles.error}> *please enter this field</Text>}


                        <BottomSheetTextInput
                            allowFontScaling={false}
                            placeholder="Caption"
                            placeholderTextColor="#B8B8B8"
                            style={styles.input}
                            value={caption}
                            onTextInput={() => {
                                if (err4) seterr4(false)
                                if (err5) seterr5(false)
                            }}
                            onChangeText={(text) => { setcaption(text) }}
                        />
                        {err5 && <Text style={styles.error}> *please enter this field</Text>}



                        <Pressable onPress={post2} style={styles.post}>
                            <Text style={styles.posttext}>Post</Text>
                        </Pressable>


                    </BottomSheetScrollView>



                </BottomSheet>



                {/* 333 */}

                <BottomSheet
                    nestedScrollEnabled={true}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#222222', borderRadius: 30 }}

                    handleIndicatorStyle={{ backgroundColor: '#00de62', width: 70, marginTop: 20 }}
                    style={{ marginTop: 60 }}
                    ref={bottomSheetRef3}
                    snapPoints={snapPoints3}
                    index={-1}
                    keyboardBehavior="fillParent"
                    enableDynamicSizing={true}
                >

                    <View style={{ height: 80, marginTop: -5 }} ><B3 /></View>
                    <BottomSheetScrollView
                        nestedScrollEnabled={true} style={{
                            flex: 1,
                            // minHeight: 2000,
                            // flexGrow: 1
                        }}>

                        <BottomSheetView style={{ position: "relative" }}>
                            {type == "photo" && <Image style={styles.img} source={{ uri: uri }} />}
                            {type == "video" && (
                                <Video
                                    style={styles.img}
                                    source={{ uri: uri }}
                                    useNativeControls // Enables native playback controls
                                    resizeMode="contain" // Adjusts video to fit within the view
                                    isLooping // Loops the video
                                    shouldPlay // Automatically plays the video
                                />
                            )}

                        </BottomSheetView>
                        {err6 && <Text style={styles.error}> *please enter this field</Text>}



                        <BottomSheetTextInput
                            allowFontScaling={false}
                            placeholder="Caption"
                            placeholderTextColor="#B8B8B8"
                            style={styles.input}
                            value={c2}
                            onTextInput={() => { if (err7) seterr7(false) }}
                            onChangeText={(text) => { setc2(text) }}
                        />
                        {err7 && <Text style={styles.error}> *please enter this field</Text>}






                        <Pressable onPress={post3} style={styles.post}>
                            <Text style={styles.posttext}>Post</Text>
                        </Pressable>


                    </BottomSheetScrollView>

                </BottomSheet>

                {/* 333 */}





                <BottomSheet
                    nestedScrollEnabled={true}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#222222', borderRadius: 30 }}
                    // backgroundStyle={{ backgroundColor: 'red', borderRadius: 30 }}
                    // height={100}
                    handleIndicatorStyle={{
                        backgroundColor: '#00de62',
                        width: 70,
                        marginTop: 20

                    }}
                    style={{ marginTop: 60 }}
                    enableDynamicSizing={true}
                    keyboardBehavior="fill-parent"
                    ref={bottomSheetRef4}
                    snapPoints={snapPoints4}
                    index={-1} // Initially closed

                >

                    <View style={{ height: 80, marginTop: -5 }} ><B4 /></View>
                    <BottomSheetScrollView
                        nestedScrollEnabled={true} style={{
                            flex: 1,
                            minHeight: 2000,
                            // backgroundColor: "red",
                            flexGrow: 1

                        }}>

                        <BottomSheetTextInput
                            allowFontScaling={false}
                            placeholder="Role"
                            placeholderTextColor="#B8B8B8"
                            style={styles.input}
                            value={role4}
                            onChangeText={(text) => { setrole4(text) }}
                        />


                        <Text style={{
                            fontSize: 20,
                            width: "92%",
                            paddingLeft: 10,
                            marginHorizontal: "auto",
                            color: "#B8B8B8"
                        }}>Description:</Text>

                        <BottomSheetView style={{ position: "relative" }}>
                            <Text style={[styles.t2, styles.count]}>{textlength}/100</Text>
                            <BottomSheetTextInput
                                allowFontScaling={false}
                                placeholder=""
                                placeholderTextColor="#B8B8B8"
                                style={styles.input1}
                                maxLength={100}
                                multiline={true}
                                // onFocus={handleOutsideTouch}
                                // onPress={handleOutsideTouch}
                                value={description4}
                                onChangeText={(text) => {
                                    setdescription4(text)
                                    counttext(text)
                                }}
                            />
                        </BottomSheetView>

                        <BottomSheetTextInput
                            allowFontScaling={false}
                            placeholder="Duration"
                            placeholderTextColor="#B8B8B8"
                            style={styles.input}
                            value={duration4}
                            onChangeText={(text) => { setduration4(text) }}
                        />

                        <BottomSheetTextInput
                            allowFontScaling={false}
                            placeholder="Pay"
                            placeholderTextColor="#B8B8B8"
                            style={styles.input}
                            value={pay4}
                            onChangeText={(text) => { setpay4(text) }}
                        />


                        <Pressable onPress={post4} style={styles.post}>
                            <Text style={styles.posttext}>Post</Text>
                        </Pressable>


                    </BottomSheetScrollView>

                </BottomSheet>

                {/* bottomsheet 1 */}
            </GestureHandlerRootView>
        </SafeAreaView>

    );
}

export default Foryou



const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16181a"

    },
    box: {
        width: width * 0.96,
        height: "auto",
        margin: 10,
        backgroundColor: "#1A1D1F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        margin: "auto",
        marginBottom: 25,
        paddingVertical: 20,
        // opacity : 0.5

    },
    boxText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    template: {
        width: "96%",
        borderRadius: 10,
        height: 182,
        maxHeight: 182
    },
    userimg: {
        borderRadius: 100,
        width: 36,
        aspectRatio: 1,
        margin: 10,
        marginLeft: 15,
        alignSelf: "flex-start",
        justifyContent: "flex-start"
    },
    userdetail: {
        flex: 1,
        alignSelf: "flex-start",
        paddingLeft: 5
    },
    u1: {
        fontFamily: "Alata",
        fontSize: 20,
        color: "#E9E9E9"
    },
    u2: {
        fontFamily: "Roboto",
        fontSize: 11,
        color: "#00DE62"
    },
    u3: {
        fontFamily: "Roboto",
        fontSize: 14,
        color: "#B8B8B8"
    },
    u4: {
        fontFamily: "Roboto",
        fontSize: 10,
        color: "#00DE62",
        marginTop: 3
    },
    upvote: {
        marginRight: -3
    },
    upvote1: {
        marginRight: -3,
        width: 28,
        height: 36

    },
    count: {
        alignSelf: "flex-end",
        fontFamily: "Roboto",
        fontSize: 13,
        color: "#00DE62",
        marginLeft: -2
    },
    lower: {
        display: "flex",
        // flexDirection: "row",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10,
        paddingLeft: 5,
        // justifyContent: "space-between"
    },
    iconcontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10
    }
    , icon2: {
        display: "flex",
        flexDirection: "row",
        // justifyContent : "space-between",
        // width : "90%",
        // marginHorizontal : "auto"
        gap: 5
    },
    com1: {
        fontFamily: "Alata",
        color: "#B8B8B8",
        fontSize: 36,
        marginBottom: 12
    },
    com2: {
        fontFamily: "Roboto",
        color: "#BEBEBE",
        fontSize: 12,
        marginBottom: 20
    },
    u7: {
        fontFamily: "Roboto",
        color: "#00DE62",
        fontSize: 10,
        marginVertical: 20
    },
    u8: {
        fontFamily: "Roboto",
        color: "#00DE62",
        fontSize: 12,
        marginVertical: 2
    },
    desc1: {
        fontFamily: "Roboto",
        color: "#D9D9D9",
        fontWeight: "bold",
        fontSize: 12
    }, u6: {
        fontFamily: "Roboto",
        color: "#B8B8B8",
        fontSize: 12
    },
    next: {
        backgroundColor: "#00DF60",
        borderRadius: 30,
        margin: "auto",
        // padding : 10,
        paddingHorizontal: 20,
        height: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 16,
        textAlign: "center",
        marginTop: -4

    },

    add: {
        position: "absolute",
        bottom: 80,
        right: 20,
        backgroundColor: "#16181a",
        borderRadius: 100,
    },
    bottomSheetContent: {
        display: "flex",
        flexDirection: "row",
        width: "94%",
        // height : "50%",
        marginHorizontal: "auto",
        justifyContent: "space-around",
        // backgroundColor  :"red",
        marginTop: 0
    }, iconButton: {
        display: "flex",
        width: "20%",
        height: "98%",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        alignContent: "center",
        // backgroundColor: "red",
        minWidth: "24%",
        // backgroundColor : "red",

    }, bottomsheettext: {
        textAlign: "center",
        fontSize: 12,
        color: "#B8B8B8",
        fontFamily: "Roboto",
        marginTop: -10
    },
    ic: {
        // flex : 1,
        // width : "100%",
        // // height : "100%",
        // backgroundColor : "red",
        marginHorizontal: "auto",
        justifyContent: "center",
        alignSelf: "center",
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
        marginHorizontal: "auto",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25,
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
    count: {
        fontSize: 14,
        position: "absolute",
        bottom: 25,
        right: 25,
        // backgroundColor: "red",
        width: "auto"
    },
    input1: {
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
        height: 150,
        marginTop: 10,
        padding: 10,
        textAlignVertical: "top",
        paddingBottom: 30,

    },
    post: {
        backgroundColor: "#00DE62",
        borderRadius: 20,
        height: 40,
        width: 110,
        justifyContent: "center",
        margin: "auto",
        alignSelf: "center",
        marginVertical: 40,
        textAlign: "center",
    },
    posttext: {
        textAlign: "center",
        color: "#16181A",
        fontFamily: "Alata",
        fontSize: 20,
        marginTop: -5

    },
    dropdownbox: {
        height: "auto",
        // backgroundColor : "red",
        paddingBottom: 10,
        margin: "auto",
        width: "92%",
        paddingLeft: 10,
        borderBottomWidth: 3,
        borderColor: '#16181A',
    }
    , icon: {
        position: "absolute",
        top: 0,
        right: 20
    },
    bottomsheettext1: {
        fontSize: 20,
        width: "92%",
        paddingLeft: 10,
        marginHorizontal: "auto",
        color: "#B8B8B8"
    },
    img: {
        margin: "auto",
        width: "92%",
        aspectRatio: 4 / 3,
        // borderRadius: 100,
        marginBottom: 50,
        borderRadius: 16
    }
    , error: {
        color: "red",
        textAlign: "left",
        marginLeft: 20,
        marginTop: -20,
        marginBottom: 20
    }
    , error1: {
        color: "red",
        textAlign: "left",
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 20
    }
});