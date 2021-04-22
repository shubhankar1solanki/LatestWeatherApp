/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {applyMiddleware, createStore} from 'redux';
import { Provider, useDispatch } from 'react-redux';
import {SafeAreaView} from 'react-native';
import RootNavigation from './App/Navigators/RootNavigation';
import WeatherApp from './App/Screens/Common/WeatherApp';
import Geolocation from '@react-native-community/geolocation';
import {IS_ANDROID} from './App/Helper/ResponsiveScreen';
import thunk from 'redux-thunk';
import AppReducer from './App/AppState/Reducers';
import {GetCurrentWeatherData} from './App/AppState/Actions/GeneralActions';

const App: () => React$Node = () => {
  let store = createStore(AppReducer, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <RootNavigation />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
