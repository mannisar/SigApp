import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';

import { auth } from '../config/index';

export default class Loading extends React.Component {
    componentDidMount() {
        this.checkAuth()
    }

    async checkAuth() {
        await auth.onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#f4f4f4"></StatusBar>
                <Text>Loading...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});