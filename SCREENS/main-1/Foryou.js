


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
    // console.log(token);


    // console.log("hello ofor you");

    // const [token, settoken] = useState("")
    const [comment, setcomment] = useState(false)
    const [loading, setloading] = useState(true)
    const [loading1, setloading1] = useState(true)

    const [p1u, setp1u] = useState(false)
    const [p2u, setp2u] = useState(false)
    const [p3u, setp3u] = useState(false)
    const [p4u, setp4u] = useState(false)

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
                var object = { ...e, isliked: false }
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
    const showToastWithGravity = (message) => {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
        );
    };

    async function applycommunity(id) {
        console.log("tu investor hai ");
        showToastWithGravity("you cannot apply to community since you are an investor")


    }
    async function applyjob(id) {
        console.log("tu investor hai ");
        showToastWithGravity("you cannot apply to job since you are an investor")

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
                    <View style={styles.box}>
                        <View style={styles.top} >
                            <Pressable
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
                            </View>
                            <Share style={{ marginTop: 5, marginRight: 10, right: 0 }} />


                        </View>


                    </View>
                )
            }
            else if (item.type == "communityPost") {
                return (
                    <View style={styles.box}>

                        <View style={styles.top} >
                            <Pressable
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
                                <Text allowFontScaling={false} style={styles.nexttext}>Join Community</Text>
                            </Pressable>
                        </View>

                    </View>
                )
            }
            else if (item.type == "jobPost") {
                return (
                    <View style={styles.box}>
                        <View style={styles.top} >

                            <Pressable
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

                            <Pressable onPress={() => { applyjob(item._id) }} style={[styles.next]} >
                                <Text allowFontScaling={false} style={styles.nexttext}>Apply</Text>
                            </Pressable>
                        </View>

                    </View>
                )
            }
        }
    )


    function header() {
        return (
            <View style={[main.header, { backgroundColor: "#16181a" }]}>
                <Text allowFontScaling={false} style={main.headertext}>For you</Text>
            </View>
        )
    }

    var headeref = useRef(null);




    var timeout;

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 80, // Item is considered viewable if 50% is visible
    };
    return (
        <SafeAreaView style={styles.container}>

            <GestureHandlerRootView nestedScrollEnabled style={{ flex: 1 }} >

                {/* <TouchableWithoutFeedback onPress={closebottomsheet}> */}
                {/* <View style={{ position: "absolute" }}> */}

                {allpost.length == 0 && <View style={[main.header, { backgroundColor: "#16181a" }]}>
                    <Text allowFontScaling={false} style={main.headertext}>For you</Text>
                </View>}
                {allpost.length > 0 && <FlatList

                    ListHeaderComponent={header}
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




                {/* bottomsheet 1 */}
            </GestureHandlerRootView>
        </SafeAreaView >

    );
}

export default Foryou



