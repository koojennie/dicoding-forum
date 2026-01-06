import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

function ThreadsList({ threads, onUpvote, onDownvote, authUserId }) {
  return (
    <div className="bg-white mt-5 mx-auto max-w-6xl shadow-xl rounded-lg p-6 mb-5">
      {threads.length === 0 ? (
        <p className="text-slate-500">Belum ada thread.</p>
      ) : (
        <div className="space-y-8">
          {threads.map((thread) => (
            <ThreadItem
              key={thread.id}
              thread={thread}
              authUserId={authUserId}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  authUserId: PropTypes.string,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

ThreadsList.defaultProps = {
  authUserId: null,
};

export default ThreadsList;