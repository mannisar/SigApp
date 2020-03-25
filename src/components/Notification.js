import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data_notification: [
                {
                    id: 'x1fie5vhFr',
                    user_id: 'trongtinh_Rc0LjZ54yj',
                    user_name: 'MAMANG',
                    user_avatar: require("../assets/images/Ava-Man.png"),
                    notificaton: 'like your avatar.',
                    readed: false,
                    created_at: 'Few seconds',
                },
                {
                    id: 'gjYQQVjxTD',
                    user_id: 'huynhnhu_R3J4WUoWXJ',
                    user_name: 'MANNISAR',
                    user_avatar: require("../assets/images/Ava-Man.png"),
                    notificaton: 'comment your avatar.',
                    readed: true,
                    created_at: '1 day ago',
                },
            ]
        }
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.item_container, { backgroundColor: item.readed ? null : '#e6fffb' }]}>
                <Image
                    source={item.user_avatar}
                    style={{ width: 80, height: 80 }}
                />
                <View style={styles.user}>
                    <View style={styles.user_name}>
                        <Text style={styles.textName}>{item.user_name}</Text>
                        <Text style={styles.textNumber}> {item.notificaton}</Text>
                    </View>
                    <View style={styles.time}>
                        <Text style={[styles.textNumber, { fontStyle: 'italic' }]}>{item.created_at}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <Text style={styles.textHeader}>NOTIFICATION</Text>
                </LinearGradient>
                <View style={styles.flatList}>
                    <FlatList
                        data={this.state.data_notification}
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