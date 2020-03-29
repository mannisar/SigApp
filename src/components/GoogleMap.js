import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import MapView from 'react-native-maps';
import { db } from '../config/index'

export default class GoogleMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: []
        }
    }

    componentDidMount() {
        this.getLocation()
    }

    getLocation() {
        db.ref('/user').on('value', (snapshot) => {
            const data = snapshot.val()
            const user = Object.values(data)
            this.setState({
                user: user
            })
        })
    }

    render() {
        console.disableYellowBox = true
        const marker = this.state.user.map((item) =>
            <MapView.Marker
                key={item.id}
                coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                }}
                title={item.name} />
        )
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <Text style={styles.textHeader}>GOOGLE MAP</Text>
                </LinearGradient>
                <MapView
                    style={{ flex: 1, width: window.width }}
                    region={{
                        latitude: -6.6210828,
                        longitude: 106.8185388,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }} >
                    {marker}
                </MapView>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: 70,
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    },
    item_container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    flatList: {
        flex: 1
    },
    user: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    textName: {
        color: 'black',
        fontWeight: 'bold'
    },
    textNumber: {
        color: 'gray'
    },
    user_name: {
        flexDirection: 'row'
    },
    time: {
        marginTop: 10
    }
});