import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Image from 'common/Image';
import {Label} from 'common/Label';
import {removeTagsFromString} from 'helper/helper';
import {COLOR, stationIcons} from 'constant/constants';
import {IStation} from 'interface/ISettings';

const ListItem = ({
  item,
  onPress,
}: {
  item: IStation;
  onPress: (item: IStation) => void;
}) => {
  return (
    <TouchableOpacity style={styles.content} onPress={() => onPress(item)}>
      <View style={styles.row}>
        <Image
          source={stationIcons[item.stationType]}
          style={styles.stationIcon}
        />
        <View style={styles.stationInfoContent}>
          <Label style={styles.itemName} numberOfLines={1}>
            {item.name} ~{item.distance}km
          </Label>
          <Label style={styles.subItemName} numberOfLines={1}>
            {removeTagsFromString(item.stationAddress)}
          </Label>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

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
