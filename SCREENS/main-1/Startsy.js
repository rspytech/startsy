import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { Animated, Pressable, FlatList, RefreshControl, SafeAreaView, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Dimensions, PixelRatio } from "react-native"
import Swiper from 'react-native-deck-swiper';
import main from "../../styles/main.js"
import Cards from './Card.js';
// import Upvote from '@/assets/icons/upvote.js';
import { useFocusEffect } from 'expo-router';
import { GlobalContext } from '@/Global/globalcontext.js';
import { ActivityIndicator } from 'react-native';
import Addicon from "../../assets/icons/Addicon.js"
import Trash from "../../assets/icons/Trash.js"
import Upvote from "../../assets/icons/upvote.js"
import Up1 from "../../assets/icons/Up1.js"
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { url } from "../../config.js"


const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)


export default function Startsy({ navigation, token }) {
    const [cardIndex, setCardIndex] = React.useState(0);
    const [data, setData] = useState([])
    const [swipeInProgress, setSwipeInProgress] = useState(false);
    const [swipeDistance, setSwipeDistance] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    // const data=[1,2,3,4]
    const [loading, setloading] = useState(true);
    const [selected, setselected] = useState(false);


    // console.log(token, "iniitla");





    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a")
    })

    const [dataFetched, setDataFetched] = useState(false);

    // useEffect(() => {
    //     console.log("Current Active Card Index:", cardIndex);
    // }, [cardIndex]);


    async function getData() {
        try {
            console.log(`${url}investor/recommendation/getFounderProfile`);

            const response = await fetch(
                `${url}investor/recommendation/getFounderProfile`,
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
            setData(result.data);
            setloading(false);
            setDataFetched(true);
        } catch (err) {
            console.log(err, "eror");
        }
        finally {
        }
    }

    useEffect(() => {
        if (token) {
            setloading(true)

            getData();
        }
    }, [token, dataFetched])


    function showbigcard(item) {
        console.log(item, "yeh show bigg card wala function ka hai ");

        navigation.navigate("Card", { item, navigation })
        console.log("hi");

    }

    function getfund(fund){
        if (fund == 69) {
            return 0
        }
        fund = fund - 57
        return (fund * 10000000).toLocaleString("en-IN")
    }

    function renderCard(item, index) {

        return (
            <TouchableWithoutFeedback key={item._id} onPress={() => {
                showbigcard(item)
            }} style={{ flex: 1, height: 300 }}>
                <View nestedScrollEnabled={true} bounces={false} style={[styles.container]} contentContainerStyle={styles.contentContainer}>
                    {/* Header Section */}
                    <View style={styles.header}>
                        <Image
                            source={{ uri: item.user_id.profilePhoto }}
                            style={styles.profileImage}
                        />

                        <AutoSizeText
                            numberOfLines={1}
                            fontSize={24}
                            mode={ResizeTextMode.max_lines}
                            ellipsizeMode='tail'
                            style={styles.username}>{item.user_id.userName}
                        </AutoSizeText>
                        <View style={{
                            position: "absolute",
                            right: 10,
                            display: "flex",
                            flexDirection: "row",
                            gap: 0
                        }}>
                            <View ><Upvote width={40} height={40} /></View>
                            <Text style={styles.followers}>{item.totalUpvotes}</Text>
                        </View>
                    </View>

                    {/* Startup Info */}
                    <Text style={styles.title}>{item.nameOfStartup}</Text>
                    <Text style={styles.subtitle}>Revolutionizing startup ecosystem.</Text>
                    <Text style={styles.status}>{item.hiddenInfo.stageOfStartup} - {getfund(item.hiddenInfo.fundingStatus)}</Text>

                    {/* Goal Section */}
                    <Text style={styles.sectionHeader}>Goal: <Text style={styles.text}>
                        {item.goal}
                    </Text></Text>


                    {/* Description Section */}
                    <Text style={styles.sectionHeader}>Description:</Text>
                    <Text style={styles.text}>
                        {item.description}
                    </Text>

                    {/* About Founder Section */}
                    <Text style={styles.sectionHeader1}>About Founder</Text>
                    <Text style={styles.text}><Text style={styles.keys}>Name :</Text> {item.fullName}</Text>
                    <Text style={styles.text}><Text style={styles.keys}>Education :</Text>  {item.education}</Text>
                    <Text style={styles.text}><Text style={styles.keys}>Skills :</Text> {item.skills}</Text>

                    {/* Work Experience */}
                    <Text style={styles.sectionHeader}> <Text style={styles.keys}>Work Experience :</Text> </Text>
                    <View style={styles.workexp}>
                        {item.previousWorkExperience && item.previousWorkExperience.map((work, index) => {
                            return (
                                <View key={index} >
                                    <Text style={styles.text1}>Company : {work.company}</Text>
                                    <Text style={styles.text1}>Role : {work.role}</Text>
                                    <Text style={styles.text1}>Year : {work.year}</Text>
                                </View>
                            )
                        })}
                        <View style={styles.s2}>
                            <Text style={styles.text1}>Company 2</Text>
                            <Text style={styles.text1}>Role</Text>
                            <Text style={styles.text1}>Year</Text>
                        </View>
                        <View style={styles.s2}>
                            <Text style={styles.text1}>Company 3</Text>
                            <Text style={styles.text1}>Role</Text>
                            <Text style={styles.text1}>Year</Text>
                        </View>
                    </View>


                    {/* About Team Section */}
                    <Text style={styles.sectionHeader1}>About Team</Text>



                    {item.teamInfo && item.teamInfo.map((work, index) => {
                        return (
                            <View style={styles.teamCard}>
                                <Text style={styles.username1}>{work.name}</Text>
                                <Text style={styles.text2}>{work.name}</Text>
                                <Text style={styles.text2}>{work.role}</Text>
                            </View>
                        )
                    })}

                    {/* Footer */}
                    <Text style={styles.footer}>startsy.com</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }


    function check() {
        if (swipeDistance < 50) {
            console.log("hi");
            return true
        }
        return false
    }
    const handleSwiping = (distance) => {
        setSwipeDistance(distance);
        console.log(swipeDistance);
        var stat = check()
        return stat

    };
    const swiperRef = useRef(null);

    const swipeLeft = () => {
        swiperRef.current.swipeLeft(); // Swipe left programmatically
    };

    const swipeRight = () => {
        swiperRef.current.swipeRight(); // Swipe right programmatically
    };

    async function handleleftswipe(index) {
        console.log(index, "left swiped function index wala");
    }
    async function handlerightswipe(index) {
        const id = data[index].user_id._id;
        // console.log(id);

        try {
            const response = await fetch(`${url}investor/addFounderProfile/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = await response.json();
            // console.log(data);

        }
        catch (err) {
            // console.log(err);

        }
        // console.log(index, "right swiped function index wala");
    }


    async function incrementupvote() {

        const currentIndex = swiperRef.current.state.firstCardIndex;
        console.log(currentIndex);
        const id = data[currentIndex].user_id._id

        try {

            const response = await fetch(
                `${url}investor/updateFounderUpvoteCounter/${id}`,
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();
            console.log(result);
            setloading(false);
        } catch (err) {
            console.log(err, "eror");
        }
        finally {
        }



    }

    return (
        <ScrollView
            refreshControl={<RefreshControl progressViewOffset={0} refreshing={refreshing}
                onRefresh={async () => {
                    console.log("start");
                    setRefreshing(true);
                    if (token) {
                        setloading(true)
                        async function getData() {
                            try {
                                console.log(`${url}investor/recommendation/getFounderProfile`);

                                const response = await fetch(
                                    `${url}investor/recommendation/getFounderProfile`,
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
                                if (result.data && result.data.length > 0) {
                                    var data1 = result.data.map((e) => {
                                        var obj = { ...e, isliked: false }
                                        return obj
                                    })
                                    console.log(data1);

                                    setData(result.data);
                                }
                                setloading(false);
                            } catch (err) {
                                console.log(err, "eror");
                            }
                            finally {
                            }
                        }
                        getData();
                    }
                    setTimeout(() => {
                        setRefreshing(false);
                    }, 2000);
                }} />}
            style={{ flex: 1, width: width, paddingVertical: 0, backgroundColor: "#16181a" }}>
            <SafeAreaView style={{ flex: 1, width: width, height: height, paddingVertical: 15, backgroundColor: "#16181a" }}>

                <Animated.View
                    style={main.header1}>
                    <Text allowFontScaling={false} style={main.headertext}>For you</Text>
                </Animated.View>

                {data && data.length == 0 && <Text></Text>}

                {data && data.length>0 && <Swiper
                    ref={swiperRef}
                    nestedScrollEnabled={true}
                    backgroundColor='#16181a'
                    horizontalThreshold={50}
                    secondCardZoom={1000}
                    infinite={true}
                    showSecondCard={true}
                    style={{
                        width: width,
                        margin: "auto",
                    }}
                    // infinite={true}
                    stackSeparation={10}
                    animateCardOpacity={true}
                    swipeAnimationDuration={350}
                    cards={data}
                    // stackScale={2}
                    renderCard={renderCard}

                    onSwipedLeft={(index) => {
                        handleleftswipe(index)
                    }}
                    onSwipedRight={(index) => {
                        // setCardIndex(index)
                        handlerightswipe(index)
                    }}
                    cardIndex={cardIndex}
                    stackSize={3}
                    verticalSwipe={false}
                    onSwiped={(index) => {
                        setselected(false)
                        setCardIndex(index)
                    }}
                />}
                {loading && <ActivityIndicator color={"#fff"} size={'large'} />}

                <View style={styles.iconcontainer}>
                    <Pressable onPress={swipeLeft} style={{ width: 80, height: 80, backgroundColor: "transparent" }}><Trash /></Pressable>
                    <Pressable onPress={() => {
                        setselected(true)
                        incrementupvote()
                    }}
                        style={{ transform: [{ scale: 1 }], paddingTop: 5, width: 80, height: 80, backgroundColor: "transparent" }}>
                        {!selected && <Up1 />}
                        {selected && <Up1 selected={true} />}

                    </Pressable>
                    <Pressable onPress={swipeRight} style={{ width: 80, height: 80, backgroundColor: "transparent" }}><Addicon /></Pressable>
                </View>

            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#24272A',
        paddingHorizontal: 16,
        maxWidth: width - 30,
        width: "99%",
        // height : 100,
        maxHeight: height * 0.78,

        marginHorizontal: "auto",
        // marginHorizontal: 10,
        // maxHeight: height - 100,
        borderRadius: 10,
        paddingTop: 20,
        overflow: "scroll"
    },
    contentContainer: {
        paddingBottom: 80,
        // maxWidth: width,
        // height : height,
        // backgroundColor: "red"
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    username: {
        color: '#E9E9E9',
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: "Alata",
        width: 140,
        // backgroundColor : "red"


    },
    upvote: {
        marginLeft: "auto",
        marginRight: -2
    },
    followers: {
        color: '#00DE62',
        marginLeft: -6,
        fontSize: 14,
        top: 19,
        fontFamily: "Roboto",

    },
    title: {
        color: '#B8B8B8',
        fontSize: 48,
        // fontWeight: 'bold',
        marginBottom: 4,
        fontFamily: "Alata",


    },
    subtitle: {
        color: '#D9D9D9',
        fontSize: 14,
        marginBottom: 4,
        fontFamily: "Roboto"
    },
    status: {
        color: '#00DE62',
        fontSize: 15,
        marginBottom: 16,
        fontFamily: "Roboto"

    },
    sectionHeader: {
        color: '#D9D9D9',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 4,
        fontFamily: "Roboto"
    },
    sectionHeader1: {
        color: '#B8B8B8',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 4,
        fontFamily: "Alata"
    },
    text: {
        color: '#BEBEBE',
        fontSize: 14,
        lineHeight: 20,
        fontFamily: "Roboto"

    },
    text1: {
        color: '#BEBEBE',
        fontSize: 14,
        lineHeight: 20,
        fontFamily: "Roboto",
        fontStyle: "italic",

    },
    teamCard: {
        // backgroundColor: '#2a2a2a',
        padding: 15,
        borderRadius: 8,
        marginTop: 8,
        borderWidth: 2,
        borderColor: "#B8B8B8"
        , maxWidth: "70%",
        borderRadius: 10,
        // padding : 10
    },
    footer: {
        color: '#00DE62',
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
        fontStyle: "italic"
    },
    keys: {
        fontFamily: "Roboto",
        color: "#D9D9D9",
        fontSize: 14,
        fontWeight: "bold",
    },
    workexp: {
        borderLeftWidth: 2,
        borderLeftColor: "#00DE62",
        paddingLeft: 10,
        marginTop: 10,

    },
    s2: {
        marginTop: 20
    }
    , text2: {
        color: "#B8B8B8",
        borderBottomWidth: 1,
        borderBottomColor: "#B8B8B8",
        marginBottom: 15,
        paddingBottom: 5,
        fontSize: 14
    }
    , username1: {
        color: "#00DE62",
        borderBottomWidth: 1,
        borderBottomColor: "#B8B8B8",
        marginBottom: 15,
        paddingBottom: 5,
        fontSize: 14
    },
    iconcontainer: {
        position: "absolute",
        bottom: 60,
        display: "flex",
        flexDirection: "row",
        width: width,
        backgroundColor: "transparent",
        paddingHorizontal: 10,
        justifyContent: "space-between"
        // zIndex : 100
    }
});
