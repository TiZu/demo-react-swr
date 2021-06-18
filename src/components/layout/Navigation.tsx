import React from 'react';
import { useHistory } from 'react-router-dom';

import { Menubar } from 'primereact/menubar';

function Navigation() {
  const history = useHistory();

  const start = (
    <div className="p-mr-4">
      <h3>Sample Blog</h3>
    </div>
  );

  const navigationItems = [
    { label: 'Home', icon: 'pi pi-home', command: () => history.push('/') },
    { label: 'Posts', icon: 'pi pi-book', command: () => history.push('/posts') },
    { label: 'Authors', icon: 'pi pi-users', command: () => history.push('/authors') },
  ];

  return <Menubar model={navigationItems} start={start} />;
}

export default Navigation;
