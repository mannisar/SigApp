import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import firebase from 'firebase';
import { db, auth } from "../config/index"
import User from '../../User'

export default class Profil extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            name: User.name,
            email: User.email,
            phone: User.phone,
            imageSource: User.image
                ? { uri: User.image }
                : require('../assets/images/ava-default.png'),
            upload: false,
        }
    }

    onChangeImage = () => {
        const options = {
            quality: 0.7,
            allowsEditing: true,
            mediaType: 'photo',
            noData: true,
            storageOptions: {
                skipBackup: true,
                waitUntilSaved: true,
                path: 'images',
                cameraRoll: true,
            },
        };
        ImagePicker.showImagePicker(options, response => {
            if (response.error) {
                console.log(error);
            } else if (!response.didCancel) {
                this.setState(
                    {
                        upload: true,
                        imageSource: { uri: response.uri },
                    },
                    this.uploadFile,
                );
            }
        });
    };

    onSubmit = () => {
        const { phone, email, name } = this.state;
        if (name.length < 1) {
            ToastAndroid.show('Please input your fullname',
                ToastAndroid.LONG);
        } else if (email.length < 6) {
            ToastAndroid.show(
                'Please input a valid email address',
                ToastAndroid.LONG);
        } else if (phone.length < 12) {
            ToastAndroid.show('Please input 12 Digit phone',
                ToastAndroid.LONG);
        } else {
            User.name = name;
            User.email = email;
            User.phone = phone;
            this.updateUser();
            this.componentDidMount()
        }
    };

    updateUser = () => {
        db.ref('user').child(User.uid).set(User);
        Alert.alert('Success', 'succesfull.');
    };

    updateUserImage = imageUrl => {
        User.image = imageUrl;
        this.updateUser();
        this.setState({ upload: false, imageSource: { uri: imageUrl } });
    };

    uploadFile = async () => {
        const file = await this.uriToBlob(this.state.imageSource.uri);
        await firebase
            .storage()
            .ref(`profile_pictures/${file._data.name}`)
            .put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => this.updateUserImage(url))
            .catch(error => {
                this.setState({
                    upload: false,
                    imageSource: require('../assets/images/ava-default.png'),
                });
                Alert.alert('Error:', error.message)
            });
    };

    uriToBlob = uri => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new Error('Error on upload image'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
    };

    handleLogout = () => {
        auth.signOut()
    };

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <TouchableOpacity style={styles.menuBack} onPress={() => this.props.navigation.navigate('Home')}>
                        <FontAwesome name="arrow-left" color="white" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>PROFIL</Text>
                </LinearGradient>
                <View style={styles.main}>
                    <View style={styles.logo}>
                        <TouchableOpacity onPress={this.onChangeImage}>
                            {this.state.upload ? (
                                <ActivityIndicator size="large" />
                            ) : (
                                    <Image
                                        style={{
                                            width: 80,
                                            height: 80,
                                            resizeMode: 'stretch',
                                        }}
                                        source={this.state.imageSource}
                                    />
                                )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="name"
                        autoCapitalize="none"
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="email"
                        autoCapitalize="none"
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="phone"
                        autoCapitalize="none"
                        onChangeText={phone => this.setState({ phone })}
                        value={this.state.phone}
                    />
                    <TouchableOpacity onPress={this.onSubmit}>
                        <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.saveProfile}>
                            <Text style={styles.textSaveProfile}>SAVE</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handleLogout}>
                        <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.saveProfile}>
                            <Text style={styles.textSaveProfile}>LOGOUT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
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
    main: {
        width: '100%',
        height: '22%',
    },
    logo: {
        alignItems: 'center',
        marginTop: 28
    },
    input: {
        alignItems: 'center',
        marginTop: 14
    },
    textInput: {
        width: width_textInput,
        fontSize: 20,
        height: 75,
        fontFamily: 'raleway.regular',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 50,
        marginBottom: 12
    },
    footer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginBottom: 0
    },
    saveProfile: {
        width: width_textInput,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 12,
        alignItems: 'center'
    },
    textSaveProfile: {
        color: 'white',
        fontSize: 20,
        height: 40,
        paddingVertical: 10,
        fontFamily: 'raleway.bold'
    },
});