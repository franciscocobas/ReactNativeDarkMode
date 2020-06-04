import 'react-native-gesture-handler';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { DefaultTheme } from '@react-navigation/native';

import NavigatorContainerComponent from './src/NavigatorContainerComponent';
import { CHANGE_THEME } from './src/types';

const store = createStore((state = { theme: DefaultTheme }, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigatorContainerComponent />
    </Provider>
  );
};

export default App;