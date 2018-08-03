'use strict'

import Index                    from './Index'
import Homes                    from './Homes'
import Listings                   from './Listings'
import Search                   from './Search'
import Profile                  from '../profile/Index'
import Detail                   from './Detail'
import { StackNavigator }       from 'react-navigation'

const options = {
    header: null
}
const StackExplore = StackNavigator(
    {
        Index: {
            screen: Index
        },
        Homes: {
            screen: Homes
        },
        Listings: {
            screen: Listings
        },
        Search: {
            screen: Search
        },
        Detail: {
            screen: Detail
        }
    },
    {
        navigationOptions: options
    }
)

module.exports = StackExplore
