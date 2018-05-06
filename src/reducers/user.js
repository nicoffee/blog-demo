import {
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  TOGGLE_LIKE_SUCCESS,
} from '../types';

const user = (state = {isFetching: false}, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
      return {...state, isFetching: true, error: null};
    case FETCH_LOGIN_SUCCESS:
      return {
        isFetching: false,
        ...action.payload,
      };
    case FETCH_LOGIN_FAILURE:
      return {...state, isFetching: false, error: action.payload};
    case TOGGLE_LIKE_SUCCESS:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default user;

export const getErrorMessage = state => state.user.error;
export const getUserName = state => state.user.email;
export const getUserId = state => state.user.id;
