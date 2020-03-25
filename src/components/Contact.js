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

export default class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data_contact: [
                {
                    id: 'Rc0LjZ54yj',
                    user_id: 'trongtinh_Rc0LjZ54yj',
                    user_name: 'DWI',
                    user_avatar: require("../assets/images/Ava-Man.png"),
                    user_phonenumber: '+84 93456788'
                },
                {
                    id: 'MhiUfuWzr2',
                    user_id: 'tranthanh_MhiUfuWzr2',
                    user_name: 'MANNISAR',
                    user_avatar: require("../assets/images/Ava-Man.png"),
                    user_phonenumber: '+84 78346789'
                },
                {
                    id: 'R3J4WUoWXJ',
                    user_id: 'huynhnhu_R3J4WUoWXJ',
                    user_name: 'UYEEE',
                    user_avatar: require("../assets/images/Ava-Man.png"),
                    user_phonenumber: '+84 95661237'
                },
                {
                    id: 'ucPA0NXweB',
                    user_id: 'dinhtrong_ucPA0NXweB',
                    user_name: 'MAMANG',
                    user_avatar: require("../assets/images/Ava-Man.png"),
                    user_phonenumber: '+84 33674824'
                },

                {
                    id: 'wfbMalbY9l',
                    user_id: 'truonggiang_wfbMalbY9l',
                    user_name: 'KESBOR',
                    user_avatar: require("../assets/images/Ava-Man.png"),
                    user_phonenumber: '+84 78346789'
                },
                {
                    id: 'IlpBApYmye',
                    user_id: 'trongthat_IlpBApYmye',
                    user_name: 'MAMANG',
                    user_avatar: require("../assets/images/Ava-Man.png"),
                    user_phonenumber: '+84 4532012'
                },
            ]
        }
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item_container}>
                <Image
                    source={item.user_avatar}
                    style={{ width: 80, height: 80 }}
                />
                <View style={styles.user}>
                    <View>
                        <Text style={styles.textName}>{item.user_name}</Text>
                        <Text style={styles.textNumber}>{item.user_phonenumber}</Text>
                    </View>
                    <TouchableOpacity style={styles.call}>
                        <MaterialIcons name="call" color="#5ce1e6" size={20} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <Text style={styles.textHeader}>CONTACT</Text>
                    <TouchableOpacity style={styles.add}>
                        <AntDesign name="pluscircle" color="white" size={25} />
                    </TouchableOpacity>
                </LinearGradient>
                <View style={styles.flatList}>
                    <FlatList
                        data={this.state.data_contact}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.id.toString()}
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
        paddingHorizontal: 15,
        paddingVertical: 15
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
    call: {
        position: 'absolute',
        right: 0
    }
});