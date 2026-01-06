import React from 'react';
import PropTypes from 'prop-types';
import { FaTrophy } from 'react-icons/fa6';

function Leaderboard({ leaderboards }) {
  return (
    <div>
      <header className="flex flex-row gap-3 items-center text-primary">
        <FaTrophy className="text-2xl" />
        <h1 className="text-2xl font-bold">Leaderboards</h1>
      </header>

      <div className="mt-6 space-y-4">
        {leaderboards.map((item) => (
          <div key={item.user.id} className="flex justify-between items-center">
            <div className="flex flex-row gap-3 items-center">
              {item.user.avatar ? (
                <img
                  src={item.user.avatar}
                  alt={item.user.name}
                  className="w-10 h-10 rounded-full border border-purple-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                  {item.user.name.slice(0, 1).toUpperCase()}
                </div>
              )}
              <p className="font-semibold text-slate-800">{item.user.name}</p>
            </div>

            <p className="font-bold text-purple-700">{item.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

Leaderboard.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }).isRequired,
    }),
  ).isRequired,
};

export default Leaderboard;