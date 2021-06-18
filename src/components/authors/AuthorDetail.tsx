import React from 'react';

import { useUserById } from '../../data/users';

import LoadingBar from '../common/LoadingBar';
import ErrorMessage from '../common/ErrorMessage';
import AuthorPostList from './AuthorPostList';

interface AuthorDetailProps {
  authorId: number;
}

function AuthorDetail(props: AuthorDetailProps) {
  const { data, isLoading, error } = useUserById(props.authorId);

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
      <pre>{JSON.stringify(data, undefined, 4)}</pre>
      <AuthorPostList authorId={data?.id as number} />
    </div>
  );
}

export default AuthorDetail;
