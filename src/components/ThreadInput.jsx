import React, { useEffect } from 'react';
import { MdEditNote } from 'react-icons/md';

function ThreadInput() {
  return (
    <form className="mt-10">
      <input
        type="text"
        placeholder="Judul"
        className="mb-5 w-full rounded-lg border border-slate-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <input
        type="text"
        placeholder="Kategori"
        className="mb-5 w-full rounded-lg border border-slate-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <textarea
        rows={5}
        placeholder="Isi"
        className="mb-5 w-full rounded-lg border border-slate-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <button
        type="button"
        className="mt-3 w-full rounded-xl bg-purple-600 py-3 text-white font-semibold hover:bg-purple-500 transition cursor-pointer"
      >
        Buat
      </button>
    </form>
  );
}

export default ThreadInput;