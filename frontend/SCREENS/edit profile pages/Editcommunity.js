import { useFocusEffect } from "expo-router";
import { useState, useEffect, useRef, useContext } from "react";
import * as React from "react";
import {
    SafeAreaView,
    BackHandler,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    Dimensions,
    Pressable,
    TextInput,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import { View, Text, StyleSheet } from "react-native";
import Profile from "../../assets/icons/profile.js";
import Drop from "../dropdown.js";
import Slider from "@react-native-community/slider";
import styles from "../commonstyles.js";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
import { GlobalContext } from "../../Global/globalcontext.js";
import { url } from "../../config.js";

const Editcommunity = ({ navigation }) => {
    useFocusEffect(() => {
        // StatusBar.setBackgroundColor("red")
        // StatusBar.setBarStyle("light-content")
    });
    const [sliderrange1, setsliderrange1] = useState(5);
    const [sliderrange, setsliderrange] = useState(5000000);

    const [loading, setloading] = useState(false);
    const [token, settoken] = useState("");

    const [fullName, setfullname] = useState("");
    const [country, setcountry] = React.useState("");
    const [contactInfo, setcontactInfo] = useState("");
    const [tagline, settagline] = useState("");
    const [role1, setrole] = useState("");
    const [skills, setskills] = useState("");
    const [interest, setinterest] = useState("");
    const [preferences, setprefference] = useState("");
    const [education1, seteducation] = useState("");
    const [image, setImage] = useState(null);
    const [certificate, setcertificate] = useState([{ id: Date.now(), cname: "", curl: "" }]);
    const [portfolio1, setportfolio] = useState([{ id: Date.now(), url: "" }]);

    function deletecertificate1(index) {
        console.log(index);

        var new1 = [...certificate];
        new1.splice(index, 1);
        setcertificate(new1);
    }
    function deletecertificate(index) {
        console.log(index);

        var new1 = [...certificate];
        new1.splice(index, 1);
        setcertificate(new1);
    }

    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const [open4, setOpen4] = React.useState(false);
    const [open5, setOpen5] = React.useState(false);

    const { globaldata, updateField } = useContext(GlobalContext);

    useEffect(() => {
        console.log(globaldata, "global data");
        settoken(globaldata.token);
    }, [globaldata]);
    function gotochangepassowrd() {
        navigation.navigate("ChangePassword1");
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            navigation.goBack();

            return true; // This prevents the default back action
        });

        return () => backHandler.remove();
    }, []);

    const fileupload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        // Launch the image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            setImage(imageUri);
        }
    };

    var stage = [
        { label: "Ideation Stage", value: "Ideation Stage" },
        { label: "Pre-Seed Stage", value: "Pre-Seed Stage" },
        { label: "Seed Stage ", value: "Seed Stage" },
        { label: "Early Stage", value: "Early Stage" },
        { label: "Growth Stage", value: "Growth Stage" },
        { label: "Mature Stage", value: "Mature Stage" },
    ];

    var sectorlist = [
        { label: "Vertical Sector", value: "Vertical Sector" },
        { label: "Horizontal Sector", value: "Horizontal Sector" },
    ];
    var country1 = [
        { label: "India", value: "INDIA" },
        { label: "United States", value: "UNITED_STATES" },
        { label: "Canada", value: "CANADA" },
        { label: "United Kingdom", value: "UNITED_KINGDOM" },
        { label: "Australia", value: "AUSTRALIA" },
        { label: "Singapore", value: "SINGAPORE" },
        { label: "Indonesia", value: "INDONESIA" },
        { label: "Vietnam", value: "VIETNAM" },
        { label: "Malaysia", value: "MALAYSIA" },
        { label: "UAE", value: "UAE" },
        { label: "Saudi Arabia", value: "SAUDI_ARABIA" },
        { label: "Israel", value: "ISRAEL" },
        { label: "Nigeria", value: "NIGERIA" },
        { label: "South Africa", value: "SOUTH_AFRICA" },
        { label: "Brazil", value: "BRAZIL" },
        { label: "Mexico", value: "MEXICO" },
        { label: "Others (Type)", value: "OTHERS" },
    ];

    const handleOutsideTouch = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open4) setOpen3(false);
        if (open5) setOpen5(false);
    };
    const handlerole = (value1) => {
        setcountry(value1); // Update state with the selected value
    };
    const t1 = () => {
        setOpen1(!open1);
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open4) setOpen4(false);
    };
    const t2 = () => {
        if (open1) setOpen1(false);
        setOpen2(!open2);
        if (open3) setOpen3(false);
        if (open4) setOpen4(false);
    };
    const t3 = () => {
        if (open1) setOpen1(false);
        if (open2) setOpen2(false);
        setOpen3(!open3);
        if (open4) setOpen4(false);
    };
    const t4 = () => {
        if (open2) setOpen2(false);
        if (open3) setOpen3(false);
        if (open1) setOpen1(false);
        setOpen4(!open4);
    };

    async function savedata() {
        setloading(true);

        var formData = new FormData();

        var certification = certificate.map(({ id, cname, curl }) => {
            var obj = { name: cname, url: curl };
            return obj;
        });
        var portfolio = portfolio1.map(({ id, url }) => {
            return url;
        });

        formData.append("certification", JSON.stringify(certification));
        formData.append("portfolio", JSON.stringify(portfolio));

        if (image && image != "") {
            formData.append("profilePhoto", {
                uri: image,
                type: "image/jpeg",
                name: `image_${Date.now()}.jpg`,
            });
        }

        try {
            const response = await fetch(`${url}communityMember/editCommunityMemberAccountProfileDetails`, {
                method: "POST",
                body: formData,
                headers: {
                    accept: "application/json",
                    "Authorization": token,
                },
            });
            const data = await response.json();
            setloading(false);
            console.log(data);
        } catch (err) {
            setloading(false);
            console.log(err);
        } finally {
            setloading(false);
        }
    }

    var role = [
        { label: "Learner", value: "Learner" },
        { label: "Job seeker", value: "Job seeker" },
        { label: "Startup Enthusiast", value: "Startup Enthusiast" },
        { label: "Mentor", value: "Mentor" },
        { label: "Networker", value: "Networker" },
        { label: "Contributor", value: "Contributor" },
    ];

    var a1 = [
        { label: "AI", value: "AI" },
        { label: "AR/VR", value: "AR/VR" },
        { label: "Blockchain", value: "Blockchain" },
        { label: "Social Media", value: "Social Media" },
        { label: "Marketing", value: "Marketing" },
        { label: "Social media marketing", value: "Social media marketing" },
        { label: "SaaS", value: "SaaS" },
        { label: "IoT", value: "IoT" },
        { label: "Cybersecurity", value: "Cybersecurity" },
        { label: "Cloud Computing", value: "Cloud Computing" },
        { label: "Biotech", value: "Biotech" },
        { label: "MedTech", value: "MedTech" },
        { label: "Digital Health", value: "Digital Health" },
        { label: "Pharma", value: "Pharma" },
        { label: "HealthTech", value: "HealthTech" },
        { label: "D2C", value: "D2C" },
        { label: "B2C", value: "B2C" },
        { label: "B2B", value: "B2B" },
        { label: "Marketplaces", value: "Marketplaces" },
        { label: "Logistics", value: "Logistics" },
        { label: "FinTech", value: "FinTech" },
        { label: "InsurTech", value: "InsurTech" },
        { label: "Decentralized Finance", value: "Decentralized Finance" },
        { label: "EdTech", value: "EdTech" },
        { label: "Online Learning Platforms", value: "Online Learning Platforms" },
        { label: "Cleantech", value: "Cleantech" },
        { label: "Renewable Energy", value: "Renewable Energy" },
        { label: "Sustainability", value: "Sustainability" },
        { label: "Media", value: "Media" },
        { label: "Gaming", value: "Gaming" },
        { label: "Content Platforms", value: "Content Platforms" },
        { label: "EVs", value: "EVs" },
        { label: "Autonomous Vehicles", value: "Autonomous Vehicles" },
        { label: "Ride-Sharing", value: "Ride-Sharing" },
        { label: "AgriTech", value: "AgriTech" },
        { label: "FoodTech", value: "FoodTech" },
        { label: "Non-profits", value: "Non-profits" },
        { label: "Impact Investing", value: "Impact Investing" },
        { label: "Philanthropy", value: "Philanthropy" },
    ];

    var contentPreferences = [
        { label: "Startup News", value: "Startup News" },
        { label: "Job Postings", value: "Job Postings" },
        { label: "Educational Content", value: "Educational Content" },
    ];

    useFocusEffect(() => {
        StatusBar.setBackgroundColor("#16181A");
        StatusBar.setBarStyle("light-content");
    });

    const handlerole1 = (value1) => {
        // console.log("Selected Value:", value1); // Optional: Log the selected value
        setrole(value1); // Update state with the selected value
    };
    const handleinterest = (value1) => {
        console.log("Selected Value:", value1); // Optional: Log the selected value
        setinterest(value1); // Update state with the selected value
    };
    const handleprefference = (value1) => {
        // console.log("Selected Value:", value1); // Optional: Log the selected value
        setprefference(value1); // Update state with the selected value
    };

    function addcertificate() {
        setcertificate([...certificate, { id: Date.now(), cname: "", curl: "" }]);
    }

    function addportfolio() {
        setportfolio([...portfolio1, { id: Date.now(), url: "" }]);
    }

    function handlecertificatechange(id, field, value) {
        var array = certificate.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value };
            } else return e;
        });
        setcertificate(array);
    }

    function handleurlchange(id, field, value) {
        var array = portfolio1.map((e) => {
            if (e.id === id) {
                return { ...e, [field]: value };
            } else return e;
        });
        setportfolio(array);
    }

    var education = [
        { label: "10th", value: "10TH" },
        { label: "12th", value: "12th" },
        { label: "Graduate", value: "Graduate" },
        { label: "Post-Graduate", value: "Post-Graduate" },
        { label: "P.H.D", value: "P.H.D" },
    ];
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a" }}>
            <ScrollView style={{ flex: 1 }}>
                <Animated.View style={styles1.header}>
                    <Text allowFontScaling={false} style={styles1.headertext}>
                        Profile
                    </Text>
                </Animated.View>

                <TouchableWithoutFeedback onPress={handleOutsideTouch}>
                    <View style={{ width: width * 0.98, margin: "auto" }}>
                        <Text style={styles1.edit}>Edit Profile</Text>
                        {/* <Profile /> */}
                        <Pressable onPress={fileupload}>
                            {image != null ? (
                                <Image style={styles1.img} source={{ uri: image }} />
                            ) : (
                                // <Image style={styles.img1} source={require("../assets/images/User_light.png")} />
                                <Profile />
                            )}
                        </Pressable>
                        <Text style={styles1.t2}>Change profile picture</Text>

                        <TouchableOpacity onPress={gotochangepassowrd} style={styles1.editButton1}>
                            <Text allowFontScaling={false} style={styles1.editButtonText}>
                                Change Password
                            </Text>
                        </TouchableOpacity>

                        <TextInput
                            onTouchStart={handleOutsideTouch}
                            allowFontScaling={false}
                            placeholder="Full Name"
                            placeholderTextColor="#B8B8B8"
                            style={styles1.input}
                            value={fullName}
                            onChangeText={(text) => {
                                setfullname(text);
                            }}
                        />
                        {/* <TextInput
                        allowFontScaling={false}
                        placeholder="Email address"
                        placeholderTextColor="#B8B8B8"
                        style={[styles1.input, { marginBottom: 18 }]}
                    // value={username}
                    // onChangeText={(text) => { setusername(text) }}
                    /> */}

                        <Drop
                            items={country1}
                            onValueChange={handlerole}
                            open={open1}
                            setOpen={t1}
                            extra={true}
                            edit
                        />
                        <TextInput
                            allowFontScaling={false}
                            placeholder="Phone number"
                            placeholderTextColor="#B8B8B8"
                            style={[styles1.input, { marginTop: 28 }]}
                            value={contactInfo}
                            onChangeText={(text) => {
                                setcontactInfo(text);
                            }}
                        />

                        <View style={{ width: width * 0.95, margin: "auto" }}>
                            <Text allowFontScaling={false} style={styles.t1}>
                                Community Participation
                            </Text>
                            <Text allowFontScaling={false} style={styles.t2}>
                                Specify your role within the community to help tailor your experience.
                            </Text>
                            {/* <TouchableWithoutFeedback onPress={handleOutsideTouch}>  */}
                            <Drop items={role} onValueChange={handlerole1} open={open4} setOpen={t4} />
                            {/* </TouchableWithoutFeedback> */}

                            <Text
                                allowFontScaling={false}
                                style={[styles.t1, { marginTop: scalingfactor * 18 }]}
                            >
                                Area of Interest
                            </Text>
                            <Text allowFontScaling={false} style={styles.t2}>
                                Indicate the specific fields or topics you are passionate about within the
                                startup ecosystem.
                            </Text>
                            <Drop items={a1} onValueChange={handleinterest} open={open2} setOpen={t2} />

                            <Text
                                allowFontScaling={false}
                                style={[styles.t1, { marginTop: scalingfactor * 18 }]}
                            >
                                Content Preference
                            </Text>
                            <Text allowFontScaling={false} style={styles.t2}>
                                Choose the types of content you want to see most in your feed.
                            </Text>
                            <Drop
                                items={contentPreferences}
                                onValueChange={handleprefference}
                                open={open3}
                                setOpen={t3}
                            />

                            <Text style={[styles.t1, { marginTop: 20 }]}>Bio</Text>
                            <Text style={styles.t2}>
                                A brief, catchy description of your services or specialization.
                            </Text>
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Bio"
                                placeholderTextColor="#B8B8B8"
                                style={styles1.input}
                                value={tagline}
                                onChangeText={(text) => {
                                    settagline(text);
                                }}
                            />
                            <Text style={[styles.t1, { marginBottom: 5 }]}>Skills</Text>
                            <TextInput
                                allowFontScaling={false}
                                placeholder="Write any Top 3"
                                placeholderTextColor="#B8B8B8"
                                style={styles1.input}
                                value={skills}
                                onChangeText={(text) => {
                                    setskills(text);
                                }}
                            />

                            <Text style={styles.t1}>Education</Text>
                            <Text style={[styles.t2, { marginBottom: 20 }]}>
                                List your highest degree achieved, which helps to establish your academic
                                background and qualifications.
                            </Text>
                            <Drop
                                items={education}
                                open={open5}
                                setOpen={setOpen5}
                                onValueChange={(value) => {
                                    seteducation(value);
                                }}
                                nestedScrollEnabled={true}
                            />
                            {/* </ScrollView> */}

                            <Text style={[styles.t1, { marginTop: 15 }]}>Certification</Text>
                            {certificate.map((certificate, index) => (
                                <View key={certificate.id} style={styles1.certificate}>
                                    <Pressable onPress={addcertificate}>
                                        <Entypo style={styles1.plus} name="plus" size={24} color="#00DE62" />
                                    </Pressable>

                                    {index > 0 && (
                                        <Pressable
                                            onPress={() => {
                                                deletecertificate1(index);
                                            }}
                                        >
                                            <FontAwesome6
                                                name="trash"
                                                style={styles1.minus}
                                                size={15}
                                                color="#00DE62"
                                            />
                                        </Pressable>
                                    )}

                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="Certification name"
                                        placeholderTextColor="#B8B8B8"
                                        style={[
                                            styles1.input,
                                            { marginTop: 20, backgroundColor: "transparent" },
                                        ]}
                                        value={certificate.cname}
                                        onChangeText={(text) => {
                                            handlecertificatechange(certificate.id, "cname", text);
                                        }}
                                    />
                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="URL"
                                        placeholderTextColor="#B8B8B8"
                                        style={styles1.input}
                                        value={certificate.curl}
                                        onChangeText={(text) => {
                                            handlecertificatechange(certificate.id, "curl", text);
                                        }}
                                    />
                                </View>
                            ))}

                            <Text style={[styles.t1, { marginTop: 30 }]}>Portfolio</Text>
                            {portfolio1.map((items, index) => (
                                <View style={styles1.v1} key={items.id}>
                                    <Pressable onPress={addportfolio}>
                                        <Entypo style={styles1.plus1} name="plus" size={24} color="#00DE62" />
                                    </Pressable>

                                    {index > 0 && (
                                        <Pressable
                                            onPress={() => {
                                                deletecertificate(index);
                                            }}
                                        >
                                            <FontAwesome6
                                                name="trash"
                                                style={styles1.minus}
                                                size={15}
                                                color="#00DE62"
                                            />
                                        </Pressable>
                                    )}

                                    <TextInput
                                        allowFontScaling={false}
                                        placeholder="URL"
                                        placeholderTextColor="#B8B8B8"
                                        style={[styles1.input1, styles1.small]}
                                        onChangeText={(text) => {
                                            handleurlchange(items.id, "url", text);
                                        }}
                                    />
                                </View>
                            ))}
                        </View>

                        <View onTouchStart={handleOutsideTouch} s style={styles1.icons}>
                            <Pressable
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                style={{ alignSelf: "center" }}
                            >
                                <FontAwesome6 name="chevron-left" size={40} color="#00DF60" />
                            </Pressable>
                            <Pressable onPress={savedata} style={styles1.btn}>
                                {loading && <ActivityIndicator size={24} color="#16181a" />}
                                {!loading && (
                                    <Text allowFontScaling={false} style={styles1.nexttext}>
                                        Save
                                    </Text>
                                )}
                            </Pressable>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Editcommunity;

const { height, width } = Dimensions.get("window");

var a = width / 360;
var b = height / 800;
// console.log(a,b);

const scalingfactor = Math.sqrt(a * b);
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
        marginBottom: 20,
    },
    t2: {
        color: "#94A3B8",
        fontFamily: "Roboto",
        textAlign: "center",
        fontSize: 14,
        marginBottom: 5,
        marginTop: 10,
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
    input1: {
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
        width: "100%",
        marginHorizontal: "auto",
        fontFamily: "Roboto",
        lineHeight: scalingfactor * 18,
        marginBottom: scalingfactor * 15,
        // backgroundColor : "red"
        // borderRadius : 20
    },

    small: {
        // width : "80%"
    },
    icons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        margin: "auto",
        // marginTop: scalingfactor * 30,
        // position: "absolute",
        // bottom: 40,
        marginTop: 60,
        marginBottom: 40,
        alignSelf: "center",
    },
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
        shadowColor: "rgba(0,0,0, 0.5)", // Shadow color
        shadowOffset: {
            width: 0, // x offset
            height: 5, // y offset
        },
        shadowOpacity: 1, // Full opacity for shadow effect
        shadowRadius: 1, // Blur radius
        elevation: 5,
        justifyContent: "center",
    },
    nexttext: {
        color: "#24272A",
        fontFamily: "Alata",
        fontSize: scalingfactor * 24,
        textAlign: "center",
        // lineHeight : 16
        marginTop: -4,
    },
    img: {
        margin: "auto",
        width: 113,
        height: 113,
        borderRadius: 100,
    },
    editButton1: {
        backgroundColor: "#00DE62",
        // paddingHorizontal: 20,
        // paddingVertical: 8,
        borderRadius: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#00DE62",
        alignItems: "center",
        verticalAlign: "middle",
        justifyContent: "center",
        width: 182,
        height: 40,
        alignSelf: "center",
        marginVertical: 12,
    },
    editButtonText: {
        color: "#16181A",
        fontSize: 16,
        fontFamily: "Alata",
        textAlign: "center",
        marginLeft: -1,
        marginTop: -3,
    },

    certificate: {
        padding: 4,
        paddingTop: 15,
        paddingBottom: 10,
        marginTop: 20,
        margin: "auto",
        width: "92%",
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#AEAFAF",
        borderRadius: 10,
        position: "relative",
    },
    plus: {
        position: "absolute",
        right: 5,
        top: -5,
        zIndex: 100,
    },
    plus1: {
        position: "absolute",
        right: 10,
        top: 2,
        zIndex: 100,
    },
    v1: {
        borderBottomWidth: 3,
        borderBottomColor: "#16181A",
        width: "90%",
        margin: "auto",
        //    backgroundColor :"red",
        paddingBottom: 0,
        marginTop: 10,
    },

    minus1: {
        position: "absolute",
        right: 45,
        top: 6,
        zIndex: 100,
    },

    minus: {
        position: "absolute",
        right: 45,
        top: -3,
        zIndex: 100,
    },
});
