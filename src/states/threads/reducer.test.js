/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by RECEIVE_THREADS action
 *  - should return the threads with new thread when given by ADD_THREAD action
 *  - should toggle upvote correctly when given by TOGGLE_UPVOTE_THREAD action
 *  - should toggle downvote correctly when given by TOGGLE_DOWNVOTE_THREAD action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = {
      items: [],
      categoryFilter: null,
    };

    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(undefined, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = {
      items: [],
      categoryFilter: null,
    };

    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Test 1',
            upVotesBy: [],
            downVotesBy: [],
          },
          {
            id: 'thread-2',
            title: 'Thread Test 2',
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.items).toEqual(action.payload.threads);
    expect(nextState.categoryFilter).toBeNull();
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = {
      items: [
        {
          id: 'thread-1',
          title: 'Thread Test 1',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      categoryFilter: null,
    };

    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Test 2',
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.items).toEqual([
      action.payload.thread,
      ...initialState.items,
    ]);
  });

  it('should toggle upvote correctly when given by TOGGLE_UPVOTE_THREAD action', () => {
    // arrange
    const initialState = {
      items: [
        {
          id: 'thread-1',
          title: 'Thread Test 1',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      categoryFilter: null,
    };

    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: upvote
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.items[0].upVotesBy).toEqual(['user-1']);
    expect(nextState.items[0].downVotesBy).toEqual([]);

    // action: remove upvote
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2.items[0].upVotesBy).toEqual([]);
  });

  it('should toggle downvote correctly when given by TOGGLE_DOWNVOTE_THREAD action', () => {
    // arrange
    const initialState = {
      items: [
        {
          id: 'thread-1',
          title: 'Thread Test 1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
      categoryFilter: null,
    };

    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState.items[0].downVotesBy).toEqual(['user-1']);
    expect(nextState.items[0].upVotesBy).toEqual([]);
  });
});