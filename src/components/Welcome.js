import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Logo from "../../assets/img/logo.png"
import Loading from './Loading'
const Welcome = () => {
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.image} />
            <Loading/>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 20, // Daha fazla boşluk ekleyebiliriz
    },
    image: {
        width: '70%',
        resizeMode: 'contain',
        marginBottom: 20, // Görsel ile Loading bileşenini daha yakın yapmak için azaltıldı
    },
})