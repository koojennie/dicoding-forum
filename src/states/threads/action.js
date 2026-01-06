import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

/**
 * Action Types
 * konsisten, scoped, dan mudah dibaca di reducer
 */
export const ActionType = {
  RECEIVE_THREADS: 'threads/receive',
  ADD_THREAD: 'threads/add',
  SET_CATEGORY_FILTER: 'threads/setCategoryFilter',

  TOGGLE_UPVOTE_THREAD: 'threads/toggleUpvote',
  TOGGLE_DOWNVOTE_THREAD: 'threads/toggleDownvote',
};

/**
 * Action Creators
 */
export function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: { threads },
  };
}

export function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: { thread },
  };
}

export function setCategoryFilterActionCreator(category) {
  return {
    type: ActionType.SET_CATEGORY_FILTER,
    payload: { category },
  };
}

export function toggleUpvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: { threadId, userId },
  };
}

export function toggleDownvoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: { threadId, userId },
  };
}

/**
 * Async Actions
 */

// get all threads
export function asyncReceiveThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getAllThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (e) {
      alert(e.message);
    }
    dispatch(hideLoading());
  };
}

// create new thread
export function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (e) {
      alert(e.message);
    }
    dispatch(hideLoading());
  };
}

/**
 * Optimistic Upvote Thread
 */
export function asyncToggleUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threads } = getState();

    if (!authUser) {
      alert('Silakan login untuk melakukan vote.');
      dispatch(hideLoading());
      return;
    }

    // optimistic update
    dispatch(
      toggleUpvoteThreadActionCreator({
        threadId,
        userId: authUser.id,
      })
    );

    try {
      const thread = threads.items.find((t) => t.id === threadId);
      const alreadyUp = thread.upVotesBy.includes(authUser.id);

      if (alreadyUp) {
        await api.neutralizeThreadVote(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
    } catch (e) {
      alert(e.message);
      // rollback
      dispatch(
        toggleUpvoteThreadActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
    }

    dispatch(hideLoading());
  };
}

/**
 * Optimistic Downvote Thread
 */
export function asyncToggleDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threads } = getState();

    if (!authUser) {
      alert('Silakan login untuk melakukan vote.');
      dispatch(hideLoading());
      return;
    }

    dispatch(
      toggleDownvoteThreadActionCreator({
        threadId,
        userId: authUser.id,
      })
    );

    try {
      const thread = threads.items.find((t) => t.id === threadId);
      const alreadyDown = thread.downVotesBy.includes(authUser.id);

      if (alreadyDown) {
        await api.neutralizeThreadVote(threadId);
      } else {
        await api.downVoteThread(threadId);
      }
    } catch (e) {
      alert(e.message);
      dispatch(
        toggleDownvoteThreadActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
    }
    dispatch(hideLoading());
  };
}
