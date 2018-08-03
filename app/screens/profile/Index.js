'use strict'
import React, { Component } from 'react'
import {
    View, Image, StyleSheet, TouchableOpacity, FlatList
} from 'react-native'

import Container            from './../../components/Container'
import Text                 from './../../components/form/Text'
import colors               from './../../resources/styles/colors'
import Icon                 from 'react-native-vector-icons/SimpleLineIcons'
import profileData          from './../../data/profile'
import NavBar               from './../../components/NavBar'
import Swiper                                   from './../../components/Swiper'
import ListPanel                                from './../../components/ListPanel'
import IconView                                 from '../../components/RoundIconView'
import exploreData                              from './../../data/explore'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: profileData.data
        }
    }

    render() {
        const { params } = this.props.navigation.state; 
        return (
            <Container>
                {
                    (params && params.showNavbar)
                    ?
                    <NavBar navigator={ this.props.navigation } headerLeftIconStyle={ styles.headerLeftIconStyle } />
                    :
                    null
                }
                <View style={ styles.container }>
                     <FlatList
                        enableEmptySections={ true }
                        ListHeaderComponent={() =>  this.renderTopics() }
                        data={ this.state.dataSource }
                        renderItem={ this._renderRow }
                        keyExtractor={(item, index) => index.toString()}
                        removeClippedSubviews={false}
                     />
                </View>
            </Container>
        )
    }



    renderTopics() {
        let itemTopics = (
            exploreData.activity.map((item, idx) => {
                return <IconView rounded key={ item.id } data={item} onPress={ this.onPressSeeAll.bind(this, (''), { data: {item} }) }/>
            })
        )



        return (
            <View style={ styles.headerHolder }>

                <ListPanel
                    hideSeeAll={true}
                    hideTitle={true}>
                    { this._renderHeader() }
                    <Swiper style={{marginBottom: 15}}>
                        { itemTopics }
                    </Swiper>
                </ListPanel>


            </View>
        )
    }

    onPressSeeAll(index, data) {
        this.props.navigation.navigate(index, data)
    }

    _renderRow = (data) => {
        let rowData = data.item;
        return (
            <TouchableOpacity onPress={(rowData) => this._onPressRow(rowData)} style={ styles.row }>
                <View style={ styles.rowLeftParts }>
                    <Icon style={ styles.rowIcon } name={ rowData.iconName } size={20} />
                    <Text type='h4' style={{paddingLeft: 10}}>{ rowData.name }</Text>
                </View>
                <View style={ styles.rowRightParts }>
                    <Icon style={[styles.rowIcon]} name="arrow-right" size={15} />
                </View>
            </TouchableOpacity>
        )
    }

    _renderHeader() {
        return (
            <View style={ styles.header }>
                <View style={ styles.userInfosHolder }>
                    <Image style={ styles.avatar } source={{ uri: 'https://media.licdn.com/dms/image/C5603AQEFjvdSxWwu2g/profile-displayphoto-shrink_200_200/0?e=1534982400&v=beta&t=cPQvNKomi7YW-nlsJ1Ex27xRozkv83pgVN7iixWDEPU' }} />
                    <View style={ styles.userInfos }>
                        <Text type='h1' style={ styles.username }>Rob Howard</Text>
                        <Text type='h5'>@robh3</Text>
                    </View>

                </View>
            </View>
        )
    }

    _onPressRow() {

    }
}

const styles = StyleSheet.create({
    container: {
        //padding: 25,
        //paddingHorizontal: 25,
        //flex: 1
    },
    headerLeftIconStyle: {
        color: colors.txtDark
    },
    header: {
        //marginTop: 20,
        paddingHorizontal: 25,
        marginBottom: 20
    },
    userInfosHolder: {
        flexDirection: 'row',
    },
    avatar: {
        width: 60,
        height: 60,

    },
    userInfos: {
        height: 50,
        paddingLeft: 15,
    },
    username: {
        fontWeight: '700'
    },
    description: {
        fontSize: 12,
        color: colors.txtDescription,
        marginTop: 2
    },
    row: {
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    rowLeftParts: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center'
    },
    rowRightParts: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rowIcon: {
        color: colors.txtDescription,
        width: 20
    }
})

module.exports = Profile
