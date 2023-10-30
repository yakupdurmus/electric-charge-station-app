import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {Label} from 'common/Label';
import {IStation} from 'interface/ISettings';
import {COLOR} from 'constant/constants';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'common/Icon';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {IRootState} from 'interface/IBase';
import ListItem from 'components/ListItem';
import {RootStackParamTypes} from 'interface/NavigationTypes';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export default function FavoriteStationScreen() {
  type NavigationProps = BottomTabNavigationProp<
    RootStackParamTypes,
    'FavoriteStationScreen'
  >;

  const navigation = useNavigation<NavigationProps>();

  const favoriteStation = useSelector(
    (state: IRootState) => state.app.favoriteStation,
  );

  const onPressStation = (station: IStation) => {
    navigation.navigate('StationsScreen', {
      selectedStation: station,
    });
  };

  const renderItem = ({item}: {item: IStation}) => {
    return <ListItem item={item} onPress={onPressStation} />;
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyStateContainer}>
        <Icon style={styles.iconStyle} name="heart-o" type="FontAwesome" />
        <Label style={styles.emptyTextStyle}>
          Eklediğin favori istasyonları buradan görebilirsin.
        </Label>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.container}>
          <FlatList
            keyboardShouldPersistTaps="always"
            keyExtractor={(item, index) => item.name + index}
            data={favoriteStation}
            renderItem={renderItem}
            style={styles.list}
            contentContainerStyle={styles.contentContainerStyle}
            ListEmptyComponent={renderEmptyState}
          />
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
