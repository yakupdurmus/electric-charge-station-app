import React, {useRef} from 'react';
import {
  TextInput,
  View,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Label} from 'common/Label';
import {COLOR} from 'constant/constants';
import {Icon} from './Icon';

interface InputProps extends TextInputProps {
  require?: any;
  title?: any;
  error?: any;
  errorMessage?: any;
  contentStyle?: any;
  style?: any;
  isPhone?: any;
  value?: any;
  placeholder?: string;
}
export const Input = React.memo((props: InputProps) => {
  const {
    require,
    title,
    error,
    errorMessage,
    contentStyle,
    style,
    clearButtonMode,
  } = props;

  const inputRef = useRef<TextInput | any>();

  const onPressClear = () => {
    inputRef.current?.clear();
    if (props.onChangeText) {
      props.onChangeText('');
    }
  };

  return (
    <View style={[styles.content, contentStyle]}>
      {title && (
        <Label style={styles.titleStlye}>
          {title}
          {require && <Label style={styles.requireStar}>*</Label>}
        </Label>
      )}
      <View>
        <TextInput
          {...props}
          placeholderTextColor={COLOR.textMuted}
          style={[
            styles.textInput,
            error ? styles.errorBorderStyle : {},
            style,
          ]}
          ref={inputRef}
        />
        {clearButtonMode === 'always' && props.value ? (
          <TouchableOpacity onPress={onPressClear} style={styles.clearButton}>
            <Icon
              style={styles.clearIcon}
              name="close-circle"
              type="MaterialCommunityIcons"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {errorMessage ? (
        error ? (
          <Label style={styles.errorTextStyle}>{errorMessage}</Label>
        ) : (
          <Label />
        )
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  content: {},
  clearButton: {
    position: 'absolute',
    right: 3,
    top: 10,
  },
  clearIcon: {
    color: COLOR.black60,
  },
  errorBorderStyle: {
    borderBottomWidth: 1,
    borderColor: COLOR.error.main,
  },
  errorTextStyle: {
    fontSize: 12,
    opacity: 0.6,
    color: COLOR.error.main,
  },
  textInput: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: COLOR.lightGray,
    borderRadius: 4,
    backgroundColor: COLOR.white,
    color: COLOR.black80,
  },
  titleStlye: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  requireStar: {
    color: COLOR.error.main,
  },
});
