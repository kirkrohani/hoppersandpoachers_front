import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import PostsPage from './pages/posts/PostsPage';
import CreatePostPage from './pages/create-post/CreatePostPage';

@inject('routerStore')
@observer
class App extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={SignInPage} />
        <Route path="/signin/" component={SignInPage} />
        <Route path="/signup/" component={SignUpPage} />
        <Route exact path="/posts" component={PostsPage} />
        <Route
          exact
          path="/posts/create"
          component={CreatePostPage}
        />
      </Fragment>
    );
  }
}

export default App;
