import { useFocusEffect } from "expo-router"
import { useState, useEffect, useRef, useContext } from "react";
import * as React from "react"
import { SafeAreaView, ScrollView, ActivityIndicator,StatusBar, Animated, Dimensions, Pressable, TextInput, TouchableWithoutFeedback, Image } from "react-native"
import { View, Text, StyleSheet } from "react-native"
import Profile from "../../assets/icons/profile.js"
import Drop from "../../SCREENS/dropdown.js"
import Slider from "@react-native-community/slider";
import styles from "../commonstyles.js"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from '@expo/vector-icons/Entypo';




import * as ImagePicker from 'expo-image-picker';
import { GlobalContext } from "@/Global/globalcontext.js";


const Founder2 = ({ navigation, route }) => {

    const [token, settoken] = useState("")
    const { globaldata, updateField } = useContext(GlobalContext);

    useEffect(() => {
        console.log(globaldata, "global data");
        settoken(globaldata.token)
    }, [])

    const { form, image } = route.params;
    const final = new FormData();


    for (var items of form["_parts"]) {
        if (items[0] == "fullname" || items[0] == "password") continue;
        final.append(items[0], items[1]);
    }


    const [sliderrange, setsliderrange] = useState(5000000)
    const [nameOfStartup, setNameOfStartup] = useState('');
    const [goal, setGoal] = useState('');
    const [description, setDescription] = useState('');
    const [teamInfo, setTeamInfo] = useState('');
    const [sector, setSector] = useState('');
    const [fundingStatus, setFundingStatus] = useState('');
    const [stageOfStartup, setStageOfStartup] = useState('');
    const [socialProof, setSocialProof] = useState('');


    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [open4, setOpen4] = React.useState(false)




    var areaofinterestlist = [
        { label: "Technology", value: "Technology" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Finance", value: "Finance" },
        { label: "Consumer Goods", value: "Consumer Goods" },
        { label: "Education", value: "Education" },
        { label: "Energy", value: "Energy" },
        { label: "Real Estate", value: "Real Estate" },
        { label: "Logistics", value: "Logistics" },

    ]

    var country1 = [
        { label: "10th", value: "10TH" },
        { label: "12th", value: "12th" },
        { label: "Graduate", value: "Graduate" },
        { label: "Post-Graduate", value: "Post-Graduate" },
        { label: "P.H.D", value: "P.H.D" },


    ]



    const handleOutsideTouch = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open4) setOpen3(false);
    };

    const t1 = () => {
        setOpen1(!open1);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open4) setOpen4(false);
    }
    const t2 = () => {
        if (open1) setOpen1(false);
        setOpen2(!open2);
        if (open3) setOpen3(false);
        if (open4) setOpen4(false);
    }
    const t3 = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        setOpen3(!open3);
        if (open4) setOpen4(false);
    }
    const t4 = () => {
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open1) setOpen1(false);
        setOpen4(!open4);
    }


    const [loading, setloading] = useState(false)

    // multiple certificate 
    const [teammember, setteammember] = useState([{ id: Date.now(), username: '', name: '', role: "" }]);


    function addteammember() {
        setteammember(
            [...teammember, { id: Date.now(), username: '', name: '', role: '' }]
        )
    }


    const [url, seturl] = useState([{ id: Date.now(), url: '' }]);
    function addurl() {
        seturl(
            [...url, { id: Date.now(), url: "" }]
        )
    }
    function handleurlchange(id, field, value) {
        var array = url.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value }

            }
            else return e
        })
        seturl(array);
    }




    async function savedata() {
        final.append("nameOfStartup", nameOfStartup)
        final.append("goal", goal)
        final.append("description", description)
        final.append("sector", sector)
        final.append("stageOfStartup", stageOfStartup)
        final.append("fundingStatus", fundingStatus)

        var array = teammember.map(({ id, username, ...rest }) => {
            return {
                ...rest,
                tag: username
            }

        })

        final.append("teamInfo", JSON.stringify(array));

        var array = url.map(e => e.url)
        final.append("socialProof", JSON.stringify(array));
        if (image && image != "") {
            final.append("profilePhoto", {
                uri: image,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,
            });
        }


        console.log('====================================');
        console.log(final);
        console.log('====================================');
        setloading(true);
        try {
            const response = await fetch('http://192.168.1.7:5002/founder/editFounderAccountProfileDetails', {
                method: 'POST',
                body: final,
                headers: {
                    accept: "application/json",
                    "Authorization": token,
                },
            });
            const data = await response.json();
            if (response.status == 200) {
                navigation.navigate("Main2")
            }
            console.log('====================================');
            console.log(data);
            console.log('====================================');

        }
        catch (err) {
            console.log(err);

        }
        finally {
            setloading(false)
        }

    }


    function handleworkchange(id, field, value) {
        var array = teammember.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value }

            }
            else return e
        })
        setteammember(array);
    }
    const [textlength, settextlength] = useState(0);
    function counttext(text) {

        settextlength(text.length)

    }


    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A")
        StatusBar.setBarStyle("light-content")
    })
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a" }}>
            <ScrollView style={{ flex: 1 }}>
                <Animated.View style={styles1.header}>
                    <Text allowFontScaling={false} style={styles1.headertext}>Profile</Text>
                </Animated.View>
                <View style={{ width: width * 0.98, margin: "auto" }}>
                    <Text style={styles1.edit}>Edit Profile</Text>

                    <Text allowFontScaling={false} style={[styles.t1, { marginTop: 0, marginBottom: 0, paddingLeft: 12 }]}>About Startup/Organisation</Text>



                    <TextInput
                        onTouchStart={handleOutsideTouch}
                        allowFontScaling={false}
                        placeholder="Name"
                        placeholderTextColor="#B8B8B8"
                        style={styles1.input}
                        value={nameOfStartup}
                        onChangeText={(text) => { setNameOfStartup(text) }}
                    />
                    <TextInput
                        allowFontScaling={false}
                        placeholder="Goal"
                        placeholderTextColor="#B8B8B8"
                        style={[styles1.input, { marginBottom: 20 }]}
                        value={goal}
                        onChangeText={(text) => { setGoal(text) }}
                    />

                    <Text allowFontScaling={false} style={styles1.des}>Description:</Text>

                    <View style={{ position: "relative" }}>
                        <Text style={[styles1.t22, styles1.count]}>{textlength}/1000</Text>
                        <TextInput
                            allowFontScaling={false}
                            placeholder=""
                            placeholderTextColor="#B8B8B8"
                            style={styles1.input11}
                            maxLength={1000}
                            multiline={true}
                            onFocus={handleOutsideTouch}
                            onPress={handleOutsideTouch}
                            // value={username}
                            onChangeText={(text) => {
                                setDescription(text)
                                counttext(text)
                            }}
                        />
                    </View>











                    <View style={{ width: width * 0.95, margin: "auto" }}>


                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginTop: 25, marginBottom: 10, paddingLeft: 7 }]}>Startup sector  </Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>List your highest degree achieved, which helps to establish your academic background and qualifications. </Text>
                        <Drop width={"88%"} width1={"86%"} items={areaofinterestlist} onValueChange={(value) => { setSector(value) }} setOpen={t2} open={open2} nestedScrollEnabled={true} />


                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25, paddingLeft: 7 }]}>Startup stage  </Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Detail any relevant industry experience, particularly if you’ve worked in a specific company or held roles that have prepared you for your current venture.</Text>
                        <Drop width={"88%"} width1={"86%"} items={country1} onValueChange={(value) => setStageOfStartup(value)} open={open1} setOpen={t1} />


                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 25, paddingLeft: 7 }]}>Funding Status</Text>
                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t2, { marginBottom: 15 }]}>Indicate the amount of funding your startup has received so far. This information will only be visible to verified investors and helps them assess your startup's financial backing and growth potential.</Text>

                        <Pressable onPress={() => { handleOutsideTouch() }} style={[styles.btn1, { backgroundColor: "#24272A", marginBottom: 10, width: 220, height: 52 }]}>
                            <Text allowFontScaling={false} style={styles.nexttext}>{sliderrange.toLocaleString("en-IN")}</Text>
                        </Pressable>

                        {/* slider */}
                        <View style={[styles.box, { left: 20 }]}></View>
                        <View style={[styles.box1, { left: "95%" }]}></View>
                        <Slider onTouchStart={handleOutsideTouch} s
                            // style={styles.sliderbox}
                            style={{ marginTop: -7, width: "90%", margin: "auto" }}
                            minimumValue={0}
                            maximumValue={10000000}
                            value={5000000}
                            step={1000}
                            minimumTrackTintColor="#00DE62"
                            maximumTrackTintColor="#00DE62"
                            // step={100}
                            // thumbTintColor="#737373" // Color of the slider thumb
                            // trackImage={require("../assets/images/slider.png")}
                            // trackImage={require("../assets/images/slider3.png")}
                            thumbImage={require("../../assets/images/slider3.png")}
                            onValueChange={(value) => { setsliderrange(value) }}
                            hitSlop={{ top: 50, left: 50, right: 50, bottom: 50 }}
                            thumbTouchSize={{ width: 100, height: 100 }}
                        />

                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 35, paddingLeft: 10 }]}>Social proof</Text>
                        {url.map(items =>

                            <View style={styles1.v1} key={items.id}>
                                <Pressable onPress={addurl}>
                                    <Entypo style={styles1.plus1} name="plus" size={24} color="#00DE62" />
                                </Pressable>
                                <TextInput

                                    allowFontScaling={false}
                                    placeholder="URL"
                                    placeholderTextColor="#B8B8B8"
                                    style={styles1.input101}
                                    value={items.url}
                                    onChangeText={(text) => { handleurlchange(items.id, "url", text) }}
                                />
                            </View>

                        )}

                        <Text onTouchStart={handleOutsideTouch} allowFontScaling={false} style={[styles.t1, { marginBottom: 10, marginTop: 35, paddingLeft: 10 }]}>Team Information</Text>


                        {teammember.map((we) => (
                            <View key={we.id} style={styles1.certificate}>
                                <Pressable onPress={addteammember}>
                                    <Entypo style={styles1.plus} name="plus" size={24} color="#00DE62" />
                                </Pressable>

                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="@Username"
                                    placeholderTextColor="#B8B8B8"
                                    style={[styles1.input1, { marginTop: 20, backgroundColor: "transparent" }]}
                                    value={we.username}
                                    onChangeText={(text) => { handleworkchange(we.id, "username", text) }}
                                />
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Name"
                                    placeholderTextColor="#B8B8B8"
                                    style={styles1.input1}
                                    value={we.name}
                                    onChangeText={(text) => { handleworkchange(we.id, "name", text) }}
                                />
                                <TextInput
                                    allowFontScaling={false}
                                    placeholder="Role"
                                    placeholderTextColor="#B8B8B8"
                                    style={styles1.input1}
                                    value={we.role}
                                    onChangeText={(text) => { handleworkchange(we.id, "role", text) }}
                                />

                            </View>
                        ))}










                    </View>


                    <View onTouchStart={handleOutsideTouch} s style={styles1.icons}>
                        <Pressable onPress={() => navigation.goBack()} style={{ alignSelf: "center" }}><FontAwesome6 name="chevron-left" size={40} color="#00DF60" /></Pressable>
                        <Pressable onPress={savedata} style={styles1.btn}>
                            {loading && <ActivityIndicator size={24} color="#16181a" />}
                            {!loading && <Text allowFontScaling={false} style={styles1.nexttext}>Save</Text>}
                        </Pressable>

                    </View>

                </View>

            </ScrollView>
        </SafeAreaView>

    )
}

export default Founder2


const { height, width } = Dimensions.get("window");


var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b)
const styles1 = StyleSheet.create({
    header: {
        height: 55,
        textAlign: "left",
        backgroundColor: "#16181a",
        // backgroundColor : "transparent",
        // position : "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        // backgroundColor : "red",


    },
    headertext: {
        color: "#00DE62",
        fontSize: scalingfactor * 35,
        fontFamily: "myanmar",
        fontWeight: "bold",
        paddingTop: 5,
        paddingHorizontal: 20,
    },
    edit: {
        color: "#B8B8B8",
        fontFamily: "Alata",
        textAlign: "center",
        fontSize: 20,
        marginBottom: 20


    },
    t2: {
        color: "#94A3B8",
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 14,
        marginBottom: 20,
        marginTop: 10
    },
    input: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        // marginTop: 40,
        borderBottomWidth: 1,
        // borderRadius : 20,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#AEAFAF",
        fontSize: scalingfactor * 20, // Responsive font size
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 7,
        width: "90%",
        marginHorizontal: "auto",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 15,
        // borderRadius : 20
    },
    icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "85%",
        margin: "auto",
        // marginTop: scalingfactor * 30,
        // position: "absolute",
        // bottom: 40,
        marginTop: 60,
        marginBottom: 40,
        alignSelf: "center",
    }
    ,
    btn: {
        width: 120,
        height: 48,
        // height : scalingfactor*48,
        backgroundColor: "#00DF60",
        // padding: scalingfactor * 12,
        // marginVertical: height * 0.018,
        borderRadius: 20,
        // margin: "auto",
        // marginTop: scalingfactor * 20,
        shadowColor: 'rgba(0,0,0, 0.5)', // Shadow color
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 1, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,
        justifyContent: 'center',

    }, nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 24,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4

    },
    img: {
        margin: "auto",
        width: 113,
        height: 113,
        borderRadius: 100
    },
    certificate: {
        padding: 4,
        paddingTop: 15,
        marginTop: 10,
        margin: "auto",
        width: "92%",
        backgroundColor: "#24272A",
        borderWidth: 3,
        borderColor: "#16181A",
        borderRadius: 10,
        position: "relative"
    },
    plus: {
        position: "absolute",
        right: 5,
        top: -5,
        zIndex: 100
    },
    input1: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: 0,
        borderBottomWidth: 3,
        paddingLeft: scalingfactor * 10,
        borderBottomColor: "#16181A",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "92%",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 25
    },
    t22: {
        textAlign: 'Left',
        color: "#94A3B8",
        fontFamily: 'Roboto',
        fontSize: scalingfactor * 13,

        marginBottom: scalingfactor * 8,
        width: "85%",
        alignSelf: "center",
        lineHeight: scalingfactor * 16
    },
    count: {
        fontSize: 14,
        position: "absolute",
        bottom: 30,
        right: 30,
        // backgroundColor: "red",
        width: "auto"
    },
    input11: {
        backgroundColor: "transparent",
        margin: height * 0.016,
        marginTop: -2,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "#828282",
        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 5,
        width: "90%",
        margin: "auto",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 10,
        height: 220,
        marginTop: 10,
        padding: 12,
        textAlignVertical: "top",
        paddingBottom: 30,

    },
    des: {
        fontFamily: "Roboto",
        fontSize: 20,
        color: "#B8B8B8",
        paddingLeft: 22,
        marginVertical: 8
    }
    , plus1: {
        position: "absolute",
        right: 10,
        top: 2,
        zIndex: 100
    },
    v1: {
        borderBottomWidth: 3,
        borderBottomColor: "#AEAFAF",
        width: "90%",
        margin: "auto",
        //    backgroundColor :"red",
        paddingBottom: 0,
        marginTop: 10
    },
    input101: {

        margin: height * 0.016,
        marginTop: 0,

        fontSize: scalingfactor * 20,
        color: "#B8B8B8",
        paddingBottom: scalingfactor * 0,
        width: "90%",
        marginLeft: 0,
        paddingLeft: 10,
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,


    }


})