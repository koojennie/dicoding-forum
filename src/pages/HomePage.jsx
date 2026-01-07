// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoriesList from '../components/CategoriesList';
import ThreadsList from '../components/ThreadsList';
import {
  asyncReceiveThreads,
  setCategoryFilterActionCreator,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
} from '../states/threads/action';
import { asyncReceiveUsers } from '../states/users/action';

function HomePage() {
  const dispatch = useDispatch();
  const { items, categoryFilter } = useSelector((state) => state.threads);
  const { authUser } = useSelector((state) => state);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(asyncReceiveThreads());
    dispatch(asyncReceiveUsers());
  }, [dispatch]);

  const filteredThreads = categoryFilter
    ? items.filter((thread) => thread.category === categoryFilter)
    : items;

  const handleSelectCategory = (category) => {
    if (categoryFilter === category) {
      dispatch(setCategoryFilterActionCreator(null));
    } else {
      dispatch(setCategoryFilterActionCreator(category));
    }
  };

  const threadsWithOwner = filteredThreads.map((thread) => ({
    ...thread,
    owner: users.find((u) => u.id === thread.ownerId),
  }));

  return (
    <>
      <CategoriesList
        categories={[...new Set(items.map((t) => t.category))]}
        activeCategory={categoryFilter}
        onSelectCategory={handleSelectCategory}
      />

      <ThreadsList
        threads={threadsWithOwner}
        authUserId={authUser?.id}
        onUpvote={(id) => dispatch(asyncToggleUpvoteThread(id))}
        onDownvote={(id) => dispatch(asyncToggleDownvoteThread(id))}
      />
    </>
  );
}

export default HomePage;