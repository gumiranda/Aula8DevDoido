import {all, takeLatest, call, put} from 'redux-saga/effects';
import api from '../../../services/api';
import {getSuccess, getFailure} from './list';

export function* getCards() {
  try {
    const response = yield call(api.get, 'card');
    if (response.data) {
      yield put(getSuccess(response.data));
    } else {
      yield put(getFailure());
    }
  } catch (err) {
    console.tron.log(err);
    yield put(getFailure());
  }
}

export default all([takeLatest('@creditcard/GET_REQUEST', getCards)]);
