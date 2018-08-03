import React, { Component } from 'React'
import {
    View, StyleSheet, TouchableOpacity
} from 'react-native'

import colors                               from './../resources/styles/colors'
import Text                                 from './../components/form/Text'
import SimpleLineIcons                      from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome                          from 'react-native-vector-icons/FontAwesome'
import Entypo                               from 'react-native-vector-icons/Entypo'
import EvilIcons                            from 'react-native-vector-icons/EvilIcons'
import Feather                              from 'react-native-vector-icons/Feather'
import Foundation                           from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons               from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons                        from 'react-native-vector-icons/MaterialIcons'
import Octicons                             from 'react-native-vector-icons/Octicons'
import Zocial                               from 'react-native-vector-icons/Zocial'
import IonIcons                             from 'react-native-vector-icons/Ionicons'




class IconView extends Component {
    render() {

        let data = this.props.data
        let iconSize = 50

        const type = data.type || {}
        const txtType = type + 'Txt'
        return (
            <TouchableOpacity activeOpacity={1.0} onPress={ this.props.onPress } style={[ styles.holder, this.props.style || {} ]}>
                <View style={[ styles.default, this.props.style || {} ]}>
                { type == 'FontAwesome' && <FontAwesome style={[ styles.defaultTxt, styles[txtType], this.props.iconStyle || {} ]} name={data.icon || this.props.icon} size={this.props.size || iconSize} /> }
                { type == 'Entypo' && <Entypo style={[ styles.defaultTxt, this.props.iconStyle || {} ]} name={data.icon || this.props.icon} size={this.props.size || 20} /> }
                { type == 'EvilIcons' && <EvilIcons style={[ styles.defaultTxt, styles[txtType], this.props.iconStyle || {} ]} name={data.icon || this.props.icon} size={this.props.size || iconSize} /> }
                { type == 'Feather' && <Feather style={[ styles.defaultTxt, styles[txtType], this.props.iconStyle || {} ]} name={data.icon || this.props.icon} size={this.props.size || iconSize} /> }
                { type == 'Foundation' && <Foundation style={[ styles.defaultTxt, styles[txtType], this.props.iconStyle || {} ]} name={data.icon || this.props.icon} size={this.props.size || iconSize} /> }
                { type == 'MaterialCommunityIcons' && <MaterialCommunityIcons style={[ styles.defaultTxt, styles[txtType], this.props.titleStyle || {} ]} name={data.icon || this.props.icon} size={this.props.size || iconSize} /> }
                { type == 'MaterialIcons' && <MaterialIcons style={[ styles.defaultTxt, styles[txtType], this.props.iconStyle || {} ]} name={data.icon || this.props.icon} size={this.props.size || iconSize} /> }
                { type == 'Octicons' && <Octicons style={[ styles.defaultTxt, styles[txtType], this.props.iconStyle || {} ]} name={data.icon || this.props.icon} size={this.props.size || iconSize} /> }
                { type == 'Zocial' && <Zocial style={[ styles.defaultTxt, styles[txtType], this.props.iconStyle || {} ]} name={data.icon || this.props.icon} size={this.props.size || iconSize} /> }
                { type == 'IonIcons' && <IonIcons style={[ styles.defaultTxt, this.props.iconStyle || {} ]} name={data.icon || this.props.icon} size={this.props.size || iconSize}  /> }
                { type == 'SimpleLineIcons' && <SimpleLineIcons style={[ styles.defaultTxt, this.props.iconStyle || {} ]} name={data.icon || this.props.icon} size={this.props.size || iconSize}  /> }

                </View>

                { data.name && <Text numberOfLines={1} ellipsizeMode='tail' style={[ styles.name ]}>{ data.name || this.props.title }</Text> }

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    holder: {
        marginHorizontal: 5,
    },

    name: {
        fontWeight: '600',
        paddingTop: 8,
        textAlign:'center',

    },

    // Border button type by default
    default: {
        height: 75,
        width: 75,
        borderRadius: 75 / 2,
        borderWidth: 3,
        borderColor: colors.bgPlaceholder,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },
    defaultTxt: {
        color: colors.txtWhite,
        fontSize: 30
    },
    facebook: {
        backgroundColor: colors.bgWhite
    },
    facebookTxt: {
        color: colors.txtMain
    },
    // Button with background color
    submit: {
        backgroundColor: colors.bgWhite,
        width: 50
    },
    submitTxt: {
        color: colors.txtMain
    },
    borderMain: {
        borderColor: colors.bdMain,
        borderRadius: 5,
        paddingHorizontal: 25
    },
    borderMainTxt: {
        color: colors.txtWhite
    }
})

module.exports = IconView
