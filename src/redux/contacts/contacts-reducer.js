import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import {
  getContactsSuccess,
  addContactSuccess,
  deleteContactSuccess,
  changeFilter,
} from './contacts-actions';

const items = createReducer([], {
  [getContactsSuccess]: (state, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [payload, ...state],
  [deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

export default combineReducers({ items, filter });
