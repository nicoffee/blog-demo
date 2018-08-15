// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {
  fetchPostsRequest,
  getPosts,
  getIsFetching,
  getErrorMessage,
} from '../modules/posts';
import Loader from '../components/Loader';
import PostList from '../components/PostList';
import Error from '../components/Error';

export type post = {
  _id: string,
  title: string,
  body: string,
  picture: string,
  published: string,
  author: {
    name: string,
  },
};

type Props = {
  fetchPostsRequest: Function,
  posts: Array<post>,
  isFetching: boolean,
  errorMessage: string,
};

class PostListContainer extends React.Component<Props> {
  componentDidMount() {
    if (!this.props.posts.length) {
      this.props.fetchPostsRequest({limit: 10, offset: 0});
    }
    // window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const offset = document.documentElement.scrollTop + window.innerHeight;
    const height = document.documentElement.offsetHeight;

    if (offset === height) {
      this.props.fetchPostsRequest({
        limit: 10,
        offset: this.props.posts.length,
      });
    }
  };

  fetchMore = () => {
    this.props.fetchPostsRequest({
      limit: 10,
      offset: this.props.posts.length,
    });
  };

  render() {
    const {posts, isFetching, errorMessage, fetchPostsRequest} = this.props;

    if (!posts.length && isFetching) {
      return <Loader />;
    }

    if (errorMessage) {
      return <Error errorMessage={errorMessage} request={fetchPostsRequest} />;
    }

    if (!posts.length) {
      return (
        <Error
          errorMessage="No published posts yet"
          request={fetchPostsRequest}
        />
      );
    }

    return <PostList isFetching={isFetching} posts={posts} />;
  }
}

const mapStateToProps = state => ({
  posts: getPosts(state),
  isFetching: getIsFetching(state),
  errorMessage: getErrorMessage(state),
});

export default connect(mapStateToProps, {
  fetchPostsRequest,
})(PostListContainer);
