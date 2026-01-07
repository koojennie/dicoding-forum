import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdOutlineThumbDown, MdOutlineThumbUp } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';

import { asyncReceiveThreadDetail, asyncAddComment, asyncToggleUpvoteThreadDetail, asyncToggleDownvoteThreadDetail, asyncToggleUpvoteComment, asyncToggleDownvoteComment } from '../states/threadDetail/action';
import { postedAt } from '../utils/time';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { threadDetail, authUser } = useSelector((states) => states);
  const [content, onContentChange, setContent] = useInput('');

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) return null;

  const isThreadUpvoted = authUser ? threadDetail.upVotesBy.includes(authUser.id) : false;
  const isThreadDownvoted = authUser ? threadDetail.downVotesBy.includes(authUser.id) : false;

  const onComment = async () => {
    if (!content.trim()) return;
    await dispatch(asyncAddComment(id, content));
    setContent('');
  };

  return (
    <section className="bg-white mt-5 mx-auto max-w-6xl shadow-xl rounded-lg p-6 mb-5">
      <header className="mb-6">
        <div className="inline-block bg-purple-100 px-3 py-1 rounded-lg text-purple-600">
          <span className="font-semibold text-sm">#{threadDetail.category}</span>
        </div>

        <h1 className="mt-3 text-3xl font-bold text-primary">{threadDetail.title}</h1>

        <div className="mt-2 flex items-center gap-3 text-sm text-slate-600">
          <span>{postedAt(threadDetail.createdAt)}</span>
          <span>•</span>
          <span className="flex items-center gap-2">
            {threadDetail.owner?.avatar ? (
              <img src={threadDetail.owner.avatar} alt={threadDetail.owner.name} className="w-7 h-7 rounded-full" />
            ) : (
              <span className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                {threadDetail.owner?.name?.slice(0, 1)?.toUpperCase()}
              </span>
            )}
            <strong className="text-slate-800">{threadDetail.owner?.name}</strong>
          </span>
        </div>

        <div className="mt-5 text-slate-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: threadDetail.body }}/>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => dispatch(asyncToggleUpvoteThreadDetail(id))}
            className={`flex flex-row gap-2 items-center justify-center rounded-xl py-2 px-3 ${
              isThreadUpvoted ? 'bg-purple-600 text-white' : 'bg-gray-100'
            }`}
          >
            <MdOutlineThumbUp />
            <span className="font-semibold">{threadDetail.upVotesBy.length}</span>
          </button>

          <button
            type="button"
            onClick={() => dispatch(asyncToggleDownvoteThreadDetail(id))}
            className={`flex flex-row gap-2 items-center justify-center rounded-xl py-2 px-3 ${
              isThreadDownvoted ? 'bg-purple-600 text-white' : 'bg-gray-100'
            }`}
          >
            <MdOutlineThumbDown />
            <span className="font-semibold">{threadDetail.downVotesBy.length}</span>
          </button>
        </div>
      </header>

      <div className="border-t border-slate-200 pt-6">
        <h2 className="text-xl font-bold text-primary">Komentar</h2>

        <div className="mt-4">
          <textarea
            rows={4}
            value={content}
            onChange={onContentChange}
            placeholder={authUser ? 'Tulis komentar...' : 'Login dulu untuk berkomentar.'}
            disabled={!authUser}
            className="w-full rounded-lg border border-slate-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:bg-slate-50"
          />
          <button
            type="button"
            onClick={onComment}
            disabled={!authUser}
            className="mt-3 rounded-xl bg-purple-600 py-3 px-6 text-white font-semibold hover:bg-purple-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Kirim
          </button>
        </div>

        <div className="mt-8 space-y-6">
          {threadDetail.comments.map((c) => {
            const isUp = authUser ? c.upVotesBy.includes(authUser.id) : false;
            const isDown = authUser ? c.downVotesBy.includes(authUser.id) : false;

            return (
              <div key={c.id} className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  {c.owner?.avatar ? (
                    <img src={c.owner.avatar} alt={c.owner.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                      {c.owner?.name?.slice(0, 1)?.toUpperCase()}
                    </span>
                  )}
                  <strong className="text-slate-800">{c.owner?.name}</strong>
                  <span>•</span>
                  <span>{postedAt(c.createdAt)}</span>
                </div>

                <div className="mt-3 text-slate-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: c.content }} />

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => dispatch(asyncToggleUpvoteComment(id, c.id))}
                    className={`flex gap-2 items-center rounded-xl py-2 px-3 ${
                      isUp ? 'bg-purple-600 text-white' : 'bg-gray-100'
                    }`}
                    disabled={!authUser}
                  >
                    <MdOutlineThumbUp />
                    <span className="font-semibold">{c.upVotesBy.length}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(asyncToggleDownvoteComment(id, c.id))}
                    className={`flex gap-2 items-center rounded-xl py-2 px-3 ${
                      isDown ? 'bg-purple-600 text-white' : 'bg-gray-100'
                    }`}
                    disabled={!authUser}
                  >
                    <MdOutlineThumbDown />
                    <span className="font-semibold">{c.downVotesBy.length}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DetailPage;