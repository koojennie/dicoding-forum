import React, { useEffect } from 'react';
import ThreadInput from '../components/ThreadInput';
import { MdEditNote } from 'react-icons/md';

function AddThreadPage() {
  return (
    <section className="bg-white mt-5 mx-auto max-w-6xl shadow-xl rounded-lg p-6 mb-5">
      <header className="flex flex-row gap-2 items-center text-primary">
        <MdEditNote className="text-3xl" />
        <h1 className="text-2xl font-bold">Buat Diskusi Baru</h1>
      </header>
      <ThreadInput />
    </section>
  );
}

export default AddThreadPage;