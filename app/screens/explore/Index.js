'use strict'
import React, { Component } from 'react'
import {
    StyleSheet, View, ScrollView, FlatList, Dimensions, RefreshControl, TouchableOpacity, Animated, LayoutAnimation
} from 'react-native'

import GridView                             from 'react-native-super-grid';
import Container                            from './../../components/Container'
import Grid                                 from './../../components/Grid'
import Swiper                             from './../../components/Swiper'
import SearchBar                            from './../../components/SearchBar'
import ListPanel                            from './../../components/ListPanel'
import Text                                 from './../../components/form/Text'
import Avatar                               from './../../components/thumbs/Avatar'
import Button                               from './../../components/form/Button'
import Spotlight                            from './../../components/thumbs/Spotlight'
import ThumbSingleItemWithPrice             from './../../components/thumbs/SingleItemWithPrice'
import ThumbDestination                     from '../../components/thumbs/Poster'
import colors                               from './../../resources/styles/colors'
import Icon                                 from 'react-native-vector-icons/SimpleLineIcons'
import IconView                             from '../../components/IconView'
import FAIcon                               from 'react-native-vector-icons/FontAwesome'
import exploreData                          from './../../data/explore'
import Moment                               from 'moment';

let {width} = Dimensions.get('window');

class Explore extends Component {

    constructor(props) {
        super(props);

        this._animatedValue = new Animated.Value(0);

        this.state = {
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

    render() {

        const startDay = Moment(new Date()).subtract(1, 'days');;
        const totalDaysCount = 1;
        let daysArray = [];


         for (let i = 0; i < totalDaysCount; i++) {
             daysArray.push(
                this.renderDay(startDay.add(1, 'day'))
             )
         }

        let itemWidth = (width - 40) / 2
        let itemSponsored = (
            exploreData.spotlight.map((item, idx) => {
                return <ThumbDestination onPress={ this._onPress.bind(this, ('DetailModal'), {data: {item}})} style={ styles.thumb } width={itemWidth} key={ item.id } data={item}/>
            })
        )


        return (
            <Container statusBarStyle={ styles.statusBarStyle }>
                { this.state.isNavBarVisible ? this.renderNavBar() : null }

                <ScrollView
                    ref={(c) => { this._scrollView = c; }}
                    onScroll={this._onScroll}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }>
                    <TouchableOpacity onPress={ this._onPress.bind(this, ('SearchModal'))}>
                        <View style={{marginVertical: 10, marginHorizontal: 15, alignItems: 'center', flexDirection: 'row', width: 215, backgroundColor: 'purple', padding: 3,  borderRadius: 10}}>
                            <IconView type="FontAwesome" icon="map-marker" size={12} style={{color: '#ffffff'}} />
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}> My location: Current location</Text>
                        </View>
                    </TouchableOpacity>

                    { daysArray }


                </ScrollView>

            </Container>
        )
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

    _listViewOffset = 0;

    _onScroll = (event) => {

        // Simple fade-in / fade-out animation
        const CustomLayoutLinear = {
            duration: 200,
            create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
            delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity }
        }
        // Check if the user is scrolling up or down by confronting the new scroll position with your own one
        const currentOffset = event.nativeEvent.contentOffset.y;
        const direction = (currentOffset > 0 && currentOffset > this._listViewOffset)
            ? 'down'
            : 'up';



        // If the user is scrolling down (and the action-button is still visible) hide it
        const isNavBarVisible = direction === 'up'
        if (isNavBarVisible !== this.state.isNavBarVisible) {
            LayoutAnimation.configureNext(CustomLayoutLinear)
            this.setState({ isNavBarVisible })
        }

        if (currentOffset <= 0) this.setState({ isNavBarVisible: true });

        // Update your scroll position
        this._listViewOffset = currentOffset

    }

    getGreetingTime (m) {
        var g = null; //return g

        if(!m) { return; } //if we can't find a valid or filled moment, we return.

        var split_afternoon = 12 //24hr time to split the afternoon
        var split_evening = 17 //24hr time to split the evening
        var currentHour = m;

        if(currentHour >= split_afternoon && currentHour <= split_evening) {
            g = "Tonight";
        } else if(currentHour >= split_evening) {
            g = "Tonight";
        } else {
            g = "Today";
        }

        return g;
    }

    renderNavBar() {
        let searchIcon = ( <FAIcon name='search' size={16} color={colors.txtWhite} /> );
        return (
            <View sytle={styles.navBarHolder}>
                <View style={ styles.navBar }>
                    <TouchableOpacity activeOpacity={1.0} onPress={ this._onPress.bind(this, ('SearchModal')) } >
                        <SearchBar icon={ searchIcon } placeholder= 'What do you want to do?'  />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    renderDay(param) {

        const date = new Date();
        let sameDay = false;

        if (Moment(param).unix() == Moment(date).unix()) {
            sameDay = true;
        }

        let dayOfWeek = sameDay ? this.getGreetingTime(Moment(date).format('H')) : Moment(param).format('dddd');
        let dateFormat = sameDay ? Moment(date).format('dddd, MMMM D') : Moment(param).format('MMMM D');

        let thumbWidth = Dimensions.get('window').width - 5;

        let itemThumbs = (
            exploreData.spotlight.map((item, idx) => {
                if (item.id == 1) {
                    return <Spotlight style={{borderRadius: 8, paddingBottom: 30}} width={thumbWidth} height={thumbWidth} key={ item.id }
                                      data={item} onPress={ this._onPress.bind(this, ('DetailModal'), {data: {item}})}/>
                }
            })
        );

        let itemThumbs2 = (
            exploreData.spotlight.map((item, idx) => {
                if (item.id > 1) {
                    return <Spotlight style={{borderRadius: 8, paddingVertical: 5, paddingBottom: 35}} width={(thumbWidth / 2) + 8} height={(thumbWidth / 2)} key={ item.id }
                                      data={item} onPress={ this._onPress.bind(this, ('DetailModal'), {data: {item}})}/>
                }
            })
        );



        return (
            <View>
            <View style={styles.swiperContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.itemLeft}>
                    <Text type='h4' style={styles.date}>{dateFormat.toUpperCase()}</Text>
                    <Text type='h1' style={styles.bold}>{dayOfWeek}</Text>
                </View>

            </View>
                {itemThumbs}

            </View>
                <Grid style={{paddingHorizontal: 15}}>
                    {itemThumbs2}
                </Grid>

            </View>

        )
    }


    renderSponsored() {

        return(
            <View style={ styles.headerHolder }>
                { this.renderSpotlightList() }

            </View>


        )
    }


    renderReceommended() {

        return(
            <View style={ styles.headerHolder }>
                <Text style={styles.headerTitle} type='h4'>Related to Items You've Viewed</Text>
            </View>
        )
    }


    renderTopics() {
        let itemThumbs = (
            exploreData.categories.map((item, idx) => {
                return <IconView rounded size={50} key={ item.id } data={item} onPress={ this._onPress.bind(this, ('Listings'), { navTitle: item.name, data: {item} }) }/>
            })
        )
        return (
            <View style={ styles.headerHolder }>
                <ListPanel
                    hideSeeAll={true}
                    hideTitle={false}
                    title='Explore'>
                    <Swiper>
                        { itemThumbs }
                    </Swiper>
                </ListPanel>
            </View>
        )
    }


    renderSpotlightList(params) {

        let itemThumbs = (
            exploreData.spotlight.map((item, idx) => {
               return <Spotlight style={{borderRadius: 8}} height={275} key={ item.id } data={item} onPress={ this._onPress.bind(this, ('Detail'), { data: {item} })}/>
            })
        )

        let title = params ? 'Explore ' + params : '';

        return (
                <View style={styles.swiperContainer}>
                        { itemThumbs }
                </View>

        )
    }

    renderConnections(params) {
        let itemThumbs = (
            exploreData.connections.map((item, idx) => {
                return <ThumbDestination key={ item.id } data={item} onPress={ this._onPress.bind(this, ('UserProfile'), { data: {item} })}/>
            })
        )
        return (
            <ListPanel
                hideSeeAll={true}
                title={params}>
                <Swiper>
                    { itemThumbs }
                </Swiper>
            </ListPanel>
        )
    }


    renderEvents(params) {
        let title = params ? 'Events in ' + params : 'Popular Events';
        let thumbWidth = (width - 40) / 2
        let size = 4;
        let itemThumbs = (
            exploreData.places.slice(0, size).map((item, idx) => {
                return <ThumbDestination width={thumbWidth} key={ item.id } data={item} onPress={ this._onPress.bind(this, ('Detail'), { data: {item} })}/>
            })
        )



        return (
            <ListPanel
                title={title}
                hideSeeAll={true}
                onPressSeeAll={ this._onPress.bind(this, 'Places') }>
                <Grid>
                    { itemThumbs }
                </Grid>
                <View style={ styles.btnHolder }>
                    <Button onPress={ this._onPress.bind(this, ('Listings'), { title: title, navTitle: 'Events' }) }  title='Show More Events'></Button>
                </View>
            </ListPanel>
        )
    }


    renderPlaces(params) {
        let title = params ? 'Places in ' + params : 'Popular Places';
        let thumbWidth = (width - 40) / 2
        let limit = 4;
        let itemThumbs = (
            exploreData.places.slice(0, limit).map((item, idx) => {
               return <ThumbDestination width={thumbWidth} key={ item.id } data={item} onPress={ this._onPress.bind(this, ('Detail'), { data: {item} })}/>
            })
        )



        return (
            <ListPanel
                title={title}
                hideSeeAll={true}
                onPressSeeAll={ this.onPressSeeAll.bind(this, 'Places') }>
                <Grid>
                    { itemThumbs }
                </Grid>
                <View style={ styles.btnHolder }>
                    <Button onPress={ this.onPressSeeAll.bind(this, ('Listings'), { title: title, navTitle: 'Places' }) }  title='Show More Places'></Button>
                </View>
            </ListPanel>
        )
    }

    _onPress(index, data) {
        this.props.navigation.navigate(index, data)
    }



}

const styText = { color: colors.txtDark }
const styles = StyleSheet.create({
    title: {
        //fontWeight: 'bold'
    },
    header: {
        flexDirection: 'row',

        paddingLeft: 15,
        paddingVertical: 10,

    },
    itemLeft: {
      paddingTop: 10,
      paddingBottom: 10,
    },
    grid: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
    },
    gridItem: {
        margin:5,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridItemImage: {
        width: 100,
        height: 100,
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 50,
    },
    gridView: {
        flex: 1,
    },
    itemRight: {
        paddingTop: 10,
        paddingBottom: 10,

    },
    rowIcon: {
        color: colors.bdWhite,

    },
    bold: {
        fontWeight: '800'
    },
    date: {
        color: colors.txtDescription,
        fontSize: 14
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    swiperContainer: {
        paddingTop: 5,
        paddingHorizontal: 15,
        borderRadius: 8,

    },
    statusBarStyle: {
        backgroundColor: colors.bgDark
    },
    btnHolder: {
        padding: 25
    },
    navBarHolder: {
        position: 'absolute',
        left:     0,
        top:      0,
        zIndex: 999
    },
    navBar: {
        height: 75,
        justifyContent: 'center',
        backgroundColor: colors.bgDark,
        paddingHorizontal: 15,
    },
    headerHolder: {
        paddingTop: 0,

    },
    headerTitle: {
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 10,
        fontWeight: 'bold'
    },
    logo: {
        ...styText,
        marginTop: 10
    },
    siteName: {
        marginTop: 30,
        width: 250
    },
    btnHeader: {
        width: 160,
        height: 40,
        marginVertical: 70,
        borderWidth: 2
    },
    btnHeaderTitleStyle: {
        fontSize: 14,
        fontWeight: '700'
    }
})
module.exports = Explore
