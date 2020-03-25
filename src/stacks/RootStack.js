import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Loading from "./Loading";
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import Message from '../components/Message'
import Contact from '../components/Contact'
import Notification from '../components/Notification'
import Profil from '../components/Profil'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
                        <FontAwesome name="comments" size={25} color={tintColor} />
                    )
                } else {
                    return (
                        <FontAwesome name="comments" size={20} color={'gray'} />
                    )
                }
            }
        }
    },
    Contact: {
        screen: Contact,
        navigationOptions: {
            tabBarLabel: 'Contact',
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
                        <FontAwesome name="id-card" size={25} color={tintColor} />
                    )
                } else {
                    return (
                        <FontAwesome name="id-card" size={20} color={'gray'} />
                    )
                }
            }
        }
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            tabBarLabel: 'Notification',
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
                        <FontAwesome name="bell" size={25} color={tintColor} />
                    )
                } else {
                    return (
                        <FontAwesome name="bell" size={20} color={'gray'} />
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
    // Map,
    Message: {
        screen: Message,
        navigationOptions: {
            headerShown: false
        }
    },
    Profil: {
        screen: Profil,
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