import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { WorkContext } from '../context/ContextWork';

const WorkHours = () => {
    const { workers, date, updateWorkerHours } = useContext(WorkContext)
    const [loading, setLoading] = useState(false);
    const [editHours, setEditHours] = useState(null);
    const [selectedWorkerId, setSelectedWorkerId] = useState(null);

    const filteredData = useMemo(() => {
        return workers.map(worker => {
            const filteredWorkerDays = worker.workerDay.filter(day => day.date === date && day.status === 'Gəldi');

            if (filteredWorkerDays.length > 0) {
                return {
                    ...worker,
                    workerDay: filteredWorkerDays
                };
            }

            return null;
        }).filter(worker => worker !== null);
    }, [workers, date]);



    const handleEditHours = (workerId) => {
        if (selectedWorkerId !== workerId) {
            setSelectedWorkerId(workerId);
        } else {
            setEditHours(null);
            setSelectedWorkerId(null);
        }
    };

    const handleSaveHours = async () => {
        if (editHours) {
            setLoading(true);
            await updateWorkerHours(
                selectedWorkerId,
                {
                    date: date,
                    workHours: parseFloat(editHours)
                }
            )
            setLoading(false)
            setSelectedWorkerId(null);
            setEditHours(null);
        } else {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Mesai saatini daxil edin!',
                visibilityTime: 3000,
                autoHide: true,
            });
        }
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#FF8C00" style={styles.loader} />}
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Tarix: {date}</Text>
            </View>

            {/* Liste */}
            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.workerName}>{item.firstName} {item.lastName}</Text>
                        <Text style={styles.workerPosition}>{item.position}</Text>
                        <View style={styles.statusContainer}>
                            <Text style={[styles.statusText, styles.geldiStatus]}>
                                {item.workerDay[0].status || "---"}
                            </Text>
                            <Text style={styles.timeText}>{item.workerDay[0].date || "---"}</Text>
                        </View>
                        <Text style={[styles.remainingTimeText, item.workerDay[0].workHours && styles.remainingTimeTextColor]}>
                            <Text style={{ color: "black" }}>Mesai: </Text> {item.workerDay[0].workHours ? item.workerDay[0].workHours : "0"} saat
                        </Text>

                        <View style={styles.iconsContainer}>
                            <TouchableOpacity
                                onPress={() => handleEditHours(item.id)}
                                style={styles.iconButton}>
                                <Ionicons name="time" size={40} color="#FF8C00" />
                            </TouchableOpacity>
                        </View>

                        {/* Mesai Saati Inputu */}
                        {selectedWorkerId === item.id && (
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    placeholder="Mesai Saati"
                                    value={editHours}
                                    onChangeText={setEditHours}
                                />
                                <TouchableOpacity onPress={handleSaveHours} style={styles.saveButton}>
                                    <Text style={styles.saveButtonText}>Yadda Saxla</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    workerName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    workerPosition: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 5,
        color: '#999',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    statusText: {
        fontSize: 16,
        fontWeight: '500',
    },
    timeText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FF5722',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    iconButton: {
        width: 50,
        height: 50,
        backgroundColor: '#f4f4f4',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        marginHorizontal: 10,
    },
    geldiStatus: {
        color: '#4CAF50',
    },
    defaultStatus: {
        color: '#333',
    },
    remainingTimeText: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 10,
    },
    remainingTimeTextColor: {
        color: '#4CAF50',
    },
    inputContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: '#FF8C00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '500',
    },
});

export default WorkHours;
