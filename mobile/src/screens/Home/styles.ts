import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 214,
    height: 120,
    marginTop: getStatusBarHeight() + 48,
    marginBottom: 48
  },
  contentList: {
    paddingLeft: 32,
    paddingRight: 64
  }
});