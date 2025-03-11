import { StyleSheet } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import WorkTrack from '../screens/WorkTrack';
import BottomNavigation from './BottomNavigation';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {


    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Home"
                component={BottomNavigation}
                options={{
                    title: "Profile",
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />

            <Drawer.Screen
                options={{
                    title: 'İşçi Gəlişinin Qeydiyyatı',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
                name="WorkTracking"
                component={WorkTrack} />
        </Drawer.Navigator  >
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({})