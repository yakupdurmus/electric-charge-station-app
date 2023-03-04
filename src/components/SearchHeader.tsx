import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Input} from 'common/Input';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from 'common/Icon';

const SearchHeader = ({
  onPressSearchInput,
  value,
  clearText,
}: {
  onPressSearchInput: () => void;
  value?: string;
  clearText?: () => void;
}) => {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, {top: inset.top}]}>
      <TouchableOpacity
        style={styles.searchInput}
        activeOpacity={0.9}
        onPress={onPressSearchInput}>
        <Input
          onPressIn={onPressSearchInput}
          editable={false}
          placeholder="İstasyon Ara"
          value={value}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconStyle} onPress={clearText}>
        <Icon name="close" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginHorizontal: 16,
    marginTop: 12,
  },
  searchInput: {
    flex: 1,
  },
  iconStyle: {
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    padding: 10,
  },
});

export default SearchHeader;
