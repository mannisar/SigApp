import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import { db, auth } from "../config/index"
import User from '../../User'

export default class Contact extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            user: [],
            uid: null,
            dbRef: db.ref('user')
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        await this.state.dbRef.on('child_added', val => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid === auth.currentUser.uid) {
                // User.uid = person.uid;
                User.name = person.name;
                User.email = person.email;
                User.phone = person.phone;
                User.image = person.image ? person.image : null;
            } else {
                this.setState(prevState => {
                    return {
                        user: [...prevState.user, person],
                    };
                });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.state.dbRef.off();
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.item_container}>
                <Image
                    source={item.image ? { uri: item.image } : require('../assets/images/Ava-Man.png')}
                    style={{ width: 80, height: 80 }}
                    resizeMode={'stretch'}
                />
                <View style={styles.user}>
                    <View>
                        <Text style={styles.textName}>{item.name}</Text>
                        <Text style={styles.textNumber}>{item.phone}</Text>
                    </View>
                    <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.navigate('Message', item)}>
                        <MaterialIcons name="message" color="#5ce1e6" size={35} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon}>
                        <MaterialIcons name="call" color="#5ce1e6" size={35} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <Text style={styles.textHeader}>CONTACT</Text>
                    {/* <TouchableOpacity style={styles.add}>
                        <AntDesign name="pluscircle" color="white" size={25} />
                    </TouchableOpacity> */}
                </LinearGradient>
                <View style={styles.flatList}>
                    <FlatList
                        data={this.state.user}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.uid}
                    />
                </View>
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
    add: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 15
    },
    item_container: {
        flex: 1,
        flexDirection: 'row',
        // paddingHorizontal: 15,
        // paddingVertical: 15
    },
    flatList: {
        flex: 1
    },
    user: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    textName: {
        color: 'black',
        fontWeight: 'bold'
    },
    textNumber: {
        color: 'gray',
        marginTop: 5
    },
    icon: {
        // position: 'absolute',
        // marginLeft: 10,
        marginHorizontal: 8,
        left: 50
    }
});