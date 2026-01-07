import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  MdMenu,
  MdOutlineAddComment,
  MdOutlineChat,
  MdOutlineForum,
  MdOutlineLeaderboard,
  MdOutlineLogin,
} from 'react-icons/md';

function Navigation({ authUser, onSignOut }) {
  return (
    <div className="bg-white relative flex max-w-7xl min-h-16 flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center mb-2">
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

      <nav
        aria-label="Header Navigation"
        className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
      >
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

          {authUser ? (
            <>
              <li className="md:mr-10 group">
                <Link
                  to="/new"
                  className="flex flex-col items-center gap-1 text-primary font-medium group-hover:text-purple-600 transition-all duration-200 ease-in"
                >
                  <MdOutlineAddComment className="block" size={20} />
                  <span>New Thread</span>
                </Link>
              </li>

              <li className="md:mr-10 group">
                <button
                  type="button"
                  onClick={onSignOut}
                  className="flex flex-col items-center gap-1 text-primary font-medium group-hover:text-purple-600 transition-all duration-200 ease-in cursor-pointer"
                >
                  <MdOutlineLogin className="block" size={20} />
                  <span>Logout</span>
                </button>
              </li>

              <li className="md:mr-2 flex items-center gap-2">
                {authUser.avatar ? (
                  <img
                    src={authUser.avatar}
                    alt={authUser.name}
                    className="w-9 h-9 rounded-full border border-purple-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                    {authUser.name?.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-primary font-semibold">{authUser.name}</span>
              </li>
            </>
          ) : (
            <li className="md:mr-10 group">
              <Link
                to="/login"
                className="flex flex-col items-center gap-1 text-primary font-medium group-hover:text-purple-600 transition-all duration-200 ease-in"
              >
                <MdOutlineLogin className="block" size={20} />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  onSignOut: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;