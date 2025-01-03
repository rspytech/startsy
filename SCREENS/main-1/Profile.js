import { useFocusEffect } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, StatusBar, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";

const Profile = () => {

    useFocusEffect(()=>{
        StatusBar.setBackgroundColor("#16181a")
    })
   
    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <Text allowFontScaling={false} style={styles.headerText}>Profile</Text>

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    style={styles.profileImage}
                    source={require("../../assets/images/p2.png")} // Replace with your image path
                />
                <View style={styles.userinfo}>
                    <Text allowFontScaling={false} style={styles.username}>Acehammer</Text>
                    <Text allowFontScaling={false} style={styles.userRole}>Investor</Text>
                    <TouchableOpacity style={styles.editButton}>
                        <Text allowFontScaling={false} style={styles.editButtonText}>Edit profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Buy Plan Section */}
            <View style={styles.buyPlanSection}>
                <Text allowFontScaling={false} style={styles.buyPlanText}>Buy Plan</Text>
            </View>
        </SafeAreaView>
    );
};

export default Profile;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16181a",
        padding: 20,
    },
    headerText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#00DE62",
        marginBottom: 20,
        color: "#00DE62",
        fontFamily : "myanmar",

    },
    profileSection: {
        alignItems: "center",
        marginBottom: 10,
        display : "flex",
        flexDirection : "row"
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 10,
    },
    username: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#E9E9E9",
        fontFamily : "Alata"
    },
    userRole: {
        fontSize: 14,
        color: "#00DE62",
        marginBottom: 10,
        fontFamily : "Roboto",
        paddingLeft : 2
    },
    editButton: {
        backgroundColor: "#00DE62",
        // paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        maxWidth : 100
       
    },
    editButtonText: {
        color: "#16181a",
        fontWeight: "bold",
        fontSize: 13,
        fontFamily : "Alata",
        textAlign: "center",
        marginLeft : -1
    },
    buyPlanSection: {
        borderWidth: 2,
        borderColor: "#00DE62",
        borderRadius: 10,
        width: width * 0.9,
        // height: 200,
        // justifyContent: "center",
        // alignItems: "center",
        alignSelf: "center",
        flex : 0.9
    },
    buyPlanText: {
        fontSize: 32,
        fontFamily : "Alata",
        color: "#B8B8B8",
        textAlign: "center"
    },
    userinfo : {
        paddingLeft : 10,
        justifyContent : "flex-start",
        alignSelf : "flex-start"
    }
});
