import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  RECEIVE_LEADERBOARDS: 'leaderboards/receive',
};

export function receiveLeaderboardsActionCreator(leaderboards) {
  return { type: ActionType.RECEIVE_LEADERBOARDS, payload: { leaderboards } };
}

export function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (e) {
      alert(e.message);
    }
    dispatch(hideLoading());
  };
}