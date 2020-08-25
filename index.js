/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {Navigation} from 'react-native-navigation';
import 'mobx-react-lite/batchingForReactNative';

import {registerComponents} from './App';
import colors from './src/colors';

registerComponents();

const startApp = () => {
  Navigation.events().registerAppLaunchedListener(async () => {
    await Navigation.setDefaultOptions({
      popGesture: true,
      animations: {
        setRoot: {
          waitForRender: true,
        },
      },
      modalPresentationStyle: 'overCurrentContext',
      statusBar: {
        backgroundColor: colors.blue,
      },
      layout: {
        direction: 'ltr',
        componentBackgroundColor: 'transparent',
        orientation: ['portrait'],
      },
      topBar: {
        animate: false,
        noBorder: true, // for iOS only
        background: {
          color: colors.primary,
        },
        title: {
          color: 'white',
        },
        backButton: {
          title: '', // Remove previous screen name from back button
          color: 'white',
        },
        visible: true,
      },
    });

    await Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: 'LoanList',
              },
            },
          ],
        },
      },
    });
  });
};

startApp();
