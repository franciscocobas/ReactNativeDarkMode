<h1 align="center">
  Implement Dark Mode in Android and iOS Apps with React Native and Redux
</h1>

### Tools and Packages
- ⚛️ React https://reactjs.org/
- 📱 React Native https://reactnative.dev/ 
- 🔖 Redux https://redux.js.org/
- 🗺 React Navigation https://reactnavigation.org/
- 🌛☀️ Appereance https://reactnative.dev/docs/appearance

## Let's start 🎬

### 1 - React Native Bare Project

First, we need to set up the environment. We are going to create a React Native App and then install the require packages. 

The app will be named ReactNativeDarkMode, but you can put whatever you want as a name.

In your prefered terminal run the following command: 

`npx react-native init ReactNativeDarkMode` 

### 2 - Redux and React-Redux

Redux is a predictable state container for Javascript apps. Because Redux can be used with many frameworks and libraries that's why along with `redux` we need to install `react-redux`.

Add the packages running the following command in your terminal:

`npm install redux react-redux`

### 3 - React Navigation

React Navigation is a library that holds Routing and navigation for your React Native(RN) app. This library is being used by many developers lately. And personally I think is robust and a great choice to hold Routing and navigation in RN. Also it's a great choice if we want to have a **default theme in your app and apply to all screens**. 

According to the offical documentation, to install React Navigation we need to run  the following commands:

1. **React Navigation:** `npm install @react-navigation/native`

2. **React Navigation Dependencies:** `npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view`

3. **iOS pod configuration:** `npx pod-install`

4. **Basic Stack navigation:** `npm install @react-navigation/stack`

### 4 - Appearance configuration on Android

| ⚠️Note  |
| ----- |
|React Native Appearance module has a known bug (Please check [#28823](https://github.com/facebook/react-native/issues/28823)) that cause change theme listener not working. In order to fix this bug we need to install another package called [react-native-appearance](https://github.com/expo/react-native-appearance)|

So we need to run the following commands: 

`npm install react-native-appearance`

`npx pod-install`

Then, in order to have properly configured the Appearance module for React Native we should modify the `android/app/src/main/java/com/reactnativedarkmode/MainActivity.java` file.

We need to add the following lines to the file: 

```java
import android.content.Intent; // <--- import
import android.content.res.Configuration; // <--- import

public class MainActivity extends ReactActivity {
  ......

  // copy these lines
  @Override
  public void onConfigurationChanged(Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    Intent intent = new Intent("onConfigurationChanged");
    intent.putExtra("newConfig", newConfig);
    sendBroadcast(intent);
  }

  ......
}
```

## 🚀 App Implementation 

##### 1 - Let's start with a simple App.js file 

Modify the `App.js` file with the following code:

```javascript
import React from 'react';
import { View } from 'react-native';

const App = () => {
  return (
    <View />
  );
};

export default App;
```

##### 2 - Next we are going to add a very basic implementation of Redux and react-redux to hold the App state

In the `App.js` file add the following lines:
```javascript
import React from 'react';
import { View } from 'react-native';
import { createStore } from 'redux'; // <--- Add this line
import { Provider } from 'react-redux'; // <--- Add this line

/* Create a very basic store */
const store = createStore((state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
});

const App = () => {
  return (
    <Provider store={store}> {/* Add Provider to hold the state */}
      <View />
    </Provider>
  );
};

export default App;
```

##### 3 - Now we are going to add the React Navigation to our app

In the app root folder create the following file `src/screens/HomeScreen.js`, folders should be created as well.

In the `HomeScreen.js` file create a very simple functional component:

```javascript
import React from 'react';
import { View } from 'react-native';

const HomeScreen = () => {
  return (
    <View />
  );
};

export default HomeScreen;
```

In the `app.js` file modify the file as following: 

```javascript
import 'react-native-gesture-handler'; // <--- Add this line
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native'; // <--- Add this line
import { createStackNavigator } from '@react-navigation/stack'; // <--- Add this line

import HomeScreen from './src/components/HomeScreen'; // <--- Add this line

const store = createStore((state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
});

const Stack = createStackNavigator(); // <--- Add this line

/* Create the Navigator Container */
const NavigatorContainerComponent = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigatorContainerComponent /> {/* Add NavigatorContainerComponent to the App component */}
    </Provider>
  );
};

export default App;
```

##### 4 - It's time to add the Appearance module ⚡️ to our app. Let's do it

The **Appearance** module has a event listener that listen when the user or the system (scheduled color scheme change at sunrise or sunset) change the preferred color scheme. So we are going to add that listener when the application first start in the App component. 

⚠️ To be more clear let's move the `NavigatorContainerComponent` to another new file. Create a new file `src/NavigatorContainerComponent.js` 

Let's write the code for the new component: 

```javascript
import React, { useEffect } from 'react'; // <--- Import useEffect
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance } from 'react-native'; // <--- Import Appearance module

import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const NavigatorContainerComponent = () => {

  /* Add event listener when component is first rendered. Remove when component is unmounted */
  useEffect(() => {
    Appearance.addChangeListener(onThemeChange);

    return () => Appearance.removeChangeListener(onThemeChange);
  }, []);

  const onThemeChange = () => {
    // We need to dispatch an action to set the theme in the store
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorContainerComponent;
```

Modify the `app.js` to remove the `NavigatorContainerComponent` as following: 

```javascript
import 'react-native-gesture-handler';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import NavigatorContainerComponent from './src/NavigatorContainerComponent';

const store = createStore((state = {}, action) => {
  switch (action.type) {
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
```

##### 5 - Add an action and save the theme to the redux store ☄️

First we need to create a type that will be responsable for change the theme. In order to do that we need the create a new file `./src/types.js` and modify as following:

```javascript
export const CHANGE_THEME = 'change_theme';
```

Modify the `src/NavigatorContainerComponent.js` file as following: 

```javascript
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'; // <--- Import Default and Dark theme from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import { CHANGE_THEME } from './types'; // <--- Import new CHANGE_THEME type

const Stack = createStackNavigator();

const NavigatorContainerComponent = () => {
  const dispatch = useDispatch(); // Get dispatch function from useDispatch hook

  useEffect(() => {
    /* When component is first loaded, dispatch an action to store the value on the Redux state */
    dispatch({
      type: CHANGE_THEME,
      payload: Appearance.getColorScheme() === 'dark' ? DarkTheme : DefaultTheme
    });
    Appearance.addChangeListener(onThemeChange);

    return () => Appearance.removeChangeListener(onThemeChange);
  }, []);

  /* Dispatch an action when theme is changed */
  const onThemeChange = ({ colorScheme }) => { // Receive the colorScheme property
    dispatch({
      type: CHANGE_THEME,
      payload: colorScheme === 'dark' ? DarkTheme : DefaultTheme
    });
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorContainerComponent;
```

Modify the `app.js` file in order to modify the reducer function

```javascript
import 'react-native-gesture-handler';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { DefaultTheme } from '@react-navigation/native'; // <--- Import Default Theme for default value

import NavigatorContainerComponent from './src/NavigatorContainerComponent';
import { CHANGE_THEME } from './src/types';

const store = createStore((state = { theme: DefaultTheme }, action) => { // Add a default value for the state
  switch (action.type) {
    case CHANGE_THEME:                              // <--- Add case
      return { ...state, theme: action.payload };   // <--- Add case
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
```

##### 6 - Six and last step 🙌🏼, get state from Redux and use in all components

First we need to pass the theme to the React Navigation Container, in order to do that we need to modify the `src/NavigatorContainerComponent.js` file as following:
 
```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // <--- Import useSelector to get the current state
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appearance } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import { CHANGE_THEME } from './types';

const Stack = createStackNavigator();

const NavigatorContainerComponent = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme); // Get theme from redux state using the useSelector hook

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
    <NavigationContainer theme={theme}> {/* Pass to the NavigationContainer the theme */}
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigatorContainerComponent;
```

In the `HomeScreen` component and in every child component get the current selected theme

```javascript
import React from 'react';
import { View, Text } from 'react-native'; // <--- Import Text
import { useSelector } from 'react-redux'; // <-- Import useSelector to get the current state

const HomeScreen = () => {
  const theme = useSelector(({ theme }) => theme); //

  return (
    <View style={{ flex: 1 }}>
      {/* Use some properties of the theme object */}
      <Text style={{ color: theme.colors.text, textAlign: 'center', fontSize: 20 }}>Hello Dark Mode!</Text>
      <Text style={{ textAlign: 'center', fontSize: 20 }}>{theme.dark ? '🌛' : '☀️'}</Text>
    </View>
  );
};

export default HomeScreen;
```

| Note: |
| ---- |
| **DarkTheme** and **DefaultTheme** has many properties that may help to be consistent using colors.|


- `dark` (`boolean`): Whether this is a dark theme or a light theme
- `colors` (`object`): Various colors used by react navigation components:
  - `primary` (`string`): The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
  - `background` (`string`): The color of various backgrounds, such as background color for the screens.
  - `card` (`string`): The background color of card-like elements, such as headers, tab bars etc.
  - `text` (`string`): The text color of various elements.
  - `border` (`string`): The color of borders, e.g. header border, tab bar border etc.
