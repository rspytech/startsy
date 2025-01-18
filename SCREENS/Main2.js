import React, { useState, useRef, useEffect, useCallback, useContext, useMemo } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
    TouchableWithoutFeedback

} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

import Apnauser from "./Apnauser.js"

import BottomSheet, { BottomSheetView, BottomSheetScrollView, BottomSheetTextInput, BottomSheetDraggableView, BottomSheetFlatList, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NewsLettericon from "../assets/icons/Newsletter.js"
import main from "../styles/main.js"
import NewsLetter from "./main-2/Newsletter.js"
import Notification from "./main-2/Notification.js"
import Foryou from "./main-2/Foryou.js"
import Startsy from "./main-1/Startsy.js"
// import Message from "./main-1/Message.js"
import ChatScreen from "./main-2/Message.js"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Profile from "./main-2/Profile.js"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from '@expo/vector-icons/Fontisto';
import NewsletterPage from "./main-2/news1.js"
import Singleprofilepage from "../SCREENS/singleprofilepage.js"
import { GlobalContext } from "@/Global/globalcontext.js";



const Main2 = ({ navigation }) => {

    // navigation.navigate("Green")
    const [token, setToken] = useState("");
    const { globaldata } = useContext(GlobalContext);

    useFocusEffect(
        useCallback(() => {
            console.log(globaldata, "global data");
            setToken(globaldata.token);

        }, [globaldata])
    );



    useFocusEffect(
        useCallback(() => {
            StatusBar.setBackgroundColor("black");
            StatusBar.setBarStyle("light-content");
            StatusBar.setTranslucent(true);
        }, [])
    );


    const [bg, setbg] = useState("#16181a")



    const Tab = createBottomTabNavigator();







    const updatescroll = (val) => {
        // console.log('====================================');
        // console.log(val);
        t1.setValue(val);
        // console.log('====================================');
    }

    const t1 = new Animated.Value(0);
    const diffclamp = Animated.diffClamp(t1, 0, 55);
    const bottomposition = diffclamp.interpolate({
        inputRange: [0, 55],
        outputRange: [0, 55],
        extrapolate: "clamp",
    })

    const bottomSheetRef5 = useRef(null);
    const snapPoints5 = useMemo(() => ['90%'], []);

    const comments = () => {
        return (
            <View style={styles.listItem}>
                <Image
                    source={require("../assets/images/p2.png")}
                    style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text allowFontScaling={false} style={styles.username}>raz.shhh</Text>
                    <Text allowFontScaling={false} style={styles.message}> abhi nai hai</Text>
                </View>
                <Text allowFontScaling={false} style={styles.time}>today</Text>
            </View>
        )
    }


    return (

        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={main.container}>

                {/* <NavigationContainer independent={true}> */}
                <Tab.Navigator
              
                
                    initialRouteName="Startsy"
                    screenOptions={{
                        animationEnabled: true,
                        tabBarActiveTintColor: "#00DE62",
                        tabBarInactiveTintColor: "#7A7B7C",
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: '#16181a',
                            height: 60,
                            zIndex: 1,
                            elevation: 0,
                            opacity: 1,
                            borderTopWidth: 0,
                            paddingTop: 10,
                            position: "absolute",
                            // transform :[{translateY : bottomposition}] 
                        },
                    }}

                >
                    <Tab.Screen
                        name="NewsLetter"
                        children={(props) => <NewsLetter navigation={navigation} token={token} />}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (

                                <View style={{ flex: 1, width: 30, marginLeft: 10, justifyContent: "center", height: 30 }}>
                                    <NewsLettericon color={focused ? "#00DE62" : "#828282"} />
                                </View>
                                // <Image style={{ width: 22, height: 32 }}
                                //     source={focused ? require("../assets/images/news_focus.png") : require("../assets/images/news_normal.png")} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="bell"
                        // component={Notification}
                        children={(props) => <Notification navigation={navigation} token={token} />}

                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (
                                <Fontisto name="bell" size={35} color={focused ? "#00DE62" : "#7A7B7C"} />
                                // <Fontisto name="bell" size={24} color="black" />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Startsy"
                        children={(props) => <Foryou navigation={navigation} scroll={updatescroll} token={token} />}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (
                                // <NewsLetter/>
                                <Image style={{ width: 50, height: 50 }} source={require("../assets/images/logo.png")} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Message"
                        // component={ChatScreen}
                        children={(props) => <ChatScreen navigation={navigation} token={token} />}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (
                                <MaterialCommunityIcons name="message-text-outline" size={34} color={focused ? "#00DE62" : "#7A7B7C"} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        // component={Profile}
                        children={()=><Apnauser navigation={navigation} token={token} />}
                     

                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (
                                <FontAwesome6 name="circle-user" size={32} color={focused ? "#00DE62" : "#7A7B7C"} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="NewsletterPage"
                        component={NewsletterPage} // Replace with the desired component
                        
                        options={{
                            tabBarButton: () => null, // Hides the tab from the bar
                            tabBarVisible: false,     // Ensures it doesn't take space in the bar
                        }}
                    />
                    <Tab.Screen
                        name="Singleuserpage"
                        // component={Singleprofilepage} // Replace with the desired component
                        children={()=><Singleprofilepage navigation={navigation}/>}
                        options={{
                            tabBarButton: () => null, // Hides the tab from the bar
                            tabBarVisible: false,     // Ensures it doesn't take space in the bar
                        }}
                    />

                </Tab.Navigator>


                {/* </NavigationContainer> */}
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}


export default Main2;
const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;


const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({
    searchContainer: {
        marginHorizontal: "auto",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        display: "flex",
        // marginBottom: 320,
        backgroundColor: "transparent",

        // position : "absolute",
        // bottom : 0
    },
    searchInput: {
        height: "auto",
        minHeight: 50,
        width: width * 0.95,
        borderColor: "#00DE62",
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 20,
        color: "#828282",
        fontFamily: "Roboto",
        fontSize: 18,
        maxHeight: 100,

        // marginBottom  :20
    },
    send: {
        // width: 20,
        // height: 20,
        position: "absolute",
        top: 12,
        right: 10,
        transform: [{ scale: 1.1 }],
        alignSelf: "center",
        verticalAlign: "center",
        bottom: 0,
    }
})