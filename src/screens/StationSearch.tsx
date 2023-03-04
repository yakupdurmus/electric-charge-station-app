import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Label} from 'common/Label';
import {Input} from 'common/Input';
import stations from 'assets/stations/stations';
import {IStation} from 'interface/ISettings';
import {COLOR} from 'constant/constants';
import {stationSearchWithText} from 'helper/helper';
import {Loader} from 'common/Loader';
import {useNavigation, useRoute} from '@react-navigation/native';

let timer: any;

export default function StationSearch() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [searchStation, setSearchStation] = useState(stations.allStations);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const onChangeText = (searchTerm: string) => {
    setSearchText(searchTerm);
    if (timer) {
      clearTimeout(timer);
    }
    debounceSearch(searchTerm);
  };

  const debounceSearch = (searchTerm: string) => {
    setLoading(true);
    timer = setTimeout(() => {
      if (searchTerm.length < 3) {
        setSearchStation(stations.allStations);
        setLoading(false);
        return;
      }
      const searchedStations = stationSearchWithText(searchTerm);
      setSearchStation(searchedStations);
      setLoading(false);
      console.log(searchedStations.length, searchedStations[0]?.name);
    }, 1000);
  };

  const onPressStation = (station: IStation) => {
    //
    route.params?.onPressMarker(station);
    navigation.goBack();
  };

  const renderItem = ({item}: {item: IStation}) => {
    return (
      <TouchableOpacity
        style={styles.content}
        onPress={() => onPressStation(item)}>
        <View style={styles.row}>
          <Label style={styles.itemName} numberOfLines={1}>
            {item.name}
          </Label>
          <Label>{item.stationType}</Label>
        </View>
        <View style={styles.row}>
          <Label style={styles.itemName} numberOfLines={1}>
            {item.stationAddress}
          </Label>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input
          onChangeText={onChangeText}
          title={'İstasyonları Filtrele'}
          placeholder="Palladium AVM, Ataşehir"
          value={searchText}
          autoFocus
        />
      </View>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loader}>
            <Loader isVisible={loading} />
          </View>
        ) : (
          <FlatList
            keyboardShouldPersistTaps="always"
            keyExtractor={(item, index) => item.name + index}
            data={searchStation}
            renderItem={renderItem}
            style={styles.list}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
  },
  itemName: {
    width: '80%',
    marginRight: 10,
  },
  header: {
    backgroundColor: COLOR.white,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  list: {},
  loader: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '30%',
  },
});
