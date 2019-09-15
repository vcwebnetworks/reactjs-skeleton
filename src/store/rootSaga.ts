import { all } from 'redux-saga/effects';

import { AuthSagas } from './modules/auth';

export default function*() {
  yield all([AuthSagas]);
}
