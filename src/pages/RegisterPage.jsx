import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoCommentDiscussion } from 'react-icons/go';

import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async ({ name, email, password }) => {
    await dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };

  return (
    <div className="bg-white mt-5 mx-auto max-w-6xl shadow-xl rounded-lg p-6 mb-5">
      <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <header className="flex items-center justify-center bg-purple-600 text-white text-[160px] rounded-lg">
          <GoCommentDiscussion />
        </header>

        <article className="flex flex-col justify-center gap-4 p-16">
          <h2 className="text-5xl font-light leading-tight text-primary">
            Buat Akun Sekarang
          </h2>

          <RegisterInput onRegister={onRegister} />
        </article>
      </section>
    </div>
  );
}

export default RegisterPage;