

import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, StatusBar } from "react-native";
const Communities = () => (
    <View style={styles.c1}>
        {/* <View style={styles.card}>
    //         <View style={styles.header1}>
    //             <Image
    //                 source={require("../../assets/images/p2.png")} 
    //                 style={styles.profileImage}
    //             />
    //             <View style={styles.headerText}>
    //                 <Text allowFontScaling={false} style={styles.username}>raz.shhh</Text>
    //                 <Text allowFontScaling={false} style={styles.date}>Today</Text>
    //             </View>
    //         </View>

    //         <Text allowFontScaling={false} style={styles.title}>Startsy</Text>
    //         <Text allowFontScaling={false} style={styles.description}>
    //             Revolutionizing startup ecosystem.
    //         </Text>

    //         <Text allowFontScaling={false} style={styles.status}>Preseed stage - 200k</Text>
    //         <Text allowFontScaling={false} style={styles.pending}>Pending...</Text>
        </View> */}
    </View>


);


export default Communities

const { height, width } = Dimensions.get("window")

var a = width / 360;
var b = height / 800;
const scalingfactor = Math.sqrt(a * b)

const styles = StyleSheet.create({
    c1: {
        flex: 1,
        backgroundColor: "#16181a",
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
        fontSize: 24,
        fontFamily: "Alata"

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
})