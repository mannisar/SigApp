import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Loading from "./Loading";
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import Message from '../components/Message'
import Find from '../components/Find'
import GoogleMap from '../components/GoogleMap'
import Profile from '../components/Profile'
import Friend from '../components/Friend'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TabNavigatior = createMaterialBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Chat',
            tabBarOptions: {
                tabStyle: {
                    paddingVertical: 10
                },
                style: {
                    height: 50,
                    backgroundColor: '#352245',
                    elevation: 10,
                    borderTopWidth: 0
                },
                labelStyle: {
                    margin: 0,
                    padding: 0
                },
                showIcon: true,
                showLabel: true,
                activeTintColor: 'white',
                inactiveTintColor: 'gray'
            },
            tabBarIcon: ({ tintColor, focused }) => {
                if (focused) {
                    return (
                        <Entypo name="chat" size={22} color={tintColor} />
                    )
                } else {
                    return (
                        <Entypo name="chat" size={20} color={'gray'} />
                    )
                }
            }
        }
    },
    Find: {
        screen: Find,
        navigationOptions: {
            tabBarLabel: 'Find Friend',
            tabBarOptions: {
                tabStyle: {
                    paddingVertical: 10
                },
                style: {
                    height: 50,
                    backgroundColor: '#352245',
                    elevation: 10,
                    borderTopWidth: 0
                },
                labelStyle: {
                    margin: 0,
                    padding: 0
                },
                showIcon: true,
                showLabel: true,
                activeTintColor: 'white',
                inactiveTintColor: 'gray'
            },
            tabBarIcon: ({ tintColor, focused }) => {
                if (focused) {
                    return (
                        <AntDesign name="adduser" size={25} color={tintColor} />
                    )
                } else {
                    return (
                        <AntDesign name="adduser" size={20} color={'gray'} />
                    )
                }
            }
        }
    },
    GoogleMap: {
        screen: GoogleMap,
        navigationOptions: {
            tabBarLabel: 'Location',
            tabBarOptions: {
                tabStyle: {
                    paddingVertical: 10
                },
                style: {
                    height: 50,
                    backgroundColor: '#352245',
                    elevation: 10,
                    borderTopWidth: 0
                },
                labelStyle: {
                    margin: 0,
                    padding: 0
                },
                showIcon: true,
                showLabel: true,
                activeTintColor: 'white',
                inactiveTintColor: 'gray'
            },
            tabBarIcon: ({ tintColor, focused }) => {
                if (focused) {
                    return (
                        <FontAwesome name="map-marker" size={25} color={tintColor} />
                    )
                } else {
                    return (
                        <FontAwesome name="map-marker" size={20} color={'gray'} />
                    )
                }
            }
        }
    }
}, {
    initialRouteName: 'Home',
    activeColor: 'white',
    inactiveColor: 'grey',
    barStyle: {
        backgroundColor: '#352245'
    }
})

const AppStack = createStackNavigator({
    Apps: {
        screen: TabNavigatior,
        navigationOptions: {
            headerShown: false
        }
    },
    Message: {
        screen: Message,
        navigationOptions: {
            headerShown: false
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerShown: false
        }
    },
    Friend: {
        screen: Friend,
        navigationOptions: {
            headerShown: false
        }
    }
})

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            headerShown: false
        }
    },
})

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: Loading,
            App: AppStack,
            Auth: AuthStack
        },
        {
            initialRouteName: "Loading"
        }
    ));