'use strict'
import React, { Component } from 'react'
import {
    StyleSheet, View, FlatList
} from 'react-native'

import Container                                from './../../components/Container'
import Text                                     from './../../components/form/Text'
import ThumbSingleItemWithPrice                 from './../../components/thumbs/SingleItemWithPrice'
import items                                    from './../../data/homes'
import NavBar                                   from './../../components/NavBar'
import colors                                   from './../../resources/styles/colors'

class Homes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: items
        }
    }

    render() {
        return (
            <Container>
                <NavBar navigator={ this.props.navigation } headerLeftIconStyle={ styles.headerLeftIconStyle } />
                <FlatList
                    style={ styles.holder }
                    ListHeaderComponent={() => <Text style={ styles.screenTitle } type='h1'>Spotlight</Text>}
                    enableEmptySections={ true }
                    data={ this.state.dataSource }
                    renderItem={ this.renderRow }
                    keyExtractor={(item, index) => index.toString()}
                    removeClippedSubviews={false}
                />
            </Container>
        )
    }

    renderRow = (data) => {
        let rowData = data.item;
        return (
            <ThumbSingleItemWithPrice style={ styles.thumb } data={rowData} />
        )
    }
}

const styles = StyleSheet.create({
    headerLeftIconStyle: {
        color: colors.txtWhite
    },
    screenTitle: {
        fontWeight: '800',
        paddingVertical: 30
    },
    holder: {
        paddingHorizontal: 25,
        flex: 1
    },
    thumb: {
        marginVertical: 20,
        marginHorizontal: 0
    }
})

module.exports = Homes
