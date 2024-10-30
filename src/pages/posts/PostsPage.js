import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import Post from '../../components/Post';
import PostsFilters from '../../components/PostsFilters';

const PostsWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const PostsHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #757c87;
`;

const Title = styled.h1`
  width: 100%;
  color: #edf4ff;
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const PostsContainer = styled.div`
  padding-top: 20px;
`;

const EmptyPostsPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

const SignOutIconContainer = styled.div`
  margin-left: 10px;

  .signOutIcon {
    fill: #edf4ff;
  }
`;

@inject('postsStore', 'routerStore', 'userStore')
@observer
class PostsPage extends Component {
  componentDidMount() {
    this.props.postsStore.fetchPosts();
  }

  handleSignOut = () => {
    const { userStore, postsStore } = this.props;
    userStore.signout();
    postsStore.resetPosts();
    window.location.hash = '/signin';
  };

  renderPosts = () => {
    const { postsStore } = this.props;

    if (!postsStore.posts.length) {
      return (
        <EmptyPostsPlaceholder>
          No posts available. Create one?
        </EmptyPostsPlaceholder>
      );
    }

    return postsStore.posts.map((post) => (
      <Post
        key={post.id}
        id={post.id}
        title={post.title}
        description={post.description}
        status={post.status}
      />
    ));
  };

  render() {
    return (
      <PostsWrapper>
        <PostsHeader>
          <Title>Message Board</Title>

          <CreateButtonContainer>
            <Fab
              variant="extended"
              onClick={() => {
                window.location.hash = '/posts/create';
              }}
            >
              <AddIcon />
              Create Post
            </Fab>

            <SignOutIconContainer>
              <IconButton onClick={this.handleSignOut}>
                <SignOutIcon className="signOutIcon" />
              </IconButton>
            </SignOutIconContainer>
          </CreateButtonContainer>
        </PostsHeader>

        <PostsFilters />

        <PostsContainer>{this.renderPosts()}</PostsContainer>
      </PostsWrapper>
    );
  }
}

export default PostsPage;
