import { StyleSheet } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import WorkTrack from '../screens/WorkTrack';
import BottomNavigation from './BottomNavigation';
import WorkHours from '../screens/WorkHours';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {


    return (
        <Drawer.Navigator
            screenOptions={() => ({
                headerStyle: {
                    height: 100,
                },
                drawerActiveTintColor: '#FF8C00',
                drawerInactiveTintColor: '#8E8E8E',
            })}
        >
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

            <Drawer.Screen
                options={{
                    title: 'Mesai saatların əlavəsi',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
                name="WorkHours"
                component={WorkHours} />

        </Drawer.Navigator  >
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({})