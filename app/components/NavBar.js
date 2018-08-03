'use strict'
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import Icon             from 'react-native-vector-icons/SimpleLineIcons'
import colors           from './../resources/styles/colors'

class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let txtMarginLeft = (this.props.hideBackButton) ? 0 : -30
        let btnBack = (
            <TouchableOpacity style={ styles.btnback } onPress={() => this._pressBtnBack()}>
                <Icon name='arrow-left' style={[ styles.icon, this.props.headerLeftIconStyle || {} ]} size={16} />
            </TouchableOpacity>
        )
        let btnClose = (
            <TouchableOpacity style={ styles.btnback } onPress={() => this._pressBtnBack()}>
                <Icon name='close' style={[ styles.icon, this.props.headerLeftIconStyle || {} ]} size={16} />
            </TouchableOpacity>
        )
        let citySelect = (
            <TouchableOpacity onPress={() => this.props.navigator.navigate('SearchModal')}>
                <Text style={[ styles.subtext, this.props.titleStyle || {}, { marginLeft: txtMarginLeft  }]}>
                    { this.props.subtitle } <Icon name='arrow-down' style={[ styles.iconAlt, this.props.headerLeftIconStyle || {} ]} size={6} />
                </Text>
            </TouchableOpacity>
        )
        let dateMenu = (
            <TouchableOpacity style={ styles.btnback } onPress={() => this._pressBtnBack()}>
                <Icon name='close' style={[ styles.icon, this.props.headerLeftIconStyle || {} ]} size={16} />
            </TouchableOpacity>
        )
        return (
            <View style={[ styles.bar, this.props.style || {} ]}>
                { !this.props.hideBackButton && btnBack}
                { this.props.title &&
                    <View style={ styles.titleHolder }>
                        <Text style={[ styles.text, this.props.titleStyle || {}, { marginLeft: txtMarginLeft }]}>{ this.props.title }</Text>
                    </View>
                }
                { this.props.children}
                { this.props.headerRight || null }
            </View>
        )
    }

    _pressCity() {
        this.props.navigator.goBack();
    }

    _pressBtnBack() {
        this.props.navigator.goBack();
    }
}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center'
    },
    titleHolder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: colors.txtWhite,
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtext: {
        color: colors.txtDescription,
        fontSize: 12,
    },
    icon: {
        color: colors.txtWhite,
        backgroundColor: 'transparent'
    },
    iconAlt: {
        color: colors.txtDescription,
        backgroundColor: 'transparent'
    },
    btnback: {
        padding: 10,
        marginLeft: 10
    }
})

module.exports = NavBar
