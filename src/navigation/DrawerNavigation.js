import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../screens/Profile';
import WorkTrack from '../screens/WorkTrack';
import BottomNavigation from './BottomNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Profile"
                component={BottomNavigation}
                options={{
                    title: "Profile",
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />

            <Drawer.Screen
                name="WorkTrack"
                component={WorkTrack}
            />
        </Drawer.Navigator  >
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({})