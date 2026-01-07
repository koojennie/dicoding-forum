// src/components/CategoriesList.jsx
import React from 'react';
import PropTypes from 'prop-types';

function CategoriesList({ categories, activeCategory, onSelectCategory }) {
  return (
    <section className="bg-white mt-5 mx-auto max-w-6xl shadow-xl rounded-lg p-6 mb-5">
      <h1 className="font-semibold">Kategori</h1>

      <div className="flex flex-wrap gap-2 mt-5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`py-2 px-3 rounded-lg cursor-pointer ${
              activeCategory === cat
                ? 'bg-primary text-white'
                : 'bg-purple-100 text-purple-600'
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
  activeCategory: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
};

CategoriesList.defaultProps = {
  activeCategory: null,
};

export default CategoriesList;