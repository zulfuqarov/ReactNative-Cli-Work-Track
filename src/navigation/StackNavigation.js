import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';

const MyStack = createStackNavigator()


const StackNavigate = () => {

    return (
        <MyStack.Navigator
        >

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

            


        </MyStack.Navigator>
    )


}

export default StackNavigate

const styles = StyleSheet.create({})