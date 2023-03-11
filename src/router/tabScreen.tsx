/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import * as Screen from './screen';
import {RouteProp} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'common/Icon';
import {COLOR} from 'constant/constants';

const Tab = createBottomTabNavigator();

export const screenOptions = ({route}: {route: RouteProp<any>}): any =>
  ({
    [Screen.HomeScreen.name]: {
      tabBarIcon: ({focused}: {focused: boolean}): JSX.Element => (
        <Icon
          style={{color: focused ? COLOR.primary.main : COLOR.text}}
          name={'home'}
          type="AntDesign"
        />
      ),
      title: 'Anasayfa',
    },
    [Screen.StationsScreen.name]: {
      tabBarIcon: ({focused}: {focused: boolean}): JSX.Element => (
        <Icon
          style={{color: focused ? COLOR.primary.main : COLOR.text}}
          name={'ev-station'}
          type="MaterialCommunityIcons"
        />
      ),
      headerShown: false,
      title: 'Şarj İstasyonları',
    },
    [Screen.StationSearchScreen.name]: {
      presentation: 'modal',
      title: 'Şarj İstayonu Ara',
    },
  }[route.name]);

const TabScreen = (): JSX.Element => {
  return (
    <Tab.Navigator initialRouteName={Screen.HomeScreen.name}>
      <Tab.Screen
        name={Screen.HomeScreen.name}
        component={Screen.HomeScreen}
        options={screenOptions}
      />
      <Tab.Screen
        name={Screen.StationsScreen.name}
        options={screenOptions}
        component={Screen.StationsScreen}
      />
    </Tab.Navigator>
  );
};

export default TabScreen;
