// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import type {Match} from 'react-router-dom';
import {fetchPostInfoRequest, editPostInfoRequest} from '../actions';
import PostForm from '../components/PostForm';
import Loader from '../components/Loader';

type Props = {
  fetchPostInfoRequest: Function,
  editPostInfoRequest: Function,
  isFetching: boolean,
  info: {
    id: string,
    title: string,
    body: string,
    picture: string,
  },
  match: Match,
};

class PostEditContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchPostInfoRequest(this.props.match.params.postId);
  }

  submitForm(e, data) {
    e.preventDefault();

    this.props.editPostInfoRequest(data.id, {
      title: data.title,
      body: data.body,
    });
  }

  render() {
    const {isFetching, info} = this.props;

    if (isFetching) {
      return <Loader />;
    }

    return (
      <PostForm
        id={info.id}
        title={info.title}
        body={info.body}
        img={info.picture}
        handleSubmit={this.submitForm.bind(this)}
      />
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.post.isFetching,
  info: state.post.info,
});

export default connect(mapStateToProps, {
  fetchPostInfoRequest,
  editPostInfoRequest,
})(PostEditContainer);
