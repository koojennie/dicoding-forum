import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import { putAccessToken } from '../../utils/config';

export const ActionType = {
  SET_AUTH_USER: 'authUser/set',
  UNSET_AUTH_USER: 'authUser/unset',
};

export function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: { authUser },
  };
}

export function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

export function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      putAccessToken(token);

      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (e) {
      alert(e.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    putAccessToken('');
  };
}