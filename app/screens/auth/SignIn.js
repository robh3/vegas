'use strict'
import React, { Component } from 'react'
import {
    View, StyleSheet, KeyboardAvoidingView, TouchableOpacity
} from 'react-native'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { ActionCreators } from './../../redux/actions';
import Container                from './../../components/Container'
import NavBar                   from './../../components/NavBar'
import PopupMessage             from './../../components/form/PopupMessage'
import Text                     from './../../components/form/Text'
import Button                   from './../../components/form/Button'
import Input                    from './../../components/form/Input'
import colors                   from './../../resources/styles/colors'

class SignIn extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            emailValid: false,
            passwordValid: false,
            containerStyle: 'container',
            status: 'error',
            errorMessage: 'Incorrect email or password. Please try again.'
        };
    }

    renderHeaderRight() {
        return <TouchableOpacity style={{ paddingRight: 25 }}>
                    <Text type='h5White'>Forgot password</Text>
                </TouchableOpacity>
    }

    onSegmentChange = (segment) => {
        this.setState({behavior: segment.toLowerCase()});
    };

    render() {
        return (
            <Container style={ styles[this.state.containerStyle] }>
                <NavBar navigator={ this.props.navigation } headerRight={ this.renderHeaderRight() } />

                <View style={ styles.holder }>
                    <Text type='h1White'>Log In</Text>
                    <Input
                        valid={ this.state.emailValid }
                        type='email'
                        onChangeText={ this.onChangeEmail }
                        holderStyle={ styles.inpEmail }
                        title='EMAIL ADDRESS' />

                    <Input
                        valid={ this.state.passwordValid }
                        onChangeText={ this.onChangePassword }
                        type='password'
                        holderStyle={ styles.inpEmail }
                        title='PASSWORD' />
                </View>
                <KeyboardAvoidingView behavior='position' style={ styles.btnSubmitHolder }>
                    <Button onPress={ this.onPressSubmit } type='submit' />
                </KeyboardAvoidingView>

                <PopupMessage ref='popup' status={this.state.status} errorMessage='' />
            </Container>
        )
    }

    onPressSubmit = () => {

        this.setState({ loadingVisible: true });
        const { navigate } = this.props.navigation;

        if(this.state.email == 'success') {
            this.setState({
                status: 'success'
            })
            this.refs.popup.show()

        } else if (this.state.email == 'error') {
            this.setState({
                status: 'error',
                containerStyle: 'containerError'
            })
            this.refs.popup.show()

        } else {
            this.props.navigation.dispatch(
                NavigationActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'TabIndex' })]
                })
            )
        }
    }

    onChangeEmail = (value) => {
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailValid = (value) ? true : false
        this.setState({
            email: value,
            emailValid,
            containerStyle: 'container'
        });

        if (!this.state.emailValid) {
            if (emailCheckRegex.test(value)) {
                this.setState({ emailValid: true });
            }
        } else {
            if (!emailCheckRegex.test(value)) {
                this.setState({ emailValid: false });
            }
        }


    }

    onChangePassword = (value) => {
        let passwordValid = (value) ? true : false
        this.setState({
            password: value,
            passwordValid,
            containerStyle: 'container'
        });

        if (!this.state.passwordValid) {
            if (value.length > 4) {
                //Password has to be at least 4 characters long
                this.setState({ passwordValid: true });
            }
        } else if (value <= 4) {
            this.setState({ passwordValid: false });
        }

    }

    onPressClose = () => {
        this.setState({
            showError: false
        })
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgDark
    },
    containerError: {
        backgroundColor: colors.bgError
    },
    holder: {
        padding: 25
    },
    inpEmail: {
        marginTop: 50
    },
    btnSubmitHolder: {
        position:'absolute',
        right: 25,
        bottom: 0,
        paddingBottom: 25
    }
})

const mapStateToProps = (state) => {
    return {
        loggedInStatus: state.loggedInStatus,
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);


