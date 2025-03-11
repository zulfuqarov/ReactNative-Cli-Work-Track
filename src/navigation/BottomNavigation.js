import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Personal from '../screens/Personal';
import Profile from '../screens/Profile';
import AddPersonal from "../screens/AddPersonal";
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const MyTabs = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <MyTabs.Navigator
            initialRouteName="Profile"
            screenOptions={{
                tabBarActiveTintColor: '#FFA500',
                tabBarInactiveTintColor: 'gray',
            }}
        >
            <MyTabs.Screen
                name="Personal"
                component={Personal}
                options={{
                    tabBarLabel: 'işçilər',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} /> 
                    ),
                }}
            />

            <MyTabs.Screen
                name="AddPersonal"
                component={AddPersonal}
                options={{
                    tabBarLabel: 'işçilər',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-add" size={size} color={color} /> 
                    ),
                }}
            />

            <MyTabs.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: 'işçilər',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} /> 
                    ),
                }}
            />
        </MyTabs.Navigator>
    )
}

export default BottomNavigation;
