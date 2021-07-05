import React, { useRef, useState } from 'react';

import { CreateCommentDto, CommentDto, useCommentsByPostId, requestCreateComment } from '../../data/comments';

import LoadingBar from '../common/LoadingBar';
import ErrorMessage from '../common/ErrorMessage';
import CommentListItem from './CommentListItem';
import CommentForm, { IFormData } from './CommentForm';

import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { Fieldset } from 'primereact/fieldset';
import { FetchError } from '../../data/fetchError';

interface CommentListProps {
  postId: number;
}

function CommentList(props: CommentListProps) {
  const toast = useRef<Toast>(null);
  const { data, isLoading, error, mutate } = useCommentsByPostId(props.postId);
  const [isFieldsetCollapsed, setIsFieldsetCollapsed] = useState<boolean>(true);

  const onFormSubmit = async (formData: IFormData): Promise<boolean> => {
    try {
      const newComment: CreateCommentDto = {
        postId: props.postId,
        email: formData.email,
        name: formData.name,
        body: formData.body,
      };

      mutate([...(data as CommentDto[]), { ...newComment, id: Number.MAX_SAFE_INTEGER }], false);
      const { name: createdName } = await requestCreateComment(newComment);

      toast.current?.show({
        severity: 'success',
        summary: 'Success!',
        detail: `Your comment ${createdName ? `"${createdName}"` : ''} has been saved.`,
        life: 5000,
      });

      return true;
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Error!',
        detail: error instanceof FetchError ? error.message + ': ' + error.info : error,
        life: 10000,
      });

      return false;
    } finally {
      mutate();
    }
  };

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
      <Toast ref={toast} />
      <Fieldset
        style={{ margin: '2rem 0' }}
        legend="Add Comment"
        toggleable
        collapsed={isFieldsetCollapsed}
        onToggle={e => setIsFieldsetCollapsed(e.value)}
      >
        <CommentForm onSubmit={onFormSubmit} />
      </Fieldset>
      <Divider />
      <h1>Comments</h1>
      {data
        ?.sort((a, b) => b.id - a.id)
        .map(comment => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
    </div>
  );
}

export default CommentList;
