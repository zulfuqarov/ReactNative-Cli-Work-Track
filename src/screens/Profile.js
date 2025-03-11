import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WorkContext } from "../context/ContextWork";

const Profile = () => {

  const { logoutUser,user } = useContext(WorkContext)

  return (
    <View style={styles.container}>
      {/* Profil ikonu */}
      <Ionicons name="person-circle" size={120} color="#FFA500" style={styles.profileIcon} />

      {/* Kullanıcı adı */}
      <Text style={styles.username}>{user?.name || "User Name"}</Text>

      {/* Kullanıcı email */}
      <Text style={styles.email}>{user?.email || "user@example.com"}</Text>

      {/* Department */}
      <View style={styles.departmentContainer}>
        <Text style={styles.departmentLabel}>Department</Text>
        <Text style={styles.departmentValue}>{user?.department || "N/A"}</Text>
      </View>

      {/* Çıkış butonu */}
      <TouchableOpacity style={styles.logoutButton} onPress={logoutUser}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f7",
    padding: 30,
  },
  profileIcon: {
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#FFA500",
    borderRadius: 60,  // Yuvarlak profil ikonu kenarları
    padding: 5,
  },
  username: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: "#555",
    marginBottom: 15,
  },
  departmentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  departmentLabel: {
    fontSize: 16,
    color: "#777",
    fontWeight: "600",
    marginRight: 8,
  },
  departmentValue: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
