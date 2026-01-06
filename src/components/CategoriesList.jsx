import React from 'react';
import PropTypes from 'prop-types';

function CategoriesList({ categories, activeCategory, onSelectCategory }) {
  return (
    <section className="bg-white mt-5 mx-auto max-w-6xl shadow-xl rounded-lg p-6 mb-5">
      <h1 className="font-semibold">Kategori Populer</h1>

      <div className="flex flex-wrap items-center gap-2 mt-5">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`bg-purple-100 py-2 px-3 rounded-lg cursor-pointer ${
            activeCategory === 'all' ? 'bg-primary text-white' : 'text-purple-600'
          }`}
        >
          <p className="font-semibold text-sm">#all</p>
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`bg-purple-100 py-2 px-3 rounded-lg cursor-pointer ${
              activeCategory === cat ? 'bg-primary text-white' : 'text-purple-600'
            }`}
          >
            <p className="font-semibold text-sm">#{cat}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoriesList;