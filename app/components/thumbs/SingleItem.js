import React, { Component } from 'React'
import {
    View, Image, StyleSheet, Dimensions, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native'

import colors               from './../../resources/styles/colors'
import Text                 from './../form/Text'
import AsyncImage           from './../AsyncImage'

class SingleItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            source: this.props.data.thumb || {},
        };
    }

    componentDidMount() {
        Image.getSize(this.props.data.thumb, (width, height) => {
            if (this.props.width && !this.props.height) {
                this.setState({width: this.props.width, height: height * (this.props.width / width)});
            } else if (!this.props.width && this.props.height) {
                this.setState({width: width * (this.props.height / height), height: this.props.height});
            } else {
                this.setState({width: width, height: height});
            }
        });
    }


    render() {

        let data = this.state.data;
        let imgWidth = Dimensions.get('window').width
        let imgHeight = this.state.height;

        return (
            <View style={[ styles.holder, this.props.style || {} ]}>
                <TouchableOpacity activeOpacity={1.0} onPress={ this.props.onPress } >
                    <AsyncImage style={[this.props.style || {}, { width: imgWidth, height: imgHeight }]} source={{ uri: this.props.data.thumb }} placeholderColor={colors.bgPlaceholder}/>
                    { this.props.overlay && <View style={ styles.overlay }></View> }
                </TouchableOpacity>
                { this.props.children }
            </View>
        )

    }
}

const styles = StyleSheet.create({
    name: {
        fontWeight: '700',
    },
    description: {
        paddingBottom: 20
    },
    holder: {
        paddingVertical: 20,
    },
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.1)',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    }
})

module.exports = SingleItem