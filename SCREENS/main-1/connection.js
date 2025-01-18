import React, { useEffect, useState, useContext, useCallback } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Image, RefreshControl, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Pressable } from "react-native";
import { useFocusEffect } from "expo-router";

import { url } from "../../config.js"
import { GlobalContext } from "@/Global/globalcontext.js";

import { jwtDecode } from "jwt-decode";



const data1 = Array(5).fill({
    user: {
        userName: "raz.shhh",
        message: "text...",
        time: "Today",
        profilePhoto: "https://res.cloudinary.com/dldbd8zhs/image/upload/v1734618122/wn6f65kia1xlzsn8ygnd.jpg"
    }// Replace with your image path
});








const ConnectionsScreen = ({ navigation, search , token}) => {

    console.log(search);
    console.log(navigation);
    

    const [filtereddata, setfiltereddata] = useState([])
    useEffect(() => {
        console.log(search);
        if (data && data.length > 0) {
            setfiltereddata(data.filter(item =>
                search === "" || item.user.userName.toLowerCase().startsWith(search.toLowerCase())
            ))
        }
    }, [search, data])
    const [refreshing, setRefreshing] = useState(false);
    const { globaldata } = useContext(GlobalContext);


    const [data, setData] = useState(null)
    const [loading, setloading] = useState(false)

    const fetchData = async () => {
        var route = ""

        const decoded = jwtDecode(token);
        console.log(decoded);

        console.log(decoded.role);
        

        if (decoded.role == "Founder") {
            route = "founder/getFounderChatUserList"
        }
        else if (decoded.role == "Investor") {
            route = "investor/getInvestorChatUserList"
        }
        else if (decoded.role == "CommunityMember"){
            console.log("fuck");
            
            route = "founder/getFounderChatUserList"

        }
        // else if()

        setloading(true); // Start loading before fetching data
        if (token) {
            // console.log(token, "second use focus effect");
            try {
                const response = await fetch(
                    `${url}${route}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const result = await response.json();
                console.log(result, "investor");
                // console.log(result.data, "investor");
                // console.log(result.data.messages.length, "investor");

                if (response.status === 200) {
                    // You can update the data state here if needed
                    // setData(result); // Example, you can handle the response data
                    setData(result)
                    setfiltereddata(result)
                    // setdata1(result)
                }
            } catch (err) {
                console.log(err);
            } finally {
                setloading(false); // Set loading to false when done
            }
        }
    };


    useEffect(() => {

        fetchData();

    }, [token])


    function gotochatscreen(item) {
        console.log(item.user._id);

        const id = item.user._id;

        async function getData() {
            try {
                console.log(token, "function ke under wala");

                console.log(`${url}investor/recommendation/getFounderProfile`);

                const response = await fetch(
                    `${url}chats/getMessage/individual/${id}`,
                    {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const result = await response.json();
                // console.log(result.data.messages);
                // setData(result.data);
                // setloading(false);
                navigation.navigate("Chat", { item, messages: result.data?.messages || [], token , navigation });

            } catch (err) {
                console.log(err, "eror");
            }
            finally {
            }
        }
        getData();
    }
    return (
        <View style={styles.listContainer}>
            {!loading && <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:100}}

                data={filtereddata}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={<RefreshControl refreshing={refreshing}
                    onRefresh={fetchData}

                />}
                renderItem={({ item }) => {
                    // console.log(item);

                    return (
                        <TouchableOpacity onPress={() => {
                            gotochatscreen(item)
                        }}>
                            <View style={styles.listItem}>
                                <Image
                                    source={{ uri: item.user.profilePhoto || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8slgZXgqnSIXDS8wF2uDT_SmsYlBe-W1soQ&s" }}
                                    style={styles.avatar} />
                                <View style={styles.textContainer}>
                                    <Text allowFontScaling={false} style={styles.username}>{item.user.userName}</Text>
                                    <Text allowFontScaling={false} style={styles.message}>{item.message || "abhi nai hai"}</Text>
                                </View>
                                <Text allowFontScaling={false} style={styles.time}>{item.time || "today"}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />}

            {loading && <ActivityIndicator size="large" color="#fff" />}
        </View>
    )
}
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
    header: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        marginVertical: 20,
        marginLeft: 20,
        fontFamily: "myanmar",
    },
    searchContainer: {
        marginHorizontal: 20,
        marginBottom: 10,
    },
    searchInput: {
        height: 50,
        borderColor: "#00DE62",
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        color: "#828282",
        fontFamily: "Roboto",
        fontSize: 18,
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
        marginTop: 0,
        marginBottom: 5
    },
    message: {
        fontSize: 14,
        color: "#B8B8B8",
        marginTop: -3,
    },
    time: {
        fontSize: 12,
        color: "#B8B8B8",
        fontFamily: "Roboto",
    },
    placeholderText: {
        color: "#B8B8B8",
        textAlign: "center",
        marginTop: 50,
        fontSize: 16,
    },
    card: {
        width: width * 0.92,
        marginHorizontal: "auto",
        padding: 16,
        backgroundColor: '#1A1C1E',
        marginTop: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'rgba(0,0,0, 0.8)', // Shadow color
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 10, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,
    },
    header1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    headerText: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: "space-between"
    },
    username: {
        color: '#E9E9E9',
        fontWeight: '600',
        fontSize: 22,
        fontFamily: "Alata",
        marginBottom: 3,
        marginTop: -2

    },
    date: {
        color: '#a1a1a1',
        fontSize: 14,
        alignSelf: "center"
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


    tabbarpill: {
        borderWidth: 1,
        borderRadius: 30,
        textAlign: "center",
        height: 48,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: width * 0.44,
        // zIndex: 100,
        fontFamily: "Alata",
        fontSize: 20,
        textAlign: "center",
        textAlignVertical: "center",
        textTransform: "capitalize",
        borderWidth: 1,
        borderRadius: 30,
    }
});


export default ConnectionsScreen