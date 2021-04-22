import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import {wp} from '../../Helper/ResponsiveScreen';
import {OpenWeatherKey} from '../../Helper/Configs';
import Header from '../Common/Header';
import Geolocation from '@react-native-community/geolocation';
import {GetCityListData} from '../../AppState/Actions/GeneralActions';
import {useDispatch, useSelector} from 'react-redux';
import {SET_SELECTED_CITY} from '../../AppState/Constants/StoreContants';

const Index = ({navigation}) => {
  const dispatch = useDispatch();
  const {cityList} = useSelector((state) => state.generalReducer);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getData = async (initRoute) => {
    dispatch(GetCityListData(initRoute)).catch(() => {
      alert('Something went wrong with the api');
    });
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (info) => {
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

  const renderCity = ({item, index}) => {
    const onPressCity = () => {
      dispatch({
        type: SET_SELECTED_CITY,
        payload: item,
      });
      navigation.navigate('WeatherInfo');
    };

    return (
      <TouchableOpacity
        key={index}
        style={styles.rowContainer}
        onPress={onPressCity}>
        <View>
          <Text style={styles.cityName}>{item.name}</Text>
          <Text style={styles.weatherName}>
            {item.weather[0].description.charAt(0).toUpperCase() +
              item.weather[0].description.slice(1) ?? ''}
          </Text>
        </View>
        <Text style={styles.tempStyle}>{`${item.main.temp}° c`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Header />
      <FlatList
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={cityList}
        renderItem={renderCity}
        ItemSeparatorComponent={() => <View style={{padding: wp(2)}} />}
      />
    </View>
  );
};

export default Index;
