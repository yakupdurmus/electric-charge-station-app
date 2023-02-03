import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Screen from './screen';

const Stack = createNativeStackNavigator();
export default function Container() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'MapPermission'} component={Screen.MapPermission} />
        <Stack.Screen name={'StationMap'} component={Screen.StationMap} />
        <Stack.Screen name={'Home'} component={Screen.Home} />
        <Stack.Screen name={'Login'} component={Screen.Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
