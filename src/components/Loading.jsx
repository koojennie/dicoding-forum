import React from 'react';
import LoadingBar from '@dimasmds/react-redux-loading-bar';

export default function Loading() {
  return (
    <div className="absolute left-0 right-0 top-full z-40">
      <LoadingBar />
    </div>
  );
}