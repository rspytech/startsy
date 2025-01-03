
import { useFocusEffect } from "expo-router";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Text, StatusBar, View, Image, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Upvote from "../../assets/icons/upvote.js"
import Useradd from "../../assets/icons/useradd.js"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { url } from "../../config.js"
import { FlatList } from "react-native-gesture-handler";
import InvestorCard from "./InvestorCard.js"


const Notification = ({ token }) => {
    // useFocusEffect(() => {
    //     const setStatusBar = () => {
    //         StatusBar.setBackgroundColor("#16181A"); // Set your desired color
    //         StatusBar.setBarStyle("light-content");
    //     };
    //     setStatusBar();
    //     setTimeout(() => {
    //         setStatusBar()
    //     }, 0);
    // })
    const [data, setdata] = useState(null)
    const [loading, setloading] = useState(true)
    const [statistic, setstatistic] = useState({
        totalUpvotes: 0,
        upvotesPerDay: 0,
        investorUpvotes: 0

    })

    // useFocusEffect(
    //     useCallback(() => {
    //         if (token) {
    //             setloading(true)
    //             async function getData() {
    //                 try {
    //                     const response = await fetch(
    //                         `${url}founder/getFounderNotifications`,
    //                         {
    //                             method: "GET",
    //                             headers: {
    //                                 accept: "application/json",
    //                                 Authorization: `Bearer ${token}`,
    //                             },
    //                         }
    //                     );
    //                     const result = await response.json();
    //                     console.log(result.data[0].investor.roleId.user_id.profilePhoto);
    //                     console.log(result.data[0].investor.roleId.user_id.userName);
    //                     console.log(result.data[0].investor.roleId.user_id.role);
    //                     console.log(result.data[0].investor.roleId.previousExperience);
    //                     console.log(result.data[0].requestDate);


    //                 } catch (err) {
    //                     console.log(err);
    //                 }
    //                 finally {
    //                     setloading(false);
    //                 }
    //             }
    //             getData();
    //         }
    //     }, [token])
    // );



    useFocusEffect(
        useCallback(() => {
            if (token) {
                setloading(true)
                async function getData() {
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
                        console.log(result.data.totalUpvotes);
                        console.log(result.data.upvotesPerDay);
                        console.log(result.data.investorUpvotes);

                        setstatistic(result.data)

                        // console.log(result.data[0].investor.roleId.user_id.profilePhoto);
                        // console.log(result.data[0].investor.roleId.user_id.userName);
                        // console.log(result.data[0].investor.roleId.user_id.role);
                        // console.log(result.data[0].investor.roleId.previousExperience);
                        // console.log(result.data[0].requestDate);

                    } catch (err) {
                        console.log(err);
                    }
                    finally {
                        setloading(false);
                    }
                }
                getData();
            }
        }, [token])
    );

    const Tab = createMaterialTopTabNavigator();


    function Upvotedata() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: "#16181a" }}>
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
                <View style={styles.divider}></View>
            </ScrollView>

        )
    }

    return (

        <SafeAreaView style={{
            flex: 1,
            backgroundColor: "#16181A"
        }}>
            <Tab.Navigator

                screenOptions={({ route }) => ({

                    tabBarStyle: {
                        backgroundColor: "#16181a",
                        justifyContent: "space-between",
                        display: "flex",
                        width: width * 0.92,
                        margin: "auto"
                    },


                    tabBarIndicatorStyle: {
                        backgroundColor: "#00DE62",
                        height: 0,
                    },

                })}
            >
                <Tab.Screen
                    name="Connections"

                    children={(props) => <InvestorCard token={token} />}

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
    }

});