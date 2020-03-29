import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { db, auth } from "../config/index"
import User from '../../User'

export default class Messages extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            user: [],
            uid: null,
            latitude: '',
            longitude: '',
            message: 'BLABLABLA',
            num_messages_readed: 100,
            dbRef: db.ref('user')
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        await this.state.dbRef.on('child_added', val => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid === auth.currentUser.uid) {
                User.uid = person.uid;
                User.name = person.name;
                User.email = person.email;
                User.phone = person.phone;
                User.image = person.image ? person.image : null;
                User.latitude = person.latitude;
                User.longitude = person.longitude;
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
            <TouchableOpacity style={styles.item_container} onPress={() => this.props.navigation.navigate('Message', item)}>
                <Image
                    source={item.image ? { uri: item.image } : require('../assets/images/Ava-Man.png')}
                    style={{ width: 50, height: 50 }}
                    resizeMode={'stretch'}
                />
                <View style={styles.item_messages}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: 'black', fontWeight: item.readed ? null : 'bold' }}>
                            {item.name}
                        </Text>
                        <Text style={{ color: 'black', fontSize: 12, fontWeight: item.readed ? null : 'regular' }}>
                            {this.state.message}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ color: 'black', fontSize: 12, fontStyle: 'italic', fontWeight: item.readed ? null : 'bold', textAlign: 'right' }}>
                            {item.created_at}
                        </Text>
                        {item.readed ? null :
                            <View style={styles.num_readed}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                                    {this.state.num_messages_readed > 99 ? "99+" : this.state.num_messages_readed}
                                </Text>
                            </View>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    ItemSeparatorComponent = () => {
        return (
            <View style={{ height: 1, paddingVertical: 10 }} />
        )
    }

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                {/* <View style={styles.header}> */}
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <Text style={styles.textHeader}>SIGAPP</Text>
                    <TouchableOpacity style={styles.add} onPress={() => this.props.navigation.navigate('Profil')}>
                        <AntDesign name="setting" color="white" size={25} />
                    </TouchableOpacity>
                </LinearGradient>
                <View style={styles.selection}>
                    <View style={styles.searchBar}>
                        <Ionicons name="ios-search" color="gray" size={28} />
                        <TextInput
                            style={styles.textInput}
                            placeholder="search..."
                        />
                        <TouchableOpacity>
                            <Ionicons name="ios-close" color="gray" size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* </View> */}
                <View style={styles.footer}>
                    <FlatList
                        data={this.state.user}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.uid}
                        ItemSeparatorComponent={this.ItemSeparatorComponent}
                    />
                </View>
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const width_searchBar = width * 0.8

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
    footer: {
        height: '100%'
    },
    imgBackground: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    imageBackground_container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '8%'
    },
    logo: {
        flex: 1,
        marginLeft: 10,
        alignItems: 'center'
    },
    user: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 85,
        marginLeft: 50
    },
    user_name: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'raleway.bold'
    },
    action: {
        marginTop: 0,
    },
    icon: {
        marginLeft: 18
    },
    item_container: {
        flexDirection: 'row',
        paddingHorizontal: 20
    },
    item_messages: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    num_readed: {
        height: 20,
        backgroundColor: '#5ce1e6',
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 3
    },
    selection: {
        height: '13%',
        alignItems: 'center'
    },
    searchBar: {
        width: width_searchBar,
        height: 40,
        flexDirection: 'row',
        backgroundColor: '#f2f2f2',
        marginTop: 15,
        borderRadius: 50,
        alignItems: 'center',
        paddingHorizontal: 15
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10
    }
});