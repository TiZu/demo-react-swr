import React from 'react';

import { ProgressBar } from 'primereact/progressbar';

function LoadingBar() {
  return <ProgressBar mode="indeterminate" style={{ height: '4px' }} />;
}

export default LoadingBar;
