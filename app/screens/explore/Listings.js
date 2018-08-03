'use strict'
import React, { Component } from 'react'
import {
    StyleSheet, View, ScrollView, Dimensions, AsyncStorage, RefreshControl,
} from 'react-native'

import Container                                from './../../components/Container'
import Grid                                     from './../../components/Grid'
import Swiper                                   from './../../components/Swiper'
import ListPanel                                from './../../components/ListPanel'
import Text                                     from './../../components/form/Text'
import ThumbDestination                         from '../../components/thumbs/Poster'
import items                                    from './../../data/places'
import NavBar                                   from './../../components/NavBar'
import colors                                   from './../../resources/styles/colors'
import Avatar                                   from './../../components/thumbs/Avatar'
import IconView                                 from '../../components/RoundIconView'
import exploreData                              from './../../data/explore'
import api_url                                  from "./../../config"

let {width} = Dimensions.get('window');


class Listings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            refreshing: false,
            loading: false,
            page: 1,
            seed: 1,
            error: null,
        };
    }

    componentDidMount(){
        this.getPosts(true);
    }

    getPosts(swipe_refresh=false){
        this.setState({loading: true})
        if (this.state.next_url == '' || swipe_refresh) {
            var url = api_url + "/posts/"

        }else {
            var url = this.state.next_url
        }
        let data = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Token ' +  this.state.token
            }
        }
        fetch(url, data)
            .then(response => response.json())
            .then(jsonData => {
                this.setState({
                    posts: this.state.posts.cloneWithRows(jsonData.results),
                    loading:false,
                    next_url: jsonData.next,
                    store: jsonData.results
                })
            })
            .catch(error =>{
                console.log('error: ' + error)
                this.setState({loading: false})
            })
    }

    _onRefresh() {
        this.getPosts(swipe_refresh=true)
    }


    render() {

        const { navigation } = this.props;
        const title = navigation.getParam('title');
        const navTitle = navigation.getParam('navTitle');
        const data = navigation.getParam('data', []);

        if (data) {
            let dataTitle = data.item;
        }

        let thumbWidth = (width - 40) / 2


        let itemThumbs = (
            this.state.posts.map((item, idx) => {
               return <ThumbDestination style={ styles.thumb } width={thumbWidth} key={ item.id } data={item}/>
            })
        )

        return (
            <Container>
                <NavBar navigator={ this.props.navigation } selectCity title={navTitle} subtitle="Dallas, TX" headerLeftIconStyle={ styles.headerLeftIconStyle } />
                <ScrollView ref={(c) => { this._scrollView = c; }}
                            onScroll={this._onScroll}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }>
                    { this.renderTopics() }
                    <Grid>
                        { itemThumbs }
                    </Grid>
                </ScrollView>
            </Container>
        )
    }



    renderTopics() {
        let itemThumbs = (
            exploreData.topics.map((item, idx) => {
                return <IconView rounded key={ item.id } data={item} onPress={ this.onPressSeeAll.bind(this, ('Listings'), { data: {item} }) }/>
            })
        )
        return (
            <View style={ styles.headerHolder }>
                <ListPanel
                    hideSeeAll={true}
                    hideTitle={true}
                    title='Explore'>
                    <Swiper>
                        { itemThumbs }
                    </Swiper>
                </ListPanel>
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
    headerHolder: {
      paddingBottom: 0,
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
    }
})

module.exports = Listings
