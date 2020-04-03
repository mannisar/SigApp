import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    // PermissionsAndroid,
    Dimensions,
    Linking
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

// import SendIntentAndroid from 'react-native-send-intent'
import { db } from "../config/index"
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Find extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            search: ""
        }
        this.requestCallPhone = this.requestCallPhone.bind(this)
    }

    componentWillUnmount() {
        db.ref('user').off()
        db.ref('message').off()
    }

    // requestCallPhone = async (number) => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CALL_PHONE, {
    //             'title': 'App Call Phone Permission',
    //             'message': 'App needs access to your call phone feature'
    //         }
    //         )
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             SendIntentAndroid.sendPhoneCall(number, true);
    //         } else {
    //             console.log("Call Phone permission denied")
    //         }
    //     } catch (err) {
    //         console.warn(err)
    //     }
    // }

    requestCallPhone = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    };

    onSubmit = (search) => {
        db.ref('user').on('child_added', val => {
            let person = val.val();
            person.uid = val.key;
            if (person.name === search) {
                if (this.state.user.length === 0) {
                    this.setState(prevState => {
                        return {
                            user: [...prevState.user, person]
                        };
                    });
                    return;
                } else {
                    alert('Silahkan Chat atau Telfon Teman!')
                    return;
                }
            }
        })
    }

    onClear = () => {
        this.setState({
            user: [],
            search: ""
        })
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.item_container}>
                <Image
                    source={item.image ? { uri: item.image } : { uri: 'https://firebasestorage.googleapis.com/v0/b/sigapp-fe8ef.appspot.com/o/profile_pictures%2Fava-default.png?alt=media&token=713d0ccb-be15-49f9-8db8-5b6d589578a8' }}
                    style={{ width: 80, height: 80, borderRadius: 50 }}
                />
                <View style={styles.user}>
                    <View style={styles.namephone}>
                        <Text style={styles.textName}>{item.name}</Text>
                        <Text style={styles.textNumber}>{item.bio}</Text>
                    </View>
                    <View style={styles.chatcall}>
                        <TouchableOpacity style={styles.icon} onPress={() => this.props.navigation.navigate('Message', item)}>
                            <MaterialIcons name="message" color="#352245" size={35} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon} onPress={() => this.requestCallPhone(item.phone)}>
                            <MaterialIcons name="call" color="#352245" size={35} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <Text style={styles.textHeader}>FIND FRIEND</Text>
                </LinearGradient>
                <View style={styles.selection}>
                    <View style={styles.searchBar}>
                        <Ionicons name="ios-search" color="gray" size={28} onPress={() => this.onSubmit(this.state.search)} />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(search) => this.setState({ search })}
                            placeholder="name.."
                            autoCapitalize="none"
                            value={this.state.search}
                        />
                        <TouchableOpacity>
                            <Ionicons name="ios-close" color="gray" size={25} onPress={this.onClear} />
                        </TouchableOpacity>
                    </View>
                </View>
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

const { width } = Dimensions.get('window');
const width_searchBar = width * 0.9

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
    item_container: {
        flex: 1,
        flexDirection: 'row'
    },
    flatList: {
        flex: 1,
        paddingHorizontal: 1,
        paddingVertical: 1
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
    namephone: {
        flex: 2
    },
    chatcall: {
        flexDirection: 'row'
    },
    icon: {
        marginHorizontal: 8,
    },
    selection: {
        alignItems: 'center',
        paddingBottom: 14,
        backgroundColor: '#f2f2f2'
    },
    searchBar: {
        width: width_searchBar,
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white',
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