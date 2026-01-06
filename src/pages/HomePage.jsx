import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesList from '../components/CategoriesList';
import ThreadsList from '../components/ThreadsList';
import { asyncReceiveThreads, setCategoryFilterActionCreator, asyncToggleUpvoteThread } from '../states/threads/action';

function HomePage() {
  const dispatch = useDispatch();
  const { items, category } = useSelector((state) => state.threads);
  const { authUser } = useSelector((state) => state);

  useEffect(() => {
    dispatch(asyncReceiveThreads());
  }, [dispatch]);

  const filteredThreads =
    category === 'all'
      ? items
      : items.filter((t) => t.category === category);

  return (
    <>
      <CategoriesList
        categories={[...new Set(items.map((t) => t.category))]}
        activeCategory={category}
        onSelectCategory={(c) => dispatch(setCategoryFilterActionCreator(c))}
      />
      <ThreadsList
        threads={filteredThreads}
        authUserId={authUser?.id}
        onUpvote={(id) => dispatch(asyncToggleUpvoteThread(id))}
      />
    </>
  );
}

export default HomePage;