import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';

export default class Friend extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            name: props.navigation.getParam('name'),
            bio: props.navigation.getParam('bio'),
            phone: props.navigation.getParam('phone'),
            imageSource: props.navigation.getParam('image')
                ? { uri: props.navigation.getParam('image') }
                : { uri: 'https://firebasestorage.googleapis.com/v0/b/sigapp-fe8ef.appspot.com/o/profile_pictures%2Fava-default.png?alt=media&token=713d0ccb-be15-49f9-8db8-5b6d589578a8' },
            upload: false,
        }
    }

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <TouchableOpacity style={styles.menuBack} onPress={() => this.props.navigation.navigate('Message')}>
                        <FontAwesome name="arrow-left" color="white" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>{this.state.name}</Text>
                </LinearGradient>
                <View style={styles.main}>
                    <TouchableOpacity>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            resizeMode={'stretch'}
                            source={this.state.imageSource}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.footer}>
                        <Text style={styles.title}>NAME</Text>
                        <View style={styles.box}>
                            <Text style={styles.text}>{this.state.name}</Text>
                        </View>
                        <Text style={[styles.title, { marginTop: 24 }]}>BIO</Text>
                        <View style={styles.box}>
                            <Text style={styles.text}>{this.state.bio}</Text>
                        </View>
                        <Text style={[styles.title, { marginTop: 24 }]}>PHONE</Text>
                        <View style={styles.box}>
                            <Text style={styles.text}>{this.state.phone}</Text>
                        </View>
                    </View>
                </ScrollView>
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
    menuBack: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 4,
        left: 15,
        justifyContent: 'center'
    },
    main: {
        width: '100%',
        height: '40%',
    },
    footer: {
        marginVertical: 24,
        marginHorizontal: 24,
    },
    title: {
        fontFamily: 'raleway.bold',
        fontSize: 20,
        height: 25,
    },
    box: {
        borderColor: '#5ce1e6',
        borderBottomWidth: 2,
        paddingVertical: 6,
        marginVertical: 8
    },
    text: {
        fontSize: 20,
        fontFamily: 'raleway.regular'
    }
});