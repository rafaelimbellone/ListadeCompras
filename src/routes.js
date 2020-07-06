import React from 'react';
import {Text} from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import Main from './pages/Main';
import Book from './pages/Book';

export default createAppContainer(
    createSwitchNavigator({
        Main,
        Book
    },{
        initialRouteName:'Main',
        backBehavior:'history',
    })
)