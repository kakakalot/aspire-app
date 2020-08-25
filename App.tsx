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

// import App from './src';
import {stores, StoreContext} from './src/store';
import Loading from './src/screens/Loading';
import LoanList from './src/screens/LoanList';
import SubmitLoan from './src/screens/SubmitLoan';
import RepayLoan from './src/screens/RepayLoan';
import LoanDetail from './src/screens/LoanDetail';

type ComponentScreenType = {
  [key: string]: React.ComponentType;
};
const ComponentScreens: ComponentScreenType = {
  // AspireApp: App,
  Loading,
  LoanList,
  SubmitLoan,
  RepayLoan,
  LoanDetail,
};

export const registerComponents = () => {
  Object.keys(ComponentScreens).forEach((name) => {
    const ComponentScreen = ComponentScreens[name];

    Navigation.registerComponent(
      name,
      () => (props) => {
        return (
          <NavigationProvider value={{componentId: props.componentId}}>
            <StoreContext.Provider value={stores}>
              <ComponentScreen {...props} />
            </StoreContext.Provider>
          </NavigationProvider>
        );
      },
      () => ComponentScreen,
    );
  });
};
