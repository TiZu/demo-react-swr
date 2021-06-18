import React from 'react';

import { Message } from 'primereact/message';

interface ErrorMessageProps {
  message: string;
}

function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div className="p-grid">
      <div className="p-col-12">
        <Message severity="error" text={props.message} />
      </div>
    </div>
  );
}

export default ErrorMessage;
