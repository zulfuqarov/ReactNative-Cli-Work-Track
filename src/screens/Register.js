import React, { useContext, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    ScrollView,
    Image
} from 'react-native';

import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import ImageWorkTrack from "../../assets/img/logo.png"
import { WorkContext } from '../context/ContextWork';
import Loading from '../components/Loading';

const Register = () => {
    const { navigate } = useNavigation();
    const { registerUser } = useContext(WorkContext)

    const [loadingRegister, setLoadingRegister] = useState(false)
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const handleRegister = async () => {
        if (!email || !password || !confirmPassword || !name || !department) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "Bütün sahələri doldurun, zəhmət olmasa.",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "Şifrələr eyni deyil.",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
            return;
        }
        else if (password.length < 6) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "Şifrə ən azı 6 simvol olmalıdır.",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
            return;
        }
        else {
            setLoadingRegister(true)
            try {
                await registerUser(
                    email,
                    password,
                    {
                        name: name,
                        department: department
                    }
                );
                navigate("Login")
                setTimeout(() => setLoadingRegister(false), 500)
            } catch (error) {
                console.log(error)
                setLoadingRegister(false)
            }
        }
    };

    return (

        loadingRegister ? <Loading /> :

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                        <Image source={ImageWorkTrack} style={styles.logo} />
                        <Text style={styles.title}>İşçi İdarəetmə Sistemi</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Adınızı daxil edin"
                            placeholderTextColor="#888"
                            autoCapitalize="words"
                            value={name}
                            onChangeText={setName}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Departament"
                            placeholderTextColor="#888"
                            autoCapitalize="words"
                            value={department}
                            onChangeText={setDepartment}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="E-poçt"
                            placeholderTextColor="#888"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Şifrə"
                            placeholderTextColor="#888"
                            secureTextEntry
                            autoCapitalize="none"
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Şifrəni təsdiqləyin"
                            placeholderTextColor="#888"
                            secureTextEntry
                            autoCapitalize="none"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity
                            onPress={handleRegister}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Qeydiyyatdan keç</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigate('Login')}>
                            <Text style={styles.loginLink}>Hesabınız var? Giriş edin</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
    );
};

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 20,
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
    loginLink: {
        marginTop: 20,
        color: '#007BFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
