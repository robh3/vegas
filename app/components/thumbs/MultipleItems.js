'use strict'
import React, { PropTypes, Component } from 'react'
import {
    View, Dimensions, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'

import colors               from './../../resources/styles/colors'
import Text                 from './../form/Text'
import AsyncImage           from './../AsyncImage'

const { width } = Dimensions.get('window')
const holderWidth = width
const smallImageWidth = (holderWidth / 3) - 1
const bigImageWidth = (smallImageWidth * 2) + 2

class MultipleItems extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let data = this.props.data
        return (
            <TouchableOpacity activeOpacity={1.0} onPress={ this.props.onPress } style={ styles.holder }>

                <View style={ styles.imagesHolder }>
                    {/* Since the image don't have borderRightWidth */}
                    <View style={ styles.bigImageHolder }>
                        <AsyncImage style={ styles.bigImage } source={{ uri: data.bigImageUri }} placeholderColor={colors.bgPlaceholder}/>
                    </View>
                    <View style={{ justifyContent: 'space-between'}}>
                        <AsyncImage style={ styles.smallImage } source={{ uri: data.smallTopImageUri }} placeholderColor={colors.bgPlaceholder}/>
                        <AsyncImage style={ styles.smallImage } source={{ uri: data.smallBottomImageUri }} placeholderColor={colors.bgPlaceholder}/>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    holder: {
        flexDirection: 'column',
        paddingVertical: 20,

    },
    bigImage: {
        width: bigImageWidth,
        height: bigImageWidth
    },
    bigImageHolder: {
        marginRight: 2
    },
    smallImage: {
        width: smallImageWidth,
        height: smallImageWidth
    },
    name: {
        fontWeight: '700',
        paddingLeft: 20,
    },
    description: {
        paddingBottom: 20,
        paddingLeft: 20,
    },
    imagesHolder: {
        flexDirection: 'row'
    }
})

module.exports = MultipleItems
