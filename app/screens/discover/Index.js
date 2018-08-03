'use strict'
import React, { Component } from 'react'
import {
    StyleSheet, ScrollView, View, FlatList, RefreshControl, Dimensions, TouchableOpacity
} from 'react-native'

import Container                                from './../../components/Container'
import Grid                                     from './../../components/Grid'
import Swiper                                   from './../../components/Swiper'
import ListPanel                                from './../../components/ListPanel'
import ThumbSingleItem                          from './../../components/thumbs/SingleItem'
import ThumbMultipleItems                       from './../../components/thumbs/MultipleItems'
import Text                                     from './../../components/form/Text'
import ThumbDestination                         from '../../components/thumbs/Poster'
import items                                    from './../../data/places'
import NavBar                                   from './../../components/NavBar'
import colors                                   from './../../resources/styles/colors'
import Icon                                     from 'react-native-vector-icons/SimpleLineIcons'
import RoundIconView                            from '../../components/RoundIconView'
import IconView                                 from '../../components/IconView'
import feed                                     from './../../data/saved'
import exploreData                              from './../../data/explore'



let {width} = Dimensions.get('window')
class Discover extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataSource: feed,
            refreshing: false,
            isNavBarVisible: true,
            position: 'Fetching Location',
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
        };
    }

    _onRefresh() {
        this.setState({refreshing: true});
        //fetchData().then(() => { this.setState({refreshing: false});  });
        setTimeout(function(){
            //
        }, 25000);

        this.setState({refreshing: false})
    }


    componentDidMount() {
        this.props.navigation.setParams({
            scrollToTop: this._scrollToTop,
        });
    }

    _scrollToTop = () => {
        // Scroll to top, in this case I am using FlatList
        if (!!this._scrollView) {
            this._scrollView.scrollTo({ offset: 0, animated: true });
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

        let btnSearch = (
            <TouchableOpacity onPress={this._onPress.bind(this, ('SearchModal'))}>
                <IconView type="FontAwesome" icon="search" size={20} style={{color: colors.bdWhite, paddingRight: 5}} />
            </TouchableOpacity>
        )

        return (
            <Container>
                <NavBar title="Discover" titleStyle={{ paddingLeft: 35, fontSize: 20, fontWeight: 'bold' }} hideBackButton navigator={ this.props.navigation } headerRight={btnSearch}>
                </NavBar>


                { this._render() }



            </Container>
        )
    }

    _onPressRow(index, data) {
        this.props.navigation.navigate(index, data);
    }


    _render() {
        let itemWidth = (width - 40) / 2
        let itemSponsored = (
            exploreData.spotlight.map((item, idx) => {
                return <ThumbDestination onPress={ this._onPress.bind(this, ('Detail'), {data: {item}})} style={ styles.thumb } width={itemWidth} key={ item.id } data={item}/>
            })
        )


        // Categories
        let itemCategories = (
            exploreData.categories.map((rowData, idx) =>{
                if (rowData.inactive) return;
                return (
                    <View key={ rowData.id }>
                    <TouchableOpacity onPress={this._onPress.bind(this, ('Listings'), { data: {rowData} })} style={ styles.row }>
                        <View style={ styles.rowLeftParts }>
                            <IconView type={rowData.type} icon={rowData.icon} size={rowData.size || 20} style={styles.rowIcon} />
                            <Text type='h4'>  { rowData.name }  </Text>
                        </View>
                        <View style={ styles.rowRightParts }>
                            <Icon style={[styles.rowIcon]} name="arrow-right" size={15} />
                        </View>
                    </TouchableOpacity>
                    </View>
                )
            })
        )



        // Posts
        let thumbWidth = (width - 40) / 2
        let itemPosts = (
            items.map((item, idx) => {
                return <ThumbDestination onPress={ this._onPress.bind(this, ('Detail'), {data: {item}})} style={ styles.thumb } width={thumbWidth} key={ item.id } data={item}/>
            })
        )


        return (

            <ScrollView style={ styles.headerHolder }
                        ref={(c) => { this._scrollView = c; }}
                        onScroll={this._onScroll}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }>

                    <Swiper>
                        { itemSponsored }
                    </Swiper>
                <View style={{ backgroundColor: '#000000', paddingVertical: 15}}>
                    { itemCategories }
                </View>

                <View style={styles.header}>
                    <Text style={ styles.title } type='h2'>For You</Text>
                </View>
                <Grid>
                    { itemPosts }
                </Grid>

            </ScrollView>

        )
    }

    _onPress(index, data) {
        this.props.navigation.navigate(index, data)
    }


}

const styles = StyleSheet.create({
    container: {
        //paddingHorizontal: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        //paddingVertical: 15,

    },
    navBarHolder: {
           // flex: 1,
           // alignItems: 'center',
            //justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold'
    },
    headerLeftIconStyle: {
        color: colors.txtWhite
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
        marginBottom: 30,
        marginLeft: 5,
    },
    navBar: {
        //marginTop: 30
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    rowLeftParts: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rowRightParts: {
        height: 50,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    rowIcon: {
        color: colors.txtDescription,
        width: 20

    }
})

module.exports = Discover
