import React from 'react';

import { useParams } from 'react-router-dom';

import AuthorDetail from '../components/authors/AuthorDetail';

function AuthorDetailView() {
  const { id } = useParams<{ id: string }>();
  const authorId = parseInt(id, 10);

  return (
    <>
      <div>
        <h1>Author Details</h1>
        <AuthorDetail authorId={authorId} />
      </div>
    </>
  );
}

export default AuthorDetailView;
