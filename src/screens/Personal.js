import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { WorkContext } from '../context/ContextWork'

const Personal = () => {
  const { navigate } = useNavigation()
  const { workers } = useContext(WorkContext)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>İşçilər ({workers.length})</Text>
      </View>

      <FlatList
        data={workers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigate("PersonalDetails", item)}>
            <View style={styles.workerCard}>
              <View style={styles.workerInfo}>
                <Text style={styles.workerName}>{item.firstName} {item.lastName}</Text>
                <Text style={styles.workerPosition}>{item.position}</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#FF8C00" />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default Personal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold'
  },
  workerCard: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workerInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  workerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  workerPosition: {
    fontSize: 14,
    color: '#777'
  }
})
