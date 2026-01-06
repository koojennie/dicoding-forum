import React, { useEffect } from 'react';
import { MdEditNote } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((states) => states);

  useEffect(() => {
    if (!authUser) navigate('/login');
  }, [authUser, navigate]);

  const onCreate = async ({ title, body, category }) => {
    await dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <section className="bg-white mt-5 mx-auto max-w-6xl shadow-xl rounded-lg p-6 mb-5">
      <header className="flex flex-row gap-2 items-center text-primary">
        <MdEditNote className="text-3xl" />
        <h1 className="text-2xl font-bold">Buat Diskusi Baru</h1>
      </header>
      <ThreadInput onCreate={onCreate} />
    </section>
  );
}

export default AddThreadPage;