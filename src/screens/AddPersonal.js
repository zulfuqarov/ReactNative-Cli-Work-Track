import React, { useContext, useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WorkContext } from "../context/ContextWork";
import Loading from "../components/Loading";
import Toast from 'react-native-toast-message';

const AddPersonal = () => {

  const { addWorkersFunc, user } = useContext(WorkContext)

  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [dailySalary, setDailySalary] = useState("");
  const [workHoursSalary, setWorkHoursSalary] = useState("");

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    position: false,
    dailySalary: false,
    workHoursSalary: false,
  });

  const handleAddUser = async () => {
    let formValid = true;
    let newErrors = { ...errors };

    if (!firstName) {
      formValid = false;
      newErrors.firstName = true;
    } else {
      newErrors.firstName = false;
    }

    if (!lastName) {
      formValid = false;
      newErrors.lastName = true;
    } else {
      newErrors.lastName = false;
    }

    if (!position) {
      formValid = false;
      newErrors.position = true;
    } else {
      newErrors.position = false;
    }

    if (!dailySalary) {
      formValid = false;
      newErrors.dailySalary = true;
    } else {
      newErrors.dailySalary = false;
    }

    if (!workHoursSalary) {
      formValid = false;
      newErrors.workHoursSalary = true;
    } else {
      newErrors.workHoursSalary = false;
    }


    setErrors(newErrors);

    if (!formValid) {
      Toast.show({
        text1: "Xahiş edirik, bütün xanaları doldurun!",
        type: "error",
      });
      return;
    }


    setLoading(true)
    await addWorkersFunc(user.id, {
      firstName,
      lastName,
      position,
      dailySalary,
      workHoursSalary
    })

    setFirstName("")
    setLastName("")
    setPosition("")
    setDailySalary("")
    setWorkHoursSalary("")

    setLoading(false)

  };

  if (loading) {
    return <Loading />
  }

  return (
    <KeyboardAvoidingView
      style={styles.containerKeyboard}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Ionicons name="person-add" size={80} color="#FFA500" style={styles.profileIcon} />
          <Text style={styles.header}>İşçi Əlavə et</Text>

          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            placeholder="Ad"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            placeholder="Soyad"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={[styles.input, errors.position && styles.inputError]}
            placeholder="Vəzifə"
            value={position}
            onChangeText={setPosition}
          />
          <TextInput
            style={[styles.input, errors.dailySalary && styles.inputError]}
            placeholder="Gündəlik maaş (AZN)"
            value={dailySalary}
            onChangeText={setDailySalary}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, errors.workHoursSalary && styles.inputError]}
            placeholder="Mesai haqqı (AZN)"
            value={workHoursSalary}
            onChangeText={setWorkHoursSalary}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
            <Text style={styles.addButtonText}>Əlavə et</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    minHeight: "100%",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileIcon: {
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputError: {
    borderColor: "red",
  },
});

export default AddPersonal;
