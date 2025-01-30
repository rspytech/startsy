
import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
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
    BackHandler,
    RefreshControl,
    TouchableOpacity

} from "react-native";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import Skeleton from "react-content-loader/native";
import Profile from "@/assets/icons/profile.js";
import Search from "../../assets/icons/Search.js";
import main from "../../styles/main.js"
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import { url } from "../../config.js"
import { GlobalContext } from "@/Global/globalcontext.js";
// import styles from "@/styles/l.js";

const NewsLetter = ({ navigation, route , mainpagebottomsheet , closeall }) => {


    const data = [1, 2, 3]
    const data1 = [1, 2, 3, 4, 5, 6, 7]

    const [token, setToken] = useState("");
    const { globaldata } = useContext(GlobalContext);
    console.log(token);

    useEffect(() => {
        console.log(globaldata, "global data");
        setToken(globaldata.token);
    }, [globaldata])

    useFocusEffect(
        useCallback(()=>{
           closeall()
        } , [])
    )


    const [newsletter, setnewsletter] = useState([])
    const [showbox, setshowbox] = useState(false)
    const [filterednewsletter, setfilterednewsletter] = useState([])


    async function getdata() {
        try {
            console.log(token);

            console.log(`${url}admin/getAllNewletters`);

            const response = await fetch(`${url}admin/getAllNewletters`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data.data[0]);
            setnewsletter(data.data)
            setfilterednewsletter(data.data)



        }
        catch (err) {
            console.log(err);

        }
    }


    useFocusEffect(
        useCallback(() => {
            getdata()
        }, [token])
    );


    const renderItem = ({ item }) => {


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


            <Pressable onPress={() => {
                navigation.navigate("NewsletterPage", { navigation, item: item })
            }}>
                <LinearGradient
                    colors={["rgba(33, 34, 35, 0.4)", "rgba(25, 26, 27, 0.6)"]}
                    locations={[0, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.box}>
                    <Image style={styles.image} source={{ uri: item.newsletterImage }} />


                    <Text style={styles.text}>
                        <Text numberOfLines={2}
                            ellipsizeMode="tail"
                            allowFontScaling={false} style={styles.des}></Text>{item.title}

                    </Text>

                    <View style={styles.bottominfo}>
                        <Image style={styles.topimage} source={{ uri: item.taggedUser.profilePhoto }} />
                        <Text style={styles.topu1}>{item.taggedUserName}</Text>
                        <Text style={styles.topu2}>{item.taggedUser.role}</Text>
                        <View style={styles.circle}></View>

                        <AutoSizeText
                            numberOfLines={1}
                            fontSize={8}
                            mode={ResizeTextMode.max_lines}
                            ellipsizeMode='tail'
                            style={styles.time}>{time(item.taggedUser.createdAt)}
                        </AutoSizeText>
                    </View>
                </LinearGradient>
            </Pressable>


        )
    }


    const Render = () => {
        return (
            <View style={styles.skeletonWrapper}>
                <Skeleton width={width * 0.7} height={200} />
                <Skeleton width={width * 0.7} height={20} />
                <Skeleton width={width * 0.7} height={20} />
            </View>
        );
    };
    const renderItem1 = ({ item }) => {

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



            <Pressable onPress={() => { navigation.navigate("NewsletterPage", { navigation, item: item }) }}>
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
                                allowFontScaling={false} style={styles.des}></Text>{item.title}

                        </Text>

                        <View style={styles.bottominfo1}>
                            <Image style={styles.topimage} source={{ uri: item.taggedUser.profilePhoto }} />
                            <Text style={styles.topu1}>{item.taggedUserName}</Text>
                            <Text style={styles.topu2}>{item.taggedUser.role}</Text>
                            <View style={styles.circle}></View>
                            {/* <Text style={styles.time}>{time(item.taggedUser.createdAt)}</Text> */}

                            <AutoSizeText
                                numberOfLines={1}
                                fontSize={12}
                                mode={ResizeTextMode.max_lines}
                                ellipsizeMode='tail'
                                style={styles.time}>{time(item.taggedUser.createdAt)}
                            </AutoSizeText>
                        </View>
                    </View>
                    <View style={styles.right}>
                        <Image style={styles.image1} source={{ uri: item.newsletterImage }} />
                    </View>
                </LinearGradient>
            </Pressable>

        )
    }

    const [refreshing, setRefreshing] = useState(false)
    const [suggestionarray, setsuggestionarray] = useState([])
    const [text1, settext] = useState("")

    function search(text) {
        console.log(text);

        // console.log(filterednewsletter[0].content);
        if (text[0] != "@") {
            setfilterednewsletter(newsletter.filter(item =>
                text === "" || item.content.toLowerCase().includes(text.toLowerCase())
            ))
        }
    }


    async function searchUser() {

        console.log(text1);



        try {
            const response = await fetch(`${url}api/getUserNameSuggestions/${text1}`, {
                method: 'GET',
                headers: {
                    accept: "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            // setloading(false)
            console.log(data);
            setshowbox(true)

            console.log(data.message);
            console.log(data.message[0]);
            console.log(data.message[0].profilePhoto);
            setsuggestionarray(data.data)

        }
        catch (err) {
            console.log(err);

        }
    }

    function renderSuggestion({ item }) {
        return (
            // <Text style={{color : "#fff"}}>hello</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Singleuserpage", { token: token, id: item._id, page: "NewsLetter" })
            }}>
                <View style={styles.listItem}>
                    {/* <Image
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8slgZXgqnSIXDS8wF2uDT_SmsYlBe-W1soQ&s" }}
                        style={styles.avatar} /> */}
                    {!item.profilePhoto && <Image style={styles.avatar} source={require("../../assets/images/blank.png")} />}
                    {item.profilePhoto && <Image style={styles.avatar} source={{ uri: item.profilePhoto }} />}




                    <View style={styles.textContainer}>
                        <Text allowFontScaling={false} style={styles.username}>{item.userName}</Text>
                        <Text allowFontScaling={false} style={styles.message}>{item.role == "CommunityMember" ? "Member" : item.role}</Text>
                    </View>
                    {/* <Text allowFontScaling={false} style={styles.time}> "today"}</Text> */}
                </View>
            </TouchableOpacity>
        )
    }
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (showbox) {
                console.log("hiiiii");

                setshowbox(false)
                return true; // This prevents the default back action
            }
            return false;
        });

        return () => backHandler.remove();
    }, []);



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a", position: "relative" }}>

            {!filterednewsletter && <Render />}

            {showbox && <FlatList
                keyExtractor={(item, index) => index}
                data={suggestionarray}
                renderItem={renderSuggestion}
                style={styles.suggestionbox}>

            </FlatList>}

            

            {filterednewsletter && <FlatList

                getItemLayout={(data, index) => ({
                    length: 300, // Fixed height of each item
                    offset: 300 * index,
                    index,
                })}
                onTouchStart={() => setshowbox(false)}
                style={styles.container}
                data={filterednewsletter}
                contentContainerStyle={{ paddingBottom: 100 }}
                renderItem={renderItem1}
                refreshControl={<RefreshControl
                    keyExtractor={(item, index) => index}
                    onRefresh={() => {
                        setRefreshing(true)

                        getdata()
                        setTimeout(() => {
                            setRefreshing(false)
                        }, 1000);
                    }} refreshing={(refreshing)} />}
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
                                onChangeText={(text) => {
                                    settext(text)
                                    search(text)
                                }}
                                returnKeyType="done" // Adjusts the keyboard's Enter key label
                                onSubmitEditing={(text) => { searchUser(text) }}
                            />
                        </View>
                        <View style={styles.divider}></View>
                        <Text allowFontScaling={false} style={styles.headline}>Leaderboard </Text>
                        <FlatList

                            horizontal={true}
                            style={styles.scroll}
                            data={filterednewsletter}
                            renderItem={renderItem}
                        >
                        </FlatList>
                        <View style={styles.divider}></View>
                        <Text allowFontScaling={false} style={styles.headline}>Community news </Text>
                    </>
                }
            >





            </FlatList>}
        </SafeAreaView>
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
        paddingBottom: 100
    },
    des: {
        fontFamily: "Roboto",
        fontSize: scalingfactor * 14,
        fontWeight: "bold",
        color: "#D9D9D9",
        width: "80%"

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
        width: "102%",
        overflow: "hidden",

        marginBottom: 15,
        height: 140,
        objectFit: "cover",
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
        fontSize: 13,
        fontFamily: "Roboto",
        color: "#B8B8B8",
        lineHeight: 16,
        width: "90%"
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
        marginLeft: 5,
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
        fontSize: 8,
        alignSelf: "center",
        marginLeft: 5,
        width: 50,
        // backgroundColor : "red"
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
        // bottom : -10,
        // backgroundColor: "red",
        width: "90%",
        // flexWrap : "wrap"


    },
    left: {
        width: "70%",
        justifyContent: "space-between"
    },
    right: {
        width: "30%"

    },
    skeletonWrapper: {
        padding: 10,
        backgroundColor: '#24272A',
        marginHorizontal: 6,
        borderRadius: 15,
        marginBottom: 15,
    },

    suggestionbox: {
        width: "100%",
        height: 320,
        backgroundColor: "#16181a",
        position: "absolute",
        top: 120,
        elevation: 100,
        zIndex: 1000
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        // borderBottomWidth: 1,
        borderRadius: 20,
        backgroundColor: "#24272A",
        // borderBottomColor: "#333",
        // alignSelf: "flex-start",
        width: "95%",
        marginVertical: 5,
        paddingHorizontal: 20,
        marginHorizontal: "auto"
    },
    avatar: {
        width: 50,
        height: 52,
        paddingTop: 15,
        borderRadius: 25,
        marginRight: 15,
        marginTop: 0,
    },
    textContainer: {
        flex: 1,
        alignSelf: "flex-start",
    },
    username: {
        fontSize: 22,
        color: "#B8B8B8",
        fontFamily: "Alata",
        alignSelf: "flex-start",
        marginTop: 0,
        marginBottom: 0
    },
    message: {
        fontSize: 12,
        color: "#B8B8B8",
        color: "#00DE62",
        marginTop: -3,
    },

})