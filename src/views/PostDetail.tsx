import React from 'react';

import { useParams } from 'react-router-dom';
import PostDetail from '../components/posts/PostDetail';

function PostDetailView() {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id, 10);

  return (
    <>
      <h1>Post Detail</h1>
      <PostDetail postId={postId} />
    </>
  );
}

export default PostDetailView;
