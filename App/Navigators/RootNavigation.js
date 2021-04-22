import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CityList from '../Screens/CityList';
import WeatherInfo from '../Screens/WeatherInfo';
import {IS_ANDROID} from '../Helper/ResponsiveScreen';
import {GetCurrentWeatherData} from '../AppState/Actions/GeneralActions';
import WeatherApp from '../Screens/Common/WeatherApp';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    IS_ANDROID && getCurrentLocation();
  }, []);

  const getData = async (initRoute) => {
    dispatch(GetCurrentWeatherData(initRoute))
      .then((res) => {
        let url =
          'https://cdn.iconscout.com/icon/free/png-512/sun-behind-large-cloud-brightness-weather-rainy-33958.png';
        let body = `Current temperature: ${res.data.main.temp}° c`;
        WeatherApp.startService(url, body);
      })
      .catch(() => {
        alert('Something went wrong with the api');
      });
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async (info) => {
        const initRoute = {
          latitude: parseFloat(info.coords.latitude),
          longitude: parseFloat(info.coords.longitude),
        };
        getData(initRoute);
      },
      (err) => {
        console.log(err);
      },
      {enableHighAccuracy: false, timeout: 2000, maximumAge: 3600000},
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'CityList'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="CityList" component={CityList} />
        <Stack.Screen name="WeatherInfo" component={WeatherInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
