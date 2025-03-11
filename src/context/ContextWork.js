import React, { createContext, useState, useEffect, cloneElement } from 'react';

// auth import firebase
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from 'firebase/auth';

// database import firebase
import { collection, doc, setDoc, getDoc, addDoc, getDocs, deleteDoc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";

import { MyDb, auth } from '../../connection/firebaseConnection'

import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';



export const WorkContext = createContext()

const ContextWork = ({ children }) => {

    const { navigate } = useNavigation()

    //register func
    const registerUser = async (email, password, data) => {
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

    //login func
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

    // logout func 
    const logoutUser = async () => {
        try {
            await signOut(auth);

            Toast.show({
                type: "success",
                text1: "Çıxış edildi!",
                text2: "Hesabdan uğurla çıxış etdiniz. 👋",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "Çıxış zamanı problem yarandı, yenidən yoxlayın!",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
        }
    }

    //get user data
    const [user, setUser] = useState(null);
    const getUserData = async (userId) => {
        const userDocRef = doc(collection(MyDb, "Owners"), userId);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
            return {
                ...userSnapshot.data(),
                id: userSnapshot.id
            };
        }
        return null;
    }

    // get user worker data
    const [workers, setWorkers] = useState([])
    const getWorkers = async (userId) => {
        try {
            const workRef = doc(MyDb, "Owners", userId)
            const workRefCollection = collection(workRef, "workers")
            const querySnapshot = await getDocs(workRefCollection);

            if (querySnapshot.empty) {
                return [];
            }
            return querySnapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data(),
                }
            })

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "Yüklenən məlumatların yenilənməsi səhv oldu!",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });
        }
    }

    // delete workers
    const deleteWorkerFunc = async (workerId) => {
        try {
            const ordersRef = doc(MyDb, "Owners", user.id, "workers", workerId);
            await deleteDoc(ordersRef);
            Toast.show({
                type: "success",
                text1: "Əməliyyat Uğurlu",
                text2: "İşçi uğurla sistemdən silindi.",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "İşçi silinən zamanı problem yarandı, yenidən yoxlayın!",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
        }
    }

    // update workers
    const updateWorkerFunc = async (workerId, updatedWorkerData) => {
        try {
            const ordersRef = doc(MyDb, "Owners", user.id, "workers", workerId);
            await updateDoc(ordersRef, updatedWorkerData);
            Toast.show({
                type: "success",
                text1: "əmliyyat Uğurlu",
                text2: "İşçi uğurla dəyişdirildi.",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Xəta!",
                text2: "İşçi dəyişdirilən zamanı problem yarandı, yenidən yoxlayın!",
                position: "top",
                visibilityTime: 4000,
                autoHide: true
            });
        }
    }

    // add workers
    const addWorkersFunc = async (ownerId, workerData) => {
        try {
            const ordersRef = collection(MyDb, "Owners", ownerId, "workers");

            await addDoc(ordersRef, {
                ...workerData,
                workerDay: []
            })

            Toast.show({
                type: "success",
                text1: "İşçi Əlavə Edildi!",
                text2: "Yeni işçi uğurla əlavə olundu.",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });

        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Əməliyyat Xətası",
                text2: "İşçi əlavə edilərkən bir xəta baş verdi.",
                position: "top",
                visibilityTime: 3000,
                autoHide: true
            });
        }
    }

    const [checkAuthLoading, setcheckAuthLoading] = useState(true)
    const [loadingLogin, setLoadingLogin] = useState(false)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            try {
                if (currentUser) {
                    if (currentUser.metadata.creationTime === currentUser.metadata.lastSignInTime) {
                        navigate("Login");
                        setUser(null);
                    } else {
                        const userData = await getUserData(currentUser.uid);
                        if (userData) {
                            setUser({
                                name: userData.name,
                                email: userData.email,
                                department: userData.department,
                                id: userData.id,
                            });
                            navigate("HomePage");
                            setTimeout(() => setLoadingLogin(false), 500);
                        }
                    }
                } else {
                    navigate("Login");
                    setUser(null);
                }
            } catch (error) {
                console.error("Auth error:", error);
                setUser(null);
            } finally {
                setTimeout(() => {
                    setcheckAuthLoading(false);
                }, 500)
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (user && user.id) {
            const userRef = doc(MyDb, "Owners", user.id);
            const workersCollection = collection(userRef, "workers");

            const unsubscribe = onSnapshot(workersCollection, (snapshot) => {
                const changeWorkers = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    }
                })
                setWorkers(changeWorkers);
            });

            return () => unsubscribe();
        }
    }, [user?.id])

    return (
        <WorkContext.Provider value={{
            user,
            workers,
            checkAuthLoading,
            loadingLogin,
            setLoadingLogin,
            loginUser,
            registerUser,
            logoutUser,
            // worker 
            deleteWorkerFunc,
            updateWorkerFunc,
            addWorkersFunc,
        }}>
            {
                children
            }
        </WorkContext.Provider>
    )
}

export default ContextWork

