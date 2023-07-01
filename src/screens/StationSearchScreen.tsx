import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Label} from 'common/Label';
import {Input} from 'common/Input';
import {IStation} from 'interface/ISettings';
import {COLOR, stationIcons} from 'constant/constants';
import {removeTagsFromString} from 'helper/helper';
import {Loader} from 'common/Loader';
import {useNavigation, useRoute} from '@react-navigation/native';
import Image from 'common/Image';
import {Icon} from 'common/Icon';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {getStationSearch} from 'actions/settingsAction';
import {IRootState} from 'interface/IBase';
import isEmpty from 'lodash/isEmpty';

let timer: any;

export default function StationSearchScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const dispatch = useDispatch<any>();
  const [searchStation, setSearchStation] = useState<IStation[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const currentLocation = useSelector(
    (state: IRootState) => state.app.currentLocation,
  );
  useEffect(() => {
    getInitialStations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInitialStations = () => {
    dispatch(getStationSearch(currentLocation, '')).then(
      (searchResponse: IStation[]) => {
        setSearchStation(searchResponse);
        setLoading(false);
      },
    );
  };

  const onChangeText = (searchTerm: string) => {
    setSearchText(searchTerm);
    if (timer) {
      clearTimeout(timer);
    }
    debounceSearch(searchTerm);
  };

  const debounceSearch = (searchTerm: string) => {
    setLoading(true);
    timer = setTimeout(async () => {
      if (searchTerm.length < 3) {
        getInitialStations();
        return;
      }
      const searchedStations = await dispatch(
        getStationSearch(currentLocation, searchTerm),
      );
      setSearchStation(searchedStations);
      setLoading(false);
    }, 1000);
  };

  const onPressStation = (station: IStation) => {
    route.params?.refreshMarkerListAndNavigate(station);
    navigation.goBack();
  };

  const renderItem = ({item}: {item: IStation}) => {
    return (
      <TouchableOpacity
        style={styles.content}
        onPress={() => onPressStation(item)}>
        <View style={styles.row}>
          <Image
            source={stationIcons[item.stationType]}
            style={styles.stationIcon}
          />
          <View style={styles.stationInfoContent}>
            <Label style={styles.itemName} numberOfLines={1}>
              {item.name} {item.distance}
            </Label>
            <Label style={styles.subItemName} numberOfLines={1}>
              {removeTagsFromString(item.stationAddress)}
            </Label>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyStateContainer}>
        <Icon style={styles.iconStyle} name="search-off" type="MaterialIcons" />
        <Label style={styles.emptyTextStyle}>
          Üzgünüz aradığınız sarj istasyonunu bulamadık.
        </Label>
      </View>
    );
  };
  const renderInitialState = () => {
    return (
      <View style={styles.emptyStateContainer}>
        <Icon style={styles.iconStyle} name="search" type="MaterialIcons" />
        <Label style={styles.emptyTextStyle}>Çevredeki istasyonları ara</Label>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Input
            onChangeText={onChangeText}
            title={'İstasyon Ara'}
            placeholder="İsim veya Adres Örn: Palladium AVM"
            value={searchText}
            autoFocus
            clearButtonMode="always"
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
              contentContainerStyle={styles.contentContainerStyle}
              ListEmptyComponent={
                !isEmpty(searchText) && searchText.length > 3
                  ? renderEmptyState
                  : renderInitialState
              }
            />
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
    paddingBottom: 12,
  },
  contentContainerStyle: {
    paddingBottom: 48,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  row: {
    flexDirection: 'row',
  },
  stationIcon: {
    marginRight: 8,
    width: 30,
    height: 30,
  },
  stationInfoContent: {
    flex: 1,
  },
  itemName: {
    color: COLOR.text,
    marginBottom: 4,
  },
  subItemName: {
    color: COLOR.textSecondary,
  },
  header: {
    backgroundColor: COLOR.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  list: {},
  loader: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '30%',
  },
  emptyStateContainer: {
    alignItems: 'center',
    marginTop: 48,
  },
  iconStyle: {
    fontSize: 88,
    color: COLOR.black60,
  },
  emptyTextStyle: {
    marginTop: 16,
    color: COLOR.black60,
  },
});
