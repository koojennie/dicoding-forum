import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoCommentDiscussion } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';

import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((states) => states);

  useEffect(() => {
    if (authUser) navigate('/');
  }, [authUser, navigate]);

  const onLogin = async ({ email, password }) => {
    await dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <div className="bg-white mt-5 mx-auto max-w-6xl shadow-xl rounded-lg p-6 mb-5">
      <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <header className="flex items-center justify-center bg-purple-600 text-white text-[160px] rounded-lg">
          <GoCommentDiscussion />
        </header>

        <article className="flex flex-col justify-center gap-4 p-16">
          <h2 className="text-5xl font-light leading-tight text-primary">
            Diskusikan Topik <strong className="font-bold text-purple-600">Favoritmu</strong>, <br />
            Disini
          </h2>

          <LoginInput onLogin={onLogin} />

          <p className="text-sm">
            Belum punya akun?{' '}
            <Link to="/register" className="text-purple-600 font-semibold hover:underline">
              Daftar di sini
            </Link>
          </p>
        </article>
      </section>
    </div>
  );
}

export default LoginPage;