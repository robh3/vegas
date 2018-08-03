'use strict'
import React, { PropTypes, Component } from 'react'
import {
    View, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'

import colors           from './../resources/styles/colors'
import Text             from './../components/form/Text'
import Icon             from 'react-native-vector-icons/FontAwesome'

class ListPanel extends Component {
    static defaultProps = {
        description: ''
    }

    constructor(props) {
        super(props)
    }

    render() {
        let headerLeftPartStyle = (this.props.description) ? { justifyContent: 'center' } : { flexDirection: 'row', alignItems: 'center' }
        return(
            <View>
                <View style={styles.holder}>
                    {
                        !this.props.hideHeader &&
                        <View style={ styles.header }>
                            {
                                !this.props.hideTitle &&
                                <View style={ headerLeftPartStyle }>
                                    <Text style={ styles.title } type='h2'>{ this.props.title }</Text>
                                    <Text>{ this.props.description }</Text>
                                </View>
                            }
                            {
                                !this.props.hideSeeAll &&
                                <TouchableOpacity activeOpacity={1.0} onPress={ this.props.onPressSeeAll }
                                                  style={ styles.headerRightPart }>
                                    <Text style={{marginRight: 10}}>See All</Text>
                                    <Icon style={ styles.icon } name='angle-right' size={ 23 }/>
                                </TouchableOpacity>
                            }
                        </View>
                    }
                    { this.props.children }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    holder: {
        flexDirection: 'column',
        paddingBottom: 20,

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 20,

    },
    headerRightPart: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: colors.txtDark
    },
    title: {
        fontWeight: 'bold'
    }
})

module.exports = ListPanel
