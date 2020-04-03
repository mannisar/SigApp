import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import moment from 'moment'
import firebase from 'firebase';
import { auth, db } from "../config/index"
import { User } from '../../User'

export default class Sends extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            data_message: [],
            data_profile: null,
            textMessage: '',
            person: {
                uid: props.navigation.getParam('uid'),
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone'),
                bio: props.navigation.getParam('bio'),
                image: props.navigation.getParam('image')
            },
            dbRef: db.ref('message')
        }
    }

    async componentDidMount() {
        const data = { "name": this.state.person.name, "phone": this.state.person.phone, "bio": this.state.person.bio, "image": this.state.person.image }
        await this.setState({
            data_profile: data
        })
        this._isMounted = true;
        this.state.dbRef
            .child(auth.currentUser.uid)
            .child(this.state.person.uid)
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

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = this.state.dbRef
                .child(auth.currentUser.uid)
                .child(this.state.person.uid)
                .push().key;
            let updates = {};
            let message = {
                from: User.name,
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP
            };
            updates[
                auth.currentUser.uid + '/' + this.state.person.uid + '/' + msgId
            ] = message;
            updates[
                this.state.person.uid + '/' + auth.currentUser.uid + '/' + msgId
            ] = message;
            this.state.dbRef.update(updates);
            this.setState({ textMessage: '' });
            Msg.message = message
        }
    };

    renderItem = ({ item }) => {
        return (
            <View
                style={[styles.messageList, { alignSelf: item.from === User.name ? 'flex-end' : 'flex-start', backgroundColor: item.from === User.name ? '#352245' : 'gray' }]}>
                <Text style={{ color: '#fff', padding: 2, fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ color: '#eee', padding: 2, fontSize: 10, }}>
                    {moment(item.time).format('LT')}
                </Text>
            </View>
        )
    }

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <TouchableOpacity style={styles.menuBack} onPress={() => this.props.navigation.navigate('Home', { Render: true })}>
                        <FontAwesome name="arrow-left" color="white" size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Friend', this.state.data_profile)}>
                        <Text style={styles.textHeader}>{this.state.person.name}</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <View style={styles.main}>
                    <FlatList
                        ref={ref => (this.flatList = ref)}
                        onContentSizeChange={() =>
                            this.flatList.scrollToEnd({ animated: true })
                        }
                        onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                        data={this.state.data_message}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.uid}
                    />
                    <View
                        style={styles.mainMenu}
                        ref={(ref) => { this.View = ref }}
                        multiline={true}
                        defaultHeight={30}>
                        <TextInput
                            style={styles.textInput}
                            value={this.state.textMessage}
                            placeholder="Type message ..."
                            onChangeText={this.handleChange('textMessage')}
                        />
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={this.sendMessage}>
                            <FontAwesome name='paper-plane' color='white' size={28} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const width_textInput = width * 0.78;

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
    menuBack: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 4,
        left: 15,
        justifyContent: 'center'
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
    main: {
        flex: 1,
    },
    messageList: {
        maxWidth: '60%',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 1,
        marginTop: 4,
        marginLeft: 4,
        marginRight: 4
    },
    mainMenu: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#352245',
        paddingVertical: 8,
        marginTop: 4
    },
    textInput: {
        width: width_textInput,
        fontSize: 20,
        height: 55,
        fontFamily: 'raleway.light',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 50,
        marginRight: 15,
        marginLeft: 15
    },
});