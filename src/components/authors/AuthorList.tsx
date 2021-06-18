import React from 'react';
import { Link } from 'react-router-dom';

import { useAllUsers } from '../../data/users';

import LoadingBar from '../common/LoadingBar';
import ErrorMessage from '../common/ErrorMessage';

function AuthorList() {
  const { data, isLoading, error } = useAllUsers();

  if (isLoading) return <LoadingBar />;
  if (error)
    return (
      <ErrorMessage
        message={`${error.message}
        ${error.status ? ` (Status: ${error.status})` : ''}
        ${error.info ? `\n${error.info}` : ''}`}
      />
    );

  return (
    <div>
      <ul>
        {data?.map(author => (
          <li key={author.id}>
            <Link to={`/authors/${author.id}`}>{author.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorList;
