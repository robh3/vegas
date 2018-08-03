'use strict'
import React, { Component } from 'react'
import {
    StyleSheet, View, TouchableOpacity, Image, FlatList
} from 'react-native'

import Container                from './../../components/Container'
import NavBar                   from './../../components/NavBar'
import Text                     from './../../components/form/Text'
import InputSearch              from './../../components/form/InputSearch'
import colors                   from './../../resources/styles/colors'
import Icon                     from 'react-native-vector-icons/SimpleLineIcons'

let recentSearches = [
    'Beautiful Places', 'Hotel', 'Experience'
]

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: recentSearches
        }
    }

    render() {
        return (
            <Container>
                <NavBar navigator={ this.props.navigation } headerLeftIconStyle={ styles.headerLeftIconStyle } />
                <View style={ styles.holder }>
                    <View style={ styles.searchHolder }>
                        <InputSearch />
                    </View>
                </View>
                <FlatList
                    style={ styles.holder }
                    ListHeaderComponent={() => this.renderHeader() }
                    enableEmptySections={ true }
                    data={ this.state.dataSource }
                    renderItem={(rowData) => this._renderRow(rowData) }
                    keyExtractor={(item, index) => index.toString()}
                    removeClippedSubviews={false}
                />
            </Container>
        )
    }

    renderHeader() {
        return (
            <View style={ styles.recentSeachesTitleHolder }>
                <Text type='h5' style={ styles.recentSeachesTitle }>Recent searches</Text>
                <TouchableOpacity onPress={ this._clearRecentSearches }>
                    <Icon style={ styles.icoClose } name='close' size={ 20 } />
                </TouchableOpacity>
            </View>
        )
    }

    _renderRow(data) {
        let rowData = data.item;
        return (
            <TouchableOpacity onPress={ this._onSubmit }>
                <Text style={ styles.searchStr }> <Icon style={ styles.headerLeftIconStyle } name='location-pin' size={ 15 } /> { rowData }</Text>
            </TouchableOpacity>
        )
    }

    _clearRecentSearches = () => {

    }

    _onSubmit = () => {
        this.props.navigation.goBack();
    }
}

const styles = StyleSheet.create({
    headerLeftIconStyle: {
        color: colors.txtWhite
    },
    holder: {
        paddingHorizontal: 25
    },
    searchHolder: {
        paddingBottom: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: colors.bdLine
    },
    recentSeachesTitleHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    recentSeachesTitle: {
        marginBottom: 10
    },
    searchStr: {
        marginBottom: 25,
        fontSize: 20,
        fontWeight: '700'
    },
    icoClose: {
        color: colors.txtDark
    }
})

module.exports = Search
