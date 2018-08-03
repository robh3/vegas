import createReducer from '../helpers/createReducer';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../../screens/AppNavigator';
import { TabIndex } from '../../screens/TabIndex'
import { StatusBar } from 'react-native';

const firstAction = AppNavigator.router.getActionForPathAndParams('TabIndex');
const initialNavState = AppNavigator.router.getStateForAction(firstAction);

export const nav = (state = initialNavState, action) => {
    let nextState = AppNavigator.router.getStateForAction(action, state);

    if (action.routeName === 'TabIndex') {
        StatusBar.setBarStyle('light-content', true);
    }

    return nextState || state;
};