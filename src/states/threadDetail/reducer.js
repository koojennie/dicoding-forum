import { ActionType } from './action';

export default function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;

    case ActionType.CLEAR_THREAD_DETAIL:
      return null;

    case ActionType.ADD_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...(threadDetail.comments || [])],
      };

    case ActionType.TOGGLE_UPVOTE_THREAD_DETAIL: {
      const { userId } = action.payload;
      const hasUp = threadDetail.upVotesBy.includes(userId);
      const hasDown = threadDetail.downVotesBy.includes(userId);

      return {
        ...threadDetail,
        upVotesBy: hasUp ? threadDetail.upVotesBy.filter((id) => id !== userId) : threadDetail.upVotesBy.concat(userId),
        downVotesBy: hasDown ? threadDetail.downVotesBy.filter((id) => id !== userId) : threadDetail.downVotesBy,
      };
    }

    case ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL: {
      const { userId } = action.payload;
      const hasDown = threadDetail.downVotesBy.includes(userId);
      const hasUp = threadDetail.upVotesBy.includes(userId);

      return {
        ...threadDetail,
        downVotesBy: hasDown ? threadDetail.downVotesBy.filter((id) => id !== userId) : threadDetail.downVotesBy.concat(userId),
        upVotesBy: hasUp ? threadDetail.upVotesBy.filter((id) => id !== userId) : threadDetail.upVotesBy,
      };
    }

    case ActionType.TOGGLE_UPVOTE_COMMENT: {
      const { commentId, userId } = action.payload;
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((c) => {
          if (c.id !== commentId) return c;

          const hasUp = c.upVotesBy.includes(userId);
          const hasDown = c.downVotesBy.includes(userId);

          return {
            ...c,
            upVotesBy: hasUp ? c.upVotesBy.filter((id) => id !== userId) : c.upVotesBy.concat(userId),
            downVotesBy: hasDown ? c.downVotesBy.filter((id) => id !== userId) : c.downVotesBy,
          };
        }),
      };
    }

    case ActionType.TOGGLE_DOWNVOTE_COMMENT: {
      const { commentId, userId } = action.payload;
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((c) => {
          if (c.id !== commentId) return c;

          const hasDown = c.downVotesBy.includes(userId);
          const hasUp = c.upVotesBy.includes(userId);

          return {
            ...c,
            downVotesBy: hasDown ? c.downVotesBy.filter((id) => id !== userId) : c.downVotesBy.concat(userId),
            upVotesBy: hasUp ? c.upVotesBy.filter((id) => id !== userId) : c.upVotesBy,
          };
        }),
      };
    }

    default:
      return threadDetail;
  }
}