import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity,
    Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageWorkTrack from "../../assets/img/logo.png";

const Login = () => {
    const { navigate } = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                {/* Logo və Başlıq */}
                <Image source={ImageWorkTrack} style={styles.logo} />
                <Text style={styles.title}>İşçi İdarəetmə Sistemi</Text>

                {/* İstifadəçi adı daxil etmə sahəsi */}
                <TextInput
                    style={styles.input}
                    placeholder="İstifadəçi adı"
                    type="text"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                />

                {/* Şifrə daxil etmə sahəsi */}
                <TextInput
                    style={styles.input}
                    placeholder="Şifrə"
                    secureTextEntry
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                />

                {/* Giriş düyməsi */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Giriş</Text>
                </TouchableOpacity>

                {/* Yeni qeydiyyat linki */}
                <TouchableOpacity onPress={() => navigate('Register')}>
                    <Text style={styles.registerLink}>Yeni hesab yarat</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f7',  
        padding: 20,
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingLeft: 15,
        marginBottom: 15,
        fontSize: 16,
        borderColor: '#ddd',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 25,
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;
