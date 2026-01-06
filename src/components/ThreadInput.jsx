import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ onCreate }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  return (
    <form className="mt-10">
      <input
        type="text"
        placeholder="Judul"
        value={title}
        onChange={onTitleChange}
        className="mb-5 w-full rounded-lg border border-slate-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <input
        type="text"
        placeholder="Kategori"
        value={category}
        onChange={onCategoryChange}
        className="mb-5 w-full rounded-lg border border-slate-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <textarea
        rows={5}
        placeholder="Isi"
        value={body}
        onChange={onBodyChange}
        className="mb-5 w-full rounded-lg border border-slate-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <button
        type="button"
        onClick={() => onCreate({ title, body, category })}
        className="mt-3 w-full rounded-xl bg-purple-600 py-3 text-white font-semibold hover:bg-purple-500 transition cursor-pointer"
      >
        Buat
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default ThreadInput;