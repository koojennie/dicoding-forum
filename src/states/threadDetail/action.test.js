/**
 * skenario test
 *
 * - asyncReceiveThreadDetail thunk
 * - asyncAddComment thunk
 * - asyncToggleUpvoteThreadDetail thunk
 * - asyncToggleDownvoteThreadDetail thunk
 * - asyncToggleUpvoteComment thunk
 * - asyncToggleDownvoteComment thunk
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpvoteThreadDetail,
  asyncToggleDownvoteThreadDetail,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleUpvoteThreadDetailActionCreator,
  toggleDownvoteThreadDetailActionCreator,
  toggleUpvoteCommentActionCreator,
  toggleDownvoteCommentActionCreator,
} from './action';

const fakeThreadDetail = {
  id: 'thread-1',
  upVotesBy: [],
  downVotesBy: [],
  comments: [
    {
      id: 'comment-1',
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
};

const fakeComment = {
  id: 'comment-2',
  content: 'Komentar test',
  upVotesBy: [],
  downVotesBy: [],
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('threadDetail thunk', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
    api._createComment = api.createComment;
    api._upVoteThread = api.upVoteThread;
    api._downVoteThread = api.downVoteThread;
    api._neutralizeThreadVote = api.neutralizeThreadVote;
    api._upVoteComment = api.upVoteComment;
    api._downVoteComment = api.downVoteComment;
    api._neutralizeCommentVote = api.neutralizeCommentVote;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;
    api.createComment = api._createComment;
    api.upVoteThread = api._upVoteThread;
    api.downVoteThread = api._downVoteThread;
    api.neutralizeThreadVote = api._neutralizeThreadVote;
    api.upVoteComment = api._upVoteComment;
    api.downVoteComment = api._downVoteComment;
    api.neutralizeCommentVote = api._neutralizeCommentVote;

    delete api._getThreadDetail;
    delete api._createComment;
    delete api._upVoteThread;
    delete api._downVoteThread;
    delete api._neutralizeThreadVote;
    delete api._upVoteComment;
    delete api._downVoteComment;
    delete api._neutralizeCommentVote;
  });

  it('asyncReceiveThreadDetail should dispatch action correctly when success', async () => {
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetail);
    const dispatch = vi.fn();

    await asyncReceiveThreadDetail('thread-1')(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(fakeThreadDetail),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('asyncReceiveThreadDetail should call alert when failed', async () => {
    api.getThreadDetail = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    global.alert = vi.fn();

    await asyncReceiveThreadDetail('thread-1')(dispatch);

    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('asyncAddComment should dispatch action correctly when user logged in', async () => {
    api.createComment = () => Promise.resolve(fakeComment);
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' },
    });

    await asyncAddComment('thread-1', 'Komentar')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      addCommentActionCreator(fakeComment),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('asyncAddComment should call alert when user not logged in', async () => {
    const dispatch = vi.fn();
    const getState = () => ({ authUser: null });
    global.alert = vi.fn();

    await asyncAddComment('thread-1', 'Komentar')(dispatch, getState);

    expect(global.alert).toHaveBeenCalledWith(
      'Silakan login untuk berkomentar.',
    );
  });

  it('asyncToggleUpvoteThreadDetail should dispatch toggle and api call', async () => {
    api.upVoteThread = vi.fn();
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' },
      threadDetail: fakeThreadDetail,
    });

    await asyncToggleUpvoteThreadDetail('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      toggleUpvoteThreadDetailActionCreator('user-1'),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('asyncToggleDownvoteThreadDetail should dispatch toggle and api call', async () => {
    api.downVoteThread = vi.fn();
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' },
      threadDetail: fakeThreadDetail,
    });

    await asyncToggleDownvoteThreadDetail('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      toggleDownvoteThreadDetailActionCreator('user-1'),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('asyncToggleUpvoteComment should dispatch toggle and api call', async () => {
    api.upVoteComment = vi.fn();
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' },
      threadDetail: fakeThreadDetail,
    });

    await asyncToggleUpvoteComment('thread-1', 'comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      toggleUpvoteCommentActionCreator({
        commentId: 'comment-1',
        userId: 'user-1',
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('asyncToggleDownvoteComment should dispatch toggle and api call', async () => {
    api.downVoteComment = vi.fn();
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' },
      threadDetail: fakeThreadDetail,
    });

    await asyncToggleDownvoteComment('thread-1', 'comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      toggleDownvoteCommentActionCreator({
        commentId: 'comment-1',
        userId: 'user-1',
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});