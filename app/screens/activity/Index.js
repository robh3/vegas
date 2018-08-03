'use strict'
import React, { Component } from 'react'
import {
    StyleSheet, View, FlatList, Dimensions, TouchableOpacity
} from 'react-native'

import Container                                from './../../components/Container'
import Grid                                     from './../../components/Grid'
import Swiper                                   from './../../components/Swiper'
import ListPanel                                from './../../components/ListPanel'
import ThumbSingleItem                  from './../../components/thumbs/SingleItem'
import ThumbMultipleItems               from './../../components/thumbs/MultipleItems'
import Text                                     from './../../components/form/Text'
import Stories                         from './../../components/thumbs/Stories'
import items                                    from './../../data/places'
import NavBar                                   from './../../components/NavBar'
import colors                                   from './../../resources/styles/colors'
import Avatar                                   from './../../components/thumbs/Avatar'
import IconView                                 from '../../components/RoundIconView'
import feed                                    from './../../data/saved'
import exploreData                              from './../../data/explore'



let {width} = Dimensions.get('window')

class Activity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: feed
        }
    }


    componentDidMount() {
        this.props.navigation.setParams({
            scrollToTop: this._scrollToTop,
        });
    }

    _scrollToTop = () => {
        // Scroll to top, in this case I am using FlatList
        if (!!this._scrollView) {
            this._scrollView.scrollToOffset({ offset: 0, animated: true });
        }
    }

    render() {

        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const navTitle = navigation.getParam('navTitle');
        const data = navigation.getParam('data', []);

        if (data) {
            let dataTitle = data.item;
        }





        const { params } = this.props.navigation.state;
        return (
            <Container>
                <NavBar navigator={ this.props.navigation } hideBackButton title="Socialnights" headerLeftIconStyle={ styles.headerLeftIconStyle } />

                <FlatList
                        style={ styles.headerHolder }
                        ref={(c) => { this._scrollView = c; }}
                        ListHeaderComponent={() =>  this.renderConnections() }
                        enableEmptySections={ true }
                        data={ this.state.dataSource }
                        renderItem={ this.renderRow }
                        removeClippedSubviews={false}
                        keyExtractor={(item, index) => index.toString()}
                    />

            </Container>
        )
    }

    renderRow = (data) => {
        let rowData = data.item;
        if(rowData.thumbs.length >= 3) {
            let thumbs = rowData.thumbs
            let formatData = {
                name: rowData.name,
                bigImageUri: thumbs[0]['uri'],
                smallTopImageUri: thumbs[1]['uri'],
                smallBottomImageUri: thumbs[2]['uri'],
                description: rowData.description
            }
            return <ThumbMultipleItems full data={formatData} />
        } else {

            let width = Dimensions.get('window').width;

            let thumb = rowData.thumbs[0]
            let formatData = {
                name: rowData.name,
                description: rowData.description,
                thumb: thumb.uri,
                ratio: thumb.ratio
            }
            return (
                <ThumbSingleItem width={width} data={formatData} />
            )
        }

    }

    renderConnections(params) {
        let itemThumbs = (
            exploreData.connections.map((item, idx) => {
                return <Stories key={ item.id } data={item} onPress={ this.onPressSeeAll.bind(this, ('UserProfile'), { data: {item} })}/>
            })
        )
        return (
                <View>
                <Swiper style={{paddingBottom: 15}}>
                    { itemThumbs }
                </Swiper>

                </View>
        )
    }



    renderHeader() {
        let itemTopics = (
            exploreData.snaptivity.map((item, idx) => {
                return <IconView rounded key={ item.id } data={item} onPress={ this.onPressSeeAll.bind(this, ('Listings'), { data: {item} }) }/>
            })
        )



        return (
            <View style={ styles.headerHolder }>

                    <Swiper>
                        { itemTopics }
                    </Swiper>

            </View>
        )
    }

    onPressSeeAll(index, data) {
        this.props.navigation.navigate(index, data)
    }


}

const styles = StyleSheet.create({
    headerLeftIconStyle: {
        color: colors.txtWhite
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingBottom: 10,

    },
    title: {
        fontWeight: 'bold'
    },
    headerHolder: {
        paddingTop: 15,
    },
    screenTitle: {
        fontWeight: '700',
        paddingVertical: 30,
        paddingHorizontal: 15
    },
    holder: {
        paddingHorizontal: 25,
        flex: 1
    },
    thumb: {
        marginBottom: 30
    },
    navBar: {
        marginTop: 30
    }
})

module.exports = Activity
