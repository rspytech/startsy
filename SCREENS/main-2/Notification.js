
import { useFocusEffect } from "expo-router";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Text, StatusBar, View, Image, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ScrollView, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Upvote from "../../assets/icons/upvote.js"
import Useradd from "../../assets/icons/useradd.js"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { url } from "../../config.js"
import { FlatList } from "react-native-gesture-handler";
import InvestorCard from "./InvestorCard.js"
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import B2 from "@/assets/icons/b2.js";


const Notification = ({ token, navigation }) => {

    const [data, setdata] = useState(null)
    const [subnotification, setsubnotification] = useState([])
    const [loading, setloading] = useState(true)
    const [statistic, setstatistic] = useState({
        totalUpvotes: 0,
        upvotesPerDay: 0,
        investorUpvotes: 0

    })

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

            // console.log(result.data.at(-1));
            console.log(result.data[0].sendingUserId._id);
            console.log(result.data[1].sendingUserId._id);
            console.log(result.data[2].sendingUserId._id);
            console.log(result.data[4].sendingUserId._id);
            console.log(result.data[5].sendingUserId._id);
            console.log(result.data[6].sendingUserId._id);

            setsubnotification(result.data);

        } catch (err) {
            console.log(err);
        }
        finally {
            setloading(false);
        }
    }

    useEffect(() => {
        getData1();
    }, [])

    useFocusEffect(
        useCallback( () => {
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

                    console.log(result);
                    setsubnotification(result.data);

                } catch (err) {
                    console.log(err);
                }
                finally {
                    setloading(false);
                }
            }
            getData1()
        }, [token])
    )






    const Tab = createMaterialTopTabNavigator();


    function Upvotedata() {



        function rendersub({ item }) {

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
                <View
                    style={styles.box1}>
                    <View style={styles.left}>


                        <Pressable
                            style={{ paddingTop: 10 }}
                            onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.sendingUserId._id, page: "bell" }) }}

                        >
                            <Image style={styles.topimage} source={{ uri: item.sendingUserId.profilePhoto }} />

                        </Pressable>
                        <View style={styles.bottominfo1}>
                            <View style={{ display: "flex", flexDirection: "row" }}>

                                <Pressable
                                    onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.sendingUserId._id, page: "bell" }) }}

                                >
                                    <Text style={styles.topu1}>{item.sendingUserId.userName}  <Text style={styles.topu2}>founder</Text>  <View style={styles.circle}></View>  <AutoSizeText
                                        numberOfLines={1}
                                        fontSize={12}
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
                        {item.notificationType == "upvoteProfile"}
                        {item.notificationType == "jobApplied"}
                        {item.notificationType == "joinCommunity"}
                        {item.notificationType == "upvotePost" && item.postId.type == "blogPost" && <B2 width={40} height={40} />}
                        {item.notificationType == "upvotePost" && item.postId.type == "photo" && <Image style={styles.image1} source={{ uri: item.postId.mediaUrl }} />}
                        {item.notificationType == "commentPost"}

                    </View>
                </View>
            )
        }

        function top3data() {
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
                    <View style={styles.textbox}>
                        <Text style={styles.t1}>{statistic.investorUpvotes}</Text>
                        <Text style={styles.t2}>By Investors </Text>
                    </View>
                </View>
            )
        }


        return (
            <View
                //  refreshControl={}
                style={{ flex: 1, backgroundColor: "#16181a" }}>

                <View style={styles.divider}></View>


                <FlatList
                    ListHeaderComponent={top3data}

                    data={subnotification}
                    renderItem={rendersub}

                    contentContainerStyle={{ paddingBottom: 100 }}


                />


            </View>

        )
    }

    return (

        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#16181A"
        }}>
            <Text allowFontScaling={false} style={styles.headerText}>Notification</Text>
            <Tab.Navigator

                screenOptions={({ route }) => ({

                    tabBarStyle: {
                        backgroundColor: "#16181a",
                        justifyContent: "space-between",
                        display: "flex",
                        width: width * 0.92,
                        margin: "auto",
                        borderBlockColor: "transparent",
                        elevation: 0
                    },


                    tabBarIndicatorStyle: {
                        backgroundColor: "#00DE62",
                        height: 0,
                    },

                })}
            >
                <Tab.Screen
                    name="Connections"

                    children={(props) => <InvestorCard token={token} navigation={navigation} />}

                    options={{
                        tabBarLabel: ({ focused }) => (


                            <View >
                                <View style={{ position: "absolute", left: 20, top: 10 }}>
                                    {focused && <Useradd />}
                                    {!focused && <Useradd color="#B8B8B8" />}
                                </View>
                                <Text allowFontScaling={false} style={[
                                    styles.tabbarpill, {
                                        color: focused ? "#00DE62" : "#B8B8B8",
                                        borderColor: focused ? "#00DE62" : "#24272A",
                                        // backgroundColor: focused ? "#00DE62" : "transparent",
                                    }
                                ]}>
                                    Request

                                </Text>
                            </View>
                        ),

                    }}
                />
                <Tab.Screen

                    name="Requests"
                    component={Upvotedata}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <View >
                                <View style={{ position: "absolute", left: 20, top: 10 }}>
                                    {focused && <Upvote />}
                                    {!focused && <Upvote color="#B8B8B8" />}
                                </View>
                                <Text allowFontScaling={false} style={[
                                    styles.tabbarpill, {
                                        color: focused ? "#00DE62" : "#B8B8B8",
                                        borderColor: focused ? "#00DE62" : "#24272A",
                                        // backgroundColor: focused ? "#00DE62" : "transparent",
                                    }
                                ]}>
                                    upvote

                                </Text>
                            </View>
                        ),

                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    )
}



export default Notification

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
        width: 60,
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