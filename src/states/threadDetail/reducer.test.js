/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 *  - should return null when given by unknown action
 *  - should return thread detail when given by RECEIVE_THREAD_DETAIL action
 *  - should return null when given by CLEAR_THREAD_DETAIL action
 *  - should add comment correctly when given by ADD_COMMENT action
 *  - should toggle upvote thread detail correctly
 *  - should toggle downvote comment correctly
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
  it('should return null when given by unknown action', () => {
    // arrange
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(null, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return thread detail when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Test',
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(null, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Test',
    };

    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should add comment correctly when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [],
    };

    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Komentar pertama',
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments).toEqual([action.payload.comment]);
  });

  it('should toggle upvote thread detail correctly', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
      payload: {
        userId: 'user-1',
      },
    };

    // action: upvote
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.upVotesBy).toEqual(['user-1']);
    expect(nextState.downVotesBy).toEqual([]);

    // action: remove upvote
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2.upVotesBy).toEqual([]);
  });

  it('should toggle downvote comment correctly', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Komentar',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].downVotesBy).toEqual(['user-1']);
    expect(nextState.comments[0].upVotesBy).toEqual([]);
  });
});