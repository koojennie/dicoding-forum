import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ onLogin }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="mt-4">
      <input
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <input
        type="password"
        value={password}
        onChange={onPasswordChange}
        placeholder="Password"
        className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <button
        type="button"
        onClick={() => onLogin({ email, password })}
        className="mt-3 w-full rounded-xl bg-purple-600 py-3 text-white font-semibold hover:bg-purple-500 transition cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;