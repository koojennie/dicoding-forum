import React, { useEffect } from 'react';
import { FaTrophy } from 'react-icons/fa6';

function Leaderboard() {
  return (
    <div className="">
      <header className="flex flex-row gap-3 items-center text-primary">
        <FaTrophy className="text-2xl" />
        <h1 className="text-2xl font-bold">Leaderboards</h1>
      </header>
      <div className="flex justify-between mt-5">
        <div className="flex flex-row gap-2">
          <p>photo</p>
          <p>Dimas Saputra</p>
        </div>
        <p>score</p>
      </div>
      <div className="flex justify-between mt-5">
        <div className="flex flex-row gap-2">
          <p>photo</p>
          <p>Dimas Saputra</p>
        </div>
        <p>score</p>
      </div>
    </div>
  );
}

export default Leaderboard;