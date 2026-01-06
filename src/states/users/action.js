import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  RECEIVE_USERS: 'users/receive',
};

export function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: { users },
  };
}

export function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
    } catch (e) {
      alert(e.message);
    }
    dispatch(hideLoading());
  };
}

export function asyncReceiveUsers() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await api.getAllUsers();
      dispatch(receiveUsersActionCreator(users));
    } catch (e) {
      alert(e.message);
    }
    dispatch(hideLoading());
  };
}