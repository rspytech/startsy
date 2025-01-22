


import React, { useState, useRef, useEffect, useMemo, useContext, useCallback } from "react";
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
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ActivityIndicator,
    BackHandler,
    ToastAndroid,

} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "../../styles/post.js"

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

import { url } from "../../config.js"
import { useRoute } from "@react-navigation/native";
import { Keyboard } from "react-native";
const Foryou = ({ scroll, navigation, token }) => {



    const [allpost, setallpost] = useState([])
    const [willopen, setwillopen] = useState(false)
    // console.log(token);



    // const [token, settoken] = useState("")
    const [comment, setcomment] = useState(false)
    const [loading, setloading] = useState(true)
    const [loading1, setloading1] = useState(true)

    const [p1u, setp1u] = useState(false)
    const [p2u, setp2u] = useState(false)
    const [p3u, setp3u] = useState(false)
    const [p4u, setp4u] = useState(false)

    const [p1text, setp1text] = useState("Post")
    const [p2text, setp2text] = useState("Post")
    const [p3text, setp3text] = useState("Post")
    const [p4text, setp4text] = useState("Post")

    const [co, setiscommentopen] = useState(false)
    const [allcomments, setallcomments] = useState([])

    const [postid, setpostid] = useState(null)
    const [commenttext, setcommenttext] = useState("")
    const { globaldata, updateField } = useContext(GlobalContext);

    // useEffect(() => {
    //     // console.log(globaldata, "global data");
    //     settoken(globaldata.token)
    // }, [])

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A");
        StatusBar.setBarStyle("light-content");
    })


    useEffect(() => {
        // Listener for the hardware back button
        const backAction = () => {
            console.log(co);
            console.log(co, "cooo");


            if (co == true) {
                bottomSheetRef5.current?.close();
                setiscommentopen(false);
                return true; // Prevent default behavior
            }

            else {
                BackHandler.exitApp()
            }
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); // Cleanup
    }, [co]);

    async function getpost() {
        try {
            const response = await fetch(`${url}posts/getPosts`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();

            // console.log(data.data[0]);
            console.log(response.status);
            console.log(data);


            var data1 = data.data.map(e => {
                var object = { ...e, isliked: false, Applied: false }
                return object
            })

            // console.log(data1[0]);



            if (data.data.length > 0) {
                setallpost(data1.reverse())
            }



        }
        catch (err) {
            console.log(err);
        }
        finally {
            setloading(false);
        }

    }

    useEffect(() => {
        // console.log("start");


        getpost()
        // setTimeout(() => {
        //     getpost()
        //     // console.log(allpost);

        // }, 1000);

    }, [token])




    const [uri, setImage] = useState(null)
    const [status1, setstatus] = useState(false)
    const [bg, setbg] = useState("#16181a")
    const [refreshing, setRefreshing] = useState(false);
    const [refreshing1, setRefreshing1] = useState(false);
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
    const bottomSheetRef5 = useRef(null);
    const flatListRef = useRef(null);

    // Snap points for the bottom sheet
    const snapPoints = useMemo(() => ['29%'], []);
    const snapPoints1 = useMemo(() => ['120%'], []);
    const snapPoints2 = useMemo(() => ['120%'], []);
    const snapPoints3 = useMemo(() => ['120%'], []);
    const snapPoints4 = useMemo(() => ['120%'], []);
    const snapPoints5 = useMemo(() => ["50%", "100%"], []);

    const [err1, seterr1] = useState(false)
    const [err2, seterr2] = useState(false)
    const [err3, seterr3] = useState(false)
    const [err4, seterr4] = useState(false)
    const [err5, seterr5] = useState(false)
    const [err6, seterr6] = useState(false)
    // const [err7, seterr7] = useState(false)

    const [firstbottomsheet, setfirstbottomsheet] = useState(false)
    const [firstbottomsheet1, setfirstbottomsheet1] = useState(false)
    const [err7, seterr7] = useState(false)
    const [err, seterr] = useState(false)
    const [emptycomment, setemptycomment] = useState(false)

    function removeerr() {
        seterr(false)
        seterr1(false)
        seterr2(false)
        seterr3(false)
    }



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

        if (hasError) { return };

        if (p1u) {
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
            console.log(data);
            bottomSheetRef.current?.close()
            setTimeout(() => {
                bottomSheetRef1.current?.close();
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
            bottomSheetRef.current?.close()
            setTimeout(() => {
                bottomSheetRef2.current?.close();
            }, 1000);
        } catch (err) {
            console.error("Error:", err);
        }
        finally {
            setp2u(false)
        }
    };
    const post4 = async function () {

        setp4u(true);

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
            bottomSheetRef.current?.close()
            setTimeout(() => {
                bottomSheetRef4.current?.close();
            }, 3000);
        } catch (err) {
            console.error("Error:", err);
        }
        finally {
            setp4u(false);

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

        if (hasError) { return };
        if (p3u) return;

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
            bottomSheetRef.current?.close()
            setTimeout(() => {
                bottomSheetRef3.current?.close();
            }, 3000);
        } catch (err) {
            console.error("Error:", err);
        }
        finally {
            setp3u(false)
        }
    };


    // Function to open the bottom sheet
    const openBottomSheet = () => {
        setwillopen(true)
        // setfirstbottomsheet(true)
        function open() {
            bottomSheetRef.current?.expand();
            setstatus(true)
        };
        open()
    }
    const openBottomSheet1 = () => {
        setfirstbottomsheet1(true)
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
            var newarray = allcomments.unshift(object)
            setallcomments(allcomments)


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
            Keyboard.dismiss();
        }

    }

    const [viewableItems, setViewableItems] = useState([]);
    const [videoStates, setVideoStates] = useState({});
    const videoRefs = useRef({});
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        setViewableItems(viewableItems);

        // Update play state for videos based on visibility
        const updatedVideoStates = {};
        viewableItems.forEach(viewableItem => {
            if (viewableItem.isViewable) {
                updatedVideoStates[viewableItem.item._id] = true; // Video should play when in view
            } else {
                updatedVideoStates[viewableItem.item._id] = false; // Video should stop when out of view
            }
        });

        setVideoStates(updatedVideoStates);
        viewableItems.forEach(item => {
            if (!item.isViewable && videoRefs.current[item.item._id]) {
                videoRefs.current[item.item._id].pauseAsync(); // Pause the video
            }
        });
    }, []);


    async function upvotepost(id, index) {
        // console.log(id);
        // console.log(index);

        var toset = !allpost[index].isliked
        console.log(toset);

        var status = toset ? "like" : "unlike"

        setallpost(allpost.map((e, i) => {
            if (i == index) {
                var object = { ...e, isliked: !e.isliked }
                return object
            }
            else return e
        }))

        try {

            const response = await fetch(`${url}posts/upvotePost/${id}/${status}`, {
                method: 'POST',
                body: "",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            console.log(response.status);

        }
        catch (err) {
            // setloading(false)
            console.log(err);

        }


    }

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            `You don't have permission to apply to this community`,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
        );
    };

    async function applycommunity(id) {
        try {
            const response = await fetch(`${url}posts/applyCommunity/${id}`, {
                method: 'POST',
                body: "",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            console.log(response.status);
            if (response.status === 403) {
                showToastWithGravity("you are not allowed to join this community")
            }
            if (response.status === 200) {
                setallpost(allpost.map((e, i) => {
                    if (i == index) {
                        var object = { ...e, Applied: true }
                        return object
                    }
                    else return e
                }))
            }


        }
        catch (err) {
            console.log(err);

        }
    }
    async function applyjob(id, index) {
        console.log(index);

        try {
            const response = await fetch(`${url}posts/applyJobPost/${id}`, {
                method: 'POST',
                body: "",
                headers: {
                    "Content-Type": "application/json",
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            console.log(response.status);
            if (response.status === 200) {
                setallpost(allpost.map((e, i) => {
                    if (i == index) {
                        var object = { ...e, Applied: true }
                        return object
                    }
                    else return e
                }))
            }

        }
        catch (err) {
            console.log(err);

        }
    }



    const renderItem = useMemo(
        () => ({ item, index }) => {

            const isVideoPlaying = videoStates[item._id] || false;

            function currency(pay) {
                // console.log(pay);
                // console.log(typeof pay);
                pay = Number(pay);
                return pay.toLocaleString("en-IN")
            }
            if (item.type == "photo" || item.type == "textBlog" || item.type == "video") {
                return (
                    <View onTouchStart={closebottomsheet} style={styles.box}>
                        <View style={styles.top} >
                            <Pressable
                                onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
                                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                <View style={styles.userdetail}>
                                    <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                    <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
                                </View>
                            </Pressable>
                        </View>
                        {item.type == "photo" && <Image style={styles.template} source={{ uri: item.mediaUrl }} />}
                        {item.type == "video" &&
                            <Video
                                ref={ref => videoRefs.current[item._id] = ref}
                                style={styles.template}
                                source={{ uri: item.mediaUrl }}
                                useNativeControls // Enables native playback controls
                                resizeMode="contain" // Adjusts video to fit within the view
                                isLooping // Loops the video
                                shouldPlay={isVideoPlaying}
                            />

                        }
                        {item.type == "textBlog" && <Text style={styles.blogtext}>{item.content}</Text>}

                        <View style={styles.iconcontainer}>
                            <View style={styles.icon2}>
                                <Pressable onPress={() => { upvotepost(item._id, index) }}>
                                    {!item.isliked && <Upvote width={36} height={36} style={{ marginHorizontal: 5 }} />}
                                    {item.isliked && <Upvote width={36} height={36} style={{ marginHorizontal: 5 }} selected={true} />}
                                </Pressable>
                                <Pressable onPress={() => { opencomment(item._id) }}><FontAwesome name="comment-o" size={30} color="#00DE62" /></Pressable>
                            </View>
                            <Share style={{ marginTop: 5, marginRight: 10, right: 0 }} />


                        </View>
                        <View style={styles.lower}>
                            <Text allowFontScaling={false} style={styles.u3}>{item.caption != undefined ? item.caption : "caption"} </Text>
                            <Pressable onPress={() => { opencomment(item._id) }} allowFontScaling={false} style={styles.u4}>
                                <Text style={styles.u4}>View {item.postComments.length} comments</Text>
                            </Pressable>

                        </View>

                    </View>
                )
            }
            else if (item.type == "communityPost") {
                return (
                    <View onTouchStart={closebottomsheet} style={styles.box}>

                        <View style={styles.top} >
                            <Pressable
                                onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
                                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                    <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                    <View style={styles.userdetail}>
                                        <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                        <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                        <View style={styles.lower}>
                            <Text style={styles.com1}>{item.communityPost.communityName}</Text>
                            <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>{item.communityPost.communityDescription}</Text>
                            <Text allowFontScaling={false} style={styles.u6}><Text style={styles.desc1}>Members Count :</Text> {item.communityPost.communityMembers.length}</Text>
                            <Text allowFontScaling={false} style={styles.u7}>Rules & Guidelines: {item.communityPost.communityRules}</Text>

                            <Pressable onPress={() => { applycommunity(item._id) }} style={[styles.next]} >
                                <Text allowFontScaling={false} style={styles.nexttext}>{item.Applied ? "Join" : "Join Community"}</Text>
                            </Pressable>
                        </View>

                    </View>
                )
            }
            else if (item.type == "jobPost") {
                return (
                    <View onTouchStart={closebottomsheet} style={styles.box}>
                        <View style={styles.top} >

                            <Pressable
                                onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
                                style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                    <Image style={styles.userimg} source={{ uri: item.user_id.profilePhoto }} />
                                    <View style={styles.userdetail}>
                                        <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                                        <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role == "CommunityMember" ? "Member" : item.user_id.role}</Text>
                                    </View>
                                </View>

                            </Pressable>
                        </View>
                        <View style={styles.lower}>
                            <Text style={styles.com1}>Role: {item.jobPosts.role}</Text>
                            <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>{item.jobPosts.description}</Text>
                            <Text allowFontScaling={false} style={styles.u8}>Duration: {item.jobPosts.duration} months</Text>
                            <Text allowFontScaling={false} style={styles.u8}>Pay: {currency(item.jobPosts.pay)} Rs</Text>

                            <Pressable onPress={() => { applyjob(item._id, index) }} style={[styles.next]} >
                                <Text allowFontScaling={false} style={styles.nexttext}>{item.Applied ? 'Applied' : "Apply"}</Text>
                            </Pressable>
                        </View>

                    </View>
                )
            }
        }
    )


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
        { label: "Only for Founders", value: "Only for Founders" },
        { label: "Startup Enthusiast", value: "Startup Enthusiast" },
        // { label: "Mentor", value: "Mentor" },
        // { label: "Networker", value: "Networker" },
        // { label: "Contributor", value: "Contributor" },


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

    function Header() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl progressViewOffset={0} refreshing={refreshing1}
                        onRefresh={() => {
                            setRefreshing1(true);
                            getdata()


                            setTimeout(() => {
                                setRefreshing1(false); // Stop refreshing after fetching data
                            }, 2000); // Adjust the delay as needed
                        }} />}
                style={[main.header, { backgroundColor: "#16181a" }]}>
                <Text allowFontScaling={false} style={main.headertext}>For you</Text>
            </ScrollView>
        )
    }

    var headeref = useRef(null);




    var timeout;

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 80, // Item is considered viewable if 50% is visible
    };
    return (
        <SafeAreaView style={styles.container}>
            {/* <Animated.View
                ref={headeref}
                // style={[{ transform: [{ translateY: translateY }] }, main.header]}
                style={main.header}
                
                >


                <Text allowFontScaling={false} style={main.headertext}>For you</Text>
            </Animated.View> */}

            <GestureHandlerRootView nestedScrollEnabled style={{ flex: 1 }} >

                {/* <TouchableWithoutFeedback onPress={closebottomsheet}> */}
                {/* <View style={{ position: "absolute" }}> */}
                {allpost.length == 0 && <Header />}
                {allpost.length > 0 && <FlatList

                    ListHeaderComponent={Header}
                    // scrollEventThrottle={0}
                    showsVerticalScrollIndicator={false}
                    style={main.scroll1}
                    initialNumToRender={5}
                    windowSize={10}
                    maxToRenderPerBatch={5}
                    scrollEventThrottle={16}
                    keyExtractor={(item, index) => { return index }}
                    removeClippedSubview={false}

                    // onScroll={(e) => {
                    //     scrollY.setValue(e.nativeEvent.contentOffset.y)
                    // }}

                    contentContainerStyle={{
                        // marginTop : 200,
                        paddingBottom: 100
                    }}
                    data={allpost}
                    renderItem={renderItem}

                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}


                    refreshControl={
                        <RefreshControl progressViewOffset={30} refreshing={refreshing}
                            onRefresh={() => {
                                // console.log("start");

                                setRefreshing(true);
                                // setbg("transparent")
                                getpost()

                                setTimeout(() => {
                                    setRefreshing(false); // Stop refreshing after fetching data
                                }, 2000); // Adjust the delay as needed
                            }} />}

                    bounces={true}
                    contentInset={{ top: 10 }}
                >

                </FlatList>}
                {/* </View> */}

                {/* </TouchableWithoutFeedback> */}

                <Pressable onPress={openBottomSheet} style={styles.add}>
                    <AntDesign name="pluscircle" size={50} color="#00de62" />
                </Pressable>


                <BottomSheet


                    overlayColor="rgba(0, 0, 0, 0.9)"
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }} // Changes the background of the sheet itself
                    handleIndicatorStyle={{ backgroundColor: '#00de62' }}

                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    onClose={() => {
                        // setTimeout(() => {
                        //     // setfirstbottomsheet(false)
                        // }, 1000);
                        // Keyboard.dismiss()
                        setstatus(false)
                        setp1u(false)
                        setwillopen(false)

                    }}
                    index={-1} // Initially closed


                >
                    <BottomSheetContent />
                </BottomSheet>


                {/* bottomsheet 1 */}


                {willopen && <BottomSheet
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
                            {!p1u && <Text style={styles.posttext}>{p1text}</Text>}
                            {p1u && <ActivityIndicator size={24} color="#16181a" />}
                        </Pressable>


                    </BottomSheetScrollView>



                </BottomSheet>}
                {/* bottomsheet1  */}




                {/* bottomsheet 2 */}

                {willopen && <BottomSheet
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

                            {!p2u && <Text style={styles.posttext}>{p2text}</Text>}
                            {p2u && <ActivityIndicator size={24} color="#16181a" />}
                        </Pressable>


                    </BottomSheetScrollView>



                </BottomSheet>}

                {/* 222 */}

                {willopen && <BottomSheet
                    nestedScrollEnabled={true}
                    overlayColor="rgba(0, 0, 0, 0.5)"
                    enablePanDownToClose
                    backgroundStyle={{ backgroundColor: '#16181a', borderRadius: 30 }}

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
                </BottomSheet>}

                {/* 333 */}

                {willopen &&
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
                                {/* <Text style={styles.posttext}>{p4text}</Text> */}

                                {!p4u && <Text style={styles.posttext}>{p4text}</Text>}
                                {p4u && <ActivityIndicator size={24} color="#16181a" />}
                            </Pressable>


                        </BottomSheetScrollView>

                    </BottomSheet>}

                {/* 333 */}




                {/* 444 */}

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
                        setp4u(false)
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
                                <Ionicons name="send" size={24} color="#00DE62" />
                            </Pressable>
                        </View>




                    </View>

                </BottomSheet>

                {/* bottomsheet 4 */}
            </GestureHandlerRootView>
        </SafeAreaView >

    );
}

export default Foryou



