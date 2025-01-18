import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, Image, FlatList, StatusBar, ActivityIndicator, RefreshControl, StyleSheet, BackHandler, SafeAreaView, ScrollView, Pressable } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import EvilIcons from '@expo/vector-icons/EvilIcons'; import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Banner from "../assets/icons/banner.js"
import Upvote from '@/assets/icons/upvote';


import * as ImagePicker from 'expo-image-picker';
import Post from "../components/Post.js"
import { useRoute } from '@react-navigation/native';
import { url } from "../config.js"
import { Video } from 'expo-av';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Share from "@/assets/icons/share.js";
import styles from "../styles/post.js"

const Singleprofilepage = ({ navigation, props }) => {

  const route = useRoute();
  const id = route.params.id
  const token = route.params.token
  const page = route.params.page
  const item = route.params.item
  const messages = route.params.messages
  const mypage = route.params.mypage


  console.log(mypage);

  const [investor, setinvestorarray] = useState([]);
  const [noninvestor, setnoninvestor] = useState([]);
  const [refreshing, setRefreshing] = useState(false)
  const [connecteddata, setconnecteddata] = useState("")





  const [userdata, setuserdata] = useState(null)
  const [posts, setposts] = useState([])


  // const Tab = createMaterialTopTabNavigator();

  // console.log(id);

  async function getdata(params) {
    try {

      const response = await fetch(`${url}api/getUsersProfiles/${id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();

      console.log(data.status , "abhi ka");
      
      // console.log(data.data.user_id.profilePhoto);
      // console.log(response.status);
      

      setinvestorarray(data.data.chatUsers.filter((e) => e.role == "Investor"))
      setnoninvestor(data.data.chatUsers.filter((e) => e.role != "Investor"))
      // console.log(data.data);
      setposts(data.data.posts)
      setuserdata(data.data)
      setconnecteddata(data.status)

    }
    catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {

    getdata()
  }, [id, token])



  // console.log(route.params);


  useEffect(() => {
    StatusBar.setBackgroundColor("#16181A");
    StatusBar.setBarStyle("light-content")
  }, [])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // console.log(page);

      if (page == "Chat") {
        navigation.navigate(page, { item, messages, token });
      }
      else {
        navigation.navigate(page);
      }

      return true; // This prevents the default back action
    });

    return () => backHandler.remove();
  }, [page]);

  const [image, setImage] = useState("")
  const [followstatus, setfollowstatus] = useState("Connect")


  const renderItem = ({ item, index }) => {

    const isVideoPlaying = videoStates[item._id] || false;

    function currency(pay) {
      // console.log(pay);
      // console.log(typeof pay);
      pay = Number(pay);
      return pay.toLocaleString("en-IN")
    }
    if (item.type == "photo" || item.type == "textBlog" || item.type == "video") {
      return (
        <View style={styles.box}>
          <View style={styles.top} >
            <Pressable
              onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
              style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Image style={styles.userimg} source={{ uri: userdata.user_id.profilePhoto }} />
              <View style={styles.userdetail}>
                <Text allowFontScaling={false} style={styles.u1}>{userdata.user_id.userName}</Text>
                <Text allowFontScaling={false} style={styles.u2}>{userdata.user_id.role}</Text>
              </View>
            </Pressable>
          </View>
          {item.type == "photo" && <Image style={styles.template} source={{ uri: item.mediaUrl }} />}
          {item.type == "video" &&
            <Video
              ref={ref => videoRefs.current[item._id] = ref}
              style={styles.template}
              source={{ uri: item.mediaUrl }}
              useNativeControls // Enables native playback controls
              resizeMode="contain" // Adjusts video to fit within the view
              isLooping // Loops the video
              shouldPlay={isVideoPlaying}
            />

          }
          {item.type == "textBlog" && <Text style={styles.blogtext}>{item.content}</Text>}

          <View style={styles.iconcontainer}>
            <View style={styles.icon2}>
              <Pressable onPress={() => { upvotepost(item._id, index) }}>
                {!item.isliked && <Upvote width={36} height={36} style={{ marginHorizontal: 5 }} />}
                {item.isliked && <Upvote width={36} height={36} style={{ marginHorizontal: 5 }} selected={true} />}
              </Pressable>
              <Pressable onPress={() => { opencomment(item._id) }}><FontAwesome name="comment-o" size={30} color="#00DE62" /></Pressable>
            </View>
            <Share style={{ marginTop: 5, marginRight: 10, right: 0 }} />


          </View>
          <View style={styles.lower}>
            <Text allowFontScaling={false} style={styles.u3}>{item.caption != undefined ? item.caption : "caption"} </Text>
            <Pressable onPress={() => { opencomment(item._id) }} allowFontScaling={false} style={styles.u4}>
              <Text style={styles.u4}>View {item.postComments.length} comments</Text>
            </Pressable>

          </View>

        </View>
      )
    }
    else if (item.type == "communityPost") {
      return (
        <View style={styles.box}>

          <View style={styles.top} >
            <Pressable

              onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
              style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <Image style={styles.userimg} source={{ uri: userdata.user_id.profilePhoto }} />
                <View style={styles.userdetail}>
                  <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                  <Text allowFontScaling={false} style={styles.u2}>Community Member</Text>
                </View>
              </View>
            </Pressable>
          </View>
          <View style={styles.lower}>
            <Text style={styles.com1}>{item.communityPost.communityName}</Text>
            <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>{item.communityPost.communityDescription}</Text>
            <Text allowFontScaling={false} style={styles.u6}><Text style={styles.desc1}>Members Count :</Text> {item.communityPost.communityMembers.length}</Text>
            <Text allowFontScaling={false} style={styles.u7}>Rules & Guidelines: {item.communityPost.communityRules}</Text>

            <Pressable style={[styles.next]} >
              <Text allowFontScaling={false} style={styles.nexttext}>Join Community</Text>
            </Pressable>
          </View>

        </View>
      )
    }
    else if (item.type == "jobPost") {
      return (
        <View style={styles.box}>
          <View style={styles.top} >

            <Pressable
              onPress={() => { navigation.navigate("Singleuserpage", { token: token, id: item.user_id._id, page: "Startsy" }) }}
              style={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                <Image style={styles.userimg} source={{ uri: userdata.user_id.profilePhoto }} />
                <View style={styles.userdetail}>
                  <Text allowFontScaling={false} style={styles.u1}>{item.user_id.userName}</Text>
                  <Text allowFontScaling={false} style={styles.u2}>{item.user_id.role}</Text>
                </View>
              </View>

            </Pressable>
          </View>
          <View style={styles.lower}>
            <Text style={styles.com1}>Role: {item.jobPosts.role}</Text>
            <Text style={styles.com2}><Text style={styles.desc1}>Community description: </Text>{item.jobPosts.description}</Text>
            <Text allowFontScaling={false} style={styles.u8}>Duration: {item.jobPosts.duration} months</Text>
            <Text allowFontScaling={false} style={styles.u8}>Pay: {currency(item.jobPosts.pay)} Rs</Text>

            <Pressable onPress={() => { applyjob(item._id) }} style={[styles.next]} >
              <Text allowFontScaling={false} style={styles.nexttext}>Apply</Text>
            </Pressable>
          </View>

        </View>
      )
    }
  };



  const fileupload = async () => {



    if (true) {
      return
    }
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // Allow all media types
      allowsEditing: true, // Allows cropping the image
      aspect: [16, 9], // Aspect ratio of the image
      quality: 1, // Image quality (0 to 1)

    });


    if (!result.canceled) {
      var final = new FormData();
      const imageUri = result.assets[0].uri;
      setImage(imageUri);

      final.append("coverImage", {
        uri: imageUri,
        type: "image/jpeg",
        name: `image_${Date.now()}.jpg`,

      })

      const response = await fetch(`${url}api/uploadCoverImage`, {
        method: 'POST',
        body: final,
        headers: {
          accept: 'application/json',
          "Authorization": token
        },
      });

      const data = await response.json();

      console.log(data);

    }

  }


  async function sendfollowrequest(id) {

    console.log(id);
    try {

      const response = await fetch(`${url}connections/followUser/${id}`, {
        method: 'POST',
        body: "",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      // setloading(false)
      console.log(data);

      console.log(response.status);
      setfollowstatus("request sent")

    }
    catch (err) {
      console.log(err);

    }

  }

  const header = function () {
    return (
      <>
        <View style={styles1.header}>
          <Pressable onPress={() => {
            if (page == "Chat") {

              console.log(page);


              navigation.navigate(page, { item, messages, token });
            }
            else {

              navigation.navigate(page)
            }


          }}><FontAwesome6 name="chevron-left" size={36} color="#00de62" /></Pressable>
          <Text style={styles1.username}>{userdata.user_id.userName}</Text>
        </View>
        <View>
          <Pressable onPress={fileupload} style={styles1.top}>
            {image == "" && <View style={styles1.img1}>
              <Banner />
            </View>}
            {image != "" && <Image style={styles1.bimg} source={{ uri: image }} />}
          </Pressable>
          <View style={styles1.bottom}>

            <View style={styles1.profilephoto}>
              <Image style={styles1.img2} source={{ uri: userdata.user_id.profilePhoto }} />
            </View>
            <View style={styles1.upvote}>

              <View style={{ transform: [{ scale: 1.1 }], marginRight: 0 }} ><Upvote width={50} height={44} /></View>
              <Text style={styles1.followers}>{userdata.totalUpvotes || 10}</Text>
            </View>

            <Text style={styles1.u1}>
              {userdata.user_id.userName}  <Text style={styles1.role}>{userdata.user_id.role}</Text>
            </Text>

            {!mypage && <Pressable onPress={() => { sendfollowrequest(userdata.user_id._id) }} style={styles1.f1}><Text style={styles1.ft}>{connecteddata}</Text></Pressable>}
            {mypage && <Pressable onPress={() => { sendfollowrequest(userdata.user_id._id) }} style={styles1.f1}><Text style={styles1.ft}>{connecteddata}</Text></Pressable>}
            {/* <Text style={styles1.goal}>{userdata.goal}</Text> */}





            {userdata.user_id.role == "Founder" &&
              <Text style={styles1.goal}>Goal : {userdata.goal}</Text>
            }

            {userdata.user_id.role == "Founder" &&
              <Text style={styles1.fund}>{userdata.hiddenInfo.stageOfStartup} : {(+userdata.hiddenInfo.fundingStatus).toLocaleString("en-IN")}</Text>
            }

            {userdata.user_id.role == "Investor" &&
              <Text style={styles1.goal}>Investment experience : {userdata.previousExperience} years</Text>
            }

            {userdata.user_id.role == "Investor" &&
              <Text style={styles1.fund}>Investment capacity : ₹ {userdata.investmentRange.toLocaleString("en-IN")}</Text>
            }


            {userdata.user_id.role == "CommunityMember" &&
              <Text style={styles1.goal}>Bio : {userdata.skills}</Text>
            }

            {userdata.user_id.role == "CommunityMember" &&
              <Text style={styles1.fund}>Skills : {userdata.tagline}</Text>
            }






            <View style={styles1.main}>
              {userdata.user_id.role != "Investor" && userdata.user_id.role != "CommunityMember" && <View style={styles1.connectionContainer}>


                {Array(3).fill(null).map((_, index) => (
                  <View style={styles1.circle}>
                    <Image
                      key={index}
                      style={styles1.profileImage1}
                      source={
                        investor[index]
                          ? { uri: investor[index].profilePhoto } // Profile photo if available
                          : require("../assets/images/p2.png")   // Dummy image if not
                      }
                    />
                  </View>
                ))}


                <Text style={styles1.t6}>{userdata.investorConnections} investor connections</Text>
              </View>}
              <View style={styles1.connectionContainer}>

                {Array(3).fill(null).map((_, index) => (
                  <View style={styles1.circle}>
                    <Image
                      key={index}
                      style={styles1.profileImage1}
                      source={
                        noninvestor[index]
                          ? { uri: noninvestor[index].profilePhoto } // Profile photo if available
                          : require("../assets/images/p2.png")   // Dummy image if not
                      }
                    />
                  </View>
                ))}

                <Text style={styles1.t6}>{userdata.chatUsers?.length} connections</Text>
              </View>
            </View>


            <View style={styles1.divider}></View>

          </View>
        </View>
      </>
    )
  }


  function upvotepost() {

  }

  function opencomment() {

  }
  const [viewableItems, setViewableItems] = useState([]);
  const [videoStates, setVideoStates] = useState({});
  const videoRefs = useRef({});
  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setViewableItems(viewableItems);

    // Update play state for videos based on visibility
    const updatedVideoStates = {};
    viewableItems.forEach(viewableItem => {
      if (viewableItem.isViewable) {
        updatedVideoStates[viewableItem.item._id] = true; // Video should play when in view
      } else {
        updatedVideoStates[viewableItem.item._id] = false; // Video should stop when out of view
      }
    });

    setVideoStates(updatedVideoStates);
    viewableItems.forEach(item => {
      if (!item.isViewable && videoRefs.current[item.item._id]) {
        videoRefs.current[item.item._id].pauseAsync(); // Pause the video
      }
    });
  }, []);



  const viewabilityConfig = {
    viewAreaCoveragePercentThreshold: 80, // Item is considered viewable if 50% is visible
  };

  return (


    <SafeAreaView style={{ flex: 1, backgroundColor: "#16181a" }}>
      {!userdata && <ActivityIndicator size="large" color="#fff" />}

      {userdata && <FlatList
        refreshControl={
          <RefreshControl progressViewOffset={0} refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              getdata()
              setTimeout(() => {
                setRefreshing(false); // Stop refreshing after fetching data
              }, 2000); // Adjust the delay as needed
            }} />}

        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        ListHeaderComponent={header}
        data={posts}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />}


    </SafeAreaView>
  )

}

export default Singleprofilepage

const styles1 = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    height: 55,
    backgroundColor: "#16181A",
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  username: {
    fontFamily: "myanmar",
    fontSize: 24,
    color: "#00DE62",
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 2
  },
  top: {
    width: "100%",
    height: 140,
    backgroundColor: "#7A7B7C",
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
  },
  img1: {
    // backgroundColor : "red",
    width: 50,
    height: 50,
    margin: "auto",
    marginTop: 45,
    paddingLeft: 10,
    alignSelf: "center",

  },
  bottom: {
    width: "100%",
    backgroundColor: "#16181a",
    padding: 10
  },
  upvote: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    width: 80,
    // backgroundColor: "red",
    height: "auto",
    marginVertical: 20,
    display: "flex",
    flexDirection: "row"
  },
  followers: {
    color: '#00de62',
    fontFamily: "Roboto",
    alignSelf: "flex-end",
    marginLeft: -10

  },
  u1: {
    fontFamily: "Alata",
    fontSize: 24,
    color: "#E9E9E9",
    paddingHorizontal: 5,
    width: "100%",
    marginVertical: 0
  },
  role: {
    fontFamily: "Roboto",
    fontSize: 14,
    color: "#00de62",
    marginLeft: 10,
    top: -2

  },

  f1: {
    width: 180,
    height: 34,
    backgroundColor: "#00de62",
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 0,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    marginTop: 10

  },
  ft: {
    fontFamily: "Alata",
    fontSize: 16,
    color: "#16181A",
    marginTop: 3

  },
  goal: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: "#D9D9D9",
    paddingHorizontal: 5,
    marginVertical: 12,
    marginBottom: 5

  },
  fund: {
    fontFamily: "Roboto",
    fontSize: 15,
    color: "#00DE62",
    paddingHorizontal: 5,
    marginVertical: 0

  },
  connectionContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 20
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    marginRight: -6,
    overflowY: "hidden",
  },

  profileImage1: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    marginBottom: 0,
  },
  t6: {
    fontFamily: "Alata",
    fontSize: 12,
    color: "#AEAFAF",
    marginLeft: 15,
    marginTop: -2
  },

  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"

  },
  divider: {
    width: "110%",
    marginLeft: -20,
    height: 3,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#24272A"
  },

  profilephoto: {
    width: 130,
    aspectRatio: 1 / 1,
    position: "absolute",
    left: 10,
    top: -55,
    // backgroundColor : "red",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 100


  },
  img2: {
    objectFit: "cover",
    width: "100%",
    height: "100%", borderRadius: 100
  },
  bimg: {
    width: "100%",
    height: "100%",


  }


})