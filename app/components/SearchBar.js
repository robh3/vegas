'use strict'
import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

import Icon             from 'react-native-vector-icons/SimpleLineIcons'
import colors           from './../resources/styles/colors'

class SearchBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[ styles.bar, this.props.style || {} ]}>
                <View style={ styles.titleHolder }>
                    <Text>{ this.props.icon } </Text>
                    <Text style={[ styles.text, this.props.titleStyle || {} ]}> { this.props.placeholder }</Text>
                </View>
                { this.props.headerRight || null }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    bar: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center'
    },
    titleHolder: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingLeft: 15,
        justifyContent: 'flex-start',
        height: 50,
        marginTop: 10,
        backgroundColor: colors.bgPlaceholder,
        borderRadius: 8,
        elevation: 1
    },
    text: {
        color: colors.txtWhite,
        fontWeight: '800',
        fontSize: 15
    },
    icon: {
        color: colors.txtWhite,
        backgroundColor: 'transparent'
    },
    btnback: {
        padding: 10,
        marginLeft: 10
    }
})

module.exports = SearchBar
