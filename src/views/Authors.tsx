import React from 'react';

import AuthorList from '../components/authors/AuthorList';

function AuthorsView() {
  return (
    <>
      <div>
        <h1>Authors</h1>
        <AuthorList />
      </div>
    </>
  );
}

export default AuthorsView;
