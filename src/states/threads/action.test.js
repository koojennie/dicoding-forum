/**
 * skenario test
 *
 * - asyncReceiveThreads thunk
 * - asyncAddThread thunk
 * - asyncToggleUpvoteThread thunk
 * - asyncToggleDownvoteThread thunk
 */

import {
  describe, beforeEach, afterEach, it, vi, expect,
} from 'vitest';
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncReceiveThreads,
  asyncAddThread,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpvoteThreadActionCreator,
  toggleDownvoteThreadActionCreator,
} from './action';

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Test',
    upVotesBy: [],
    downVotesBy: [],
  },
];

const fakeThreadResponse = {
  id: 'thread-2',
  title: 'Thread Baru',
  upVotesBy: [],
  downVotesBy: [],
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('threads thunk', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
    api._createThread = api.createThread;
    api._upVoteThread = api.upVoteThread;
    api._downVoteThread = api.downVoteThread;
    api._neutralizeThreadVote = api.neutralizeThreadVote;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.createThread = api._createThread;
    api.upVoteThread = api._upVoteThread;
    api.downVoteThread = api._downVoteThread;
    api.neutralizeThreadVote = api._neutralizeThreadVote;

    delete api._getAllThreads;
    delete api._createThread;
    delete api._upVoteThread;
    delete api._downVoteThread;
    delete api._neutralizeThreadVote;
  });

  it('asyncReceiveThreads should dispatch action correctly when success', async () => {
    // arrange
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(fakeThreadsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('asyncReceiveThreads should call alert when failed', async () => {
    // arrange
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    global.alert = vi.fn();

    // action
    await asyncReceiveThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('asyncAddThread should dispatch action correctly when success', async () => {
    // arrange
    api.createThread = () => Promise.resolve(fakeThreadResponse);
    const dispatch = vi.fn();

    // action
    await asyncAddThread({
      title: 'Judul',
      body: 'Isi',
      category: 'general',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      addThreadActionCreator(fakeThreadResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('asyncAddThread should call alert when failed', async () => {
    // arrange
    api.createThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    global.alert = vi.fn();

    // action
    await asyncAddThread({
      title: 'Judul',
      body: 'Isi',
      category: 'general',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(global.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('asyncToggleUpvoteThread should dispatch toggle when user logged in', async () => {
    // arrange
    api.upVoteThread = vi.fn();
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' },
      threads: { items: fakeThreadsResponse },
    });

    // action
    await asyncToggleUpvoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      toggleUpvoteThreadActionCreator({
        threadId: 'thread-1',
        userId: 'user-1',
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('asyncToggleUpvoteThread should call alert when user not logged in', async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: null,
      threads: { items: [] },
    });
    global.alert = vi.fn();

    // action
    await asyncToggleUpvoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(global.alert).toHaveBeenCalledWith(
      'Silakan login untuk melakukan vote.',
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('asyncToggleDownvoteThread should dispatch toggle when user logged in', async () => {
    // arrange
    api.downVoteThread = vi.fn();
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' },
      threads: { items: fakeThreadsResponse },
    });

    // action
    await asyncToggleDownvoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      toggleDownvoteThreadActionCreator({
        threadId: 'thread-1',
        userId: 'user-1',
      }),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('asyncToggleDownvoteThread should call alert when user not logged in', async () => {
    // arrange
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: null,
      threads: { items: [] },
    });
    global.alert = vi.fn();

    // action
    await asyncToggleDownvoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(global.alert).toHaveBeenCalledWith(
      'Silakan login untuk melakukan vote.',
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});