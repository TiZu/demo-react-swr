import React from 'react';
import './CommentListItem.scss';

import { CommentDto } from '../../data/comments';
import { Card } from 'primereact/card';

interface CommentListItemProps {
  comment: CommentDto;
}

function CommentListItem(props: CommentListItemProps) {
  return (
    <div className="card">
      <Card>
        {props.comment.name && <h3>{props.comment.name}</h3>}
        <p style={{ marginTop: '-0.5rem' }}>{props.comment.body}</p>
        <small>
          written by: <a href={`mailto:${props.comment.email}`}>{props.comment.email}</a>
        </small>
      </Card>
    </div>
  );
}

export default CommentListItem;
