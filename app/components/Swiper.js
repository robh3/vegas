'use strict'
import React, { Component } from 'react'
import {
    ScrollView
} from 'react-native'

class Swiper extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView
                style={this.props.style}
                contentContainerStyle={{ paddingHorizontal: 10,
                    justifyContent: 'space-between' }}
                horizontal={true}

                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={200}
            >
                { this.props.children }
            </ScrollView>
        )
    }
}

module.exports = Swiper
