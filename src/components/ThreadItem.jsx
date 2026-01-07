import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineReply, MdOutlineThumbDown, MdOutlineThumbUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { postedAt, truncate } from '../utils/time';
import { stripHtml } from '../utils/html';

function ThreadItem({ thread, authUserId, onUpvote, onDownvote }) {
  const {
    id,
    title,
    body,
    category,
    createdAt,
    totalComments,
    owner,
    upVotesBy,
    downVotesBy,
  } = thread;

  const isUpvoted = authUserId ? upVotesBy.includes(authUserId) : false;
  const isDownvoted = authUserId ? downVotesBy.includes(authUserId) : false;

  return (
    <div>
      <header>
        <div className="inline-block bg-purple-100 px-3 py-1 rounded-lg text-purple-600">
          <span className="font-semibold text-sm">#{category}</span>
        </div>

        <h4 className="mt-3 text-lg text-purple-800 font-bold">
          <Link to={`/threads/${id}`} className="hover:underline">
            {title}
          </Link>
        </h4>
      </header>

      <div className="mt-1 text-gray-700">
        {truncate(stripHtml(body, 140))}
      </div>

      <footer className="mt-3 flex flex-wrap gap-3 items-center">
        <button
          type="button"
          onClick={() => onUpvote(id)}
          className={`flex flex-row gap-2 items-center justify-center rounded-xl py-2 px-3 ${
            isUpvoted ? 'bg-purple-600 text-white' : 'bg-gray-100'
          }`}
          aria-label="upvote"
        >
          <MdOutlineThumbUp className="text-base" />
          <span className="text-sm font-medium">{upVotesBy.length}</span>
        </button>

        <button
          type="button"
          onClick={() => onDownvote(id)}
          className={`flex flex-row gap-2 items-center justify-center rounded-xl py-2 px-3 ${
            isDownvoted ? 'bg-purple-600 text-white' : 'bg-gray-100'
          }`}
          aria-label="downvote"
        >
          <MdOutlineThumbDown className="text-base" />
          <span className="text-sm font-medium">{downVotesBy.length}</span>
        </button>

        <div className="flex flex-row gap-2 items-center justify-center rounded-xl bg-gray-100 py-2 px-3">
          <MdOutlineReply className="text-base" />
          <span className="text-sm font-medium">{totalComments}</span>
        </div>

        <p className="text-sm text-slate-600">{postedAt(createdAt)}</p>

        <p className="flex flex-row gap-1 text-sm text-gray-500">
          Dibuat oleh <strong className="text-slate-700">{owner?.name || 'Unknown'}</strong>
        </p>
      </footer>
    </div>
  );
}

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  authUserId: PropTypes.string,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

ThreadItem.defaultProps = {
  authUserId: null,
};

export default ThreadItem;