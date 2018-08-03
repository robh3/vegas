'use strict'
import React, { Component } from 'react'
import {
    StyleSheet, View, FlatList, ScrollView, Dimensions
} from 'react-native'

import Container                                from './../../components/Container'
import Text                                     from './../../components/form/Text'
import ThumbSingleItemWithPrice                 from './../../components/thumbs/SingleItemWithPrice'
import items                                    from './../../data/homes'
import NavBar                                   from './../../components/NavBar'
import colors                                   from './../../resources/styles/colors'
import AsyncImage from "../../components/AsyncImage";

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: items
        }
    }

    render() {

        const { navigation } = this.props;
        const data = navigation.getParam('data');
        let imgWidth = Dimensions.get('window').width;
        let imgHeight = 400;

        console.log(data);

        return (
            <Container>
                <ScrollView>
                <AsyncImage source={{uri: data.item.thumb}} style={{width: imgWidth, height: imgHeight}}/>
                    <View style={ styles.holder}>
                        <NavBar navigator={ this.props.navigation } headerLeftIconStyle={ styles.headerLeftIconStyle } />
                        <Text style={ styles.screenTitle } type='h1'>{ data.item.name }</Text>
                    </View>
                </ScrollView>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    headerLeftIconStyle: {
        color: colors.txtWhite,
    },
    screenTitle: {
        fontWeight: '800',
        paddingVertical: 30
    },
    holder: {
        paddingHorizontal: 25,
        position: 'absolute',
        flex: 1
    },
    thumb: {
        marginVertical: 20,
        marginHorizontal: 0
    }
})

module.exports = Detail
