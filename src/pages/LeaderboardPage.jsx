import React, { useEffect } from 'react';
import Leaderboard from '../components/Leaderboard';

function LeaderboardPage() {
  return (
    <div className="bg-white mt-5 mx-auto max-w-6xl shadow-xl rounded-lg p-6 mb-5">
      <Leaderboard />
    </div>
  );
}

export default LeaderboardPage;