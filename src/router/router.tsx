import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Screen from './screen';
import {useSelector} from 'react-redux';
import {IRootState} from 'interface/IBase';

const Stack = createNativeStackNavigator();
export default function Router() {
  const onBoarding = useSelector((state: IRootState) => state.app.onBoarding);
  const initialRouteName = onBoarding ? 'StationMap' : 'MapPermission';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name={'MapPermission'} component={Screen.MapPermission} />
        <Stack.Screen
          options={{headerShown: false}}
          name={'StationMap'}
          component={Screen.StationMap}
        />
        <Stack.Screen name={'Home'} component={Screen.Home} />
        <Stack.Screen name={'Login'} component={Screen.Login} />
        <Stack.Screen
          name={'StationSearch'}
          options={{presentation: 'modal'}}
          component={Screen.StationSearch}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
