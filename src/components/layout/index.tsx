import React, { ReactNode } from 'react';
import './index.scss';

import Navigation from './Navigation';

interface LayoutProps {
  children?: ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <div className="container">
      <div className="p-grid">
        <div className="p-col-12">
          <Navigation></Navigation>
        </div>
        <div className="p-col-12">
          <div className="content">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
