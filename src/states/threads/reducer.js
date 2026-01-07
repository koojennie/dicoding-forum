import { ActionType } from './action';

const initialState = {
  items: [],
  categoryFilter: null,
};

function threadsReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return {
      ...state,
      items: action.payload.threads,
    };

  case ActionType.ADD_THREAD:
    return {
      ...state,
      items: [action.payload.thread, ...state.items],
    };

  case ActionType.SET_CATEGORY_FILTER:
    return {
      ...state,
      categoryFilter: action.payload.category,
    };

  case ActionType.TOGGLE_UPVOTE_THREAD: {
    const { threadId, userId } = action.payload;

    return {
      ...state,
      items: state.items.map((thread) => {
        if (thread.id !== threadId) return thread;

        const hasUp = thread.upVotesBy.includes(userId);
        const hasDown = thread.downVotesBy.includes(userId);

        return {
          ...thread,
          upVotesBy: hasUp
            ? thread.upVotesBy.filter((id) => id !== userId)
            : thread.upVotesBy.concat(userId),
          downVotesBy: hasDown
            ? thread.downVotesBy.filter((id) => id !== userId)
            : thread.downVotesBy,
        };
      }),
    };
  }

  case ActionType.TOGGLE_DOWNVOTE_THREAD: {
    const { threadId, userId } = action.payload;

    return {
      ...state,
      items: state.items.map((thread) => {
        if (thread.id !== threadId) return thread;

        const hasDown = thread.downVotesBy.includes(userId);
        const hasUp = thread.upVotesBy.includes(userId);

        return {
          ...thread,
          downVotesBy: hasDown
            ? thread.downVotesBy.filter((id) => id !== userId)
            : thread.downVotesBy.concat(userId),
          upVotesBy: hasUp
            ? thread.upVotesBy.filter((id) => id !== userId)
            : thread.upVotesBy,
        };
      }),
    };
  }

  default:
    return state;
  }
}

export default threadsReducer;