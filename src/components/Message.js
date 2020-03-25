import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import firebase from 'firebase';
import { db } from "../config/index"
import User from '../../User'

export default class Sends extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            data_message: [],
            textMessage: '',
            person: {
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone'),
            },
            dbRef: db.ref('message')
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.state.dbRef
            .child(User.phone)
            .child(this.state.person.phone)
            .on('child_added', value => {
                this.setState(prevState => {
                    return {
                        data_message: [...prevState.data_message, value.val()],
                    };
                });
            });
    }

    async componentWillUnmount() {
        this._isMounted = false;
        await this.state.dbRef.off();
    }

    handleChange = key => val => {
        this.setState({ [key]: val });
    };

    convertTime = time => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + '' + d.getMonth() + '' + result;
        }
        return result;
    };

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = this.state.dbRef
                .child(User.phone)
                .child(this.state.person.phone)
                .push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone,
            };
            updates[
                User.phone + '/' + this.state.person.phone + '/' + msgId
            ] = message;
            updates[
                this.state.person.phone + '/' + User.phone + '/' + msgId
            ] = message;
            this.state.dbRef.update(updates);
            this.setState({ textMessage: '' });
        }
    };

    renderItem = ({ item }) => {
        return (
            <View
                style={[styles.messageList, { alignSelf: item.from === User.phone ? 'flex-end' : 'flex-start', backgroundColor: item.from === User.phone ? '#352245' : 'gray' }]}>
                <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ color: '#eee', padding: 3, fontSize: 12 }}>
                    {this.convertTime(item.time)}
                </Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <TouchableOpacity style={styles.menuBack} onPress={() => this.props.navigation.navigate('Home')}>
                        <FontAwesome name="arrow-left" color="white" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>{this.state.person.name}</Text>
                </LinearGradient>
                <View style={styles.flatList}>
                    <FlatList
                        data={this.state.data_message}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.menuSetup}>
                        <FontAwesome name="list" color="#352245" size={28} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        value={this.state.textMessage}
                        placeholder="Type message ..."
                        onChangeText={this.handleChange('textMessage')}
                    />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={this.sendMessage}>
                        <FontAwesome name='paper-plane' color='#352245' size={28} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const width_textInput = width * 0.6;

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
        fontSize: 25,
    },
    menuBack: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
        paddingTop: 15,
        justifyContent: 'center',
        paddingLeft: 15
    },
    menuSetup: {
        marginBottom: 0
    },
    item_container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    flatList: {
        width: '100%',
        height: '65%'
    },
    messageList: {
        flexDirection: 'row',
        maxWidth: '60%',
        borderRadius: 5,
        paddingHorizontal: 8,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10
    },
    footer: {
        width: '100%',
        // height: '1%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    textInput: {
        width: width_textInput,
        fontSize: 20,
        height: 55,
        fontFamily: 'raleway.light',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 50,
        marginRight: 15,
        marginLeft: 15
    },
    icon: {
        marginBottom: 0
    },
});