import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import DrawerNavigation from './DrawerNavigation';
import { WorkContext } from '../context/ContextWork';
import Welcome from '../components/Welcome';
import PersonalDetails from '../screens/PersonalDetails';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const MyStack = createStackNavigator()


const StackNavigate = () => {

    const { checkAuthLoading } = useContext(WorkContext)

    return (
        <MyStack.Navigator
        >

            {checkAuthLoading &&
                <MyStack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{
                        title: "Giriş",
                        headerTitleAlign: "center",
                        headerLeft: () => null,
                        gestureEnabled: false,
                        headerShown: false
                    }}
                />
            }

            <MyStack.Screen
                name="Login"
                component={Login}
                options={{
                    title: "Giriş",
                    headerTitleAlign: "center",
                    headerLeft: () => null,
                    gestureEnabled: false,
                    headerBackTitleStyle: {
                        color: "#FFA500",
                        marginLeft: 2,
                        display: "none"
                    },
                }}
            />

            <MyStack.Screen
                name="Register"
                component={Register}
                options={{
                    title: "Qeydiyyat",
                    headerTitleAlign: "center", // Başlığı ortalamaq üçün
                    headerBackTitleStyle: {
                        color: "#FFA500",
                        marginLeft: 2,
                        display: "none"
                    },
                }}
            />

            <MyStack.Screen
                name="HomePage"
                component={DrawerNavigation}
                options={{
                    gestureEnabled: false,
                    headerShown: false,
                }}
            />

            <MyStack.Screen
                name="PersonalDetails"
                component={PersonalDetails}
                options={{
                    title: "Işçi Haqqında",
                    headerBackTitleStyle: {
                        color: "#FFA500",
                        marginLeft: 2,
                        display: "none"
                    },
                    headerBackImage: () => (
                        <Ionicons style={{ marginLeft: 10 }} name="arrow-back" size={24} color="#FFA500" />
                    ),

                }}
            />

        </MyStack.Navigator>
    )


}

export default StackNavigate

const styles = StyleSheet.create({})