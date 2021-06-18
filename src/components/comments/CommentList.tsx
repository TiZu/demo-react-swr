import React, { useState } from 'react';

import { CreateCommentDto, useCommentsByPostId, requestCreateComment } from '../../data/comments';

import LoadingBar from '../common/LoadingBar';
import ErrorMessage from '../common/ErrorMessage';
import CommentListItem from './CommentListItem';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Fieldset } from 'primereact/fieldset';

interface CommentListProps {
  postId: number;
}

function CommentList(props: CommentListProps) {
  const { data, isLoading, error, mutate } = useCommentsByPostId(props.postId);
  const [commentEmail, setCommentEmail] = useState<string>('');
  const [commentTitle, setCommentTitle] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');
  const [isFieldsetCollapsed, setIsFieldsetCollapsed] = useState<boolean>(true);

  if (isLoading) return <LoadingBar />;
  if (error)
    return (
      <ErrorMessage
        message={`${error.message}
        ${error.status ? ` (Status: ${error.status})` : ''}
        ${error.info ? `\n${error.info}` : ''}`}
      />
    );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createCommentDto: CreateCommentDto = {
      postId: props.postId,
      email: commentEmail as string,
      name: commentTitle as string,
      body: commentContent as string,
    };

    await requestCreateComment(createCommentDto);
    mutate();

    onReset();
  };

  const onReset = () => {
    setCommentContent('');
    setCommentEmail('');
    setCommentTitle('');
    setIsFieldsetCollapsed(true);
  };

  const isEmailValid = () => commentEmail !== '';
  const isTitleValid = () => commentTitle !== '';
  const isCommnetValid = () => commentContent !== '';

  const isFormValid = () => isCommnetValid() && isEmailValid() && isTitleValid();

  return (
    <div>
      <Fieldset
        style={{ margin: '2rem 0' }}
        legend="Add Comment"
        toggleable
        collapsed={isFieldsetCollapsed}
        onToggle={e => setIsFieldsetCollapsed(e.value)}
      >
        <form onSubmit={onSubmit} onReset={onReset}>
          <div className="card">
            <div className="p-grid p-fluid p-formgrid">
              <div className="p-field p-col-12">
                <label htmlFor="email">Email</label>
                <InputText id="email" value={commentEmail} onChange={e => setCommentEmail(e.target.value)} />
              </div>
              <div className="p-field p-col-12">
                <label htmlFor="title">Title</label>
                <InputText id="title" value={commentTitle} onChange={e => setCommentTitle(e.target.value)} />
              </div>
              <div className="p-field p-col-12">
                <label htmlFor="comment">Comment</label>
                <InputTextarea
                  id="comment"
                  value={commentContent}
                  rows={5}
                  autoResize
                  onChange={e => setCommentContent(e.target.value)}
                />
              </div>
              <div className="p-field p-col-12">
                <div className="p-grid">
                  <div className="p-col-2">
                    <Button
                      type="submit"
                      className="p-button-success"
                      icon="pi pi-save"
                      label="Submit"
                      disabled={!isFormValid()}
                    />
                  </div>
                  <div className="p-col-2">
                    <Button
                      type="reset"
                      className="p-button-outlined p-button-danger"
                      icon="pi pi-times"
                      label="Cancel"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
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
