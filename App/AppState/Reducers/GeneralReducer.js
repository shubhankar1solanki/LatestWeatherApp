import InitialState from '../InitialState/general';
import {SET_CITY_LIST, SET_SELECTED_CITY} from '../Constants/StoreContants';

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case SET_CITY_LIST:
      return (state = {
        ...state,
        cityList: action.payload,
      });
    case SET_SELECTED_CITY:
      return (state = {
        ...state,
        selectedCity: action.payload,
      });
    default:
      return state;
  }
};

export default reducer;
