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
import { User } from '../../User'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this._isMounted = false;
        this.state = {
            name: User.name,
            email: User.email,
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
        const { name, bio } = this.state;
        if (name.length < 1) {
            ToastAndroid.show('Please input your fullname',
                ToastAndroid.LONG);
        } else {
            User.name = name;
            User.bio = bio;
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
                    <View style={styles.logo}>
                        <TouchableOpacity onPress={this.onChangeImage}>
                            {this.state.upload ? (
                                <ActivityIndicator size="large" />
                            ) : (
                                    <Image
                                        style={{ width: 100, height: 100, borderRadius: 50 }}
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
                        placeholder="bio"
                        autoCapitalize="none"
                        onChangeText={(bio) => this.setState({ bio })}
                        value={this.state.bio}
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
        height: '25%'
    },
    logo: {
        alignItems: 'center',
        marginVertical: 28
    },
    input: {
        alignItems: 'center',
        marginTop: 14
    },
    textInput: {
        width: width_textInput,
        fontSize: 20,
        height: 50,
        fontFamily: 'raleway.regular',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 50,
        marginBottom: 15
    },
    footer: {
        alignItems: 'center',
        marginVertical: 18
    },
    saveProfile: {
        width: width_textInput,
        paddingVertical: 12,
        borderRadius: 50,
        marginBottom: 15,
        alignItems: 'center'
    },
    textSaveProfile: {
        color: 'white',
        fontFamily: 'raleway.bold',
        fontSize: 20,
        height: 25
    },
});