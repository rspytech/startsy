

import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { url } from "../../config.js"
import B1 from "../../assets/icons/b1.js"
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, RefreshControl, FlatList, StatusBar } from "react-native";
const Communities = ({ token, navigation }) => {
    const [filtereddata, setfiltereddata] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setloading] = useState(false)

    const [jisuserkosendkarnahaiuskiid, setjisuserkosendkarnahaiuskiid] = useState("")

    var [messages, setmessage] = useState(null)

    useFocusEffect(
        useCallback(() => {
            console.log("group call");

            async function getdata() {
                setloading(true)
                try {

                    const response = await fetch(`${url}groupChat/getCommunityGroupChatList`, {
                        method: 'GET',
                        headers: {
                            accept: "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    console.log(data.data.length);
                    // console.log(response.status);

                    const uniqueData = data.data.filter((item, index, self) =>
                        self.findIndex(innerItem => innerItem.communityName === item.communityName) === index
                );

                console.log(uniqueData.length);
                setfiltereddata(uniqueData)



                }
                catch (err) {
                    console.log(err);

                }
                finally {
                    setloading(false);
                }
            }

            getdata();

        } , [])
    )


    useEffect(() => {
        async function getdata() {
            setloading(true)
            try {

                const response = await fetch(`${url}groupChat/getCommunityGroupChatList`, {
                    method: 'GET',
                    headers: {
                        accept: "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log(data.data.length);
                // console.log(response.status);

                const uniqueData = data.data.filter((item, index, self) =>
                    self.findIndex(innerItem => innerItem.communityName === item.communityName) === index
                );

                console.log(uniqueData.length);
                setfiltereddata(uniqueData)



            }
            catch (err) {
                console.log(err);

            }
            finally {
                setloading(false);
            }
        }

        getdata();


    }, [])

    async function gotochatscreen(item) {

        console.log(item._id);


        if (token) {
            // console.log(token, "second use focus effect");
            try {
                const response = await fetch(
                    `${url}groupChat/getGroupChatMessage/${item._id}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const result = await response.json();
                // console.log(result.data, "investor");
                // setmessage(result.data)
                navigation.navigate("Chat1", { item, messages:result.data, token, navigation })
            } catch (err) {
                console.log(err);
            } finally {
                // setloading(false); // Set loading to false when done
            }
        }


       
    }



    return (
        <View style={styles.listContainer}>
            {filtereddata && <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}

                data={filtereddata}
                keyExtractor={(item, index) => index.toString()}
                // refreshControl={<RefreshControl refreshing={refreshing}
                //     onRefresh={getdata}

                // />}
                renderItem={({ item }) => {
                    // console.log(item);

                    return (
                        <TouchableOpacity onPress={() => {
                            gotochatscreen(item)
                        }}>
                            <View style={styles.listItem}>


                                <View style={styles.avatar}>
                                    <B1 />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        allowFontScaling={false} style={styles.username}>{item.communityName}</Text>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"

                                        allowFontScaling={false} style={styles.message}>{item.lastMessage?.message || "No chats yet"}</Text>
                                </View>
                                <Text


                                    allowFontScaling={false} style={styles.time}>{item.lastMessage ? time(item.lastMessage.createdAt) : "today"}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />}

            {loading && <ActivityIndicator size="large" color="#fff" />}
        </View>
    )


}


export default Communities

const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;
const scalingfactor = Math.sqrt(a * b)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16181a",
    },
    c1: {
        flex: 1,
        backgroundColor: "#16181a",
    },

    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#16181a",
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#333",
        alignSelf: "flex-start",
        width: "100%"
    },
    avatar: {
        width: 50,
        height: 50,
        marginTop: 5,

        borderRadius: 25,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        alignSelf: "flex-start",
    },
    username: {
        fontSize: 22,
        color: "#00DE62",
        fontFamily: "Alata",
        alignSelf: "flex-start",
        marginTop: -5,
        marginBottom: 5,
        backgroundColor: "red"
    },
    message: {
        fontSize: 14,
        color: "#B8B8B8",
        marginTop: -3,
    },
    time: {
        fontSize: 12,
        width: 100,
        position: "absolute",
        right: 10,
        top: 15,
        textAlign: "right",
        // backgroundColor : "red",
        color: "#B8B8B8",
        fontFamily: "Roboto",
    },





    username: {
        color: '#E9E9E9',
        fontWeight: '600',
        fontSize: 22,
        width: "80%",
        fontFamily: "Alata",
        marginBottom: 3,
        marginTop: -2,
        // backgroundColor : "red"


    },

    title: {
        color: '#B8B8B8',
        // fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 6,
        fontFamily: "Alata"
    },
    description: {
        color: '#D9D9D9',
        fontSize: 13,
        // marginBottom: 12,
        fontFamily: "Roboto"
    },
    status: {
        color: '#00DE62',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
        fontFamily: "Roboto"

    },
    pending: {
        fontFamily: "Roboto",

        color: '#B8B8B8',
        fontSize: 14,
        textAlign: "center",
        marginVertical: 5
    },



});
