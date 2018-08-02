import {takeEvery} from 'redux-saga/effects';
import {FETCH_POSTS_REQUEST, fetchPostsSaga} from './modules/posts';
import {
  CREATE_POST_REQUEST,
  FETCH_POST_REQUEST,
  UPDATE_POST_REQUEST,
  TOGGLE_LIKE_REQUEST,
  FETCH_COMMENTS_REQUEST,
  createPostSaga,
  fetchPostSaga,
  updatePostSaga,
  fetchPostCommentsSaga,
  likePostSaga,
} from './modules/post';
import {
  CREATE_USER_REQUEST,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGOUT_REQUEST,
  FETCH_SESSION_REQUEST,
  fetchLoginSaga,
  fetchLogoutSaga,
  fetchSessionSaga,
  createUserSaga,
} from './modules/user';
import {SWITCH_THEME, switchThemeSaga} from './modules/app';

function* mySaga() {
  yield takeEvery(FETCH_POSTS_REQUEST, fetchPostsSaga);

  yield takeEvery(CREATE_POST_REQUEST, createPostSaga);
  yield takeEvery(FETCH_POST_REQUEST, fetchPostSaga);
  yield takeEvery(UPDATE_POST_REQUEST, updatePostSaga);
  yield takeEvery(TOGGLE_LIKE_REQUEST, likePostSaga);
  yield takeEvery(FETCH_COMMENTS_REQUEST, fetchPostCommentsSaga);

  yield takeEvery(FETCH_LOGIN_REQUEST, fetchLoginSaga);
  yield takeEvery(FETCH_LOGOUT_REQUEST, fetchLogoutSaga);
  yield takeEvery(CREATE_USER_REQUEST, createUserSaga);
  yield takeEvery(FETCH_SESSION_REQUEST, fetchSessionSaga);

  yield takeEvery(SWITCH_THEME, switchThemeSaga);
}

export default mySaga;
