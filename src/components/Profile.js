import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
    ToastAndroid,
    Dimensions
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import firebase from 'firebase';
import { db, auth } from "../config/index"
import { User } from '../../User'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            name: User.name,
            phone: User.phone,
            imageSource: User.image
                ? { uri: User.image }
                : { uri: 'https://firebasestorage.googleapis.com/v0/b/sigapp-fe8ef.appspot.com/o/profile_pictures%2Fava-default.png?alt=media&token=713d0ccb-be15-49f9-8db8-5b6d589578a8' },
            bio: User.bio,
            upload: false
        },
            this.handleLogout = this.handleLogout.bind(this);
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
        const { name, bio, phone } = this.state;
        if (name.length < 1) {
            ToastAndroid.show('Please input your fullname',
                ToastAndroid.LONG);
        } else if (bio.length < 1) {
            ToastAndroid.show('Please input your bio',
                ToastAndroid.LONG);
        } else if (phone.length < 12) {
            ToastAndroid.show('Please input 12 digit phone number',
                ToastAndroid.LONG);
        } else {
            User.name = name;
            User.bio = bio;
            User.phone = phone;
            this.updateUser();
        }
    };

    updateUser = () => {
        db.ref('user').child(auth.currentUser.uid).set(User);
        Alert.alert('Info', 'Update Successful!');
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
                    imageSource: { uri: 'https://firebasestorage.googleapis.com/v0/b/sigapp-fe8ef.appspot.com/o/profile_pictures%2Fava-default.png?alt=media&token=713d0ccb-be15-49f9-8db8-5b6d589578a8' },
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

    handleLogout = async () => {
        await auth.signOut()
    };

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.container}>
                <LinearGradient start={{ x: 1, y: -2 }} colors={['#5ce1e6', '#352245']} style={styles.header}>
                    <TouchableOpacity style={styles.menuBack} onPress={() => this.props.navigation.navigate('Home')}>
                        <FontAwesome name="arrow-left" color="white" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>PROFILE</Text>
                </LinearGradient>
                <View style={styles.main}>
                    <TouchableOpacity onPress={this.onChangeImage}>
                        {this.state.upload ? (
                            <ActivityIndicator size="large" />
                        ) : (
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode={'stretch'}
                                    source={this.state.imageSource}
                                />
                            )}
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.footer}>
                        <Text style={styles.title}>NAME</Text>
                        <View style={styles.box}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Name"
                                autoCapitalize="none"
                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                            />
                        </View>
                        <Text style={[styles.title, { marginTop: 24 }]}>BIO</Text>
                        <View style={styles.box}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Bio"
                                autoCapitalize="none"
                                onChangeText={(bio) => this.setState({ bio })}
                                value={this.state.bio}
                            />
                        </View>
                        <Text style={[styles.title, { marginTop: 24 }]}>PHONE</Text>
                        <View style={styles.box}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Phone Number"
                                keyboardType="number-pad"
                                onChangeText={(phone) => this.setState({ phone })}
                                value={this.state.phone}
                            />
                        </View>
                        <View style={styles.button}>
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
                </ScrollView>
            </View>
        )
    }
}

const { width } = Dimensions.get('window');
const width_textInput = width * 0.9;

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
        marginVertical: 4
    },
    textInput: {
        fontSize: 20,
        fontFamily: 'raleway.regular',
        left: -4
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12
    },
    saveProfile: {
        width: width_textInput,
        paddingVertical: 12,
        borderRadius: 50,
        marginTop: 10,
        alignItems: 'center'
    },
    textSaveProfile: {
        color: 'white',
        fontFamily: 'raleway.bold',
        fontSize: 20,
        height: 25
    }
});