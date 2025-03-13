import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useMemo } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { WorkContext } from '../context/ContextWork';

const WorkDealy = () => {

    const { workers } = useContext(WorkContext)

    const [filter, setFilter] = useState('all');

    const [currentDate, setCurrentDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const formattedDate = currentDate.toLocaleDateString('en-GB').replace(/\//g, '-');

    const filteredWorkers = useMemo(() => {
        let result = workers.filter(worker =>
            worker.workerDay.some(day => day.date === formattedDate)
        );

        if (filter === 'Gəlmədi') {
            result = workers.filter(worker =>
                worker.workerDay.some(day => day.date === formattedDate && day.status === "Gəlmədi")
            );
        }
        if (filter === 'Gəldi') {
            result = workers.filter(worker =>
                worker.workerDay.some(day => day.date === formattedDate && day.status === "Gəldi")
            );
        }

        return result;

    }, [workers, filter, formattedDate]);



    const renderItem = ({ item }) => {
        const work = item.workerDay.find(day => day.date === formattedDate);
        const earing = work.dailyEarnings + work.workHours * work.workHoursSalary
        return (
            <View style={styles.card}>
                <Text style={styles.workerName}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.workerPosition}>{item.position}</Text>
                <View style={styles.statusContainer}>
                    <Text style={[styles.statusText, work.status === "Gəldi" ? styles.geldiStatus : styles.gelmediStatus]}>
                        {work.status || "---"}
                    </Text>
                    <Text style={styles.timeText}>{work.date || "---"}</Text>
                </View>
                <Text style={[styles.remainingTimeText, work.workHours && styles.remainingTimeTextColor]}>
                    <Text style={{ color: "black" }}>Mesai: </Text> {work.workHours ? work.workHours : "0"} saat
                </Text>
                <Text style={styles.earnings}>Günlük qazanc:  <Text style={styles.earningsColor}>{earing} Azn</Text></Text>
            </View>
        )
    };

    const attendedCount = workers.filter(worker =>
        worker.workerDay.some(day => day.date === formattedDate && day.status === "Gəldi")
    ).length;

    const notAttendedCount = workers.filter(worker =>
        worker.workerDay.some(day => day.date === formattedDate && day.status === "Gəlmədi")
    ).length;

    const handleConfirmDate = (date) => {
        setCurrentDate(date);
        setDatePickerVisible(false);
        setFilter('all');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>Tarix: {formattedDate}</Text>
                    <View style={styles.dateView}>
                        <TouchableOpacity
                            style={styles.changeDateButton}
                            onPress={() => setDatePickerVisible(true)}>
                            <Text style={styles.changeDateButtonText}>Tarixi Dəyiş</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.changeDateButton}
                            onPress={() => setCurrentDate(new Date())}>
                            <Text style={styles.changeDateButtonText}>Tarixi Sıfırla</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.counts}>
                    <Text style={styles.countText}>Gələnlər: {attendedCount}</Text>
                    <Text style={styles.countText}>Gəlməyənlər: {notAttendedCount}</Text>
                </View>

            </View>

            <View style={styles.filterButtons}>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                    onPress={() => setFilter('all')}>
                    <Text style={styles.filterButtonText}>Hamısı</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'Gəldi' && styles.activeFilter]}
                    onPress={() => setFilter('Gəldi')}>
                    <Text style={styles.filterButtonText}>Gələnlər</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'Gəlmədi' && styles.activeFilter]}
                    onPress={() => setFilter('Gəlmədi')}>
                    <Text style={styles.filterButtonText}>Gəlməyənlər</Text>
                </TouchableOpacity>
            </View>

            {
                filteredWorkers.length > 0 ?
                    <FlatList
                        data={filteredWorkers}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.flatListContent}
                    /> :
                    <View style={styles.noWorkersContainer}>
                        <Text style={styles.noWorkersText}>Bu tarixdə işdə olan işçi yoxdur</Text>
                    </View>
            }

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                date={currentDate}
                onConfirm={handleConfirmDate}
                onCancel={() => setDatePickerVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({


    card: {
        backgroundColor: "#FFF",
        padding: 15,
        paddingVertical: 25,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        width: '100%',
    },
    workerName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    workerPosition: {
        fontSize: 16,
        color: "#666",
        marginBottom: 10,
    },
    statusContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    statusText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    geldiStatus: {
        color: "green",
    },
    gelmediStatus: {
        color: "red",
    },
    timeText: {
        fontSize: 14,
        color: "#555",
    },
    remainingTimeText: {
        fontSize: 16,
        fontWeight: "500",
    },
    remainingTimeTextColor: {
        color: "green",
    },
    earnings: {
        fontSize: 16,
        fontWeight: "500",
        paddingTop: 10,
        color: "#555"
    },
    earningsColor: {
        color: "green"
    },
    iconsContainer: {
        marginTop: 10,
        alignItems: "flex-end",
    },
    noWorkersContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        padding: 20,
    },
    noWorkersText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff6347',
        textAlign: 'center',
        marginTop: 10,
    },


    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-start',
    },
    header: {
        width: '100%',
        paddingBottom: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
    },
    counts: {
        flexDirection: 'row',
        marginTop: 10,
    },
    countText: {
        fontSize: 16,
        color: '#333',
        marginHorizontal: 10,
    },
    filterButtons: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'center',
    },
    filterButton: {
        padding: 10,
        borderRadius: 25,
        marginHorizontal: 5,
        backgroundColor: '#ddd',
    },
    activeFilter: {
        backgroundColor: '#FF8C00',
    },
    filterButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
    userCard: {
        borderRadius: 15,
        padding: 18,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#ddd',
        minWidth: 320,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    userName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
        textAlign: 'left',
        maxWidth: '70%',
    },
    dateContainer: {
        flexDirection: 'col',
        marginTop: 10,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 22,
        fontWeight: '500',
        paddingBottom: 15,
        color: '#333',
    },
    dateView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%',
    },
    changeDateButton: {
        marginLeft: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#FF8C00',
        borderRadius: 20,
    },
    changeDateButtonText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '500',
    },
    flatListContent: {
        paddingBottom: 20,
    }
});

export default WorkDealy;