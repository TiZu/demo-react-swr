import React from 'react';

import { useForm, Controller } from 'react-hook-form';

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

import { classNames } from 'primereact/utils';

export interface IFormData {
  email: string;
  name: string;
  body: string;
}

interface CommentFormProps {
  onSubmit: (formData: IFormData) => Promise<boolean>;
}

function CommentForm({ onSubmit }: CommentFormProps) {
  const initialFormData: IFormData = {
    email: '',
    name: '',
    body: '',
  };

  const internalOnSubmit = (formData: IFormData): Promise<void> => {
    return onSubmit(formData).then(result => {
      if (result) reset();
    });
  };

  const {
    control,
    formState: { isDirty, isSubmitting, isValid, errors },
    handleSubmit,
    reset,
  } = useForm<IFormData>({ mode: 'all', defaultValues: initialFormData });

  const getFormErrorMessage = (name: 'email' | 'name' | 'body') => {
    return errors[name] && <small className="p-error">{errors[name]?.message}</small>;
  };

  return (
    <form onSubmit={handleSubmit(internalOnSubmit)} onReset={() => reset()}>
      <div className="card">
        <div className="p-grid p-fluid p-formgrid">
          <div className="p-field p-col-12">
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address. E.g. example@email.com',
                },
              }}
              render={({ field, fieldState }) => (
                <>
                  <label htmlFor={field.name} className={classNames({ 'p-error': errors.email })}>
                    Email <span className="p-error">*</span>
                  </label>
                  <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                </>
              )}
            />
            {getFormErrorMessage('email')}
          </div>
          <div className="p-field p-col-12">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <label htmlFor={field.name} className={classNames({ 'p-error': errors.name })}>
                    Title
                  </label>
                  <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                </>
              )}
            />
            {getFormErrorMessage('name')}
          </div>
          <div className="p-field p-col-12">
            <Controller
              name="body"
              control={control}
              rules={{ required: 'Body is required.' }}
              render={({ field, fieldState }) => (
                <>
                  <label htmlFor={field.name} className={classNames({ 'p-error': errors.body })}>
                    Comment <span className="p-error">*</span>
                  </label>
                  <InputTextarea
                    id={field.name}
                    {...field}
                    rows={5}
                    autoResize
                    className={classNames({ 'p-invalid': fieldState.invalid })}
                  />
                </>
              )}
            />
            {getFormErrorMessage('body')}
          </div>
          <div className="p-field p-col-12">
            <div className="p-grid">
              <div className="p-col-2">
                <Button
                  type="submit"
                  className="p-button p-button-success"
                  icon={isSubmitting ? 'pi pi-spin pi-spinner' : 'pi pi-save'}
                  label="Submit"
                  disabled={!isValid || isSubmitting}
                />
              </div>
              <div className="p-col-2">
                <Button
                  type="reset"
                  className="p-button p-button-danger p-button-outlined"
                  icon={isSubmitting ? 'pi pi-spin pi-spinner' : 'pi pi-times'}
                  label="Cancel"
                  disabled={!isDirty || isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CommentForm;
