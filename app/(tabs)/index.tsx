import * as React from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Green from "../../SCREENS/greenscreen.js"; //page 1
import Login1 from "../../SCREENS/logintrial.js"; // login page
import ReadMore1 from "../../SCREENS/trial-1.js"; // read more page
import { SafeAreaView } from "react-native";
import Signup1 from "../../SCREENS/signup-1.js";
import Signup2 from "../../SCREENS/signup2.js";
import Signup3 from "../../SCREENS/signup3.js";
import Signup4 from "../../SCREENS/signup4.js";
import Signup5 from "../../SCREENS/signup5.js";
import Line from "../../SCREENS/line.js";
import Line2 from "../../SCREENS/line2.js";
import Line3 from "../../SCREENS/line3.js";
import Signup6 from "../../SCREENS/signup6.js";
import Signup7 from "../../SCREENS/signup7.js";
import Signup8 from "../../SCREENS/signup8.js";
import Signup9 from "../../SCREENS/Signup9.js";
import Signup10 from "../../SCREENS/Signup10.js";
import Signup11 from "../../SCREENS/Signup11.js";

import Login2 from "../../SCREENS/login2.js";
// import drop from "../../SCREENS/dropdown.js"
// import Login1 from "../../SCREENS/logintrial.js";
import F1 from "../../SCREENS/test.js";
import F2 from "../../SCREENS/F2.js";
import Blur from "../../SCREENS/blur.js"; // trial blur page
import { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
// import { setNavigationBarColorAsync } from 'expo-navigation-bar';
import useLoadFonts from "../../hooks/useLoadFonts.js";
import {setBackgroundColorAsync} from  "expo-system-ui"

import { StatusBar, Platform } from "react-native";
// import ReadMore1 from "../../SCREENS/trial-1.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const fontsLoaded = useLoadFonts();
  // setBackgroundColorAsync("red")

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  // console.log(fontsLoaded, "fontd status");

  return (
    <View style={styles.container}>
      <NavigationContainer theme={DarkTheme}  independent={true}>
        <StatusBar backgroundColor="#1E1E1E" barStyle={"light-content"} />
        <Stack.Navigator
          initialRouteName="Green"
          screenOptions={{
            // headerStyle: {
            //   backgroundColor: "#000000", // Set the background color of the header to black
            // },
            // cardStyle: {backgroundColor: "red"},
            keyboardHandlingEnabled : true,
            headerShown: false, // Hide the header
            animation: "slide_from_right", // Set the default animation to slide from the right
          }}
        >
          <Stack.Screen name="Green" component={Green} />
          <Stack.Screen name="LoginTrial" component={Login1} />
          <Stack.Screen name="ReadMore1" component={ReadMore1} />

          <Stack.Screen name="Signup1" component={Signup1} />
          <Stack.Screen name="Signup2" component={Signup2} />
          <Stack.Screen name="Signup3" component={Signup3} />
          <Stack.Screen name="Signup4" component={Signup4} />
          <Stack.Screen name="Signup5" component={Signup5} />
          <Stack.Screen name="Signup6" component={Signup6} />
          <Stack.Screen name="Signup7" component={Signup7} />
          <Stack.Screen name="Signup8" component={Signup8} />
          <Stack.Screen name="Signup9" component={Signup9} />
          <Stack.Screen name="Signup10" component={Signup10} />
          <Stack.Screen name="Signup11" component={Signup11} />
          <Stack.Screen name="Login2" component={Login2} />

          <Stack.Screen name="F1" component={F1} />
          {/* <Stack.Screen name="F2" component={F2} /> */}

          {/* <Stack.Screen name="Line" component={Line} /> */}
          {/* <Stack.Screen name="Line2" component={Line2} /> */}
          {/* <Stack.Screen name="Line3" component={Line3} /> */}
          {/* <Stack.Screen name="drop" component={drop} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // zIndex : 1000000,
    backgroundColor: "#1E1E1E", // Set your desired background color here
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : "#1E1E1E", // Set your desired background color here
  },
});
