'use strict'

import Index                    from './Index'
import colors                   from './../../resources/styles/colors'
import { StackNavigator }       from 'react-navigation'

const options = {
    header: null
}
const StackActivity = StackNavigator(
    {
        Index: {
            screen: Index
        }
    },
    {
        navigationOptions: options
    }
)

module.exports = StackActivity
