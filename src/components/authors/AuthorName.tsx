import React from 'react';
import { Link } from 'react-router-dom';
import './AuthorName.scss';

import { useUserById } from '../../data/users';
import { Skeleton } from 'primereact/skeleton';

interface AuthorNameProps {
  authorId: number;
}

function AuthorName(props: AuthorNameProps) {
  const { data, isLoading, error } = useUserById(props.authorId);

  if (isLoading) return <Skeleton width="100%" height="2rem" />;
  if (error) return null;

  return (
    <div className="author">
      written by: <Link to={`/authors/${props.authorId}`}>{data?.name}</Link>
    </div>
  );
}

export default AuthorName;
