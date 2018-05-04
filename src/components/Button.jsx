import styled, {css} from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  padding: 8px 16px;
  margin: 0 1em;
  color: ${props => props.theme.color};
  border: 1px solid #28abe3;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  ${props =>
    props.primary &&
    css`
      background: #28abe3;
      color: ${props.theme.color};
    `};

  &:hover {
    background-color: #28abe3;
    color: #ffffff;
  }
`;

export default Button;
