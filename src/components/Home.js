import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

import moment from 'moment'
import GetLocation from 'react-native-get-location'
import { db, auth } from "../config/index"
import { User } from '../../User'

export default class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            location: [],
            did: false,
            num_messages_readed: 100,
            created_at: 'few seconds',
        }
    }

    async componentDidMount() {
        await this.getLocation()
        await this.getUser()
        if (this.props.navigation.getParam('Render')) {
            await this.getUser()
        }
    }

    componentWillUnmount() {
        db.ref('user').off()
        db.ref('message').off()
    }

    getLocation() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                db.ref('/user/' + auth.currentUser.uid).child("latitude").set(location.latitude)
                db.ref('/user/' + auth.currentUser.uid).child("longitude").set(location.longitude);
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
    }

    getUser() {
        db.ref('user').on('child_added', val => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid === auth.currentUser.uid) {
                User.name = person.name;
                User.email = person.email;
                User.phone = person.phone;
                User.image = person.image ? person.image : "";
                User.bio = person.bio;
                User.latitude = person.latitude;
                User.longitude = person.longitude;
            } else {
                db.ref('message')
                    .child(auth.currentUser.uid)
                    .child(person.uid)
                    .on('child_added', value => {
                        person.last_time = value.val().time;
                        person.last_message = value.val().message;
                    });

                db.ref('message')
                    .child(auth.currentUser.uid)
                    .child(person.uid)
                    .on('value', value => {
                        if (value.val()) {
                            if (!this.state.user.includes(person)) {
                                this.setState(prevState => {
                                    return {
                                        user: [...prevState.user, person],
                                    };
                                });
                            }
                        }
                    });
            }
        })
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item_container} onPress={() => this.props.navigation.navigate('Message', item)}>
                <Image
                    source={item.image ? { uri: item.image } : { uri: 'https://firebasestorage.googleapis.com/v0/b/sigapp-fe8ef.appspot.com/o/profile_pictures%2Fava-default.png?alt=media&token=713d0ccb-be15-49f9-8db8-5b6d589578a8' }}
                    style={{ width: 50, height: 50, borderRadius: 50 }}
                />
                <View style={styles.item_messages}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'black' }}>
                            {item.name}
                        </Text>
                        <Text style={{ color: 'black', fontSize: 12, top: 8 }}>
                            {item.last_message.slice(0, 28)}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: 'black', fontSize: 12, fontStyle: 'italic', textAlign: 'right' }}>
                            {moment(item.last_time).format('LT')}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <Text style={styles.textHeader}>SIGAPP</Text>
                    <TouchableOpacity style={styles.add} onPress={() => this.props.navigation.navigate('Profile')}>
                        <AntDesign name="setting" color="white" size={25} />
                    </TouchableOpacity>
                </LinearGradient>
                <View style={styles.footer}>
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
        flex: 1,
        color: 'white',
        fontFamily: 'raleway.bold',
        fontSize: 25,
        top: 4
    },
    add: {
        position: 'absolute',
        right: 15,
        top: 0,
        bottom: 4,
        left: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    footer: {
        height: '100%',
    },
    user: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 85,
        marginLeft: 50
    },
    item_container: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 22,
        top: 10
    },
    item_messages: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    }
});