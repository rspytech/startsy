import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
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
import NewsletterPage from "./main-2/news1.js"

import NewsLettericon from "../assets/icons/Newsletter.js"
import Box from "../assets/icons/box.js"
import Startsy2 from "../assets/icons/startsy2.js"
import main from "../styles/main.js"
import Foryou from "./main-1/Foryou.js"
import Apnauser from "./Apnauser.js"
import NewsLetter from "./main-1/NewsLetter.js"
import Startsy from "./main-1/Startsy.js"
// import Message from "./main-1/Message.js"
import ChatScreen from "./main-1/Message.js"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Profile from "./main-1/Profile.js"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { GlobalContext } from "@/Global/globalcontext.js";
import url from "../config.js"
import Singleprofilepage from "./singleprofilepage.js";




const Main1 = ({ navigation }) => {
    // console.log(API_URL);


    // navigation.navigate("Green")

    const [token, setToken] = useState("");
    const [data, setData] = useState(null);
    const { globaldata } = useContext(GlobalContext);

    useFocusEffect(
        useCallback(() => {
            console.log(globaldata, "global data");
            setToken(globaldata.token);
        }, [globaldata])
    );;

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181a"); // Set your desired color
        StatusBar.setBarStyle("light-content");

        return () => {
            StatusBar.setBackgroundColor("#16181a"); // Set your desired color
            StatusBar.setBarStyle("light-content");
        }

    })






    useEffect(
        () => {
            StatusBar.setBackgroundColor("#16181a"); // Set your desired color
            StatusBar.setBarStyle("light-content");

            console.log("main1 main1");
        }
    ), [];


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

    function closeall() {
        console.log("hi");

    }


    return (
        <SafeAreaView style={main.container}>

            <NavigationContainer independent={true}>
                <Tab.Navigator
                    initialRouteName="Startsy"
                    screenOptions={{
                        tabBarActiveTintColor: "#00DE62",
                        tabBarInactiveTintColor: "#7A7B7C",
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: '#16181a',
                            height: 60,
                            // zIndex  : -1,
                            opacity: 1,
                            borderTopWidth: 0,
                            paddingTop: 10,
                            position: "absolute",
                            // transform :[{translateY : bottomposition}] 
                        },
                    }}

                >
                    <Tab.Screen
                        screenOptions={{


                        }}
                        name="ForYou"
                        children={(props) => <Foryou scroll={updatescroll} token={token} />}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (
                                <View style={{ flex: 1, width: 49, marginLeft: 15, justifyContent: "center", height: 20 }}>
                                    <Box color={focused ? "#00DE62" : "#828282"} />
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="NewsLetter"
                        component={NewsLetter}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (

                                <View style={{ flex: 1, width: 30, marginLeft: 10, justifyContent: "center", height: 30 }}>
                                    <NewsLettericon color={focused ? "#00DE62" : "#828282"} />
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Startsy"
                        // component={Startsy}
                        children={(props) => <Startsy navigation={navigation} token={token} />}
                        options={{
                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (
                                <Image style={{ width: 45, height: 45 }} source={require("../assets/images/logo.png")} />
                                // focused ? (
                                // ) : (
                                //     <View style={{ flex: 1, width: 38, marginLeft: 0, justifyContent: "center", height: 30 }}>
                                //         <Startsy2/>
                                //     </View>
                                // )
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
                                <MaterialCommunityIcons name="message-text-outline" size={32} color={focused ? "#00DE62" : "#7A7B7C"} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Profile"

                        children={() => <Apnauser closeall={closeall} mainpagebottomsheet={"mainpagebottomsheet"} navigation={navigation} token={token} />}
                        options={{

                            tabBarLabel: "",
                            tabBarIcon: ({ focused }) => (
                                <FontAwesome6 name="circle-user" size={31} color={focused ? "#00DE62" : "#7A7B7C"} />
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
                        name="Singleprofilepage"
                        // component={Singleprofilepage} // Replace with the desired component
                        children={() => <Singleprofilepage navigation={navigation} />}
                        options={{
                            tabBarButton: () => null, // Hides the tab from the bar
                            tabBarVisible: false,     // Ensures it doesn't take space in the bar
                        }}
                    />

                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}


export default Main1;

