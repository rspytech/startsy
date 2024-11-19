// App.tsx

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "../styles/l.js"
// import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, Pressable, TextInput, View, Image, StyleSheet, Dimensions, StatusBar, Animated, Easing, Platform, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ReadMore1 from "./trial-1.js";
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
// import readmorestyles from "../styles/readmorestyles.js";
const { height, width } = Dimensions.get('window');
import { useNavigation, useRoute } from '@react-navigation/native';


const Login1 = ({ navigation }) => {
  // const navigation = useNavigation();
  // console.log(navigation);


  const [isForm1Visible, setForm1Visible] = useState(true);
  const [attop, setattop] = useState(true);
  const [initial, setinitial] = useState(true)
  const animation2 = (first) => {
    console.log(first);


    setTimeout(() => {
      Animated.timing(heightAnim, {
        toValue: height * 0.32,
        duration: (first == undefined) ? 300 : 0,
        useNativeDriver: false,
      }).start();

      Animated.timing(bottomanim, {
        toValue: height * 0.68,
        duration: (first == undefined) ? 300 : 0,
        useNativeDriver: false,

      }).start();
    }, 0);
  }
  const route = useRoute()

  var first = (route.params) ? route.params.first : ""
  // var moverfirst = (route.params) ? route.params.moverfirst : ""
  const [moverfirst, setMoverfirst] = useState(route.params ? route.params.moverfirst : "");

  setTimeout(() => {
    setMoverfirst(undefined) 
  }, 2000);
  useEffect(() => {
    if (route.params && route.params.isForm1Visible !== undefined) {
      // setForm1Visible(route.params.isForm1Visible);

      console.log("will change to back");

      setinitial(false)
      setForm1Visible(false)
      animation2(first)
      console.log(moverfirst , "moverfirst ");
      

      // setattop(true)



    }
  }, [route.params]);

  const [fontsLoaded] = useFonts({
    Alata: require('../assets/fonts/Alata-Regular.ttf'),
  });


  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")


  const handlelogin = async (navigation) => {
    var canbesend = true

    // if (email == "") {
    //   canbesend = false

    // }
    // if (password == "") {
    //   canbesend = false
    // }

    console.log("login function called");

    if (canbesend) {

      try {
        const rec1 = await fetch("http://192.168.1.7:9000/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email, password })
        })

        console.log(rec1);


        const rec2 = await rec1.json()
        console.log(rec2, "came from backend");
        console.log(rec2.status, "came from backend");
        console.log(rec1.status, "came from backend");
        if (rec1.status === 200) {
          Alert.alert('Login Successful');
        }
        else {
          Alert.alert('Login failed',);
        }

      }
      catch (e) {
        console.log(e);

      }
    }

  }

  const heightAnim = useRef(new Animated.Value(height)).current;
  const bottomanim = useRef(new Animated.Value(0)).current;
  const flexanim = useRef(new Animated.Value(0.8)).current;

  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Start the animation
    console.log(moverfirst , "mf");

    Animated.timing(animatedValue, {
      toValue: attop ? height : -10, // Move to 100 if attop is true, else move to 0
      duration: (moverfirst==undefined) ? 300 : 0,
      useNativeDriver: false, // Use native driver for better performance
      easing: Easing.inOut(Easing.ease)
      //
    }).start();
  }, [attop]);

 

  const animatedtop = {
    top: animatedValue, // Bind animated value to top
  };

  const animatedValue1 = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Start the animation
    Animated.timing(animatedValue1, {
      toValue: attop ? -10 : -height, // Move to 100 if attop is true, else move to 0
      duration: (moverfirst==undefined) ? 300 :0 ,
      useNativeDriver: false, // Use native driver for better performance
      easing: Easing.inOut(Easing.ease)


    }).start();
  }, [attop]);

  const animatedtop1 = {
    top: animatedValue1, // Bind animated value to top
  };





  useEffect(() => {
    if (initial) {
      const timer1 = setTimeout(() => {
        Animated.timing(heightAnim, {
          toValue: height * 0.4,
          duration: 400,
          useNativeDriver: false,
          easing: Easing.elastic(0.5),
        }).start();
      }, 3000);

      setTimeout(() => {
        setinitial(false)
      }, 5000);
      return () => clearTimeout(timer1);
    }
  }, [initial]);



  useEffect(() => {
    if (initial) {
      const timer = setTimeout(() => {
        Animated.timing(bottomanim, {
          toValue: height * 0.6,
          duration: 400,
          useNativeDriver: false,
          easing: Easing.elastic(0.5)
        }).start();
      }, 3000);

      setTimeout(() => {
        setinitial(false)
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [initial]);

  useEffect(() => {
    if (initial == true && first == "") {
      const timer = setTimeout(() => {
        Animated.timing(flexanim, {
          toValue: 0.9,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.elastic(1)

        }).start();
      }, 3100);

      return () => clearTimeout(timer);
    }
  }, [initial]);




  const animation3 = () => {
    // setForm1Visible(true)
    setTimeout(() => {
      Animated.timing(heightAnim, {
        toValue: height * 0.4,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }).start();
      Animated.timing(bottomanim, {
        toValue: height * 0.6,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),

      }).start();
    }, 0);
  }



  const [parentWidth, setParentWidth] = useState(Dimensions.get('window').width);

  // Function to handle layout changes
  const handleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };




  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    // Define the single vertical bounce animation
    if (initial == true && first == "") {
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: -30,          // Move up by 10 units
            duration: 300,         // Duration of the up movement
            useNativeDriver: true,

          }),
          Animated.timing(bounceValue, {
            toValue: 0,           // Move down by 10 units
            duration: 300,         // Duration of the down movement
            useNativeDriver: true,


          }),

        ]).start();
      }, 2000)
      setTimeout(() => {
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: -10,          // Move up by 10 units
            duration: 300,         // Duration of the up movement
            useNativeDriver: true,

          }),
          Animated.timing(bounceValue, {
            toValue: 0,           // Move down by 10 units
            duration: 300,         // Duration of the down movement
            useNativeDriver: true,


          }),

        ]).start();
      }, 3100)
    }
  }, [initial]);

  function showsignuppage(type, navigation) {
    console.log(type);
    navigation.navigate("Signup1", { type: type });

  }

  return (


    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-150} style={[styles.container]}>
      {/* <StatusBar backgroundColor="#1E1E1E" barStyle={"light-content"} /> */}
      <Animated.View style={[{ backgroundColor: "#1E1E1E" }, animatedtop1]}>

        {!isForm1Visible && (
          <Pressable style={[styles.back, { zIndex: (attop) ? 1 : 0 }]} onPress={() => {
            setForm1Visible(true);
            animation3()
          }} >

            <Ionicons name="arrow-back-circle-outline" size={50} color="#00DE62" />

          </Pressable>
        )}



        {/* -------------------------------------- top part ---------------------------------------- */}

        <Animated.View onLayout={handleLayout} style={[styles.top, { height: heightAnim }]}>
          <Animated.View style={[
            { flex: 1 },
            { transform: [{ translateY: bounceValue }] },
          ]}>
            <Animated.Image style={[styles.logo, initial ? styles.initial : styles.updated, { flex: flexanim }]}
              source={require("../assets/images/logo.png")} />
          </Animated.View>
        </Animated.View>
        {/* -------------------------------------- top part ------------------------------------------ */}


        {/* -------------------------------- bottom part ------------------------------------------------- */}
        <Animated.View style={[styles.bottom, { height: bottomanim }]}>

          {isForm1Visible && (<View><Text allowFontScaling={false} style={styles.label}>Email</Text>
            <TextInput allowFontScaling={false}
              placeholderTextColor="#828282"
              style={styles.input}
              placeholder="rajaschaudhari9@gmail.com"
              value={email}
              onChangeText={(text) => { setemail(text) }}

            />
            <View style={styles.passwordcontainer}>
              <TextInput allowFontScaling={false}
                placeholderTextColor="#828282"
                style={styles.input2}
                placeholder="Password"
                value={password}
                onChangeText={(text) => { setpassword(text) }}
                secureTextEntry={true}
                maxLength={10}
              />
              <Pressable style={styles.forgot}>
                <Text allowFontScaling={false} style={[styles.white, styles.forgottext]}>Forgot ?</Text>
              </Pressable>
            </View>
            <Pressable style={styles.loginbutton} onPress={() => {
              handlelogin(navigation)
            }}>
              <Text allowFontScaling={false} style={[styles.login]}>Login</Text>
            </Pressable>
            <Text allowFontScaling={false} style={[styles.white, styles.p]}>Or continue with</Text>
            <Pressable style={styles.googlebutton}>
              <Image
                source={require("../assets/images/google.png")}
                style={styles.googleIcon}
              />
              <Text allowFontScaling={false} style={[styles.gray, styles.google]}>Google</Text>
            </Pressable>

            <Text allowFontScaling={false} style={[styles.gray, styles.p]}>
              Don't have account? <Text style={styles.green} onPress={() => {
                setForm1Visible(false)
                animation2()
              }}>Create now</Text>
            </Text>
          </View>)}

          {!isForm1Visible && (

            <View>

              <Text allowFontScaling={false} style={[styles.newaccount]}>Create a new account as ?</Text>
              <Pressable onPress={() => {
                showsignuppage("Investor", navigation)
              }} style={styles.btn4}><Text allowFontScaling={false} style={[styles.btn4text, { fontFamily: "Alata" }]}>Investor</Text></Pressable>
              <Pressable onPress={() => {
                showsignuppage("Founder", navigation)
              }} style={styles.btn4}><Text allowFontScaling={false} style={styles.btn4text}>Founder</Text></Pressable>
              <Pressable onPress={() => { showsignuppage("Freelancer", navigation) }} style={styles.btn4}><Text allowFontScaling={false} style={styles.btn4text}>Freelancer</Text></Pressable>
              <Pressable onPress={() => { showsignuppage("Community member", navigation) }} style={styles.btn4}><Text allowFontScaling={false} style={styles.btn4text}>Community member</Text></Pressable>
              <Text allowFontScaling={false} style={[styles.gray, styles.p]}>
                Don't know what to choose? <Text onPress={() => setattop(false)} style={styles.green}>Read more</Text>
              </Text>
            </View>


          )}

        </Animated.View>

      </Animated.View>
      {/* -------------------------------- bottom part ------------------------------------------------- */}



      {/* -------------------------------- Read more ------------------------------------------------- */}
      <ReadMore1 attop={attop} setattop={setattop} animatedtop={animatedtop} />
      {/* -------------------------------- Read more ------------------------------------------------- */}

    </KeyboardAvoidingView>

  );
};


export default Login1;
