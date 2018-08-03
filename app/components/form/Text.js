'use strict'
import React, { Component } from 'react'
import {
    Text, StyleSheet
} from 'react-native'

import colors           from './../../resources/styles/colors'

class TextCustom extends Component {
    render() {
        const type = this.props.type || {}
        const style = {style: [ styles.default, styles[type], this.props.style || {} ]}
        const props = Object.assign({}, this.props, style)
        return (
            <Text {...props}>{ this.props.children }</Text>
        )
    }
}

const h5 = { fontSize: 16 }
const h4 = { fontSize: 18 }
const h3 = { fontSize: 25 }
const h2 = { fontSize: 23 }
const h1 = { fontSize: 32 }
const styles = StyleSheet.create({
    default: {
        color: colors.txtWhite
    },
    spanWhite: {
        color: colors.txtWhite
    },
    h5,
    h5White: {
        ...h5,
        color: colors.txtWhite
    },
    h4,
    h4White: {
        ...h4,
        color: colors.txtWhite
    },
    h3,
    h3White: {
        ...h3,
        color: colors.txtWhite
    },
    h3WhiteBold: {
        ...h3,
        color: colors.txtWhite,
        fontWeight: '800'
    },
    h3Dark: {
        ...h3,
        color: colors.txtDark
    },
    h2: {
        ...h2,
        fontWeight: '900'
    },
    h2White: {
        ...h2,
        color: colors.txtWhite
    },
    h1,
    h1White: {
        ...h1,
        color: colors.txtWhite
    }
})

module.exports = TextCustom
