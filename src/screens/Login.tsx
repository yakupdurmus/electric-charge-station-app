import {Text, TouchableOpacity, SafeAreaView, Platform} from 'react-native';
import React, {Component} from 'react';
import * as Sentry from '@sentry/react-native';

export default class Login extends Component {
  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => {
            throw new Error(`My first Sentry error! --> ${Platform.OS}`);
          }}>
          <Text>JS CRASH</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Sentry.nativeCrash();
          }}>
          <Text>NATIVE CRASH</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
