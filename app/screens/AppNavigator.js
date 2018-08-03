'use strict'

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoggedOut                    from './auth/LoggedOut';
import SignIn                   from './auth/SignIn';
import SignUp                   from './auth/SignUp';
import TabIndex                 from './TabIndex';
import Detail                   from './explore/Detail';
import Search                   from './explore/Search';
import Profile                  from './profile/Index';
import Activity                 from './discover/Index';
import Trips                    from './connect/Index';
import Inbox                    from './inbox/Index';
import Camera                   from './camera/Index';

const options = {
    header: null,
}

export const AppNavigator = StackNavigator({
        LoggedOut:  { screen: LoggedOut }, // logged out
        SignIn: { screen: SignIn },
        SignUp: { screen: SignUp },
        PostModal: { screen: Camera },


        DetailModal:   { screen: Detail },
        ProfileModal:  { screen: Profile },
        ActivityModal: { screen: Activity },
        TripsModal:    { screen: Trips },
        InboxModal:    { screen: Inbox },
        SearchModal:   { screen: Search },

        TabIndex: { screen: TabIndex }, //logged in
    },
    {
        mode: 'modal',
        navigationOptions: options,
    }
);

const AppWithNavigationState = ({ dispatch, nav, listener }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav, addListener: listener })} />
);

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
