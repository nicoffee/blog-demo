// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {
  getCurrentTheme,
  getIsModalOpen,
  openModal,
  switchTheme,
} from '../modules/app';
import {getUserName} from '../modules/user';
import Header from '../components/Header';

const HeaderContainer = props => <Header {...props} />;

const mapStateToProps = state => ({
  isModalOpen: getIsModalOpen(state),
  user: getUserName(state),
  theme: getCurrentTheme(state),
});

export default connect(mapStateToProps, {openModal, switchTheme})(
  HeaderContainer
);
