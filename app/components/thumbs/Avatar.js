import React, { Component } from 'React'
import {
    View, Image, StyleSheet, Dimensions, TouchableOpacity
} from 'react-native'

import colors               from './../../resources/styles/colors'
import Text                 from './../form/Text'
import AsyncImage           from './../AsyncImage'

class Avatar extends Component {
    render() {
        let data = this.props.data
        let imgWidth = (this.props.width) ? this.props.width : Dimensions.get('window').width / 5
        let imgHeight = imgWidth * data.ratio

        return (
            <TouchableOpacity activeOpacity={1.0} onPress={ this.props.onPress } style={[ styles.holder, this.props.style || {} ]}>
                <AsyncImage style={[{ width: imgWidth, height: imgHeight }, this.props.rounded ? { borderRadius: imgWidth / 2 } : '']} source={{ uri: data.thumb }} placeholderColor={colors.bgPlaceholder}/>
                <Text numberOfLines={1} ellipsizeMode='tail' style={[ styles.name, { width: imgWidth } ]}>{ data.name }</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    name: {
        fontWeight: '600',
        paddingTop: 5,
        textAlign:'center',

    },
    holder: {
        marginHorizontal: 5,
    }
})

module.exports = Avatar
