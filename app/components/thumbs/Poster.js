import React, { Component } from 'React'
import {
    View, Image, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'

import colors               from './../../resources/styles/colors'
import Text                 from './../form/Text'
import AsyncImage           from './../AsyncImage'


class Poster extends Component {
    render() {
        let data = this.props.data
        let imgWidth = (this.props.width) ? this.props.width : Dimensions.get('window').width / 4
        let imgHeight = imgWidth

        let round = this.props.rounded;

        return (
            <TouchableOpacity activeOpacity={1.0} onPress={ this.props.onPress } style={[ styles.holder, this.props.style || {} ]}>
                <View style = {styles.backgroundContainer}>
                    <AsyncImage style={[styles.backdrop, { width: imgWidth, height: imgHeight }]} source={{ uri: data.thumb }} placeholderColor={colors.bgPlaceholder}/>
                    <View style={styles.overlay}/>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.name]}>{ data.name }</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    name: {
        fontWeight: 'bold',
        fontSize: 12,
        padding: 5,
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: colors.bdWhite,
    },
   overlay: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 5,
    },
    backgroundContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    backdrop: {
        opacity: 0.95,
        backgroundColor: '#000000',
        borderRadius: 8,
    },
    holder: {
        marginHorizontal: 5,
        alignItems: 'center',

    }
})

module.exports = Poster
