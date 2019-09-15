import { Action } from 'redux';
import { takeLatest, all } from 'redux-saga/effects';

/**
 * TYPES
 */

export const AuthTypes: { [key: string]: any } = {
  REQUEST: '@auth/REQUEST',
};

/**
 * REDUCER
 */

const INITIAL_STATE = {
  token: null,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action: Action) {
  switch (action.type) {
    case AuthTypes.REQUEST: {
      return { ...state, loading: true };
    }

    default: {
      return state;
    }
  }
}

/**
 * ACTIONS
 */

export const AuthActions = {
  request: () => ({ type: AuthTypes.REQUEST }),
};

/**
 * SAGA
 */

export function authLogin({ payload }: { [key: string]: any }) {}

export const AuthSagas = all([takeLatest(AuthTypes.REQUEST, authLogin)]);
