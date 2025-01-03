import React, { useEffect } from "react";
import { View, Text, StyleSheet, TextInput, FlatList, Image, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { Pressable } from "react-native";
import ConnectionsScreen from "../main-1/connection.js"
import Communities from "../main-2/Communities.js"


const Tab = createMaterialTopTabNavigator();



const RequestsScreen = () => (
    <View style={styles.c1}>
        <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.header1}>
                <Image
                    source={require("../../assets/images/p2.png")} // Replace with real profile picture URL
                    style={styles.profileImage}
                />
                <View style={styles.headerText}>
                    <Text allowFontScaling={false} style={styles.username}>raz.shhh</Text>
                    <Text allowFontScaling={false} style={styles.date}>Today</Text>
                </View>
            </View>

            {/* Title Section */}
            <Text allowFontScaling={false} style={styles.title}>Startsy</Text>
            <Text allowFontScaling={false} style={styles.description}>
                Revolutionizing startup ecosystem.
            </Text>

            {/* Status Section */}
            <Text allowFontScaling={false} style={styles.status}>Preseed stage - 200k</Text>
            <Text allowFontScaling={false} style={styles.pending}>Pending...</Text>
        </View>
    </View>
);


const ChatScreen = ({ navigation , token }) => {

    console.log(token , "dskljkuyhfdsajjsd");
    


    useEffect(()=>{

    })



    
    return (

        <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.header}>Chat</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    allowFontScaling={false}
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#828282"
                />
            </View>

            {/* <NavigationContainer> */}
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
                    // component={ConnectionsScreen}
                    children={(props) => <ConnectionsScreen navigation={navigation} />}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <View>
                                <Text allowFontScaling={false} style={[
                                    styles.tabbarpill, {
                                        color: focused ? "#00DE62" : "#808080",
                                        borderColor: focused ? "#00DE62" : "#808080",
                                    }
                                ]}> Personal
                                </Text>
                            </View>
                        ),

                    }}
                />
                <Tab.Screen

                    name="Requests"
                    component={Communities}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text allowFontScaling={false} style={[
                                styles.tabbarpill, {
                                    color: focused ? "#00DE62" : "#808080",
                                    borderColor: focused ? "#00DE62" : "#808080",
                                }
                            ]}> Communities
                            </Text>
                        ),

                    }}
                />
            </Tab.Navigator>
            {/* </NavigationContainer> */}
        </View>
    )
}
export default ChatScreen;



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
        marginTop: -3,
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
