import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { SafeAreaView, Text, Pressable, TextInput, View, Image, StyleSheet, StatusBar, Platform, Animated, Easing, Dimensions, FlatList, ScrollView, Keyboard, KeyboardAvoidingView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { ScrollView } from "react-native-gesture-handler";
import { InteractionManager } from "react-native";

import { BackHandler } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";

import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";

import { url } from "../../config.js"

const Chat = ({ navigation, route }) => {


    const { item, messages, token } = route.params;
    // console.log('====================================');
    console.log(item, "chatscreen ka item hai ");
    // console.log(messages, "chatscreen ka item hai ");

    const jisuserkosendkarnahaiuskiid = item.user._id;
    console.log(jisuserkosendkarnahaiuskiid);


    const [data, setdata] = useState(null)


    console.log('====================================');





    const [socket, setSocket] = useState(null);
    const [id, setid] = useState(null);
    const flatListRef = useRef(null);
    const [keyboardstatus, setkeyboardstatus] = useState(false)
    const inputRef = useRef(null);
    const [offset, setoffset] = useState(320)
    const [newtext, setnewtext] = useState("")



    useEffect(() => {
        const setStatusBar = () => {
            StatusBar.setBackgroundColor("#16181A"); // Set your desired color
            StatusBar.setBarStyle("light-content");
        };

        setdata(messages)
        setStatusBar();
        setTimeout(() => {
            setStatusBar()
        }, 0);

        if (messages && flatListRef.current) {
            setTimeout(() => {
                // Ensure we are only scrolling when new messages are added
                InteractionManager.runAfterInteractions(() => {
                    flatListRef.current.scrollToOffset({
                        offset: messages.length * 100,  // Adjust to actual item height
                        animated: false,
                    });
                });
            }, 0);
        }



    }, [])




    useEffect(() => {
        // Connect to the Socket.IO server
        const newSocket = io(`${url}`, {
            // transports: ["websocket"], // Ensure WebSocket is used
        });

        setSocket(newSocket);
        const decoded = jwtDecode(token);
        console.log(decoded);

        setid(decoded._id)


        // Clean up the connection on unmount
        return () => {
            newSocket.disconnect();
        };
    }, []);




    useEffect(() => {


        if (socket) {

            const finaldata = {
                senderId: id,
                receiverId: jisuserkosendkarnahaiuskiid,
                message: newtext
            }
            socket.emit("registerUser", finaldata)
            console.log("i am connection socke url, ", url);
            // Listen for incoming private messages
            socket.on("privateMessage", (data) => {
                console.log(data);
                setdata((prevMessages) => [...prevMessages, data]);
            });
        }
    }, [socket]);


    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const setStatusBar = () => {
                StatusBar.setBackgroundColor("#16181A");
                StatusBar.setBarStyle("light-content");
            };

            // Update status bar reliably
            setStatusBar();

            // // Use InteractionManager to defer actions until navigation is settled
            const interaction = InteractionManager.runAfterInteractions(() => {
                //     if (isActive) {
                //         if (flatListRef.current) {
                //             flatListRef.current.scrollToOffset({
                //                 offset: data.length * 100,
                //                 animated: true,
                //             });
                //         }
                //     }
            });
            // if (flatListRef.current) {
            //     flatListRef.current.scrollToOffset({
            //         offset: messages.length * 200,
            //         animated: true,
            //     });
            // }

            // Keyboard event listeners
            const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", (e) => {
                if (isActive) setoffset(e.endCoordinates.height);
            });

            const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
                if (isActive) {
                    setkeyboardstatus(false);
                    if (inputRef.current) inputRef.current.blur();
                }
            });

            // Cleanup function
            return () => {
                isActive = false;
                interaction.cancel();
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
            };
        }, [data]) // Dependency on `data.length` for accurate scroll behavior
    );





    function sendmessage() {

        if (newtext == "") {
            return
        }
        console.log(messages);

        const finaldata = {
            senderId: id,
            receiverId: jisuserkosendkarnahaiuskiid,
            message: newtext
        }
        socket.emit("privateMessage", finaldata)
        setdata([...data, { message: newtext, senderId: id }])


        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({
                offset: data.length * 100,
                animated: true,
            });
        }
        setnewtext("")


    }

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.message,
            (item.senderId == jisuserkosendkarnahaiuskiid) ? styles.received : styles.sent
            ]}>
                <Text allowFontScaling={false} style={[(item.senderId != jisuserkosendkarnahaiuskiid) ? styles.senttext : styles.receivedtext]}>{item.message}</Text>
            </View>
        );
    };

    const handleFocus = async (e) => {

        setkeyboardstatus(true)

    };
    const marginBottom = new Animated.Value(0);
    useEffect(() => {

        Animated.timing(marginBottom, {
            toValue: keyboardstatus ? offset : 0, // Transition to either the offset or 0
            duration: 0, // 300ms transition
            useNativeDriver: false, // MarginBottom can't be animated natively
        }).start();
    }, [keyboardstatus, offset]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            setkeyboardstatus(false)
            console.log("hi");
            if (inputRef.current) {
                inputRef.current.blur();
            }

            return true; // This prevents the default back action
        });

        return () => backHandler.remove();
    }, [token]);

    useEffect(() => {

    }, [data]);



    return (
        <View style={{ flex: 1, backgroundColor: "#16181a" }}>
            <View style={[styles.header]}>
                <Pressable onPress={() => { navigation.goBack() }}>
                    <Ionicons name="arrow-back-circle-outline" size={40} color="#00DE62" />
                </Pressable>
                <Pressable
                    onPress={() => { navigation.navigate("Singleprofilepage", { token: token, id: item.user._id, page: "Chat", item, messages, }) }}
                >
                    <View style={styles.details}>
                        <View style={styles.userimg}>
                            <Image style={styles.image} source={{ uri: item.user.profilePhoto }} />
                        </View>
                        <View style={styles.d2}>
                            <Text allowFontScaling={false} style={styles.userid}>{item.user.userName}</Text>
                            <Text allowFontScaling={false} style={styles.username}>{item.user.userName}</Text>
                        </View>
                    </View>
                </Pressable>
            </View>

            <KeyboardAvoidingView keyboardVerticalOffset={-50}
                style={{ flex: keyboardstatus ? 0.5 : 1 }}
            >


                <FlatList
                    style={[styles.scroll,]}
                    data={data}
                    ref={flatListRef}
                    renderItem={renderItem}

                    getItemLayout={(data, index) => ({ length: 100, offset: 100 * index, index })}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingVertical: 20,
                        justifyContent: 'flex-end',
                    }}
                />
            </KeyboardAvoidingView>



            <Pressable onPress={() => { setkeyboardstatus(true) }}>
                <Animated.View style={[styles.searchContainer]}>
                    <TextInput
                        ref={inputRef}
                        allowFontScaling={false}
                        multiline={true}
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#828282"
                        onFocus={handleFocus}
                        onBlur={() => setkeyboardstatus(false)}
                        onChangeText={(val) => setnewtext(val)}
                        value={newtext}
                    />
                    <Pressable style={styles.send} onPress={sendmessage}>
                        <Ionicons name="send" size={24} color="#00DE62" />
                    </Pressable>
                </Animated.View>
            </Pressable>








        </View >
    )
}


export default Chat



const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)


const styles = StyleSheet.create({
    container: {

        flex: 1,
        // height: height,
        backgroundColor: "#16181a",
        // backgroundColor: "yellow",
        marginTop: 0,
        top: 0
    },

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
    image: {
        width: 43,
        height: 43,
        borderRadius: 100,
        // marginBottom :100
    },

    userid: {
        fontFamily: "Alata",
        fontSize: 22,
        color: "#00DE62",
        alignSelf: "flex-start",

    },
    username: {
        fontFamily: "Roboto",
        fontSize: 12,
        color: "#B8B8B8",
        alignSelf: "flex-start",
    },
    details: {
        display: "flex",
        flexDirection: "row"
    },
    header: {
        height: 100,
        width: "100%",
        // position: "absolute",

        // opacity : 0.1,
        backgroundColor: "#16181a",
        // left: 0,
        padding: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        zIndex: 1000,
        position: "relative",
        // top: 0,
        // marginTop: 5,
        paddingBottom: 12,
        height: 60,
    },
    d2: {
        alignSelf: "center",
        alignContent: "flex-start",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingLeft: 10,
        marginTop: -10,
        // marginBottom  :10
    }
    ,
    scroll: {

        // backgroundColor: "red",
        // flex: 0.5,
        // height :height/2
        // overflow : "visible"
    },
    message: {
        height: "auto",
        minHeight: 42,
        marginBottom: 10,
        marginTop: 0
    },
    senttext: {
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#00DE62",
        maxWidth: width * 0.6,
        fontWeight: "bold",
        // backgroundColor: "red",
        borderRadius: 40,
        borderBottomRightRadius: 2,
        borderWidth: 2,
        borderColor: "#00DE62",
        backgroundColor: "transparent",
        maxWidth: width * 0.6,
        padding: 20,
        paddingVertical: 10,

    },
    receivedtext: {
        fontFamily: "Roboto",
        fontSize: 16,
        color: "#16181a",
        maxWidth: width * 0.6,
        fontWeight: "bold",
        // backgroundColor : "red",
        borderRadius: 40,
        borderBottomLeftRadius: 2,
        backgroundColor: "#00DE62",
        maxWidth: width * 0.6,
        padding: 20,
        paddingVertical: 10,

    }
    , sent: {
        alignItems: "flex-end",
        justifyContent: "center",
        marginVertical: 5
    }
    , received: {
        alignItems: "flex-start",
        justifyContent: "center",
        marginVertical: 5
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
    }
})


