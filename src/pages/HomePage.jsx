import React, { useEffect } from 'react';
import CategoriesList from '../components/CategoriesList';
import ThreadsList from '../components/ThreadsList';

function HomePage() {
  return (
    <>
      <CategoriesList />
      <ThreadsList />
    </>
  );
}

export default HomePage;