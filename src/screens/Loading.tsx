import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {useNavigation} from 'react-native-navigation-hooks';
import colors from '../colors';

const Loading = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="white" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black67,
  },
});

export default Loading;

export const useLoadingScreen = () => {
  const {showOverlay, dismissOverlay} = useNavigation();
  const show = () =>
    showOverlay({
      component: {id: 'Loading', name: 'Loading'},
    });
  const dismiss = () => dismissOverlay();

  return {show, dismiss};
};
