import React from 'react';

import { usePostsByUserId } from '../../data/posts';

import LoadingBar from '../common/LoadingBar';
import ErrorMessage from '../common/ErrorMessage';
import PostListItem from '../posts/PostListItem';

interface AuthorPostListProps {
  authorId: number;
}

function AuthorPostList(props: AuthorPostListProps) {
  const { data, isLoading, error } = usePostsByUserId(props.authorId);

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
      <h2>Posts</h2>
      {data
        ?.sort((a, b) => b.id - a.id)
        .map(post => (
          <PostListItem key={post.id} post={post} />
        ))}
    </div>
  );
}

export default AuthorPostList;
