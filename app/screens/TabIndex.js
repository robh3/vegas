'use strict'
import React, { Component } from 'react'

import { TabNavigator, TabBarBottom, StackNavigator, NavigationActions } from 'react-navigation'

import Explore              from './explore/StackExplore'
import Activity             from './activity/StackActivity'
import Discover             from './discover/StackDiscover'
import Connect              from './connect/StackConnect'
import Camera              from './camera/StackCamera'
import Inbox                from './inbox/StackInbox'
import Profile              from './profile/StackProfile'
import Search               from './explore/Search'
import SideMenu             from './SideMenu'
import colors               from './../resources/styles/colors'
import Icon                 from 'react-native-vector-icons/SimpleLineIcons'
import Ion              from 'react-native-vector-icons/Ionicons'
import MdIcon               from 'react-native-vector-icons/MaterialCommunityIcons'

const tabBarOptions = {
    activeTintColor: colors.txtWhite,
    inactiveTintColor: colors.txtDark,
    showLabel: false,
    style: {
        backgroundColor: colors.bgDark,
        height: 55
    },
    labelStyle: {
        fontWeight: '700',
        marginBottom: 10,
        fontSize: 8
    },
}

class TabIcon extends Component {
    render() {
        return <Icon {...this.props } style={{ marginBottom: -5 }}  size={22}  />
    }
}

class IonIcon extends Component {
    render() {
        return <Ion {...this.props } style={{ marginBottom: -5 }}  size={30}  />
    }
}

class TabAltIcon extends Component {
    render() {
        return <MdIcon {...this.props } style={{ marginBottom: -5 }}  size={30}  />
    }
}

const TabIndexNavigator = TabNavigator({
    Explore: {
        screen: Explore,
        navigationOptions: {
            tabBarLabel: 'HOME',
            tabBarIcon: ({ tintColor }) => (
                <TabAltIcon name='home' color={tintColor} />
            )
        }
    },
    Discover: {
        screen: Discover,
        navigationOptions: {
            tabBarLabel: 'DISCOVER',
            tabBarIcon: ({ tintColor }) => (
                <TabAltIcon name='cards' color={tintColor} />
            )
        }
    },
    Camera: {
        screen: Camera,
        navigationOptions: {
            tabBarLabel: 'Camera',
            tabBarIcon: ({ tintColor }) => (
                <TabAltIcon name='plus-box' color={tintColor} />
            )
        }
    },
    Activity: {
        screen: Activity,
        navigationOptions: {
            tabBarLabel: 'Activity',
            tabBarIcon: ({ tintColor }) => (
                <IonIcon name='ios-flash' color={tintColor} />
            )
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'PROFILE',
            tabBarIcon: ({ tintColor }) => (
                <TabAltIcon name='menu' color={tintColor} />
            )
        }
    }
}, {
    tabBarOptions: tabBarOptions,
    tabBarComponent: ({jumpToIndex, ...props, navigation}) => (
        <TabBarBottom
            {...props}
            jumpToIndex={index => {
                if (index === 2) {
                    console.log(navigation)
                    navigation.navigate('PostModal')
                    return;
                }
                else {
                    jumpToIndex(index)
                }
            }}
        />

    ),

    tabBarPosition: 'bottom',
    animationEnabled: false,
    navigationOptions: ({navigation}) => ({
        tabBarOnPress: tabBarOnPress(navigation)
    }),

});

const tabBarOnPress = navigation => config => {
    const {scene, index, jumpToIndex} = config

    if (!scene.focused) {
        jumpToIndex(scene.index)
    } else {
        if (scene.route.routes.length > 1) {
            for (let i = 0; i < scene.route.routes.length - 1; i += 1) {
                const backAction = NavigationActions.back()

                navigation.dispatch(backAction)
            }
        } else {
            const homeStack = scene.route.routes[0];
            const discoverStack = scene.route.routes[1];
            const activityStack = scene.route.routes[3];

            console.log('Scroll to Top');

            if (!!homeStack && !!homeStack.params && !!homeStack.params.scrollToTop) {
                homeStack.params.scrollToTop();
            }

            if (!!activityStack && !!activityStack.params && !!activityStack.params.scrollToTop) {
                activityStack.params.scrollToTop();
            }

            if (!!discoverStack && !!discoverStack.params && !!discoverStack.params.scrollToTop) {
                discoverStack.params.scrollToTop();
            }



        }
    }
}



class TabIndex extends Component {
    static navigationOptions = {
        gesturesEnabled: false
    }

    constructor(props) {
        super(props);
    }


    render() {
        const screenProps = {
            onMenuPress: this.onMenuPress,
            onSearchPress: this.onSearchPress,
            onCameraPress: this.onCameraPress
        }

        return (
                <TabIndexNavigator navigator={ this.props.navigation } screenProps={ screenProps } />
        )
    }

    onMenuPress = () => {
        this.refs['menu'].onMenuPress()
    }

    onSearchPress = () => {
        this.props.navigation.navigate('Search');
    }

    onCameraPress = () => {
        this.props.navigation.navigate('ModalCamera');
    }

    onCitySelect = () => {
        this.props.navigation.navigate('Search');
    }



}

export default TabIndexNavigator;
