import React from 'react';
import './PostDetail.scss';

import { usePostById } from '../../data/posts';
import LoadingBar from '../common/LoadingBar';
import ErrorMessage from '../common/ErrorMessage';

import AuthorName from '../authors/AuthorName';
import { Card } from 'primereact/card';

import CommentList from '../comments/CommentList';

interface PostDetailProps {
  postId: number;
}

function PostDetail(props: PostDetailProps) {
  const { data, isLoading, error } = usePostById(props.postId);

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
      <Card>
        <h1 style={{ marginTop: '-0.5rem' }}>{data?.title}</h1>
        <AuthorName authorId={data?.userId as number} />
        <p>{data?.body}</p>
      </Card>
      <CommentList postId={data?.id as number} />
    </div>
  );
}

export default PostDetail;
