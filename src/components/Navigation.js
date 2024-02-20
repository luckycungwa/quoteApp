import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Import createNativeStackNavigator
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { faHome, faSearch, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { auth } from "../services/AuthService";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import LikedScreen from "../screens/LikedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import AboutScreen from "../screens/AboutScreen";
import HelpSupportScreen from "../screens/HelpSupportScreen";
import LoginScreen from "../screens/LoginScreen"; // Import LoginScreen
import SignupScreen from "../screens/SignupScreen"; // Import SignupScreen

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Use createNativeStackNavigator for v6

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}  />
    {/* <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Liked" component={LikedScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    */}
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />

  </Stack.Navigator>
);

const Navigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const authSubscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return authSubscriber;
  }, []);

  if (initializing) return null;

  return (
    <>
      {user ? (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let icon;

              if (route.name === "Home") {
                icon = faHome;
              } else if (route.name === "Search") {
                icon = faSearch;
              } else if (route.name === "Saved") {
                icon = faHeart;
              } else if (route.name === "Profile") {
                icon = faUser;
              }

              return <FontAwesomeIcon icon={icon} color={color} size={size} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "#1500ff",
            inactiveTintColor: "gray",
          }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Saved" component={LikedScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </>
  );
};

export default Navigation;
