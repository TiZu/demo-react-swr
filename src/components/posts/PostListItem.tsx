import React from 'react';
import { Link } from 'react-router-dom';
import './PostListItem.scss';

import { PostDto } from '../../data/posts';
import { Card } from 'primereact/card';
import AuthorName from '../authors/AuthorName';

interface PostListItemProps {
  post: PostDto;
}

function PostListItem(props: PostListItemProps) {
  return (
    <div className="card">
      <Card>
        <Link to={`/posts/${props.post.id}`}>
          <h3>{props.post.title}</h3>
        </Link>
        <p className="p-text-nowrap p-text-truncate">{props.post.body}</p>
        <AuthorName authorId={props.post.userId} />
      </Card>
    </div>
  );
}

export default PostListItem;
