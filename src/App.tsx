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
import {NavigationProvider} from 'react-native-navigation-hooks';
import React from 'react';

import {stores, StoreContext} from '@app/store';
import Loading from '@app/screens/Loading';
import LoanList from '@app/screens/LoanList';
import SubmitLoan from '@app/screens/SubmitLoan';
import RepayLoan from '@app/screens/RepayLoan';
import LoanDetail from '@app/screens/LoanDetail';
import colors from '@app/colors';

type ComponentScreenType = {
  [key: string]: React.ComponentType;
};
const ComponentScreens: ComponentScreenType = {
  Loading,
  LoanList,
  SubmitLoan,
  RepayLoan,
  LoanDetail,
};

const registerComponents = () => {
  Object.keys(ComponentScreens).forEach((name) => {
    const ComponentScreen = ComponentScreens[name];

    Navigation.registerComponent(
      name,
      () => (props) => {
        return (
          <StoreContext.Provider value={stores}>
            <NavigationProvider value={{componentId: props.componentId}}>
              <ComponentScreen {...props} />
            </NavigationProvider>
          </StoreContext.Provider>
        );
      },
      () => ComponentScreen,
    );
  });
};

export const startApp = () => {
  registerComponents();

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
        backgroundColor: colors.primary,
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
                options: {topBar: {title: {text: 'Loan list'}}},
              },
            },
          ],
        },
      },
    });
  });
};
