import React, { useEffect } from 'react';

function CategoriesList() {
  return (
    <section className="bg-white mt-5 mx-auto max-w-6xl shadow-xl rounded-lg p-6 mb-5">
      <h1 className="font-semibold">Kategori Populer</h1>
      <div className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0 mt-5">
        <button className="md:mr-5 bg-purple-100 py-2 px-3 rounded-lg active:bg-primary text-purple-600 active:text-white cursor-pointer">
          <p className="font-semibold text-sm">#redux</p>
        </button>
        <button className="md:mr-5 bg-purple-100 py-2 px-3 rounded-lg active:bg-primary text-purple-600 active:text-white cursor-pointer">
          <p className="font-semibold text-sm">#perkenalan</p>
        </button>
      </div>
    </section>
  );
}

export default CategoriesList;