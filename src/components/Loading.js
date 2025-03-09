import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Text } from 'react-native';

const Loading = () => {
    const dot1 = useRef(new Animated.Value(0)).current;
    const dot2 = useRef(new Animated.Value(0)).current;
    const dot3 = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current; // Opaklık efekti için

    const startAnimation = () => {
        Animated.loop(
            Animated.stagger(200, [
                createWave(dot1),
                createWave(dot2),
                createWave(dot3),
            ])
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0.5,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const createWave = (value) => {
        return Animated.sequence([
            Animated.timing(value, {
                toValue: -10,
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(value, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }),
        ]);
    };

    useEffect(() => {
        startAnimation();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.loadingContainer}>
                <Animated.View style={[styles.dot, { transform: [{ translateY: dot1 }] }]} />
                <Animated.View style={[styles.dot, { transform: [{ translateY: dot2 }] }]} />
                <Animated.View style={[styles.dot, { transform: [{ translateY: dot3 }] }]} />
            </View>
            <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
                Loading...
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#282C34',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dot: {
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: '#FFA500',
        marginHorizontal: 5,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFA500',
        letterSpacing: 2, // Harfler arasında boşluk
    },
});

export default Loading;
