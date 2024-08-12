/*const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Login1 from "./screens/Login1";
import FlashScreen from "./screens/FlashScreen";

import FlashScreen1 from "./screens/FlashScreen1";
import FlashScreen2 from "./screens/FlashScreen2";

import Login from "./screens/Login";
import CreateAccount1 from "./screens/CreateAccount1";
import CreateAccount from "./screens/CreateAccount";
import CreateAccount2 from "./screens/CreateAccount2";
import CreateAccount3 from "./screens/CreateAccount3";
import About from "./screens/About";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import FlashScreen3 from "./screens/FlashScreen3";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);
  }, []);

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="Login1"
              component={Login1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FlashScreen"
              component={FlashScreen}
              options={{ headerShown: false }}
            />
           
            <Stack.Screen
              name="FlashScreen1"
              component={FlashScreen1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FlashScreen2"
              component={FlashScreen2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FlashScreen3"
              component={FlashScreen3}
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateAccount1"
              component={CreateAccount1}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateAccount2"
              component={CreateAccount2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateAccount3"
              component={CreateAccount3}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="About"
              component={About}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <FlashScreen2 />
        )}
      </NavigationContainer>
    </>
  );
};
export default App;*/
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login1 from "./screens/Login1";
import FlashScreen from "./screens/FlashScreen";
import FlashScreen1 from "./screens/FlashScreen1";
import FlashScreen2 from "./screens/FlashScreen2";
import FlashScreen3 from "./screens/FlashScreen3";
import Login from "./screens/Login";
import CreateAccount1 from "./screens/CreateAccount1";
import CreateAccount from "./screens/CreateAccount";
import CreateAccount2 from "./screens/CreateAccount2";
import CreateAccount3 from "./screens/CreateAccount3";
import CreateAccount4 from "./screens/CreateAccount4";
import CreateAccount5 from "./screens/CreateAccount5";
import About from "./screens/About";




const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      {hideSplashScreen ? (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login1" component={Login1} />
          <Stack.Screen name="FlashScreen" component={FlashScreen} />
          <Stack.Screen name="FlashScreen1" component={FlashScreen1} />
          <Stack.Screen name="FlashScreen2" component={FlashScreen2} />
          <Stack.Screen name="FlashScreen3" component={FlashScreen3} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="CreateAccount1" component={CreateAccount1} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="CreateAccount2" component={CreateAccount2} />
          <Stack.Screen name="CreateAccount3" component={CreateAccount3} />
          <Stack.Screen name="CreateAccount4"component={CreateAccount4}/>
          <Stack.Screen name="CreateAccount5"component={CreateAccount5}/>
          <Stack.Screen name="About" component={About} />
        </Stack.Navigator>
      ) : (
        <FlashScreen2 />
      )}
    </NavigationContainer>
  );
};

export default App;

