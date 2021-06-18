import React from 'react';
import './PostList.scss';

import { useAllPosts } from '../../data/posts';

import LoadingBar from '../common/LoadingBar';
import ErrorMessage from '../common/ErrorMessage';
import PostListItem from './PostListItem';

function PostList() {
  const { data, isLoading, error } = useAllPosts();

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
      {data?.map(post => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
