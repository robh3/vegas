import React, { Component } from 'React'
import {
    View, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'

import Text                     from './../../components/form/Text'
import colors                   from './../../resources/styles/colors'
import SpotlightItem               from './SpotlightItem'
import Icon                     from 'react-native-vector-icons/SimpleLineIcons'

class Spotlight extends Component {



    render() {
        let data = this.props.data


        return (
                <SpotlightItem thumb={this.props.thumb} width={this.props.width} height={this.props.height} data={data} offset={data.offset} onPress={ this.props.onPress } style={[ this.props.style || {}, ]} overlay={true}>
                    { data.icon &&
                        <Icon name='heart' size={20} style={ styles.icon }/>
                    }
                    {
                        data.name1 &&
                        <View style={ styles.titleHolder}>
                            <Text style={ styles.titleText } type='spanWhite'>{ data.name }</Text>
                        </View>

                    }
                    {
                        data.description1 &&
                        <View style={ styles.descriptionHolder}>
                            <Text style={ styles.descriptionText } type='spanWhite'>{ data.description }</Text>
                        </View>
                    }

                </SpotlightItem>
        )
    }
}

const styles = StyleSheet.create({
    holder: {
        paddingVertical: 0,
        borderBottomWidth: 0,
         //marginHorizontal: 5
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: 'transparent',
        color: colors.txtWhite,
        zIndex: 2
    },
    descriptionHolder: {
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    titleHolder: {
        alignItems: 'center',
        paddingTop: 10,

    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    descriptionText: {
        textAlign: 'center'
    }
})

module.exports = Spotlight
