import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { GoCommentDiscussion } from 'react-icons/go';

function RegisterPage() {
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

          <RegisterInput />
        </article>
      </section>
    </div>
  );
}

export default RegisterPage;