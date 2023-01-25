import React from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import Map from 'components/Map';
import {Marker} from 'react-native-maps';

import stations from 'assets/stations/stations';
import {IAllStations} from 'interface/ISettings';

const StationMap = () => {
  const renderItem = ({item}: {item: IAllStations}) => {
    return (
      <Marker
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
        }}
      />
    );
  };

  return (
    <SafeAreaView>
      <Map>
        <FlatList data={stations.allStations} renderItem={renderItem} />
      </Map>
    </SafeAreaView>
  );
};
export default StationMap;
