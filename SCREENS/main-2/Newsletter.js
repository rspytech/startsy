
import React, { useState, useRef, useEffect } from "react";
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
    Dimensions,
    StatusBar,
    FlatList,
    RefreshControl,

} from "react-native";
import Search from "../../assets/icons/Search.js";
import main from "../../styles/main.js"
import { LinearGradient } from "expo-linear-gradient";
// import styles from "@/styles/l.js";

const NewsLetter = ({ navigation }) => {


    const data = [1, 2, 3]
    const data1 = [1, 2, 3, 4, 5, 6, 7]

                                                       
    const renderItem = ({ item }) => {
        return (

            <Pressable onPress={() => {
                navigation.navigate("NewsletterPage" , {navigation})
            }}>
                <LinearGradient
                    colors={["rgba(36, 39, 42 , 0.4)", "rgba(22, 24, 26 , 0.6)"]}
                    locations={[0, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.box}>
                    <Image style={styles.image} source={require("../../assets/images/template.png")} />
                    <Text style={styles.text}>
                        <Text numberOfLines={2}
                            ellipsizeMode="tail"
                            allowFontScaling={false} style={styles.des}>Description:</Text> Welcome to Startsy, your gateway to the dynamic

                    </Text>

                    <View style={styles.bottominfo}>
                        <Image style={styles.topimage} source={require("../../assets/images/p2.png")} />
                        <Text style={styles.topu1}>raz.shhh</Text>
                        <Text style={styles.topu2}>Founder</Text>
                        <View style={styles.circle}></View>
                        <Text style={styles.time}>4 mins ago</Text>
                    </View>
                </LinearGradient>
            </Pressable>

        )
    }
    const renderItem1 = ({ item }) => {
        return (

            <LinearGradient
                colors={["rgba(36, 39, 42 , 0.4)", "rgba(22, 24, 26 , 0.6)"]}
                locations={[0, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.box1}>



                <View style={styles.left}>
                    <Text style={styles.text}>
                        <Text numberOfLines={2}
                            ellipsizeMode="tail"
                            allowFontScaling={false} style={styles.des}>Description:</Text> Welcome to Startsy, your gateway to the dynamic

                    </Text>

                    <View style={styles.bottominfo1}>
                        <Image style={styles.topimage} source={require("../../assets/images/p2.png")} />
                        <Text style={styles.topu1}>raz.shhh</Text>
                        <Text style={styles.topu2}>Founder</Text>
                        <View style={styles.circle}></View>
                        <Text style={styles.time}>4 mins ago</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <Image style={styles.image1} source={require("../../assets/images/template.png")} />
                </View>
            </LinearGradient>

        )
    }

    return (
        <FlatList style={styles.container}
            data={data1}
            renderItem={renderItem1}
            refreshControl={<RefreshControl/>}
            // style={styles.scroll1}
            ListHeaderComponent={
                <>
                    <Animated.View><Text allowFontScaling={false} style={styles.headerText}>Newsletter</Text></Animated.View>
                    <View style={styles.searchContainer}>
                        <Search style={styles.search} />
                        <TextInput
                            allowFontScaling={false}
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor="#828282"
                        />
                    </View>
                    <View style={styles.divider}></View>
                    <Text allowFontScaling={false} style={styles.headline}>Leaderboard </Text>
                    <FlatList

                        horizontal={true}
                        style={styles.scroll}
                        data={data}
                        renderItem={renderItem}
                    >
                    </FlatList>
                    <View style={styles.divider}></View>
                    <Text allowFontScaling={false} style={styles.headline}>Community news </Text>
                </>
            }
        >





        </FlatList>
    )
}


export default NewsLetter

const { width, height } = Dimensions.get("window");

var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({
    box: {
        height: "auto",
        borderRadius: 15,
        width: width * 0.7,
        backgroundColor: "#24272A",
        // marginBottom : 20,
        padding: 10,
        marginHorizontal: 6

    },
    box1: {
        height: 110,
        borderRadius: 15,
        width: "98%",
        marginHorizontal: "auto",
        marginVertical: 10,
        backgroundColor: "#24272A",
        // marginBottom : 20,
        padding: 10,
        marginHorizontal: 6,
        display: "flex",
        flexDirection: "row"

    },
    container: {
        flex: 1,
        backgroundColor: "#16181a",
        // backgroundColor: "red",
        paddingVertical: 20,
    },
    des: {
        fontFamily: "Roboto",
        fontSize: scalingfactor * 12,
        fontWeight: "bold",
        color: "#D9D9D9"

    },
    headerText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 12,
        fontFamily: "myanmar",
        color: "#00DE62",
        paddingLeft: 15
    },
    headline: {
        fontSize: 22,
        fontFamily: "Alata",
        color: "#B8B8B8",
        marginBottom: 15,
        paddingLeft: 15,
        marginVertical: 10
    },
    image: {
        // margin: "auto",
        borderRadius: 12,
        alignSelf: "center",
        width: "99%",
        overflow: "hidden",

        marginBottom: 15,
        height: 140,
        objectFit: "fill",
        maxHeight: 140,
    },
    image1: {
        borderRadius: 12,
        alignSelf: "center",
        width: "99%",
        overflow: "hidden",
        marginBottom: 15,
        height: 140,
        objectFit: "cover",

        maxHeight: "98%",

    },
    text: {
        fontSize: 12,
        fontFamily: "Roboto",
        color: "#B8B8B8",
        lineHeight: 16
    },
    scroll: {
        // paddingTop : 60,
        minHeight: 260,
        padding: 20,
        paddingTop: 0,
        paddingLeft: 5,
        // overflow : "scroll",
        width: width * 0.95,
        // margin : "auto",
        backgroundColor: "#16181A",

    },
    scroll1: {

        padding: 20,
        paddingTop: 0,
        paddingLeft: 5,
        width: "99%",
        // height : "auto",
        margin: "auto",
        // flexGrow : 1,
        backgroundColor: "#16181A",

    },
    topimage: {
        width: 25,
        height: 25,
        borderRadius: 50
    },
    topu1: {
        fontFamily: "Alata",
        color: "#E9E9E9",
        fontSize: 14,
        marginLeft: 10,
        // marginTop : -2
    },
    topu2: {
        fontFamily: "Roboto",
        color: "#00DE62",
        fontSize: 11,
        alignSelf: "center",
        justifyContent: "center",
        textAlignVertical: "center",
        marginLeft: 5

    },
    time: {
        fontFamily: "Roboto",
        color: "#828282",
        fontSize: 10,
        alignSelf: "center",
        marginLeft: 5
    },
    circle: {
        width: 5,
        height: 5,
        backgroundColor: "#B8B8B8",
        borderRadius: 50,
        alignSelf: "center",
        marginLeft: 5
    },
    searchContainer: {
        marginHorizontal: 12,
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderColor: "#00DE62",
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        color: "#828282",
        fontFamily: "Roboto",
        fontSize: 18,
    },
    divider: {
        width: width,
        height: 3,
        marginTop: 5,
        backgroundColor: "#24272A"
    },
    search: {
        position: "absolute",
        right: 12,
        top: 6,
        alignSelf: "center",
    },
    bottominfo: {
        display: "flex",
        flexDirection: "row",
        // justifyContent : "center",
        alignContent: "center",
        marginTop: 10,
        textAlignVertical: "center",
    },
    bottominfo1: {
        display: "flex",
        flexDirection: "row",
        // justifyContent : "center",
        alignContent: "flex-start",
        // alignSelf : "flex-end",
        justifyContent: "flex-start",
        marginTop: 10,
        textAlignVertical: "center",
        // marginBottom : 0,
        // bottom : -10
    },
    left: {
        width: "70%",
        justifyContent: "space-between"
    },
    right: {
        width: "30%"

    }

})