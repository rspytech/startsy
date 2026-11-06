// Main feed for founders/community members/job seekers: posts, job posts and communities,
// with upvote, apply-to-job, join-community and delete-own-post actions.

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
    Button,
    RefreshControl,
    Dimensions,
    PixelRatio,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    ActivityIndicator,
    DrawerLayoutAndroid,
    BackHandler,
    ToastAndroid,
    Alert,
    TouchableOpacity,
    Modal,
    Vibration,
} from "react-native";
import { BlurView } from "expo-blur";

import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
var newwidth = width * 0.9;
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../../styles/post.js";

import { Video } from "expo-av";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { NativeViewGestureHandler } from "react-native-gesture-handler";
import Octicons from "@expo/vector-icons/Octicons";
import main from "../../styles/main.js";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomButton from "@/components/button.js";
import AntDesign from "@expo/vector-icons/AntDesign";
// import BottomSheet from '@gorhom/bottom-sheet';

import BottomSheet, {
    BottomSheetView,
    BottomSheetScrollView,
    BottomSheetTextInput,
    BottomSheetDraggableView,
    BottomSheetFlatList,
    BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFocusEffect, useNavigation } from "expo-router";

import B1 from "../../assets/icons/b1.js";
import B2 from "../../assets/icons/b2.js";
import B3 from "../../assets/icons/b3.js";
import B4 from "../../assets/icons/b4.js";
import { color } from "framer-motion";
import Drop from "../dropdown.js";
import * as ImagePicker from "expo-image-picker";

import Upvote from "@/assets/icons/upvote.js";
import Share from "@/assets/icons/share.js";
import { GlobalContext } from "@/Global/globalcontext.js";

import { url } from "../../config.js";
import { useRoute } from "@react-navigation/native";
import { Keyboard } from "react-native";
import { jwtDecode } from "jwt-decode";
import { MotiPressable } from "moti/interactions/index.js";
const Foryou = ({
    commentinput,
    one,
    setone,
    drawer,
    keyboardOffset,
    setk,
    ansh,
    ansh1,
    setansh1,
    two,
    three,
    four,
    five,
    scroll,
    type,
    settype,
    token,
    mainpagebottomsheet,
    opencomment,
    openshare,
    visible,
    setVisible,
    openBottomSheet3,
    bottomSheetRef1,
    newaspect,
    setnewaspect,
    uri,
    setImage,
    bottomSheetRef5,
    bottomSheetRef2,
    bottomSheetRef3,
    bottomSheetRef4,
}) => {
    // const [one, setone] = useState(true)
    const navigation = useNavigation();
    const [allpost, setallpost] = useState([]);

    const [willopen, setwillopen] = useState(false);
    const [ready, setready] = useState(false);
    const [uploadingcomment, setuploadingcomment] = useState(false);
    // console.log(token);
    const [loggedinUserID, setloggedInuserID] = useState("");

    // useEffect(async() => {
    //     try {
    //       var token = await AsyncStorage.getItem('accessToken');
    //       setready(true)
    //       console.log('Data got successfully!');
    //     } catch (error) {
    //       console.error('Error saving data:', error);
    //     }
    // }, [])

    useEffect(() => {
        if (token != "") {
            console.log(token, "foryou page ka token fuck");
            const decode = jwtDecode(token);
            console.log(decode);

            setloggedInuserID(decode._id);
        }
    }, [token]);

    // const [token, settoken] = useState("")
    const [comment, setcomment] = useState(false);
    const [loading, setloading] = useState(true);
    const [loading1, setloading1] = useState(true);

    const [skeleton, setskeletonloading] = useState(false);

    // const [co, setiscommentopen] = useState(false)
    const [allcomments, setallcomments] = useState([]);

    const [postid, setpostid] = useState(null);
    const [commenttext, setcommenttext] = useState("");
    const { globaldata, updateField } = useContext(GlobalContext);

    // useEffect(() => {
    //     // console.log(globaldata, "global data");
    //     settoken(globaldata.token)
    // }, [])

    const mainflatlist = useRef();
    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A");
        StatusBar.setBarStyle("light-content");
    });

    // const drawer = useRef(null);
    // const drawer = useRef<DrawerLayoutAndroid>(null);
    const [drawerPosition, setDrawerPosition] = useState("left");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const changeDrawerPosition = () => {
        setDrawerPosition((prev) => (prev === "left" ? "right" : "left"));
    };

    const navigationView = () => (
        <View style={[styles1.container, styles1.navigationContainer]}>
            <Text style={styles.paragraph}>I'm in the Drawer!</Text>
            <Button title="Close drawer" onPress={() => drawer.current?.closeDrawer()} />
        </View>
    );

    async function getpost() {
        try {
            setskeletonloading(true);
            const response = await fetch(`${url}posts/getPosts`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();

            // console.log(data.data);
            var decode = jwtDecode(token);
            var loggedinUserID = decode._id;

            console.log(data.data);

            var data1 = data.data.map((e) => {
                var object = {
                    ...e,
                    isliked: e.likedBy.includes(loggedinUserID),
                    Applied: e.communityPost
                        ? e.communityPost.communityMembers.includes(loggedinUserID)
                        : false,
                    Jobapplied: e.jobPosts ? e.jobPosts.jobApplicants.includes(loggedinUserID) : false,
                    itemlikedcount: e.likedBy.length,
                };
                return object;
            });

            var dummy = data.data.filter((e) => e.type == "communityPost");
            console.log(dummy[0]);

            if (data.data.length > 0) {
                // console.log('====================================');
                // console.log("mai set karyungs data usestae me ");
                // console.log('====================================');
                setallpost(data1.reverse());
            }
        } catch (err) {
            console.log(err);
        } finally {
            setloading(false);
            setTimeout(() => {
                setskeletonloading(false);
            }, 0);
        }
    }

    useEffect(() => {
        // console.log("start");

        if (token != "" && token != null && token != undefined) {
            getpost();
        }
    }, [token, ready]);

    const openBottomSheet = () => {
        console.log("hahahah");
        setwillopen(true);
        setansh1(true);
        setone(true);
        // setk(true)
        // console.log("updating ansh1 stat");
        // drawer.current?.openDrawer()

        setfirstbottomsheet(true);

        // drawer.current?.openDrawer();
        // setIsDrawerOpen(true);
        mainpagebottomsheet.current?.expand();

        // mainpagebottomsheet.current?.expand();
    };

    // const [uri, setImage] = useState(null)
    const [status1, setstatus] = useState(false);
    const [bg, setbg] = useState("#16181a");
    const [refreshing, setRefreshing] = useState(false);
    const [refreshing1, setRefreshing1] = useState(false);
    const [textlength, settextlength] = useState(0);
    const [rule1, setrule] = useState("");
    const [open1, setOpen1] = useState(false);
    const [list, setlist] = useState(false);

    const [communityname, setcommunityname] = useState("");
    const [description, setdescription] = useState("");
    const [rules, setrules] = useState("");
    const [caption, setcaption] = useState("");
    const [content, setcontent] = useState("");
    const [c2, setc2] = useState("");
    // const [type, settype] = useState("")

    const [role4, setrole4] = useState("");
    const [description4, setdescription4] = useState("");
    const [duration4, setduration4] = useState("");
    const [pay4, setpay4] = useState("");

    const scrollY = new Animated.Value(0);
    const diffclamp = Animated.diffClamp(scrollY, 0, 55);
    const translateY = diffclamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, -55],
        extrapolate: "clamp",
    });

    const bottomSheetRef = useRef(null);
    // const bottomSheetRef1 = useRef(null);
    // const bottomSheetRef2 = useRef(null);
    // const bottomSheetRef3 = useRef(null);
    // const bottomSheetRef4 = useRef(null);
    // const bottomSheetRef5 = useRef(null);
    const flatListRef = useRef(null);

    // Snap points for the bottom sheet
    const snapPoints = useMemo(() => ["29%"], []);
    const snapPoints1 = useMemo(() => ["120%"], []);
    const snapPoints2 = useMemo(() => ["120%"], []);
    const snapPoints3 = useMemo(() => ["120%"], []);
    const snapPoints4 = useMemo(() => ["120%"], []);
    const snapPoints5 = useMemo(() => ["50%", "100%"], []);

    const [err1, seterr1] = useState(false);
    const [err2, seterr2] = useState(false);
    const [err3, seterr3] = useState(false);
    const [err4, seterr4] = useState(false);
    const [err5, seterr5] = useState(false);
    const [err6, seterr6] = useState(false);
    const [err10, seterr10] = useState(false);
    const [err11, seterr11] = useState(false);
    const [err12, seterr12] = useState(false);
    const [err13, seterr13] = useState(false);
    const [err14, seterr14] = useState(false);
    const [err15, seterr15] = useState(false);
    // const [err7, seterr7] = useState(false)

    const [firstbottomsheet, setfirstbottomsheet] = useState(false);
    const [firstbottomsheet1, setfirstbottomsheet1] = useState(false);
    const [err7, seterr7] = useState(false);
    const [err, seterr] = useState(false);
    const [emptycomment, setemptycomment] = useState(false);

    function removeerr() {
        seterr(false);
        seterr1(false);
        seterr2(false);
        seterr3(false);
    }

    function closebottomsheet() {
        mainpagebottomsheet.current?.close();
        bottomSheetRef1.current?.close();
        bottomSheetRef.current?.close();
        setVisible(false);
    }

    const [width1, setwidth] = useState("100%");

    useFocusEffect(
        useCallback(() => {
            setwidth("100%");
            console.log("for you page hu mai");
            const backHandler = BackHandler.addEventListener("hardwareBackPress", function () {
                console.log("ansh", ansh);
                console.log("one", one);
                console.log("two", two);
                console.log("three", three);
                console.log("four", four);
                console.log("five", five);

                var canclose = true;

                // Animated.timing(keyboardOffset, {
                //     toValue: 0,
                //     duration: 300,
                //     useNativeDriver: false,
                // }).start();
                // if (ansh == true) {
                //     bottomSheetRef5.current?.close();
                //     canclose = false
                //     return true
                // }
                // if(share1 == true){
                //     bottomSheetRef6.current?.close();
                //     canclose = false
                //     // return true

                // }
                if (two == true) {
                    bottomSheetRef1.current?.close();
                    canclose = false;

                    return true;
                }
                if (three == true) {
                    bottomSheetRef2.current?.close();
                    canclose = false;
                    return true;

                    // return false
                }
                if (four == true) {
                    bottomSheetRef3.current?.close();
                    canclose = false;
                    return true;

                    // return
                }
                if (five == true) {
                    bottomSheetRef4.current?.close();
                    canclose = false;
                    return true;

                    // return
                }
                if (one == true) {
                    // setone(false);
                    mainpagebottomsheet.current?.close();
                    canclose = false;

                    return true;
                }

                if (canclose) {
                    //  BackHandler.exitApp()
                }

                // commentinput.current?.blur()

                // setk(false)
            });

            return () => backHandler.remove();
        }, [ansh, one, two, three, four, five])
    );

    // const BottomSheetContent = () => (
    //     <View style={styles.bottomSheetContent}>
    //         <Pressable style={styles.iconButton} onPress={openBottomSheet1}>
    //             <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
    //                 <B1 />
    //             </View>
    //             <Text style={styles.bottomsheettext}>Community</Text>
    //         </Pressable>
    //         <Pressable style={styles.iconButton} onPress={openBottomSheet2}>

    //             <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
    //                 <B2 />
    //             </View>
    //             <Text style={styles.bottomsheettext}>Blog</Text>
    //         </Pressable>
    //         <Pressable style={styles.iconButton} onPress={() => {
    //             askAspectRatio()
    //         }
    //         }>
    //             <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
    //                 <B3 />
    //             </View>
    //             <Text style={styles.bottomsheettext}>Media</Text>
    //         </Pressable>
    //         <Pressable style={styles.iconButton} onPress={openBottomSheet4}>

    //             <View style={[styles.ic, { flex: 1, width: "100%", alignSelf: "center" }]}>
    //                 <B4 />
    //             </View>
    //             <Text style={styles.bottomsheettext}>Job Posting</Text>
    //         </Pressable>
    //     </View>
    // );

    // async function docomment() {
    //     console.log("doing comment");
    //     console.log(postid);
    //     console.log(commenttext);
    //     setuploadingcomment(true)

    //     try {

    //         const response = await fetch(`${url}posts/createComment/${postid}`, {
    //             method: 'POST',
    //             body: JSON.stringify({ comment: commenttext }),
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`,
    //             },
    //         });
    //         const data = await response.json();
    //         console.log(data);
    //         setemptycomment(false)

    //         console.log(response.status);
    //         setcommenttext("");

    //         var object = {
    //             comment: commenttext,
    //             createdAt: new Date(),
    //             userId: {
    //                 profilePhoto: data.profilePhoto,
    //                 userName: data.userName,
    //             }
    //         }
    //         var newarray = [...allcomments]
    //         newarray.unshift(object)
    //         setallcomments(newarray)

    //         const scrollToTop = () => {
    //             flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
    //         };
    //         scrollToTop();
    //         scrollToTop();

    //     }
    //     catch (err) {
    //         console.log(err);

    //     }
    //     finally {
    //         setuploadingcomment(false)
    //         // Keyboard.dismiss();
    //     }

    // }

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setk(false);
            commentinput.current?.blur();
        });

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);
    const [viewableItems, setViewableItems] = useState([]);
    const [videoStates, setVideoStates] = useState({});
    const videoRefs = useRef({});
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        setViewableItems(viewableItems);

        // Update play state for videos based on visibility
        const updatedVideoStates = {};
        viewableItems.forEach((viewableItem) => {
            if (viewableItem.isViewable) {
                updatedVideoStates[viewableItem.item._id] = true; // Video should play when in view
            } else {
                updatedVideoStates[viewableItem.item._id] = false; // Video should stop when out of view
            }
        });

        setVideoStates(updatedVideoStates);
        viewableItems.forEach((item) => {
            if (!item.isViewable && videoRefs.current[item.item._id]) {
                videoRefs.current[item.item._id].pauseAsync(); // Pause the video
            }
        });
    }, []);

    async function upvotepost(id, index) {
        // console.log(id);
        // console.log(index);
        Vibration.vibrate(50);

        var toset = !allpost[index].isliked;
        // console.log(toset);

        var status = toset ? "like" : "unlike";
        console.log(status, "status");

        var increment = toset == true ? 1 : -1;
        console.log(increment);

        setallpost(
            allpost.map((e, i) => {
                if (i == index) {
                    var object = { ...e, isliked: !e.isliked, itemlikedcount: e.itemlikedcount + increment };
                    return object;
                } else return e;
            })
        );

        try {
            const response = await fetch(`${url}posts/upvotePost/${id}/${status}`, {
                method: "POST",
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
        } catch (err) {
            // setloading(false)
            console.log(err);
        }
    }

    const showToastWithGravity = () => {
        ToastAndroid.showWithGravity(
            `You don't have permission to apply to this community`,
            ToastAndroid.LONG,
            ToastAndroid.TOP
        );
    };

    async function applycommunity(id, index) {
        if (allpost[index].Applied) {
            console.log("vaapis");
            return;
        }

        setallpost(
            allpost.map((e, i) => {
                if (i == index) {
                    var object = { ...e, Applied: true };
                    return object;
                } else return e;
            })
        );
        try {
            const response = await fetch(`${url}posts/applyCommunity/${id}`, {
                method: "POST",
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
                showToastWithGravity("you are not allowed to join this community");
            }
            if (response.status === 200) {
                setallpost(
                    allpost.map((e, i) => {
                        if (i == index) {
                            var object = { ...e, Applied: true };
                            return object;
                        } else return e;
                    })
                );
            } else {
                setallpost(
                    allpost.map((e, i) => {
                        if (i == index) {
                            var object = { ...e, Applied: false };
                            return object;
                        } else return e;
                    })
                );
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function gotochatscreen(item) {
        console.log(item.communityPost.communityName);
        console.log(item.communityPost._id);

        var id = item.communityPost._id;
        var additionaldetail = {
            _id: id,
            "communityName": item.communityPost.communityName,
        };

        try {
            const response = await fetch(`${url}groupChat/getGroupChatMessage/${id}`, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            console.log(result.data);

            // setmessage(result.data)

            navigation.navigate("Chat1", {
                item: additionaldetail,
                messages: result.data,
                token,
                navigation,
            });
        } catch (err) {
            console.log(err);
        } finally {
            // setloading(false); // Set loading to false when done
        }
    }
    async function applyjob(id, index) {
        // console.log(index);
        // console.log(allpost[index]);
        // console.log(allpost[index].Applied);

        if (allpost[index].Jobapplied) {
            return;
        }
        Vibration.vibrate(100);

        setallpost(
            allpost.map((e, i) => {
                if (i == index) {
                    var object = { ...e, Applied: true };
                    return object;
                } else return e;
            })
        );

        try {
            const response = await fetch(`${url}posts/applyJobPost/${id}`, {
                method: "POST",
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
                setallpost(
                    allpost.map((e, i) => {
                        if (i == index) {
                            var object = { ...e, Jobapplied: true };
                            return object;
                        } else return e;
                    })
                );
            }
            if (response.status === 400) {
                showToastWithGravity("you have already applied");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const lastTap = useRef(null);
    const handleDoubleTap = (id, index) => {
        const now = Date.now();
        if (lastTap.current && now - lastTap.current < 300) {
            // Double tap detected
            Vibration.vibrate(20);
            upvotepost(id, index);
        }
        lastTap.current = now;
    };

    const renderItem = useMemo(() => ({ item, index }) => {
        // console.log(allpost[1].mediaUrl);

        const isVideoPlaying = videoStates[item._id] || false;

        // console.log(item.aspectRatio);
        if (item.user_id == null) {
            return;
        } else {
            function getVideoHeight() {
                return item.aspectRatio === "16/9" ? newwidth * (9 / 16) : newwidth * (1 / 1);
            }
            if (item.type == "photo" || item.type == "textBlog" || item.type == "video") {
                return (
                    <Pressable
                        onPress={() => {
                            // console.log("hi");
                            handleDoubleTap(item._id, index);
                        }}
                    >
                        <LinearGradient
                            colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                            locations={[0, 1]}
                            style={styles.box}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >
                            {/* <View onTouchStart={closebottomsheet} style={styles.box}> */}
                            <View style={styles.top}>
                                <Pressable
                                    onPress={() => {
                                        navigation.navigate("Singleuserpage", {
                                            token: token,
                                            id: item.user_id._id,
                                            page: "Startsy",
                                        });
                                    }}
                                    style={{ display: "flex", flexDirection: "row", width: "100%" }}
                                >
                                    <Image
                                        style={styles.userimg}
                                        source={{ uri: item.user_id.profilePhoto }}
                                    />
                                    <View style={styles.userdetail}>
                                        <Text allowFontScaling={false} style={styles.u1}>
                                            {item.user_id.userName}
                                        </Text>
                                        <Text allowFontScaling={false} style={styles.u2}>
                                            {item.user_id.role == "CommunityMember"
                                                ? "Member"
                                                : item.user_id.role}
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>

                            {item.type == "textBlog" && <View style={styles.divider}></View>}

                            {item.type == "photo" && (
                                <Image
                                    style={[
                                        styles.template,
                                        { aspectRatio: item.aspectRatio ? item.aspectRatio : 1 / 1 },
                                    ]}
                                    source={{ uri: item.mediaUrl }}
                                />
                            )}
                            {item.type == "video" && (
                                <Video
                                    ref={(ref) => (videoRefs.current[item._id] = ref)}
                                    style={[
                                        styles.template,
                                        { width: newwidth, height: getVideoHeight(item.aspectRatio) },
                                    ]}
                                    source={{ uri: item.mediaUrl }}
                                    useNativeControls // Enables native playback controls
                                    resizeMode="cover" // Adjusts video to fit within the view
                                    isLooping // Loops the video
                                    shouldPlay={isVideoPlaying}
                                />
                            )}

                            {item.type == "textBlog" && <Text style={styles.blogtext}>{item.content}</Text>}
                            {/* {item.type == "textBlog" &&  <View style={[styles.divider , {marginTop : 7}]}></View>} */}

                            <View style={styles.iconcontainer}>
                                <View style={styles.icon2}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            upvotepost(item._id, index);
                                        }}
                                    >
                                        {/* {item.likedBy.includes(loggedinUserID) && <Upvote width={36} height={36} style={{ marginHorizontal: 0 }} selected={true} />} */}
                                        {/* {!item.likedBy.includes(loggedinUserID)   && <Upvote width={36} height={36} style={{ marginLeft: 5, marginRight: -5 }} />} */}

                                        {!item.isliked && (
                                            <Upvote
                                                width={36}
                                                height={36}
                                                style={{ marginLeft: 5, marginRight: -5 }}
                                            />
                                        )}
                                        {item.isliked && (
                                            <Upvote
                                                width={36}
                                                height={36}
                                                style={{ marginLeft: 5, marginRight: -5 }}
                                                selected={true}
                                            />
                                        )}
                                    </TouchableOpacity>
                                    <Text style={{ left: 0, top: 13, color: "#ccc" }}>
                                        {item.itemlikedcount}
                                    </Text>
                                    <Pressable
                                        onPress={() => {
                                            Vibration.vibrate(20);
                                            opencomment(item._id);
                                        }}
                                    >
                                        <FontAwesome
                                            style={{ marginLeft: 4 }}
                                            name="comment-o"
                                            size={30}
                                            color="#ccc"
                                        />
                                    </Pressable>
                                </View>
                                <Pressable
                                    onPress={() => {
                                        Vibration.vibrate(20);
                                        openshare(item._id);
                                    }}
                                >
                                    <Share style={{ marginTop: 5, marginRight: 10, right: 0 }} />
                                </Pressable>
                            </View>
                            <View style={styles.lower}>
                                {item.type != "textBlog" && (
                                    <Text allowFontScaling={false} style={styles.u3}>
                                        {item.caption != undefined ? item.caption : "caption"}{" "}
                                    </Text>
                                )}
                                <Pressable
                                    onPress={() => {
                                        opencomment(item._id);
                                    }}
                                    allowFontScaling={false}
                                    style={styles.u4}
                                >
                                    <Text style={styles.u4}>View {item.postComments.length} comments</Text>
                                </Pressable>
                            </View>

                            {/* </View> */}
                        </LinearGradient>
                    </Pressable>
                );
            } else if (item.type == "communityPost") {
                return (
                    <LinearGradient
                        colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                        locations={[0, 1]}
                        style={styles.box}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <View style={styles.top}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Singleuserpage", {
                                        token: token,
                                        id: item.user_id._id,
                                        page: "Startsy",
                                    });
                                }}
                                style={{ display: "flex", flexDirection: "row", width: "100%" }}
                            >
                                <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                    <Image
                                        style={styles.userimg}
                                        source={{ uri: item.user_id.profilePhoto }}
                                    />
                                    <View style={styles.userdetail}>
                                        <Text allowFontScaling={false} style={styles.u1}>
                                            {item.user_id.userName}
                                        </Text>
                                        <Text allowFontScaling={false} style={styles.u2}>
                                            {item.user_id.role == "CommunityMember"
                                                ? "Member"
                                                : item.user_id.role}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.divider}></View>

                        <View style={styles.lower}>
                            <Text style={styles.com1}>{item.communityPost.communityName}</Text>
                            <Text style={styles.com2}>
                                <Text style={styles.desc1}>Community description: </Text>
                                {item.communityPost.communityDescription}
                            </Text>
                            <Text allowFontScaling={false} style={styles.u6}>
                                <Text style={styles.desc1}>Members Count :</Text>{" "}
                                {item.communityPost.communityMembers.length}
                            </Text>
                            <Text allowFontScaling={false} style={styles.u7}>
                                For : {item.communityPost.communityRules}
                            </Text>

                            {!item.Applied && (
                                <TouchableOpacity
                                    onPress={() => {
                                        Vibration.vibrate(100);
                                        applycommunity(item._id, index);
                                    }}
                                    style={[styles.next]}
                                >
                                    <Text allowFontScaling={false} style={styles.nexttext}>
                                        {item.Applied ? "Joined" : "Join Community"}
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {item.Applied && (
                                <TouchableOpacity
                                    onPress={() => {
                                        Vibration.vibrate(100);
                                        gotochatscreen(item);
                                    }}
                                    style={styles.next1}
                                >
                                    <Text allowFontScaling={false} style={styles.nexttext1}>
                                        {/* <Text style={{marginTop : -10 , alignSelf : "flex-start"}}></Text> */}
                                        Chat
                                        <View
                                            style={{
                                                marginTop: 10,
                                                paddingLeft: 3,
                                                zIndex: 100,
                                                elevation: 100,
                                            }}
                                        >
                                            <MaterialCommunityIcons
                                                name="message-text-outline"
                                                size={16}
                                                color="#000"
                                            />
                                        </View>
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </LinearGradient>
                    // <View onTouchStart={closebottomsheet} style={styles.box}>

                    // </View>
                );
            } else if (item.type == "jobPost") {
                return (
                    <LinearGradient
                        colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                        locations={[0, 1]}
                        style={styles.box}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <View style={styles.top}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Singleuserpage", {
                                        token: token,
                                        id: item.user_id._id,
                                        page: "Startsy",
                                    });
                                }}
                                style={{ display: "flex", flexDirection: "row", width: "100%" }}
                            >
                                <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                    <Image
                                        style={styles.userimg}
                                        source={{ uri: item.user_id.profilePhoto }}
                                    />
                                    <View style={styles.userdetail}>
                                        <Text allowFontScaling={false} style={styles.u1}>
                                            {item.user_id.userName}
                                        </Text>
                                        <Text allowFontScaling={false} style={styles.u2}>
                                            {item.user_id.role == "CommunityMember"
                                                ? "Member"
                                                : item.user_id.role}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.divider}></View>

                        <View style={styles.lower}>
                            <Text style={styles.com1}>Role: {item.jobPosts.role}</Text>
                            {/* <Text>{JSON.stringify(item.jobPosts)}</Text> */}
                            <Text style={styles.com2}>
                                <Text style={styles.desc1}>Job description: </Text>
                                {item.jobPosts.description}
                            </Text>
                            <Text allowFontScaling={false} style={styles.u8}>
                                <Text style={{ color: "#828282" }}>Duration: {item.jobPosts.duration}</Text>
                            </Text>
                            <Text allowFontScaling={false} style={styles.u8}>
                                <Text style={{ color: "#828282" }}>Payment mode: {item.jobPosts.pay} </Text>{" "}
                            </Text>
                            {item.jobPosts.amount != "" && (
                                <Text allowFontScaling={false} style={styles.u8}>
                                    <Text style={{ color: "#828282" }}></Text>Amount: {item.jobPosts.amount}{" "}
                                </Text>
                            )}

                            <TouchableOpacity
                                onPress={() => {
                                    applyjob(item._id, index);
                                }}
                                style={[!item.Jobapplied ? styles.next : styles.next11]}
                            >
                                <Text
                                    allowFontScaling={false}
                                    style={!item.Jobapplied ? styles.nexttext : styles.nexttext11}
                                >
                                    {item.Jobapplied ? "Applied" : "Apply"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                    // <View onTouchStart={closebottomsheet} style={styles.box}>

                    // </View>
                );
            }
        }

        // if(item.user_id != null){
        //     return(
        //         <Text style={{color : "red"}}>{JSON.stringify(item.user_id)}</Text>
        //     )
        // }
        // else{
        //     return(
        //         <Text style={{color : "yellow"}}>yeh chutiya hai</Text>
        //     )
        // }
    });

    const handlePullStart = (offsetY) => {
        if (offsetY < 10) {
            setbg("transparent");
        } else setbg("#16181a");
    };

    const data = [{ type: "normal" }, { type: "blog" }, { type: "community" }, { type: "job" }];

    // var tree;
    function counttext(text) {
        settextlength(text.length);
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
    ];
    const handlerule = (value1) => {
        console.log("Selected Value:", value1); // Optional: Log the selected value
        setrule(value1); // Update state with the selected value
    };

    const t1 = () => {
        setOpen1(!open1);
    };

    var [aspect, setaspect] = useState("");
    // var [newaspect, setnewaspect] = useState("")

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
    ];
    const handlerole = (value1) => {
        console.log("Selected Value:", value1); // Optional: Log the selected value
        setrole1(value1); // Update state with the selected value
    };

    function setdropdownvalue(items) {
        setlist(false);
        setrule(items.value);
        console.log("hi");
    }

    function listitem({ item }) {
        return (
            <Pressable
                onPress={() => {
                    setdropdownvalue(item);
                }}
            >
                <Text
                    style={{
                        color: "#AEAFAF",
                        textAlign: "left",
                        fontSize: 20,
                        fontFamily: "abeeze",
                        includeFontPadding: false,
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                        height: 50,
                        paddingLeft: 10,
                        textAlignVertical: "center",
                        includeFontPadding: false,
                    }}
                >
                    {item.label}
                </Text>
            </Pressable>
        );
    }

    // const [visible, setVisible] = useState(false);

    const askAspectRatio = async () => {
        // Ask user to choose aspect ratio
        const options = [
            { label: "1:1 (Square)", aspect: [1, 1] },
            { label: "16:9 (Wide)", aspect: [16, 9] },
            { label: "4:3 (Standard)", aspect: [4, 3] },
        ];

        setVisible(true);
    };

    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1} // Backdrop disappears when BottomSheet is closed
            appearsOnIndex={0} // Backdrop appears when BottomSheet is open
            opacity={0.7} // Set opacity for the backdrop
        />
    );

    function del() {
        seterr10(false);
        seterr11(false);
        seterr12(false);
        seterr13(false);
    }

    const comments = ({ item, index }) => {
        function time(time) {
            // console.log('====================================');
            // console.log(time);
            var data1 = new Date(time);
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
                <Image source={{ uri: item.userId.profilePhoto }} style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text allowFontScaling={false} style={styles.username}>
                        {item.userId.userName}
                    </Text>
                    <Text allowFontScaling={false} style={styles.message}>
                        {item.comment.trim()}
                    </Text>
                </View>
                <Text allowFontScaling={false} style={styles.time}>
                    {time(item.createdAt)}
                </Text>
            </View>
        );
    };

    function Header() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        progressBackgroundColor="#16181a"
                        colors={["#00de62"]}
                        backgroundColor="#16181a" // Set background color here
                        progressViewOffset={0} // Adjusts the offset of the spinner (optional)
                        tintColor="#fff" // Set the spinner color (like white)
                        refreshing={refreshing1}
                        onRefresh={() => {
                            setRefreshing1(true);
                            getpost();
                            Vibration.vibrate(200);

                            // Adjust the delay as needed
                        }}
                    />
                }
                style={[main.header, { backgroundColor: "#16181a" }]}
            >
                {/* <Pressable onPress={() => { navigation.navigate("Profile") }}><Text style={{ color: "yellow" }}>okkkkkkkkkkk</Text></Pressable> */}
                <Text allowFontScaling={false} style={main.headertext}>
                    For you
                </Text>
            </ScrollView>
        );
    }

    var headeref = useRef(null);

    var timeout;

    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 80, // Item is considered viewable if 50% is visible
    };
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
                        method: "POST",
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
                    setVisible(false);
                } catch (err) {
                    console.log(err);
                }
            }
        }

        return (
            <Modal transparent visible={visible} animationType="none" onRequestClose={() => onClose?.()}>
                <TouchableWithoutFeedback onPress={() => onClose?.()}>
                    <Animated.View style={[styles1.overlay, { opacity: fadeAnim }]}>
                        {/* <TouchableWithoutFeedback> */}
                        <View style={styles1.alertBox}>
                            <Text style={styles1.title}>Choose aspect ratio</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    setnewaspect("4/3");
                                    fileupload([4, 3]);
                                }}
                                style={styles1.button}
                            >
                                <Text style={styles1.buttonText}>4:3 (Standard)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setnewaspect("16/9");
                                    fileupload([16, 9]);
                                }}
                                style={styles1.button}
                            >
                                <Text style={styles1.buttonText}>16:9 (Wide)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setnewaspect("1/1");
                                    fileupload([1, 1]);
                                }}
                                style={styles1.button}
                            >
                                <Text style={styles1.buttonText}>1/1 (Square)</Text>
                            </TouchableOpacity>
                        </View>
                        {/* </TouchableWithoutFeedback> */}
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    const fileupload = async (aspect) => {
        console.log("file uploading ");

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

            console.log("====================================");
            console.log(result.assets[0].type);
            console.log(result.assets[0].mimeType);
            console.log("====================================");

            setImage(imageUri); // Set the selected image URI

            if (result.assets[0].type == "image") {
                settype("photo");
            } else settype(result.assets[0].type);
            // setfilename(result.assets)

            openBottomSheet3();
            console.log("Image URI:", imageUri);
        }
    };
    const Spacer = ({ height = 16 }) => <View style={{ height }} />;

    return (
        <DrawerLayoutAndroid
            drawerBackgroundColor="red"
            // onDrawerOpen={() => setIsDrawerOpen(true)}
            // onDrawerClose={() => setIsDrawerOpen(false)}
            style={{ zIndex: 10000, height: "100%" }}
            // ref={drawer}
            drawerWidth={300}
            drawerPosition={drawerPosition}
            renderNavigationView={navigationView}
        >
            {/* {isDrawerOpen && (
                    <BlurView

                        intensity={20}
                        blurReductionFactor={12}
                        tint="systemThinMaterialDark"

                        style={styles1.blurOverlay}  blurAmount={0} experimentalBlurMethod="dimezisBlurView"
                    />
                )} */}

            <SafeAreaView style={styles.container}>
                {skeleton && (
                    <Animated.View
                        ref={headeref}
                        // style={[{ transform: [{ translateY: translateY }] }, main.header]}
                        style={main.header}
                    >
                        <Text allowFontScaling={false} style={main.headertext}>
                            For you
                        </Text>
                    </Animated.View>
                )}
                {/* <Header/> */}

                <CustomAlert visible={visible} onClose={() => setVisible(false)} />

                {skeleton && (
                    <View style={{ flex: 1, alignItems: "center" }}>
                        {/* <View> */}
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 5,
                                width: "92%",
                                alignItems: "center",
                            }}
                        >
                            <Skeleton
                                // colorMode="dark"
                                width={30}
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                // backgroundColor="red" // Changed to red

                                height={30}
                                radius={"round"}
                                // backgroundColor="black"
                                highlightColor="#000" // Set highlight color
                            />
                            <Spacer height={8} />
                            <Skeleton
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                colorMode="dark"
                                width={"60%"}
                                height={10}
                                // backgroundColor="black"
                                highlightColor="#333" // Set highlight color
                            />
                        </View>
                        <Spacer height={8} />

                        <Skeleton
                            style={{ marginTop: 10 }}
                            colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                            transition={{
                                opacity: 1,
                                duration: 1000,

                                // repeat: true,
                            }}
                            colorMode="dark"
                            opacity={1}
                            highlightColor="red" // Set highlight color here
                            radius={20}
                            height={300}
                            width={"94%"}
                            // style={styles.box}
                        ></Skeleton>
                        <Spacer height={8} />

                        <View style={{}}>
                            <Skeleton
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                colorMode="dark"
                                width={"70%"}
                                height={12}
                                // backgroundColor="black"
                                highlightColor="#333" // Set highlight color
                            />
                            <Spacer height={8} />

                            <Skeleton
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                // colorMode="dark"
                                width={"90%"}
                                height={12}
                                // backgroundColor="black"
                                highlightColor="#333" // Set highlight color
                            />
                        </View>
                        <Spacer height={30} />
                        {/* </View> */}

                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 5,
                                width: "92%",
                                alignItems: "center",
                            }}
                        >
                            <Skeleton
                                // colorMode="dark"
                                width={30}
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                // backgroundColor="red" // Changed to red

                                height={30}
                                radius={"round"}
                                // backgroundColor="black"
                                highlightColor="#000" // Set highlight color
                            />
                            <Spacer height={8} />
                            <Skeleton
                                colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                                colorMode="dark"
                                width={"65%"}
                                height={10}
                                // backgroundColor="black"
                                highlightColor="#333" // Set highlight color
                            />
                        </View>
                        <Spacer height={8} />

                        <Skeleton
                            style={{ marginTop: 10 }}
                            colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                            transition={{
                                opacity: 1,
                                duration: 1000,

                                // repeat: true,
                            }}
                            colorMode="dark"
                            opacity={1}
                            highlightColor="red" // Set highlight color here
                            radius={20}
                            height={200}
                            width={"94%"}
                            // style={styles.box}
                        ></Skeleton>
                        <Spacer height={8} />

                        <Skeleton
                            colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                            colorMode="dark"
                            width={"90%"}
                            height={12}
                            backgroundColor="black"
                            highlightColor="#333" // Set highlight color
                        />
                        <Spacer height={8} />

                        <Skeleton
                            colors={["#272a2e", "#1A1D1F", "#272a2e", "#272a2e", "#1A1D1F", "#272a2e"]}
                            // colorMode="dark"
                            width={"90%"}
                            height={12}
                            // backgroundColor="black"
                            highlightColor="#333" // Set highlight color
                        />
                    </View>
                )}

                {allpost.length > 0 && !skeleton && (
                    <FlatList
                        simultaneousHandlers="bottomSheet"
                        ListHeaderComponent={Header}
                        // scrollEventThrottle={0}
                        ref={mainflatlist}
                        showsVerticalScrollIndicator={false}
                        style={main.scroll1}
                        initialNumToRender={5}
                        windowSize={10}
                        maxToRenderPerBatch={5}
                        scrollEventThrottle={16}
                        keyExtractor={(item, index) => {
                            return index;
                        }}
                        removeClippedSubview={false}
                        // onScroll={(e) => {
                        //     scrollY.setValue(e.nativeEvent.contentOffset.y)
                        // }}

                        contentContainerStyle={{
                            // marginTop : 200,
                            paddingBottom: 100,
                        }}
                        data={allpost}
                        renderItem={renderItem}
                        onViewableItemsChanged={onViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        refreshControl={
                            <RefreshControl
                                progressBackgroundColor="#16181a"
                                colors={["#00de62"]}
                                progressViewOffset={0} // Adjusts the offset of the spinner (optional)
                                refreshing={refreshing}
                                onRefresh={() => {
                                    // console.log("start");

                                    setRefreshing(true);
                                    // setbg("transparent")
                                    getpost();
                                    Vibration.vibrate(100);

                                    setTimeout(() => {
                                        setRefreshing(false); // Stop refreshing after fetching data
                                    }, 2000); // Adjust the delay as needed
                                }}
                            />
                        }
                        bounces={true}
                        contentInset={{ top: 10 }}
                    ></FlatList>
                )}

                {/* <TouchableWithoutFeedback onPress={closebottomsheet}> */}
                {/* <View style={{ position: "absolute" }}> */}

                {/* </View> */}

                {/* </TouchableWithoutFeedback> */}

                {/* {allpost.length == 0 && <Header />} */}

                <Pressable onPress={openBottomSheet} style={styles.add}>
                    <AntDesign name="pluscircle" size={50} color="#00de62" />
                </Pressable>
            </SafeAreaView>
        </DrawerLayoutAndroid>

        // <DrawerLayoutAndroid
        //     ref={drawer}
        //     drawerWidth={300}
        //     style={{zIndex  :100000 , elevation : 1000, height : 310 , width : "100%" , position : "absolute"}}
        //     drawerPosition={drawerPosition}
        //     renderNavigationView={navigationView}
        // >
        //     <View>
        //         <Text>hello</Text>
        //         <Button
        //             title="Open drawer"
        //             onPress={() => drawer.current?.openDrawer()}
        //         />
        //     </View>
        // </DrawerLayoutAndroid>
    );
};

export default Foryou;

const styles1 = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    alertBox: { width: 300, backgroundColor: "#1A1D1F", padding: 20, borderRadius: 20, alignItems: "center" },
    title: { fontSize: 20, fontWeight: "bold", color: "#D9D9D9", fontFamily: "Alata" },
    message: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: "center",
        color: "#D9D9D9",
        fontFamily: "Roboto",
    },
    button: {
        marginTop: 15,
        backgroundColor: "#00de62",
        padding: 6,
        paddingHorizontal: 37,
        borderRadius: 10,
        minWidth: 200,
        textAlign: "center",
    },
    buttonText: {
        color: "#1A1D1F",
        fontSize: 16,
        fontFamily: "Roboto",
        fontWeight: "bold",
        textAlign: "center",
    },
    showButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5 },
    showButtonText: { color: "#fff", fontSize: 16 },
    divider: {
        width: "110%",
        marginLeft: -20,
        height: 3,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: "#24272A",
    },

    blurOverlay: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
    },

    // container: {
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //     padding: 16,
    // },
    navigationContainer: {
        backgroundColor: "#ecf0f1",
    },
    paragraph: {
        padding: 16,
        fontSize: 15,
        textAlign: "center",
    },
});
