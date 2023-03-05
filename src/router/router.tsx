import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Screen from './screen';
import {useSelector} from 'react-redux';
import {IRootState} from 'interface/IBase';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Router() {
  const onBoarding = useSelector((state: IRootState) => state.app.onBoarding);
  const initialRouteName = onBoarding ? 'TabScreen' : 'MapPermission';

  const screenOptions = {headerShown: false};

  // eslint-disable-next-line react/no-unstable-nested-components
  const TabScreen = (): JSX.Element => {
    return (
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name={'HomeScreen'} component={Screen.HomeScreen} />
        <Tab.Screen
          name={'StationsScreen'}
          options={screenOptions}
          component={Screen.StationsScreen}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name={'MapPermission'}
          component={Screen.MapPermissionScreen}
        />
        <Stack.Screen
          name="TabScreen"
          options={screenOptions}
          component={TabScreen}
        />
        <Stack.Screen
          name={'StationSearchScreen'}
          options={{presentation: 'modal'}}
          component={Screen.StationSearchScreen}
        />
        <Stack.Screen name={'LoginScreen'} component={Screen.LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
