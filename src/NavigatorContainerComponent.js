import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import { CHANGE_THEME } from './types';

const Stack = createStackNavigator();

const NavigatorContainerComponent = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  useEffect(() => {
    dispatch({
      type: CHANGE_THEME,
      payload: Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme
    });
    Appearance.addChangeListener(onThemeChange);

    return () => Appearance.removeChangeListener(onThemeChange);
  }, []);

  const onThemeChange = ({ colorScheme }) => {
    dispatch({
      type: CHANGE_THEME,
      payload: colorScheme === 'dark' ? DarkTheme : DefaultTheme
    });
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorContainerComponent;