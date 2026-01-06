import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';

export const ActionType = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
  CLEAR_THREAD_DETAIL: 'threadDetail/clear',

  TOGGLE_UPVOTE_THREAD_DETAIL: 'threadDetail/toggleUpvoteThread',
  TOGGLE_DOWNVOTE_THREAD_DETAIL: 'threadDetail/toggleDownvoteThread',

  ADD_COMMENT: 'threadDetail/addComment',
  TOGGLE_UPVOTE_COMMENT: 'threadDetail/toggleUpvoteComment',
  TOGGLE_DOWNVOTE_COMMENT: 'threadDetail/toggleDownvoteComment',
};

export function receiveThreadDetailActionCreator(threadDetail) {
  return { type: ActionType.RECEIVE_THREAD_DETAIL, payload: { threadDetail } };
}

export function clearThreadDetailActionCreator() {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

export function toggleUpvoteThreadDetailActionCreator(userId) {
  return { type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL, payload: { userId } };
}

export function toggleDownvoteThreadDetailActionCreator(userId) {
  return { type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL, payload: { userId } };
}

export function addCommentActionCreator(comment) {
  return { type: ActionType.ADD_COMMENT, payload: { comment } };
}

export function toggleUpvoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.TOGGLE_UPVOTE_COMMENT, payload: { commentId, userId } };
}

export function toggleDownvoteCommentActionCreator({ commentId, userId }) {
  return { type: ActionType.TOGGLE_DOWNVOTE_COMMENT, payload: { commentId, userId } };
}

export function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const detail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(detail));
    } catch (e) {
      alert(e.message);
    }

    dispatch(hideLoading());
  };
}

export function asyncAddComment(threadId, content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    if (!authUser) {
      alert('Silakan login untuk berkomentar.');
      dispatch(hideLoading());
      return;
    }

    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (e) {
      alert(e.message);
    }

    dispatch(hideLoading());
  };
}

// votes thread detail optimistic
export function asyncToggleUpvoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan login untuk vote.');
      dispatch(hideLoading());
      return;
    }

    dispatch(toggleUpvoteThreadDetailActionCreator(authUser.id));

    try {
      const alreadyUp = threadDetail?.upVotesBy?.includes(authUser.id);
      if (alreadyUp) await api.neutralizeThreadVote(threadId);
      else await api.upVoteThread(threadId);
    } catch (e) {
      alert(e.message);
      dispatch(toggleUpvoteThreadDetailActionCreator(authUser.id)); // rollback
    }

    dispatch(hideLoading());
  };
}

export function asyncToggleDownvoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan login untuk vote.');
      dispatch(hideLoading());
      return;
    }

    dispatch(toggleDownvoteThreadDetailActionCreator(authUser.id));

    try {
      const alreadyDown = threadDetail?.downVotesBy?.includes(authUser.id);
      if (alreadyDown) await api.neutralizeThreadVote(threadId);
      else await api.downVoteThread(threadId);
    } catch (e) {
      alert(e.message);
      dispatch(toggleDownvoteThreadDetailActionCreator(authUser.id)); // rollback
    }

    dispatch(hideLoading());
  };
}

// votes comment optimistic
export function asyncToggleUpvoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan login untuk vote.');
      dispatch(hideLoading());
      return;
    }

    dispatch(toggleUpvoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      const comment = threadDetail.comments.find((c) => c.id === commentId);
      const alreadyUp = comment?.upVotesBy?.includes(authUser.id);
      if (alreadyUp) await api.neutralizeCommentVote(threadId, commentId);
      else await api.upVoteComment(threadId, commentId);
    } catch (e) {
      alert(e.message);
      dispatch(toggleUpvoteCommentActionCreator({ commentId, userId: authUser.id })); // rollback
    }

    dispatch(hideLoading());
  };
}

export function asyncToggleDownvoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan login untuk vote.');
      dispatch(hideLoading());
      return;
    }

    dispatch(toggleDownvoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      const comment = threadDetail.comments.find((c) => c.id === commentId);
      const alreadyDown = comment?.downVotesBy?.includes(authUser.id);
      if (alreadyDown) await api.neutralizeCommentVote(threadId, commentId);
      else await api.downVoteComment(threadId, commentId);
    } catch (e) {
      alert(e.message);
      dispatch(toggleDownvoteCommentActionCreator({ commentId, userId: authUser.id })); // rollback
    }

    dispatch(hideLoading());
  };
}