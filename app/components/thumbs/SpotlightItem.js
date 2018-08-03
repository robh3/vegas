import React, { Component } from 'React'
import {
    View, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'

import colors               from './../../resources/styles/colors'
import Text                 from './../form/Text'
import AsyncImage           from './../AsyncImage'

class SpotlightItem extends Component {


    render() {

        let data = this.props.data;



        return (

                <View style={[styles.holder, this.props.style || {}]}>
                    <TouchableOpacity activeOpacity={1.0} onPress={ this.props.onPress }>
                        <AsyncImage style={[this.props.style || {}, {width: this.props.width - 25, height: this.props.height - 25}]}
                                    source={{uri: data.thumb}} placeholderColor={colors.bgPlaceholder}/>
                        { this.props.overlay && <View style={ styles.overlay }></View> }
                    </TouchableOpacity>
                    { this.props.children }
                </View>

        )

    }
}

const styles = StyleSheet.create({
    name: {
        fontWeight: '700',
    },
    description: {
        paddingBottom: 20
    },
    holder: {
        paddingVertical: 0,
        paddingHorizontal: 0,

    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.1)',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }
})

module.exports = SpotlightItem
