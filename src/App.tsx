import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Layout from './components/layout';
import LoadingBar from './components/common/LoadingBar';

// Home views
const HomeView = lazy(() => import(/* */ './views/Home'));
// Post views
const PostsView = lazy(() => import(/* */ './views/Posts'));
const PostDetailView = lazy(() => import(/* */ './views/PostDetail'));
// Author views
const AuthorsView = lazy(() => import(/* */ './views/Authors'));
const AuthorDetailView = lazy(() => import(/* */ './views/AuthorDetail'));
// Error views
const PageNotFoundView = lazy(() => import(/* */ './views/404'));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingBar />}>
          <Switch>
            {/* Home Routes */}
            <Route path="/" component={HomeView} exact />
            {/* Post Route */}
            <Route path="/posts" component={PostsView} exact />
            <Route path="/posts/:id" component={PostDetailView} exact />
            {/* Author Routes */}
            <Route path="/authors" component={AuthorsView} exact />
            <Route path="/authors/:id" component={AuthorDetailView} exact />
            {/* Error Routes */}
            <Route component={PageNotFoundView} />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
