import {SafeAreaView} from 'react-native';
import React, {Component} from 'react';
import Map from 'components/Map';

export default class StationMap extends Component {
  render() {
    return (
      <SafeAreaView>
        <Map />
      </SafeAreaView>
    );
  }
}
