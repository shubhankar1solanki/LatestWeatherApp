import {SET_CITY_LIST} from '../Constants/StoreContants';
import {
  GET_CITY_LIST_API,
  GET_CURRENT_WEATHER_API,
} from '../Constants/ApiConstant';
import axios from 'axios';
import {OpenWeatherKey} from '../../Helper/Configs';

export const GetCityListData = (initRoute) => {
  return (dispatch) => {
    return axios
      .get(
        GET_CITY_LIST_API +
          `lat=${initRoute.latitude}&lon=${initRoute.longitude}&cnt=50&units=metric&appid=${OpenWeatherKey}`,
      )
      .then((response) => {
        dispatch({
          type: SET_CITY_LIST,
          payload: response.data.list,
        });
        return Promise.resolve({
          status: true,
          data: response.data,
        });
      })
      .catch((err) => {
        return Promise.reject({
          status: true,
          data: err,
        });
      });
  };
};

export const GetCurrentWeatherData = (initRoute) => {
  return (dispatch) => {
    return axios
      .get(
        GET_CURRENT_WEATHER_API +
          `lat=${initRoute.latitude}&lon=${initRoute.longitude}&cnt=50&units=metric&appid=${OpenWeatherKey}`,
      )
      .then((response) => {
        return Promise.resolve({
          status: true,
          data: response.data,
        });
      })
      .catch((err) => {
        return Promise.reject({
          status: true,
          data: err,
        });
      });
  };
};
