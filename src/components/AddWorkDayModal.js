import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';

import { WorkContext } from '../context/ContextWork';

const workDayStatuses = [
    { label: "Gəldi", value: "Gəldi" },
    { label: "Gəlmədi", value: "Gəlmədi" },
];

const AddWorkDayModal = ({ isVisible, onClose, data }) => {
    const { updateWorkerDay } = useContext(WorkContext)
    const [newWorkDayDate, setNewWorkDayDate] = useState(null);
    const [newWorkDayStatus, setNewWorkDayStatus] = useState("Gəldi");
    const [newWorkDayHours, setNewWorkDayHours] = useState("");
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const handleConfirmNewWorkDayDate = (date) => {
        setNewWorkDayDate(date);
        setDatePickerVisible(false);
    };

    const addNewWorkDay = () => {
        if (!newWorkDayDate) {
            alert('Tarixi  daxil edin');
            return;
        }

        updateWorkerDay(data.id,
            {
                date: newWorkDayDate.toLocaleDateString('en-GB').replace(/\//g, '-'),
                status: newWorkDayStatus,
                dailyEarnings: data.dailySalary,
                workHoursSalary: data.workHoursSalary,
                workHours: parseFloat(newWorkDayHours)
            }
        );
        onClose();
        setNewWorkDayDate(null);
        setNewWorkDayStatus("Gəldi");
        setNewWorkDayHours("");
    };

    
    return (
        <Modal visible={isVisible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Yeni İş Günü Əlavə Et</Text>
                    <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.datePickerButton}>
                        <Text>Tarixi Seç: {newWorkDayDate ? newWorkDayDate.toLocaleDateString('en-GB').replace(/\//g, '-') : ''}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        date={newWorkDayDate || new Date()}
                        onConfirm={handleConfirmNewWorkDayDate}
                        onCancel={() => setDatePickerVisible(false)}
                    />
                    <Picker
                        onValueChange={(value) => setNewWorkDayStatus(value)}
                        selectedValue={newWorkDayStatus}
                    >
                        {workDayStatuses.map((status, index) => (
                            <Picker.Item key={index} label={status.label} value={status.value} />
                        ))}
                    </Picker>
                    <TextInput
                        value={newWorkDayHours}
                        onChangeText={(text) => setNewWorkDayHours(text)}
                        style={styles.input}
                        placeholder="Mesai saatı"
                        keyboardType="number-pad"
                    />
                    <TouchableOpacity
                        onPress={addNewWorkDay}
                        style={styles.confirmButton}>
                        <Text style={styles.confirmButtonText}>Əlavə Et</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            onClose();
                            setNewWorkDayDate(null);
                            setNewWorkDayStatus("Gəldi");
                            setNewWorkDayHours("");
                        }}
                        style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Bağla</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
    modalContent: { backgroundColor: "white", padding: 20, borderRadius: 10, width: 300 },
    modalText: { fontSize: 18, marginBottom: 10, color: '#333' },
    datePickerButton: { padding: 12, backgroundColor: '#e1e1e1', marginBottom: 12, borderRadius: 8, alignItems: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 8, borderRadius: 8 },
    confirmButton: { marginTop: 10, backgroundColor: "#4CAF50", padding: 12, borderRadius: 8 },
    confirmButtonText: { color: "white", textAlign: "center", fontWeight: 'bold' },
    closeButton: { padding: 12, backgroundColor: '#FF8C00', marginTop: 12, borderRadius: 8, alignItems: 'center' },
    closeButtonText: { color: 'white', fontWeight: 'bold' },
});

export default AddWorkDayModal;