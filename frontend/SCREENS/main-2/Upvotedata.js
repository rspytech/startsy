
import { useFocusEffect } from "expo-router";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Text, StatusBar, View, Image, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, RefreshControl, Dimensions, ScrollView, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Upvote from "../../assets/icons/upvote.js"
import Useradd from "../../assets/icons/useradd.js"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { url } from "../../config.js"
import InvestorCard from "./InvestorCard.js"
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import B2 from "@/assets/icons/b2.js";
import { jwtDecode } from "jwt-decode";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';









function Upvotedata({ navigation, token }) {

    const [refreshing, setRefreshing] = useState(false)
    const [data, setdata] = useState(null)
    const [subnotification, setsubnotification] = useState([])
    const [loading, setloading] = useState(true)
    const [statistic, setstatistic] = useState({
        totalUpvotes: 0,
        upvotesPerDay: 0,
        investorUpvotes: 0

    })



    async function getdata() {
        try {
            const response = await fetch(
                `${url}founder/getFounderProfileDetails`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();
            console.log(result.data.totalUpvotes, "a");
            console.log(result.data.upvotesPerDay, "b");
            console.log(result.data.investorUpvotes, "c");

            var object = {
                totalUpvotes: result.data.upvotesPerDay,
                upvotesPerDay: result.data.upvotesPerDay,
                investorUpvotes: result.data.investorUpvotes
            }

            console.log(object, "object");
            setstatistic(object);

        } catch (err) {
            console.log(err);
        }
        finally {
            setloading(false);
        }
    }

    useEffect(() => {
        getdata()
        getData1()
    }, [])

    useFocusEffect(
        useCallback(() => {
            getdata()
            getData1()
        }, []))




    async function getData1() {
        try {
            const response = await fetch(
                `${url}notification/getUserNotifiation`,
                {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();


            console.log(result.data, "top 3 data ajilffkhedskfh");

            var array = result.data.sort((a,b)=>new Date(b.timestamp) - new Date(a.timestamp))

            // var array = result.data.reverse()

            setsubnotification(array);



        } catch (err) {
            console.log(err);
        }
        finally {
            setloading(false);
        }
    }



    function rendersub({ item }) {

        async function sendmessage() {


            var message = item.sendingUserId._id
            var jobrole = item.appliedJobRole;

            try {
                const response = await fetch(`${url}chats/addToChatDirectly/${message}`, {
                    method: 'POST',
                    body: "",
                    headers: {
                        accept: "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                // setloading(false)
                console.log(data);
            }
            catch (err) {

            }
            console.log(item.sendingUserId._id);


            console.log(message);
            var first = {
                user: {
                    _id: item.sendingUserId._id,
                    profilePhoto: item.sendingUserId.profilePhoto,
                    userName: item.sendingUserId.userName
                }

            }

            var extra = {
                status: true,
                jobrole

            }

            // console.log(item);


            navigation.navigate("Chat", { item: first, messages: [], token, navigation, extra });

        }


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
            <View style={styles.box1}>
                <View style={styles.left}>


                    <Pressable
                        style={{ paddingTop: 10 }}
                        onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.sendingUserId._id, page: "bell" }) }}

                    >
                        {item.sendingUserId.profilePhoto && <Image style={styles.topimage} source={{ uri: item.sendingUserId.profilePhoto }} />}
                        {!item.sendingUserId.profilePhoto && <Image style={styles.topimage} source={require("../../assets/images/p2.png")} />}

                    </Pressable>
                    <View style={styles.bottominfo1}>
                        <View style={{ display: "flex", flexDirection: "row" }}>

                            <Pressable
                                onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.sendingUserId._id, page: "bell" }) }}

                            >
                                <Text style={styles.topu1}>{item.sendingUserId.userName} <Text style={styles.topu2}>{item.sendingUserId.role == "CommunityMember" ? "Member" : item.sendingUserId.role}</Text> <View style={styles.circle}></View> <AutoSizeText
                                    numberOfLines={1}
                                    fontSize={11}
                                    mode={ResizeTextMode.max_lines}
                                    ellipsizeMode='tail'
                                    style={styles.time}>{time(item.timestamp)}
                                </AutoSizeText>

                                </Text>
                            </Pressable>
                            {/* <Text style={styles.time}>{time(item.taggedUser.createdAt)}</Text> */}


                        </View>
                        {/* <Text style={styles.sub2}>{item.notificationMessage}</Text> */}
                        <AutoSizeText
                            numberOfLines={1}
                            fontSize={12}
                            mode={ResizeTextMode.max_lines}
                            ellipsizeMode='tail'
                            style={styles.sub2}>{item.notificationMessage}
                        </AutoSizeText>
                    </View>
                </View>
                <View style={styles.right}>
                    {item.notificationType == "upvotePost"}
                    {item.notificationType == "upvoteProfile"}
                    {item.notificationType == "jobApplied" &&
                        <Pressable onPress={sendmessage} style={{ top: 16, right: 0 }}>
                            <MaterialCommunityIcons name="message-text-outline" size={34} color={"#00DE62"} />
                        </Pressable>
                    }
                    {item.notificationType == "joinCommunity"}
                    {/* {item.notificationType == "upvotePost" && item.postId?.type == "blogPost" && <B2 width={40} height={40} />} */}
                    {item.notificationType == "upvotePost" && item.postId?.type == "photo" && <Image style={styles.image1} source={{ uri: item.postId.mediaUrl }} />}
                    {item.notificationType == "commentPost"}

                </View>
            </View>



        )


    }


    function top100() {
        return (
            <View style={styles.container1}>
                <View style={styles.textbox}>
                    <Text style={styles.t1}>{statistic.totalUpvotes}</Text>
                    <Text style={styles.t2}>Total UpVotes</Text>
                </View>
                <View style={styles.textbox}>
                    <Text style={styles.t1}>{statistic.upvotesPerDay}</Text>
                    <Text style={styles.t2}>Today </Text>
                </View>
                {decode.role != "CommunityMember" && <View style={styles.textbox}>
                    <Text style={styles.t1}>{statistic.investorUpvotes}</Text>
                    <Text style={styles.t2}>By Investors </Text>
                </View>}

                {/* <Text> {JSON.stringify(token)}</Text> */}
            </View>
        )
    }
    var decode;

    function top3data() {

        decode = jwtDecode(token)

        return (
            <FlatList
                // contentContainerStyle={{ height: 300, backgroundColor: "#16181a" }}
                data={null}
                renderItem={() => null}
                ListHeaderComponent={top100}
            />
        )
    }


    function top1() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.divider}></View>


                <FlatList
                    ListHeaderComponent={top3data}
                    data={subnotification}
                    renderItem={rendersub}
                    contentContainerStyle={{ elevation: 10, height: 700, backgroundColor: "#16181a" }}


                />
            </View>
        )
    }

    function rendersub1() {
        return (
            <Text style={{ color: "yellow", fontSize: 30 }}>okkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</Text>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#16181a" }}>


            <View style={styles.divider}></View>


            <FlatList
                // style={{marginTop : 300}}
                // style={{flex:1 , height : 100}}
                scrollEnabled={true}
                refreshControl={<RefreshControl progressViewOffset={0} refreshing={refreshing}
                    onRefresh={() => {
                        console.log("start");
                        // setRefreshing(true)

                        getdata();
                        getData1()

                        setTimeout(() => {
                            setRefreshing(false);
                        }, 2000);
                    }} />}

                ListHeaderComponent={top3data}
                data={subnotification}
                // data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={rendersub}
                // renderItem={rendersub1}
                contentContainerStyle={{ paddingBottom: 100, elevation: 1, backgroundColor: "#16181a" }}


            />



        </View>

    )
}


export default Upvotedata





const { height, width } = Dimensions.get("window");
var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)







const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: 16,
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,

    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    role: {
        fontSize: 24,
        color: '#E9E9E9',
        flex: 1,
        fontFamily: "Alata"
    },
    date: {
        fontSize: 12,
        color: '#B8B8B8',
        fontFamily: "Roboto"
    },
    name: {
        fontSize: 32,
        color: '#B8B8B8',
        // fontWeight: 'bold',
        marginBottom: 8,
        fontFamily: "Alata"
    },
    info: {
        fontSize: 16,
        color: '#D9D9D9',
        marginBottom: 4,
        fontFamily: "Roboto"
    },
    info1: {
        fontSize: 16,
        color: '#00DE62',
        marginBottom: 4,
        fontFamily: "Roboto"
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
        marginTop: 16,
    },
    buttonAccept: {
        backgroundColor: 'transparent',
        borderRadius: 30,
        paddingVertical: 0,
        paddingHorizontal: 20,
        height: 41,
        width: 117,
        borderWidth: 2,
        borderColor: "#B8B8B8",
        justifyContent: "center",
        alignItems: "center",

    },
    buttonReject: {
        backgroundColor: '#ff0000',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 18,
        color: '#00DE62',
        // fontWeight: 'bold',
        fontFamily: "Alata",
        textAlign: "center",
        textAlignVertical: "center",
        marginTop: -5
    },
    divider: {
        width: width,
        height: 3,
        marginTop: 5,
        backgroundColor: "#24272A"
    },
    tabbarpill: {
        borderWidth: 1,
        borderRadius: 30,
        textAlign: "center",
        textAlignVertical: "center",
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: width * 0.44,
        fontFamily: "Alata",
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center",
        textTransform: "capitalize",
        borderWidth: 2,
        borderRadius: 30,
        paddingLeft: 20,

        marginTop: -1

    },
    container1: {
        display: "flex",
        width: "100%",
        marginVertical: 20,
        marginHorizontal: "auto",
        // backgroundColor : "red",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    textbox: {
        alignSelf: "center",
        justifyContent: "center"
    },
    t1: {
        fontFamily: "Roboto",
        color: "#00DE62",
        fontSize: 40
    },
    t2: {
        fontFamily: "Roboto",
        color: "#B8B8B8",
        fontSize: 12,
        textAlign: "center",
        alignSelf: "center",
        justifyContent: "flex-end",
    },
    headerText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        // marginBottom: 20,
        color: "#00DE62",
        fontFamily: "myanmar",
        paddingHorizontal: 20,
        marginVertical: 12

    },
    box1: {
        height: 70,
        borderRadius: 15,
        width: "98%",
        marginHorizontal: "auto",
        marginVertical: 7,
        backgroundColor: "#24272A",
        // marginBottom : 20,
        paddingHorizontal: 10,
        marginHorizontal: 6,
        display: "flex",
        flexDirection: "row",
        zIndex: 0,
        elevation: 0


    },
    left: {
        width: "90%",
        // justifyContent: "space-between",
        display: "flex",
        flexDirection: "row"
    },
    text: {
        fontSize: 12,
        fontFamily: "Roboto",
        color: "#B8B8B8",
        lineHeight: 16,
        width: "90%"
    },
    bottominfo1: {
        display: "flex",
        flexDirection: "row",
        // justifyContent : "center",
        alignContent: "flex-start",
        // alignSelf : "flex-end",
        justifyContent: "flex-start",
        marginTop: 5,
        textAlignVertical: "center",
        // marginBottom : 0,
        // bottom : -10,
        // backgroundColor: "red",
        width: "100%",
        // flexWrap : "wrap",
        display: "flex",
        flexDirection: "column",


    },
    des: {
        fontFamily: "Roboto",
        fontSize: scalingfactor * 12,
        fontWeight: "bold",
        color: "#D9D9D9",
        width: "80%"

    },

    topimage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        alignSelf: "center",
        justifyContent: "center",
    },
    topu1: {
        fontFamily: "Alata",
        color: "#E9E9E9",
        fontSize: 18,
        marginLeft: 10,
        // backgroundColor : "red",
        // maxWidth : width * 0.8
        // marginTop : -2,
        // alignSelf: "center",


    },
    topu2: {
        fontFamily: "Roboto",
        color: "#00DE62",
        fontSize: 11,
        // alignSelf: "center",
        // justifyContent: "center",
        // textAlignVertical: "center",
        marginLeft: 5

    },

    time: {
        fontFamily: "Roboto",
        color: "#828282",
        fontSize: 10,
        // alignSelf: "center",
        marginLeft: 5,
        width: 40,
        // backgroundColor : "red"
    },
    circle: {
        width: 5,
        height: 5,
        backgroundColor: "#B8B8B8",
        borderRadius: 50,
        // alignSelf: "flex-start",
        marginLeft: 5,
        marginTop: 5
    },
    right: {
        width: "10%",
        // backgroundColor : "red",
        justifyContent: "flex-center",
        alignItems: "flex-end",
        alignContent: "flex-end"

    },
    image1: {
        borderRadius: 6,
        alignSelf: "center",
        justifyContent: "center",
        alignSelf: "center",
        width: 30,
        height: 30,
        aspectRatio: 1 / 1,
        overflow: "hidden",
        marginTop: 20,

        objectFit: "cover",
        maxHeight: "90%",

    },

    sub2: {
        fontSize: 16,
        paddingLeft: 10,
        marginTop: 5,
        color: "#bbbbbb",
        fontFamily: "Roboto",
    }

});