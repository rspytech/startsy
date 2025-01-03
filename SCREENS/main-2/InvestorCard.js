


import React, { useState, useRef, useEffect, useCallback } from "react";
import { Text, Animated, RefreshControl, StatusBar, View, Image, FlatList, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { url } from "../../config.js"


const InvestorCard = ({ token }) => {


    const [items, setItems] = useState([])
    const [animation, setanimation] = useState([]);
    const [loading, setloading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    console.log("request screen of ofunder ");
    const animatedValues = useRef({})


    // Update animationRefs whenever data changes
    useEffect(() => {

        async function getData() {
            setloading(true);
            try {
                const response = await fetch(
                    `${url}founder/getFounderNotifications`,
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
                console.log('====================================');
                console.log(response.status);
                console.log('====================================');
                // console.log(result.data.upvotesPerDay);
                // console.log(result.data.investorUpvotes);
                // console.log(result.data.length, "length");
                // console.log(result.data[0]);
                // console.log(result.data[0].investor.profilePhoto , "iuyt");
                // console.log(result.data[0].investor.roleId.user_id.userName);
                // console.log(result.data[0].investor.userName);
                // console.log(result.data[0].investor.roleId.user_id.role);
                // console.log(result.data[0].investor.roleId.previousExperience);
                // console.log(result.data[0].investor.roleId.fullName);
                // console.log(result.data[0].investor.roleId.investmentRange);
                // console.log(result.data[0].requestDate);

                if (response.status == 200) {
                    var array = result.data.map((item, index) => {
                        item["id"] = index + 1
                        return item
                    })
                    setItems(array)
                }

                // console.log(array);

            } catch (err) {
                console.log(err);
            }
            finally {
                setloading(false);
            }
        }
        getData();



    }, [])


    useEffect(() => {
        if (items && items.length > 0) {
            items.forEach(item => console.log(item.id)
            )

            // console.log("hiiiiiiiiiiiii");

            animatedValues.current = items.reduce((acc, item) => {
                acc[item.id] = {
                    translateX: new Animated.Value(0),
                    opacity: new Animated.Value(1),
                    scaleY: new Animated.Value(1),
                };
                return acc;
            }, {});

            // console.log(animatedValues);

        }
    }, [items]);

    function time(time) {
        // console.log('====================================');
        // console.log(time);
        var data1 = new Date(time)

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




    function rendercard({ item, index }) {


        console.log('====================================');
        console.log(item.investor.profilePhoto);
        console.log('====================================');

        const moveItem = (id, direction) => {

            if (!animatedValues.current[id]) return;


            if (direction == "left") {
                console.log('====================================');
                console.log(item.investor._id);
                console.log('====================================');

                const id = item.investor._id;


                async function makesubmit() {

                    try {
                        const response = await fetch(`${url}founder/acceptRequest/${id}`, {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        })
                        const data = await response.json();
                        console.log(data);

                    }
                    catch (err) {
                        console.log(err);

                    }

                }

                makesubmit()

            }
            const translateValue = direction === "left" ? -width : width; // Left or right movement


            Animated.parallel([
                Animated.timing(animatedValues.current[id].translateX, {
                    toValue: translateValue, // Move the item
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValues.current[id].opacity, {
                    toValue: 0, // Fade out
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValues.current[id].scaleY, {
                    toValue: 0.7, // Shrink the item vertically
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // Delete item after animation completes
                setItems((prevItems) => {
                    const updatedItems = prevItems.filter(item => item.id !== id);
                    // Animate remaining items to fill the gap
                    updatedItems.forEach((item) => {
                        Animated.timing(animatedValues.current[item.id].translateX, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: true,
                        }).start();
                        Animated.timing(animatedValues.current[item.id].opacity, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }).start();
                        Animated.timing(animatedValues.current[item.id].scaleY, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }).start();
                    });
                    return updatedItems;
                });
            });
        };

        return (
            <Animated.View
                style={[
                    {
                        transform: [
                            { translateX: animatedValues.current[item.id]?.translateX },
                            { scaleY: animatedValues.current[item.id]?.scaleY },
                        ],
                        opacity: animatedValues.current[item.id]?.opacity,
                    },
                ]}
            >
                <LinearGradient
                    style={styles.card}
                    colors={["rgba(36, 39, 42 , 0.4)", "rgba(22, 24, 26 , 0.6)"]}
                    locations={[0, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <View style={styles.header}>
                        <Image
                            source={{ uri: item.investor.profilePhoto }}
                            // source={require("../../assets/images/p2.png")}
                            style={styles.image}
                        />
                        <Text style={styles.role}>{item.investor.roleId.user_id.role} </Text>
                        {/* <Text style={styles.role}> role </Text> */}
                        <Text style={styles.date}>{time(item.requestDate)}</Text>
                        {/* <Text style={styles.date}>today</Text> */}
                    </View>

                    <Text style={styles.name}>{item.investor.roleId.fullName}</Text>
                    {/* <Text style={styles.name}>Ansh Gala</Text> */}
                    <Text style={styles.info}>Investing experience - {item.investor.roleId.previousExperience} years</Text>
                    {/* <Text style={styles.info}>Investing experience - 5  years</Text> */}
                    <Text style={styles.info1}>Investing Capacity - {item.investor.roleId.investmentRange}</Text>
                    {/* <Text style={styles.info1}>Investing Capacity - | "10 cr"</Text> */}

                    <View style={styles.actions}>
                        <Pressable onPress={() => { moveItem(item.id, "left", item) }} style={styles.buttonAccept}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </Pressable>
                        <Pressable onPress={() => { moveItem(item.id, "right", item) }} style={styles.buttonAccept}>
                            <Text style={styles.buttonText}>Reject</Text>
                        </Pressable>
                    </View>
                </LinearGradient>
            </Animated.View>
        );
    }


    return (

        <View style={{ flex: 1, backgroundColor: "#16181a" }}>
            {items.length == 0 && <Text style={styles.no}>No new notification found</Text>}
            {!loading && <FlatList

                refreshControl={<RefreshControl progressViewOffset={0} refreshing={refreshing}
                    onRefresh={() => {
                        console.log("start");
                        // setRefreshing(true)
                        async function getData() {
                            setloading(true);
                            try {
                                const response = await fetch(
                                    `${url}founder/getFounderNotifications`,
                                    {
                                        method: "GET",
                                        headers: {
                                            accept: "application/json",
                                            Authorization: `Bearer ${token}`,
                                        },
                                    }
                                );
                                const result = await response.json();

                                if (response.status === 200) {
                                    var array = result.data.map((item, index) => {
                                        item["id"] = index + 1
                                        return item
                                    })

                                    // console.log(array);
                                    setItems(array)
                                }

                            } catch (err) {
                                console.log(err);
                            }
                            finally {
                                setloading(false);
                            }
                        }
                        getData();

                        setTimeout(() => {
                            setRefreshing(false); // Stop refreshing after fetching data
                        }, 2000); // Adjust the delay as needed
                    }} />}

                contentContainerStyle={{ paddingBottom: 100 }}
                style={{ flex: 1, backgroundColor: "#16181a", alignContent: "flex-start" }}
                data={items}
                renderItem={rendercard} // Correct integration
            // keyExtractor={(item, index) => index.toString()} // Ensure keys are unique
            />}
        </View>

    );
};


export default InvestorCard
const { height, width } = Dimensions.get("window");


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
    no: {
        textAlign: 'center',
        fontSize: 25,
        marginVertical: "auto",
        alignSelf: "center",
        // flex: 1,
        color: "#FFFF",
        fontFamily: "Roboto",
        marginTop: 20,
        // backgroundColor :  "red",
        height : 30
    }



});