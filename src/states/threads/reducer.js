import { ActionType } from './action';

const initialState = {
  items: [],
  categoryFilter: 'all',
};

export default function threadsReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return { ...state, items: action.payload.threads };

  case ActionType.ADD_THREAD:
    return { ...state, items: [action.payload.thread, ...state.items] };

  case ActionType.SET_CATEGORY_FILTER:
    return { ...state, categoryFilter: action.payload.category };

  case ActionType.TOGGLE_UPVOTE_THREAD: {
    const { threadId, userId } = action.payload;
    return {
      ...state,
      items: state.items.map((t) => {
        if (t.id !== threadId) return t;

        const hasUp = t.upVotesBy.includes(userId);
        const hasDown = t.downVotesBy.includes(userId);

        return {
          ...t,
          upVotesBy: hasUp ? t.upVotesBy.filter((id) => id !== userId) : t.upVotesBy.concat(userId),
          downVotesBy: hasDown ? t.downVotesBy.filter((id) => id !== userId) : t.downVotesBy,
        };
      }),
    };
  }

  case ActionType.TOGGLE_DOWNVOTE_THREAD: {
    const { threadId, userId } = action.payload;
    return {
      ...state,
      items: state.items.map((t) => {
        if (t.id !== threadId) return t;

        const hasDown = t.downVotesBy.includes(userId);
        const hasUp = t.upVotesBy.includes(userId);

        return {
          ...t,
          downVotesBy: hasDown ? t.downVotesBy.filter((id) => id !== userId) : t.downVotesBy.concat(userId),
          upVotesBy: hasUp ? t.upVotesBy.filter((id) => id !== userId) : t.upVotesBy,
        };
      }),
    };
  }

  default:
    return state;
  }
}