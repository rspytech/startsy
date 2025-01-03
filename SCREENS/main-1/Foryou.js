


import React, { useState, useRef, useEffect, useCallback } from "react";
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
    Dimensions, PixelRatio

} from "react-native";
import main from "../../styles/main.js"
import Upvote from "@/assets/icons/upvote.js";
import { useFocusEffect } from "expo-router";
import { API_URL } from '@env';

const Foryou = ({ scroll, token }) => {
    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
    })

    const [data1, setData] = useState(null)

    useFocusEffect(

        useCallback(() => {

            console.log('====================================');
            console.log("cards");
            console.log(API_URL);
            
            console.log('====================================');
            if (token) {
                async function getData() {

                    try {
                        const response = await fetch("http://10.10.22.95:5002/api/investorInfo",
                            {
                                method: "GET",
                                headers: {
                                    accept: "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        const result = await response.json();
                        console.log(result.requestedFounders, "investor");


                        setData(result); // Save data if needed
                    } catch (err) {
                        console.log(err);
                    }
                }
                getData();
            }
        }, [token])
    );


    const scrollY = new Animated.Value(0);
    const diffclamp = Animated.diffClamp(scrollY, 0, 55);
    const translateY = diffclamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, -55],
        extrapolate: "clamp",
    })
    const renderItem = ({ item }) => (
        <View style={styles.box}>
            <View style={styles.top} >
                <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                    <Image style={styles.userimg} source={require("../../assets/images/p1.png")} />
                    <View style={styles.userdetail}>
                        <Text allowFontScaling={false} style={styles.u1}>raz.shhh</Text>
                        <Text allowFontScaling={false} style={styles.u2}>Founder</Text>
                    </View>
                </View>
            </View>
            <Image style={styles.template} source={require("../../assets/images/template.png")} />
            <View style={styles.lower}>
                <Text allowFontScaling={false} style={styles.u3}>Caption...</Text>
                <View style={{ display: "flex", flexDirection: "row" }} >
                    <Upvote width={36} height={36} style={{ marginHorizontal: 12, top: 2 }} />
                    <Text allowFontScaling={false} style={styles.count}>12k</Text>
                </View>
            </View>

        </View>
    );

    const handlePullStart = (offsetY) => {
        if (offsetY < 10) {
            setbg("transparent");
        }
        else setbg("#16181a")
    };
    const [bg, setbg] = useState("#16181a")
    const [refreshing, setRefreshing] = useState(false);

    const data = [1, 2, 3, 4]


    return (
        <SafeAreaView style={styles.container}>
            <Animated.View
                style={[{ transform: [{ translateY: translateY }] }, main.header]}>
                <Text allowFontScaling={false} style={main.headertext}>For you</Text>
            </Animated.View>
            <FlatList
                // scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                style={main.scroll}
                onScroll={(e) => {
                    // scroll(e.nativeEvent.contentOffset.y)
                    scrollY.setValue(e.nativeEvent.contentOffset.y)
                    // handlePullStart(e.nativeEvent.contentOffset.y);
                }}
                data={data}
                renderItem={renderItem}
                refreshControl={<RefreshControl progressViewOffset={55} refreshing={refreshing}
                    onRefresh={() => {
                        console.log("start");

                        setRefreshing(true);
                        setbg("transparent")

                        setTimeout(() => {
                            setRefreshing(false); // Stop refreshing after fetching data
                        }, 2000); // Adjust the delay as needed
                    }} />}

                bounces={true}
                contentInset={{ top: 10 }}
            >
            </FlatList>
        </SafeAreaView>
    );
}

export default Foryou



const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16181a"

    },
    box: {
        width: width * 0.96,
        height: 316,
        margin: 10,
        backgroundColor: "#1A1D1F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        margin: "auto",
        marginBottom: 25

    },
    boxText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    template: {
        width: "96%",
        borderRadius: 10,
        height: 182,
        maxHeight: 182
    },
    userimg: {
        borderRadius: 100,
        width: 36,
        aspectRatio: 1,
        margin: 10,
        marginLeft: 15,
        alignSelf: "flex-start",
        justifyContent: "flex-start"
    },
    userdetail: {
        flex: 1,
        alignSelf: "flex-start",
        paddingLeft: 5
    },
    u1: {
        fontFamily: "Alata",
        fontSize: 20,
        color: "#E9E9E9"
    },
    u2: {
        fontFamily: "Roboto",
        fontSize: 11,
        color: "#00DE62"
    },
    u3: {
        fontFamily: "Roboto",
        fontSize: 20,
        color: "#B8B8B8"
    },
    upvote: {
        marginRight: -3
    },
    count: {
        alignSelf: "flex-end",
        fontFamily: "Roboto",
        fontSize: 13,
        color: "#00DE62",
        marginLeft: -2
    },
    lower: {
        display: "flex",
        flexDirection: "row",
        width: "95%",
        marginHorizontal: "auto",
        marginTop: 10,
        paddingLeft: 5,
        justifyContent: "space-between"
    }
});