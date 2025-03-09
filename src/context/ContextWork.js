import React, { createContext, useState, useEffect, cloneElement } from 'react';

// auth import firebase
import { signInWithEmailAndPassword,createUserWithEmailAndPassword, updateProfile,onAuthStateChanged } from 'firebase/auth';

// database import firebase
import { collection, doc, setDoc, getDoc, addDoc, getDocs, deleteDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";

import { MyDb, auth } from '../../connection/firebaseConnection'

import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';



export const WorkContext = createContext()

const ContextWork = ({ children }) => {

    const { navigate } = useNavigation()

    const registerUser = async (email,password,data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential

            await updateProfile(user, {
                displayName: data.name,
            });

            Toast.show({
                type: "success",
                text1: "Qeydiyyat uğurlu!",
                text2: "Qeydiyyat uğurlu tamamlandı ��",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });


            const newOwner = doc(collection(MyDb, "Owners"), user.uid)

            await setDoc(newOwner, {
                name: data.name,
                email: email,
                department: data.department
            });
        } catch (error) {
            let errorMessage = "Qeydiyyat uğursuz oldu, yenidən yoxlayın!";
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: errorMessage,
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            })
            throw error
        }
    }

    const loginUser = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            Toast.show({
                type: "success",
                text1: "Xoş gəldiniz!",
                text2: "Giriş uğurla tamamlandı 🎉",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });
        } catch (error) {
            let errorMessage = "Giriş uğursuz oldu, yenidən yoxlayın!";
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: errorMessage,
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
            throw error;
        }
    };


    const [user, setUser] = useState(null);
    const [checkAuthLoading, setcheckAuthLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser) {
                    if (currentUser.metadata.creationTime === currentUser.metadata.lastSignInTime) {
                        navigate("Login");
                    } else {
                        navigate("HomePage");
                    }
                } else {
                    navigate("Login");
                }
            } catch (error) {
                console.error("Auth error:", error);
            } finally {
                setTimeout(() => {
                    setcheckAuthLoading(false);
                }, 500)
            }
        });

        return () => unsubscribe();
    }, []);


    return (
        <WorkContext.Provider value={{
            checkAuthLoading,
            loginUser,
            registerUser,
        }}>
            {
                children
            }
        </WorkContext.Provider>
    )
}

export default ContextWork

