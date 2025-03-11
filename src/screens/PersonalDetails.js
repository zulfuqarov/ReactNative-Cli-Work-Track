import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { WorkContext } from '../context/ContextWork';
import Loading from '../components/Loading';
import Toast from 'react-native-toast-message';
const PersonalDetails = ({ route, navigation }) => {
    const { deleteWorkerFunc, updateWorkerFunc } = useContext(WorkContext)

    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false);

    const [worker, setWorker] = useState(route.params);

    const handleEdit = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            if (worker.firstName && worker.lastName && worker.position && worker.dailySalary && worker.workHoursSalary) {
                Alert.alert(
                    "Yeniləməyi təsdiqlə",
                    "Bu işçinin məlumatlarını yeniləmək istədiyinizə əminsiniz?",
                    [
                        { text: "İmtina et" },
                        {
                            text: "Yenilə", onPress: async () => {
                                setLoading(true);
                                try {
                                    await updateWorkerFunc(worker.id, worker);
                                    setLoading(false)
                                } catch (error) {
                                    console.log(error);
                                    setLoading(false)
                                }
                            }
                        },
                    ]
                );
            } else {
                Toast.show({
                    type: "error",
                    text1: "Xəta!",
                    text2: "Boş buraxılan sahələr var. Zəhmət olmasa, bütün məlumatları doldurun!",
                    position: "top",
                    visibilityTime: 4000,
                    autoHide: true
                });
            }

        }
    };

    const handleDelete = () => {
        Alert.alert(
            'Silməyi təsdiq et',
            'Bu işçini silmək istədiyinizə əminsiniz?',
            [
                { text: 'İmtina et' },
                {
                    text: 'Sil', onPress: async () => {
                        setLoading(true)
                        try {
                            await deleteWorkerFunc(worker.id)
                            navigation.goBack()
                        } catch (error) {
                            console.log(error)
                        }

                    }
                },
            ]
        );
    };

    if (loading) {
        return <Loading />
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.card}>
                    {['firstName', 'lastName', 'position', 'dailySalary', 'workHoursSalary'].map((key, index) => {
                        if (!(key in worker)) return null;

                        return (
                            <View style={styles.cardHeader} key={index}>
                                <Text style={styles.label}>
                                    {key === 'firstName' ? 'Ad' :
                                        key === 'lastName' ? 'Soyad' :
                                            key === 'position' ? 'Vəzifə' :
                                                key === 'dailySalary' ? 'Gündəlik Maaş' :
                                                    key === 'workHoursSalary' ? 'Mesai haqqı' :
                                                        'Bilinməyən'}
                                </Text>

                                {isEditing ? (
                                    <TextInput
                                        style={styles.input}
                                        value={worker[key] ? worker[key].toString() : ''}
                                        onChangeText={(text) => setWorker({ ...worker, [key]: text })}
                                        editable={isEditing}
                                        keyboardType={key.includes('Salary') ? 'numeric' : 'default'}
                                    />
                                ) : (
                                    <Text style={styles.text}>{worker[key]}</Text>
                                )}
                            </View>
                        );
                    })}


                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleEdit}>
                        <Text style={styles.buttonText}>{isEditing ? 'Saxla' : 'Düzəliş'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Sil</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};


export default PersonalDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 20,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardHeader: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginBottom: 5,
    },
    input: {
        height: 45,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        backgroundColor: '#f1f1f1',
        fontSize: 16,
    },
    text: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#FF8C00',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    buttonDelete: {
        backgroundColor: 'red',
        paddingVertical: 12,
        marginHorizontal: 20,
        paddingHorizontal: 30,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
