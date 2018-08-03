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

        const type = this.props.type || 'SimpleLineIcons';
        const icon = this.props.icon || {};
        const iconStyle = this.props.style || {};
        const iconSize = this.props.size || '10';

        const txtType = type + 'Txt'

        return (
            <TouchableOpacity activeOpacity={1.0} onPress={ this.props.onPress } style={[ styles.holder, this.props.holder || {} ]}>
                <View style={[ styles.default, this.props.style || {} ]}>
                { type == 'FontAwesome' && <FontAwesome style={[ styles.defaultTxt, styles[txtType], iconStyle ]} name={icon} size={iconSize} /> }
                { type == 'Entypo' && <Entypo style={[ styles.defaultTxt, iconStyle]} name={icon} size={iconSize} /> }
                { type == 'EvilIcons' && <EvilIcons style={[ styles.defaultTxt, styles[txtType], iconStyle ]} name={icon} size={iconSize} /> }
                { type == 'Feather' && <Feather style={[ styles.defaultTxt, styles[txtType], iconStyle ]} name={icon} size={iconSize} /> }
                { type == 'Foundation' && <Foundation style={[ styles.defaultTxt, styles[txtType], iconStyle ]} name={icon} size={iconSize} /> }
                { type == 'MaterialCommunityIcons' && <MaterialCommunityIcons style={[ styles.defaultTxt, styles[txtType], iconStyle ]} name={icon} size={iconSize}/> }
                { type == 'MaterialIcons' && <MaterialIcons style={[ styles.defaultTxt, styles[txtType], iconStyle ]} name={icon} size={iconSize} /> }
                { type == 'Octicons' && <Octicons style={[ styles.defaultTxt, styles[txtType], iconStyle ]} name={icon} size={iconSize} /> }
                { type == 'Zocial' && <Zocial style={[ styles.defaultTxt, styles[txtType], iconStyle ]} name={icon} size={iconSize} /> }
                { type == 'IonIcons' && <IonIcons style={[ styles.defaultTxt, iconStyle ]} name={icon} size={iconSize}  /> }
                { type == 'SimpleLineIcons' && <SimpleLineIcons style={[ styles.defaultTxt, iconStyle ]} name={icon} size={iconSize}  /> }
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    holder: {
        marginHorizontal: 5,
    },

    // Border button type by default
    default: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'

    },


})

module.exports = IconView
