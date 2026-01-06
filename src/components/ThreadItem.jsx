import React from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { MdOutlineReply, MdOutlineThumbDown, MdOutlineThumbUp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function ThreadItem({}) {
  return (
    <div className="">
      <header className="">
        <div className="inline-block bg-purple-100 px-3 py-1 rounded-lg text-purple-600">
          <span className="font-semibold text-sm">#redux</span>
        </div>
        <h4 className="mt-3 text-lg text-purple-800 font-bold">
          <a href="/threads/:id">
            Bagaimana pengalamanmu belajar Redux?
          </a>
        </h4>
      </header>
      <div className="mt-1 text-gray-700">
        coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?
      </div>
      <footer className="mt-3 flex flex-row gap-4 items-center">
        <button className="flex flex-row gap-2 items-center justify-center rounded-xl bg-gray-100 py-2 px-3">
          <MdOutlineThumbUp className="text-base" />
          <span className="text-sm font-medium **:">1</span>
        </button>
        <button className="flex flex-row gap-2 items-center justify-center rounded-xl bg-gray-100 py-2 px-3">
          <MdOutlineThumbDown className="text-base"/>
          <span className="text-sm font-medium">0</span>
        </button>
        <p class="flex flex-row gap-2 items-center justify-center rounded-xl bg-gray-100 py-2 px-3">
          <MdOutlineReply className="text-base" />
          <span className="text-sm font-medium">0</span>
        </p>
        <p className="text-sm">900 hari lalu</p>
        <p className="flex flex-row gap-1 text-sm text-gray-500">
          Dibuat oleh
          <strong>user.name</strong>
        </p>
      </footer>
    </div>
  );
}

export default ThreadItem;