// @flow

import * as React from 'react';
import styled from 'styled-components';

export const StyledComment = styled.div`
  padding: ${props => props.theme.basicPadding};
  margin: 10px 0;
`;

type Props = {
  name: string,
  body: string,
};

const Comment = (props: Props) => (
  <StyledComment>
    <span>{props.name}</span>
    <p>{props.body}</p>
  </StyledComment>
);

export default Comment;
