import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Image,
    ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { auth } from "../config/index";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            email: '',
            password: '',
            latitude: null,
            longitude: null,
            errorMessage: null,
            visible: false,
            Onprosess: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
    };

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleLogin = async () => {
        const { email, password } = this.state;
        if (email.length < 6) {
            ToastAndroid.show(
                'Please input a valid email address',
                ToastAndroid.LONG,
            );
        } else if (password.length < 6) {
            ToastAndroid.show(
                'Password must be at least 6 characters',
                ToastAndroid.LONG,
            );
        } else {
            await auth.signInWithEmailAndPassword(email, password)
                .then(async data => {
                    ToastAndroid.show("Success", ToastAndroid.LONG)
                    this.props.navigation.navigate("Home")
                })
                .catch(error => console.log(error.message))
        }
    };

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <ImageBackground
                        source={require('../assets/images/header.png')}
                        style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                        resizeMode={'stretch'}>
                        <View style={styles.logo}>
                            <Image
                                source={require('../assets/images/logo.png')}
                                style={{ width: '100%', height: '85%' }}
                                resizeMode={'stretch'}
                            />
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        autoCapitalize="none"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={password => this.setState({ password })}
                        value={this.state.password}
                    />
                    <TouchableOpacity onPress={this.handleLogin}>
                        <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.login}>
                            <Text style={styles.textLogin}>LOGIN</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.textRegister}>Don't Have Account?</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={[styles.textRegister, { color: '#5ce1e6', marginBottom: 12 }]}>Register!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const { width } = Dimensions.get('window');
const width_logo = width * 1;
const height_logo = width_logo * 1.2;
const width_textInput = width * 0.8;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    header: {
        width: '100%',
        height: '50%'
    },
    footer: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: width_logo,
        height: height_logo
    },
    textInput: {
        width: width_textInput,
        fontSize: 20,
        height: 75,
        fontFamily: 'raleway.bold',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 50,
        marginBottom: 15
    },
    login: {
        width: width_textInput,
        paddingVertical: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLogin: {
        color: 'white',
        fontSize: 20,
        height: 40,
        paddingVertical: 10,
        fontFamily: 'raleway.bold'
    },
    textRegister: {
        fontSize: 18,
        fontFamily: 'raleway.bold',
        marginTop: 8
    }
});