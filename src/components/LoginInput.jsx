import React, { useEffect } from 'react';

function LoginInput() {
  return (
    <form className="mt-4">
      <input
        type="email"
        placeholder="Email"
        className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <input
        type="password"
        placeholder="Password"
        className="mb-2 w-full rounded-lg border border-slate-200 px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-600"
      />

      <button
        type="button"
        className="mt-3 w-full rounded-xl bg-purple-600 py-3 text-white font-semibold hover:bg-purple-500 transition cursor-pointer"
      >
        Login
      </button>
    </form>
  );
}

export default LoginInput;