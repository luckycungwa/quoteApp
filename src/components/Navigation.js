import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { faHome, faSearch, faHeart, faImages } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LikedScreen from '../screens/LikedScreen';
import GalleryScreen from '../screens/GalleryScreen';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let icon;

            if (route.name === 'Home') {
              icon = faHome;
            } else if (route.name === 'Search') {
              icon = faSearch;
            } else if (route.name === 'Saved') {  // Changed 'Liked' to 'Saved'
              icon = faHeart;
            } else if (route.name === 'Gallery') {
              icon = faImages;
            }

            return <FontAwesomeIcon icon={icon} color={color} size={size} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#1500ff',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Saved" component={LikedScreen} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;


