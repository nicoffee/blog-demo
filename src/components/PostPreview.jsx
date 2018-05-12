// @flow

import * as React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  border-radius: 3px;

  h1 {
    font-size: 20px;
  }

  a {
    color: inherit;
  }
`;

const PreviewImage = styled.div`
  height: 180px;
  background: url(${props => props.background});
  background-position: center;
  background-size: cover;
`;

type Props = {
  id: string,
  title: string,
  body: string,
  img: string,
};

const PostPreviw = (props: Props) => (
  <Link to={`post/${props.id}`}>
    <StyledPost>
      <h1>{props.title}</h1>
      <p>{props.body.slice(0, 100)}</p>
      <PreviewImage background={props.img} />
    </StyledPost>
  </Link>
);

export default PostPreviw;
