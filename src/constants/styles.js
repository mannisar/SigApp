import React from 'react';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        height: 60,
    },
    btnText: {
        fontSize: 20,
        color: 'darkblue',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '80%',
        marginBottom: 10,
        borderRadius: 5,
    },
    inputMessage: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '85%',
        marginBottom: 10,
        borderRadius: 20,
    },
    sendButton: {
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10,
        height: 40,
        width: 40,
        paddingTop: 10,
        paddingLeft: 5,
        backgroundColor: '#2196F3',
        borderRadius: 20,
    },
});
export default styles;