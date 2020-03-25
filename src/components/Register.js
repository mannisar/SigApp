import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { auth, db } from '../config/index'

export default class Register extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false
        this.state = {
            isVisible: false,
            phone: '',
            name: '',
            email: '',
            password: '',
            latitude: null,
            longitude: null,
            errorMessage: null,
            loading: false,
            updatesEnabled: false,
        }
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

    };

    componentWillUnmount() {
        this._isMounted = false;

    }

    handleRegister = async () => {
        const { phone, email, name, password } = this.state;
        if (phone.length < 12) {
            ToastAndroid.show('Please input your phone',
                ToastAndroid.LONG);
        }
        else if (name.length < 1) {
            ToastAndroid.show('Please input your fullname',
                ToastAndroid.LONG);
        } else if (email.length < 6) {
            ToastAndroid.show(
                'Please input a valid email address',
                ToastAndroid.LONG);
        } else if (password.length < 6) {
            ToastAndroid.show(
                'Password must be at least 6 characters',
                ToastAndroid.LONG);
        } else {
            await auth.createUserWithEmailAndPassword(email, password)
                .then(async userCredentials => {
                    db.ref('/user/' + userCredentials.user.uid)
                        .set({
                            name: this.state.name,
                            email: this.state.email,
                            phone: this.state.phone
                        })
                        .catch(error => console.log(error.message))

                    ToastAndroid.show("Success", ToastAndroid.LONG)

                    if (userCredentials.user) {
                        userCredentials.user.updateProfile({
                            phoneNumber: this.state.phone,
                            displayName: this.state.name,
                        }).then((s) => {
                            this.props.navigation.navigate("Login")
                        })
                    }
                })
                .catch(error => {
                    ToastAndroid.show(error.message, ToastAndroid.LONG)
                })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <Text style={styles.textHeader}>REGISTER</Text>
                </LinearGradient>
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Phone Number"
                        keyboardType="number-pad"
                        onChangeText={phone => this.setState({ phone })}
                        value={this.state.phone}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Full Name"
                        autoCapitalize="none"
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                    />
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
                    <TouchableOpacity onPress={this.handleRegister}>
                        <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.login}>
                            <Text style={styles.textLogin}>SUBMIT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const Toast = props => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            1,
            800,
        );
        return null;
    }
    return null;
};

const { width, height } = Dimensions.get('window');
const width_textInput = width * 0.8;

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
    footer: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
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
    }
});