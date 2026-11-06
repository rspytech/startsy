import React, { useState, useRef, useEffect, useCallback, useContext, useMemo } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
    TouchableWithoutFeedback,
    ActivityIndicator,
    Alert,
    Modal,
    BackHandler,
    TouchableOpacity

} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';


import { Video } from 'expo-av';

import styles from "../styles/post.js"
import Apnauser from "./Apnauser.js"

import B1 from "../assets/icons/b1.js"
import B2 from "../assets/icons/b2.js"
import B3 from "../assets/icons/b3.js"
import B4 from "../assets/icons/b4.js"


import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput, BottomSheetDraggableView, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NewsLettericon from "../assets/icons/Newsletter.js"
import main from "../styles/main.js"
import NewsLetter from "./main-2/Newsletter.js"
import Notification from "./main-2/Notification.js"
import Foryou from "./main-2/Foryou.js"
import Startsy from "./main-1/Startsy.js"
// import Message from "./main-1/Message.js"
import ChatScreen from "./main-2/Message.js"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Profile from "./main-2/Profile.js"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from '@expo/vector-icons/Fontisto';
import NewsletterPage from "./main-2/news1.js"
import Singleprofilepage from "../SCREENS/singleprofilepage.js"
import { GlobalContext } from "@/Global/globalcontext.js";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../config.js"


const Main2 = ({ navigation }) => {

    // navigation.navigate("Green")
    const [token, setToken] = useState("");
    const { globaldata } = useContext(GlobalContext);

    // useFocusEffect(
    //     useCallback(() => {
    //         console.log(globaldata, "global data");
    //         setToken(globaldata.token);

    //     }, [globaldata])
    // );



    useEffect(() => {
        // Listener for the hardware back button
        const backAction = () => {

            console.log("hiii exiting ");





            if (co == true) {
                console.log("something open");

                mainpagebottomsheet.current?.close();
                bottomSheetRef1.current?.close();
                bottomSheetRef2.current?.close();
                bottomSheetRef3.current?.close();
                bottomSheetRef4.current?.close();
                bottomSheetRef5.current?.close();
                setiscommentopen(false);
                return true; // Prevent default behavior
            }

            else {
                // BackHandler.exitApp()
                console.log("no open");
                return true; // Prevent default behavior
            }
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); // Cleanup
    }, [co]);

    useFocusEffect(
        useCallback(()=>{
            const backAction = () => {

                console.log("hiii exiting ");
    
                if (co == true) {
                    console.log("something open");
    
                    mainpagebottomsheet.current?.close();
                    bottomSheetRef1.current?.close();
                    bottomSheetRef2.current?.close();
                    bottomSheetRef3.current?.close();
                    bottomSheetRef4.current?.close();
                    bottomSheetRef5.current?.close();
                    setiscommentopen(false);
                    return true; // Prevent default behavior
                }
    
                else {
                    BackHandler.exitApp()
                    console.log("no open");
                    return true; // Prevent default behavior
                }
            };
    
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction
            );
        } , [])
    )

    useEffect(() => {
        async function getToken() {

            const temp = await AsyncStorage.getItem("accessToken");
            console.log('====================================');
            console.log("main screen pe anne ke baad ke token", temp);
            console.log('====================================');
            setToken(temp);
        }
        getToken();
    }, []);




    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor("black");
            StatusBar.setBarStyle("light-content");
            StatusBar.setTranslucent(true);
        }, [])
    );


    const fileupload = async (aspect) => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }




        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: aspect,
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

    const [bg, setbg] = useState("#16181a")



    const Tab = createBottomTabNavigator();







    const updatescroll = (val) => {
        // console.log('====================================');
        // console.log(val);
        t1.setValue(val);
        // console.log('====================================');
    }

    const t1 = new Animated.Value(0);
    const diffclamp = Animated.diffClamp(t1, 0, 55);
    const bottomposition = diffclamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, 55],
        extrapolate: "clamp",
    })

    const bottomSheetRef5 = useRef(null);
    const snapPoints5 = useMemo(() => ["50%", "100%"], []);

    const comments = ({ item, index }) => {

        function time(time) {
            // console.log('====================================');
            // console.log(time);
            var data1 = new Date(time)
            // console.log('====================================');
            // console.log(data1);
            // console.log('====================================');
            // console.log('====================================');
            var seconds = Math.floor((new Date() - data1) / 1000);

            var interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + " years ago";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " months ago";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " days ago";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " hours ago";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " minutes ago";
            }
            return Math.floor(seconds) + " seconds ago";
        }
        return (
            <View key={index} style={styles.listItem}>
                <Image
                    source={{ uri: item.userId.profilePhoto }}
                    style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text allowFontScaling={false} style={styles.username}>{item.userId.userName}</Text>
                    <Text allowFontScaling={false} style={styles.message}>{item.comment.trim()}</Text>
                </View>
                <Text allowFontScaling={false} style={styles.time}>{time(item.createdAt)}</Text>
            </View>
        )
    }
    const mainpagebottomsheet = useRef()
    const snapPoints = useMemo(() => ['29%'], []);
    const snapPoints1 = useMemo(() => ['120%'], []);
    const snapPoints2 = useMemo(() => ['120%'], []);
    const snapPoints3 = useMemo(() => ['120%'], []);
    const snapPoints4 = useMemo(() => ['120%'], []);
    // const snapPoints5 = useMemo(() => ["50%", "100%"], []);

    const bottomSheetRef1 = useRef(null);
    const bottomSheetRef2 = useRef(null);
    const bottomSheetRef3 = useRef(null);
    const bottomSheetRef4 = useRef(null);
    // const bottomSheetRef5 = useRef(null);


    const [type, settype] = useState("")

    const [uri, setImage] = useState(null)

    const [err1, seterr1] = useState(false)
    const [err2, seterr2] = useState(false)
    const [err3, seterr3] = useState(false)
    const [err4, seterr4] = useState(false)
    const [err5, seterr5] = useState(false)
    const [err6, seterr6] = useState(false)
    const [err7, seterr7] = useState(false)
    const [err10, seterr10] = useState(false)
    const [err11, seterr11] = useState(false)
    const [err12, seterr12] = useState(false)
    const [err13, seterr13] = useState(false)
    const [err14, seterr14] = useState(false)
    const [err15, seterr15] = useState(false)


    const [status1, setstatus] = useState(false)

    // const [err7, seterr7] = useState(false)

    var role = [
        { label: "Only for Founders", value: "Only for Founders" },
        { label: "Only for Community Members", value: "Only for Community Members" },
        { label: "Job seeker", value: "Jobseeker" },
        { label: "Startup Enthusiast", value: "Startup Enthusiast" },
        { label: "Mentor", value: "Mentor" },
        { label: "Networker", value: "Networker" },
        { label: "Founder or Mentor", value: "Founder or Mentor" },
        { label: "Founder or Startup Enthusiast", value: "Founder or Startup Enthusiast" },
        { label: "No rules", value: "No rules" },



    ]


    const openBottomSheet1 = () => {
        setfirstbottomsheet1(true)
        bottomSheetRef1.current?.expand();
        seterr1(false)
        seterr2(false)
        seterr3(false)
        setstatus(true)
    };
    const openBottomSheet2 = () => {
        bottomSheetRef2.current?.expand();
        seterr4(false)
        seterr5(false)
        setstatus(true)
    };
    const openBottomSheet3 = () => {
        bottomSheetRef3.current?.expand();
        setstatus(true)
        seterr7(false)
        seterr6(false)
        setVisible(false)
    };
    const openBottomSheet4 = () => {
        bottomSheetRef4.current?.expand();
        setstatus(true)
        seterr10(false)
        seterr11(false)
        seterr12(false)
        seterr13(false)
        seterr14(false)
        seterr15(false)
    };

    const [uploadingcomment, setuploadingcomment] = useState(false)

    const [visible, setVisible] = useState(false);
    const CustomAlert = ({ visible, onClose }) => {
        const fadeAnim = useRef(new Animated.Value(0)).current; // Persistent animated value

        useEffect(() => {
            if (visible) {
                Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
            } else {
                Animated.timing(fadeAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start(() => {
                    if (typeof onClose === "function") {
                        onClose(); // Ensure onClose exists before calling
                    }
                });
            }
        }, [visible]);

        if (!visible) return null; // Prevent rendering when not visible

        async function deletepost1() {
            console.log("Deleting post...");
            if (idofposttobedeleetd != null) {
                try {
                    const response = await fetch(`${url}posts/deletepost/${idofposttobedeleetd}`, {
                        method: 'POST',
                        body: "",
                        headers: {
                            accept: "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    const data = await response.json();
                    console.log(data);

                    // Remove the post from the local state
                    const updatedPosts = posts.filter((post) => post._id !== idofposttobedeleetd);
                    setPosts(updatedPosts);
                    setVisible(false)
                } catch (err) {
                    console.log(err);
                }
            }
        }

        return (
            <Modal transparent visible={visible} animationType="none" onRequestClose={() => onClose?.()}>
                <TouchableWithoutFeedback onPress={() => onClose?.()}>
                    <Animated.View style={[styles1.overlay, { opacity: fadeAnim }]}>
                        <TouchableWithoutFeedback>
                            <View style={styles1.alertBox}>
                                <Text style={styles1.title}>Choose aspect ratio</Text>

                                <TouchableOpacity onPress={() => {
                                    setnewaspect("4/3")
                                    fileupload([4, 3])
                                }} style={styles1.button}>
                                    <Text style={styles1.buttonText}>4:3 (Standard)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setnewaspect("16/9")
                                    fileupload([16, 9])
                                }} style={styles1.button}>
                                    <Text style={styles1.buttonText}>16:9 (Wide)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setnewaspect("1/1")
                                    fileupload([1, 1])
                                }} style={styles1.button}>
                                    <Text style={styles1.buttonText}>1/1 (Square)</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    const askAspectRatio = async () => {
        // Ask user to choose aspect ratio
        const options = [
            { label: "1:1 (Square)", aspect: [1, 1] },
            { label: "16:9 (Wide)", aspect: [16, 9] },
            { label: "4:3 (Standard)", aspect: [4, 3] },
        ];

        setVisible(true)


    };


    const post1 = async function () {
        setp1u(true)
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

        if (hasError) {
            setp1u(false)
            return
        };

        if (p1u) {
            setp1u(false)
            return
        }

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
            setp1text("Posted")
            setcommunityname("")
            setdescription("")
            setrules("")
            setdropdownvalue("")


            console.log(data);
            mainpagebottomsheet.current?.close()
            setTimeout(() => {
                bottomSheetRef1.current?.close();
                setp1text("Post")
            }, 1000);
        } catch (err) {
            console.error("Error:", err);
        }
        finally {
            setp1u(false)
        }
    };

    const post2 = async function () {
        setp2u(true)
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
        if (p2u) return

        const postType = "textBlog"; // Define postType value
        const finaldata = {
            "caption": caption,
            "content": content,
        };
        console.log(finaldata);
        console.log(`${url}posts/createPost/${postType}`);



        try {
            const response = await fetch(`${url}posts/createPost/${postType}`, {
                method: 'POST',
                body: JSON.stringify(finaldata), // Convert object to JSON string
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            setp2text("Posted")
            console.log(data);
            mainpagebottomsheet.current?.close()
            setTimeout(() => {
                setcontent("")
                setcaption("")
                setp2text("Post")

                bottomSheetRef2.current?.close();
            }, 1000);
        } catch (err) {
            console.error("Error:", err);
        }
        finally {
            setp2u(false)
            seterr4(false)
            seterr5(false)
        }
    };


    const post3 = async function () {
        setp3u(true)
        let hasError = false;
        if (uri == "") {
            seterr6(true)
            hasError = true
        }
        if (c2 == "") {
            seterr7(true)
            hasError = true
        }

        if (hasError) {
            setp3u(false)
            return
        };
        if (p3u) {
            setp3u(false)
            return
        };

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
        finaldata.append("aspectRatio", newaspect)



        console.log(finaldata);


        try {
            if (type == "images") {
                type = "photo"
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
            setp3text("Posted")
            console.log(data);
            mainpagebottomsheet.current?.close()
            setTimeout(() => {
                bottomSheetRef3.current?.close();
            }, 1000);
        } catch (err) {
            console.error("Error:", err);
        }
        finally {
            setp3u(false)
            seterr6(false)
            seterr7(false)
            setc2("")
            setp3text("Post")

        }
    };


    const post4 = async function () {
        let joberror = false

        setp4u(true);
        if (role4 == "") {
            seterr10(true)
            joberror = true
        }
        if (description4 == "") {
            seterr11(true)
            joberror = true

        }
        if (duration4 == "") {
            seterr12(true)
            joberror = true
        }
        if (pay4 == "") {
            seterr13(true)
            joberror = true
        }

        if (joberror == true) {
            setp4u(false)
            return
        }

        if (isNaN(duration4) || duration4 < 0 || duration4 > 100) {
            seterr14(true)
            setp4u(false)
            joberror = true
            return
        }
        if (isNaN(pay4) || pay4 < 0 || pay4 > 1000000000) {
            seterr15(true)
            setp4u(false)
            joberror = true
            return
        }
        if (joberror == true) {
            setp4u(false)
            return
        }

        const postType = "jobPost"; // Define postType value
        const finaldata = {
            "role": role4,
            "description": description4,
            "duration": duration4,
            "pay": pay4,
        };
        if (p4u) { return }

        console.log('====================================');
        console.log(finaldata);
        console.log('====================================');

        try {
            const response = await fetch(`${url}posts/createJobPost/${postType}`, {
                method: 'POST',
                body: JSON.stringify(finaldata), // Convert object to JSON string
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server Error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            setp4text("Posted")
            console.log(data);
            mainpagebottomsheet.current?.close()
            setTimeout(() => {
                setrole4("")
                setduration4("")
                setpay4("")
                setdescription4("")
                setp4text("Post")
                bottomSheetRef4.current?.close();
            }, 1000);
        } catch (err) {
            console.error("Error:", err);
        }
        finally {
            setp4u(false);

        }
    };
    const [postid, setpostid] = useState(null)

    const [co, setiscommentopen] = useState(false)


    async function opencomment(id) {
        setcomment(true)
        bottomSheetRef5.current?.expand();
        setpostid(id);
        setiscommentopen(true)

        console.log("open comment");


        try {
            console.log(token);
            const response = await fetch(`${url}posts/getComments/${id}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // console.log(response.status);
            console.log(data.data);
            setallcomments(data.data)
            if (data.data.length == 0) {
                setemptycomment(true)
            }
            else {
                setemptycomment(false)

            }

        }
        catch (err) {
            console.log(err);
        }



    }


    async function docomment() {
        console.log("doing comment");
        console.log(postid);
        console.log(commenttext);
        setuploadingcomment(true)


        try {

            const response = await fetch(`${url}posts/createComment/${postid}`, {
                method: 'POST',
                body: JSON.stringify({ comment: commenttext }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            setemptycomment(false)

            console.log(response.status);
            setcommenttext("");

            var object = {
                comment: commenttext,
                createdAt: new Date(),
                userId: {
                    profilePhoto: data.profilePhoto,
                    userName: data.userName,
                }
            }
            var newarray = [...allcomments]
            newarray.unshift(object)
            setallcomments(newarray)


            const scrollToTop = () => {
                flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
            };
            scrollToTop();
            scrollToTop();

        }
        catch (err) {
            console.log(err);

        }
        finally {
            setuploadingcomment(false)
            // Keyboard.dismiss();
        }

    }

    const [textlength, settextlength] = useState(0);


    var [aspect, setaspect] = useState("")
    var [newaspect, setnewaspect] = useState("")


    const [firstbottomsheet, setfirstbottomsheet] = useState(false)
    const [firstbottomsheet1, setfirstbottomsheet1] = useState(false)


    const [p1u, setp1u] = useState(false)
    const [p2u, setp2u] = useState(false)
    const [p3u, setp3u] = useState(false)
    const [p4u, setp4u] = useState(false)

    const [p1text, setp1text] = useState("Post")
    const [p2text, setp2text] = useState("Post")
    const [p3text, setp3text] = useState("Post")
    const [p4text, setp4text] = useState("Post")


    const [role4, setrole4] = useState("")
    const [description4, setdescription4] = useState("")
    const [duration4, setduration4] = useState("")
    const [pay4, setpay4] = useState("")


    const [caption, setcaption] = useState("")
    const [content, setcontent] = useState("")



    const [communityname, setcommunityname] = useState("")
    const [description, setdescription] = useState("")
    const [rules, setrules] = useState("")

    const [comment, setcomment] = useState(false)

    const [rule1, setrule] = useState("")
    const [open1, setOpen1] = useState(false);
    const [list, setlist] = useState(false)
    const [emptycomment, setemptycomment] = useState(false)
    const flatListRef = useRef(null);
    const [allcomments, setallcomments] = useState([])
    const [commenttext, setcommenttext] = useState("")



    const [c2, setc2] = useState("")
    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1} // Backdrop disappears when BottomSheet is closed
            appearsOnIndex={0} // Backdrop appears when BottomSheet is open
            opacity={0.7} // Set opacity for the backdrop
        />
    );



    function counttext(text) {
        settextlength(text.length)
        // tree = text.length

    }


    function setdropdownvalue(items) {
        setlist(false)
        setrule(items.value)
        console.log("hi");

    }

    function del() {
        seterr10(false)
        seterr11(false)
        seterr12(false)
        seterr13(false)
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
                askAspectRatio()
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

    useEffect(() => {
        const unsubscribe = navigation.addListener("tabPress", () => {
            console.log("Tab changed!");
            // Call your function
        });

        return unsubscribe;
    }, [navigation]);


    function closeall() {
        mainpagebottomsheet.current?.close();
        bottomSheetRef1.current?.close();
        bottomSheetRef2.current?.close();
        bottomSheetRef3.current?.close();
        bottomSheetRef4.current?.close();
        bottomSheetRef5.current?.close();
    }

    return (


        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={main.container}>


                <CustomAlert visible={visible} onClose={() => setVisible(false)} />

                {/* <NavigationContainer independent={true}> */}
                <Tab.Navigator


                    initialRouteName="Startsy"
                    screenOptions={{
                        animationEnabled: true,
                        tabBarActiveTintColor: "#00DE62",
                        tabBarInactiveTintColor: "#7A7B7C",
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: '#16181a',
                            height: 60,
                            zIndex: 1,
                            elevation: 0,
                            opacity: 1,
                            borderTopWidth: 0,
                            paddingTop: 10,
                            position: "absolute",
                            // transform :[{translateY : bottomposition}] 
                        },
                    }}

                >
                    <Tab.Screen
                        name="NewsLetter"
                        children={(props) => <NewsLetter mainpagebottomsheet={mainpagebottomsheet} navigation={navigation} token={token} closeall={closeall} />}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (

                                <View style={{ flex: 1, width: 30, marginLeft: 10, justifyContent: "center", height: 30 }}>
                                    <NewsLettericon color={focused ? "#00DE62" : "#828282"} />
                                </View>
                                // <Image style={{ width: 22, height: 32 }}
                                //     source={focused ? require("../assets/images/news_focus.png") : require("../assets/images/news_normal.png")} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="bell"
                        // component={Notification}
                        children={(props) => <Notification mainpagebottomsheet={mainpagebottomsheet} navigation={navigation} token={token} closeall={closeall} />}

                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (
                                <Fontisto name="bell" size={35} color={focused ? "#00DE62" : "#7A7B7C"} />
                                // <Fontisto name="bell" size={24} color="black" />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Startsy"
                        children={(props) => <Foryou navigation={navigation} scroll={updatescroll} token={token} mainpagebottomsheet={mainpagebottomsheet} opencomment={opencomment} visible={visible} setVisible={setVisible} co={co} />}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (
                                // <NewsLetter/>
                                <Image style={{ width: 50, height: 50 }} source={require("../assets/images/logo.png")} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Message"
                        // component={ChatScreen}
                        children={(props) => <ChatScreen mainpagebottomsheet={mainpagebottomsheet} closeall={closeall} navigation={navigation} token={token} />}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (
                                <MaterialCommunityIcons name="message-text-outline" size={34} color={focused ? "#00DE62" : "#7A7B7C"} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        // component={Profile}
                        children={() => <Apnauser closeall={closeall} mainpagebottomsheet={mainpagebottomsheet} navigation={navigation} token={token} />}


                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (
                                <FontAwesome6 name="circle-user" size={32} color={focused ? "#00DE62" : "#7A7B7C"} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="NewsletterPage"
                        component={NewsletterPage} // Replace with the desired component

                        options={{
                            tabBarButton: () => null, // Hides the tab from the bar
                            tabBarVisible: false,     // Ensures it doesn't take space in the bar
                        }}
                    />
                    <Tab.Screen
                        name="Singleuserpage"
                        // component={Singleprofilepage} // Replace with the desired component
                        children={() => <Singleprofilepage navigation={navigation} />}
                        options={{
                            tabBarButton: () => null, // Hides the tab from the bar
                            tabBarVisible: false,     // Ensures it doesn't take space in the bar
                        }}
                    />

                </Tab.Navigator>



                <BottomSheet


                    overlayColor="rgba(0, 0, 0, 0.9)"
                    // backdropComponent={renderBackdrop}
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }} // Changes the background of the sheet itself
                    handleIndicatorStyle={{ backgroundColor: '#00de62' }}
                    style={{ zIndex: 10 }}
                    ref={mainpagebottomsheet}
                    snapPoints={snapPoints}
                    onClose={() => {

                        // setstatus(false)
                        // setp1u(false)
                        // setwillopen(false)

                    }}
                    index={-1} // Initially closed


                >
                    <BottomSheetContent />
                </BottomSheet>



                <BottomSheet
                    nestedScrollEnabled={true}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}
                    // backgroundStyle={{ backgroundColor: 'red', borderRadius: 30 }}
                    // height={100}
                    handleIndicatorStyle={{
                        backgroundColor: '#00de62',
                        width: 70,
                        marginTop: 20

                    }}
                    onClose={() => { setp2u(false) }}
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
                            <Text style={[styles.t2, styles.count]}>{textlength}/1000</Text>
                            <BottomSheetTextInput
                                keyboardBehavior="interactive"

                                allowFontScaling={false}
                                placeholder=""
                                placeholderTextColor="#B8B8B8"
                                style={styles.input1}
                                maxLength={1000}
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
                            {!p1u && <Text style={styles.posttext}>{p1text}</Text>}
                            {p1u && <ActivityIndicator size={24} color="#16181a" />}
                        </Pressable>


                    </BottomSheetScrollView>



                </BottomSheet>


                <BottomSheet
                    onClose={() => setiscommentopen(false)}
                nestedScrollEnabled={true}
                overlayColor="rgba(0, 0, 0, 0.5)"
                enablePanDownToClose
                backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}
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
                        <Text style={[styles.t2, styles.count]}>{content.length}/1000</Text>
                        <BottomSheetTextInput

                            allowFontScaling={false}
                            placeholder=""
                            placeholderTextColor="#B8B8B8"
                            style={styles.input1}
                            maxLength={1000}
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

                        {!p2u && <Text style={styles.posttext}>{p2text}</Text>}
                        {p2u && <ActivityIndicator size={24} color="#16181a" />}
                    </Pressable>


                </BottomSheetScrollView>



            </BottomSheet>




            <BottomSheet
                nestedScrollEnabled={true}
                overlayColor="rgba(0, 0, 0, 0.5)"
                enablePanDownToClose
                backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}
                onClose={() => { setiscommentopen(false); }}

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
                        {type == "photo" && <Image style={[styles.img, { aspectRatio: newaspect }]} source={{ uri: uri }} />}
                        {type == "video" && (
                            <Video
                                style={[styles.img, { aspectRatio: 1 / 1 }]}
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
                        onClose={() => { setp3u(false) }}
                        onTextInput={() => { if (err7) seterr7(false) }}
                        onChangeText={(text) => { setc2(text) }}
                    />
                    {err7 && <Text style={styles.error}> *please enter this field</Text>}






                    <Pressable onPress={post3} style={styles.post}>
                        {/* <Text style={styles.posttext}>Post</Text> */}

                        {!p3u && <Text style={styles.posttext}>{p3text}</Text>}
                        {p3u && <ActivityIndicator size={24} color="#16181a" />}
                    </Pressable>


                </BottomSheetScrollView>
            </BottomSheet>





            <BottomSheet
                nestedScrollEnabled={true}
                overlayColor="rgba(0, 0, 0, 0.5)"
                enablePanDownToClose
                backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}
                // backgroundStyle={{ backgroundColor: 'red', borderRadius: 30 }}
                // height={100}
                handleIndicatorStyle={{
                    backgroundColor: '#00de62',
                    width: 70,
                    marginTop: 20

                }}
                onClose={() => {
                    setp4u(false)
                    setiscommentopen(false);

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
                        onChangeText={(text) => {
                            del()

                            setrole4(text)
                        }}
                    />
                    {err10 && <Text style={styles.error}>*Please enter a role</Text>}



                    <Text style={{
                        fontSize: 20,
                        width: "92%",
                        paddingLeft: 10,
                        marginHorizontal: "auto",
                        color: "#B8B8B8"
                    }}>Description:</Text>

                    <BottomSheetView style={{ position: "relative" }}>
                        <Text style={[styles.t2, styles.count]}>{textlength}/1000</Text>
                        <BottomSheetTextInput
                            allowFontScaling={false}
                            placeholder=""
                            placeholderTextColor="#B8B8B8"
                            style={styles.input1}
                            maxLength={1000}
                            multiline={true}
                            // onFocus={handleOutsideTouch}
                            // onPress={handleOutsideTouch}
                            value={description4}
                            onChangeText={(text) => {
                                setdescription4(text)
                                del()
                                counttext(text)
                            }}
                        />
                    </BottomSheetView>
                    {err11 && <Text style={styles.error}>*Please enter a description</Text>}


                    <BottomSheetTextInput
                        allowFontScaling={false}
                        placeholder="Duration"
                        placeholderTextColor="#B8B8B8"
                        style={styles.input}
                        value={duration4}
                        onChangeText={(text) => {
                            del()

                            setduration4(text)
                        }}
                    />
                    {err12 && <Text style={styles.error}>*Please enter a duration</Text>}
                    {err14 && <Text style={styles.error}>*Please enter a valid duration</Text>}



                    <BottomSheetTextInput
                        allowFontScaling={false}
                        placeholder="Pay"
                        placeholderTextColor="#B8B8B8"
                        style={styles.input}
                        value={pay4}
                        onChangeText={(text) => {
                            del()
                            setpay4(text)
                        }}
                    />
                    {err13 && <Text style={styles.error}>*Please enter a duration</Text>}
                    {err15 && <Text style={styles.error}>*Please enter a valid duration</Text>}




                    <Pressable onPress={post4} style={styles.post}>
                        {/* <Text style={styles.posttext}>{p4text}</Text> */}

                        {!p4u && <Text style={styles.posttext}>{p4text}</Text>}
                        {p4u && <ActivityIndicator size={24} color="#16181a" />}
                    </Pressable>


                </BottomSheetScrollView>

            </BottomSheet>




            <BottomSheet


                overlayColor="rgba(0, 0, 0, 0.9)"
                backdropComponent={renderBackdrop}
                enablePanDownToClose
                backgroundStyle={{ backgroundColor: '#1A1D1F', borderRadius: 30 }} // Changes the background of the sheet itself
                handleIndicatorStyle={{ backgroundColor: '#00de62' }}

                ref={bottomSheetRef5}
                snapPoints={snapPoints5}
                onClose={() => {
                    setcomment(false)
                    setstatus(false)
                    setiscommentopen(false);


                    // Keyboard.dismiss()
                    // headeref.current.setNativeProps({
                    //     style: { zIndex: 1 }, // Change the style here
                    // });
                }}
                index={-1} // Initially closed
                contentContainerStyle={{ zIndex: 100, elevation: 20, }}


            >
                <View style={{ flex: 0.92 }}>

                    <Text style={styles.comment}>Comments</Text>
                    {/* <KeyboardAvoidingView behavior="" keyboardVerticalOffset={-100} style={{ flex: 1 }}> */}
                    {emptycomment && <Text style={styles.no}>No comments yet</Text>}
                    <BottomSheetFlatList
                        ref={flatListRef}
                        data={allcomments}
                        renderItem={comments}
                        scrollEnabled={true}
                        style={{ flex: 0.7, height: "100", overflow: "hidden" }}
                    // contentContainerStyle={  }}

                    />
                    {/* </KeyboardAvoidingView> */}
                    <View
                        style={styles.sc1}>
                        <TextInput
                            placeholder=""

                            placeholderTextColor="#828282"
                            style={styles.searchInput}
                            value={commenttext}
                            multiline={true}
                            onChangeText={text => setcommenttext(text)}
                        />
                        <Pressable onPress={docomment} style={styles.send} >

                            {uploadingcomment && <ActivityIndicator size={24} color="#00de62" />}
                            {!uploadingcomment && <Ionicons name="send" size={24} color="#00DE62" />}
                        </Pressable>
                    </View>




                </View>

            </BottomSheet>











            {/* </NavigationContainer> */}
        </SafeAreaView>
        </GestureHandlerRootView >
    )


    
}


export default Main2;
const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)

const styles1 = StyleSheet.create({
    searchContainer: {
        marginHorizontal: "auto",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        display: "flex",
        // marginBottom: 320,
        backgroundColor: "transparent",

        // position : "absolute",
        // bottom : 0
    },
    searchInput: {
        height: "auto",
        minHeight: 50,
        width: width * 0.95,
        borderColor: "#00DE62",
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 20,
        color: "#828282",
        fontFamily: "Roboto",
        fontSize: 18,
        maxHeight: 100,

        // marginBottom  :20
    },
    send: {
        // width: 20,
        // height: 20,
        position: "absolute",
        top: 12,
        right: 10,
        transform: [{ scale: 1.1 }],
        alignSelf: "center",
        verticalAlign: "center",
        bottom: 0,
    },

    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", alignItems: "center" },
    alertBox: { width: 300, backgroundColor: "#1A1D1F", padding: 20, borderRadius: 20, alignItems: "center" },
    title: { fontSize: 20, fontWeight: "bold", color: "#D9D9D9", fontFamily: "Alata" },
    message: { fontSize: 16, marginVertical: 10, textAlign: "center", color: "#D9D9D9", fontFamily: "Roboto" },
    button: { marginTop: 15, backgroundColor: "#00de62", padding: 10, paddingHorizontal: 37, borderRadius: 10, minWidth: 200, textAlign: "center" },
    buttonText: { color: "#1A1D1F", fontSize: 16, fontFamily: "Roboto", fontWeight: "700", textAlign: "center" },
    showButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5 },
    showButtonText: { color: "#fff", fontSize: 16 },

})