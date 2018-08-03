'use strict'
import React, { Component } from 'react'
import {
    AppRegistry,
    StatusBar,
} from 'react-native'

import { TabNavigator }         from 'react-navigation'
import { Provider } from 'react-redux';
import store from './redux/store';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import AppWithNavigationState                from './screens/AppNavigator';

console.disableYellowBox = true;

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState listener={createReduxBoundAddListener('root')} />
            </Provider>
        )
    }
}

StatusBar.setBarStyle('light-content', true);
AppRegistry.registerComponent('Socialnights', () => App);
