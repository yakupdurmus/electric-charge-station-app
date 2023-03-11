import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Screen from './screen';
import {useSelector} from 'react-redux';
import {IRootState} from 'interface/IBase';
import TabScreen, {screenOptions} from './tabScreen';

const Stack = createNativeStackNavigator();

export default function Router() {
  const onBoarding = useSelector((state: IRootState) => state.app.onBoarding);
  const initialRouteName = onBoarding
    ? TabScreen.name
    : Screen.MapPermissionScreen.name;

  const hideHeader = {headerShown: false};

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name={Screen.MapPermissionScreen.name}
          component={Screen.MapPermissionScreen}
        />
        <Stack.Screen
          name={TabScreen.name}
          options={hideHeader}
          component={TabScreen}
        />
        <Stack.Screen
          name={Screen.StationSearchScreen.name}
          options={screenOptions}
          component={Screen.StationSearchScreen}
        />
        <Stack.Screen
          name={Screen.LoginScreen.name}
          component={Screen.LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
