import * as React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

class ModalPortal extends React.PureComponent {
  constructor() {
    super();

    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default ModalPortal;
