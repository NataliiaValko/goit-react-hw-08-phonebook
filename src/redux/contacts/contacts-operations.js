import axios from 'axios';
import contactsApi from '../../service/contacts-api';
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  getContactsRequest,
  getContactsSuccess,
  getContactsError,
} from './contacts-actions';

axios.defaults.baseURL = 'http://localhost:3000';

const getContacts = () => dispatch => {
  dispatch(getContactsRequest());

  contactsApi
    .getContacts()
    .then(data => dispatch(getContactsSuccess(data)))
    .catch(error => dispatch(getContactsError(error)));
};

const addContact = contact => dispatch => {
  dispatch(addContactRequest());

  contactsApi
    .addContact(contact)
    .then(data => dispatch(addContactSuccess(data)))
    .catch(error => dispatch(addContactError(error)));
};

const deleteContact = id => dispatch => {
  dispatch(deleteContactRequest());

  contactsApi
    .deleteContact(id)
    .then(() => dispatch(deleteContactSuccess(id)))
    .catch(error => dispatch(deleteContactError(error)));
};
const contactsOperations = { addContact, deleteContact, getContacts };

export default contactsOperations;
