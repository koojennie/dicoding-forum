import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdMenu, MdOutlineAddComment, MdOutlineChat, MdOutlineForum, MdOutlineLeaderboard, MdOutlineLogin } from 'react-icons/md';

function Navigation({}) {
  return (
    <div className="bg-white relative flex max-w-7xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center mb-2">
      <Link to="/" className="flex items-center whitespace-nowrap text-2xl font-black">
        <span className="mr-2 text-4xl text-primary">
          <MdOutlineForum />
        </span>
        <span className="text-primary">Dicoding Forum App</span>
      </Link>
      <input type="checkbox" className="peer hidden" id="navbar-open" />
      <label className="absolute top-5 right-7 cursor-pointer md:hidden" htmlFor="navbar-open">
        <span className="sr-only">Toggle Navigation</span>
        <MdMenu />
      </label>
      <nav aria-label="Header Navigation" className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
        <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
          <li className="md:mr-10 group">
            <Link
              to="/"
              className="flex flex-col items-center gap-1 text-primary font-medium group-hover:text-purple-600 transition-all duration-200 ease-in"
            >
              <MdOutlineChat className="block" size={20} />
              <span>Threads</span>
            </Link>
          </li>
          <li className="md:mr-10 group">
            <Link
              to="/leaderboards"
              className="flex flex-col items-center gap-1 text-primary font-medium group-hover:text-purple-600 transition-all duration-200 ease-in"
            >
              <MdOutlineLeaderboard className="block" size={20} />
              <span>Leaderboards</span>
            </Link>
          </li>
          <li className="md:mr-10 group">
            <Link
              to="/login"
              className="flex flex-col items-center gap-1 text-primary font-medium group-hover:text-purple-600 transition-all duration-200 ease-in"
            >
              <MdOutlineLogin className="block" size={20} />
              <span>Login</span>
            </Link>
          </li>
          <li className="md:mr-10 group">
            <Link
              to="/new"
              className="flex flex-col items-center gap-1 text-primary font-medium group-hover:text-purple-600 transition-all duration-200 ease-in"
            >
              <MdOutlineAddComment className="block" size={20} />
              <span>New Thread</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;