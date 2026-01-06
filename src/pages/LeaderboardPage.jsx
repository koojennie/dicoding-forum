import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Leaderboard from '../components/Leaderboard';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboards } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="bg-white mt-5 mx-auto max-w-6xl shadow-xl rounded-lg p-6 mb-5">
      <Leaderboard leaderboards={leaderboards} />
    </section>
  );
}

export default LeaderboardPage;