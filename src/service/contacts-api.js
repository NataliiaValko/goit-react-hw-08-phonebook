import axios from 'axios';

axios.defaults.baseURL = 'http://localhost: 3000';

const getContacts = () => {
  return axios.get('/contacts').then(({ data }) => data);
};

const addContact = contact => {
  return axios.post('/contacts', contact).then(({ data }) => data);
};

const deleteContact = id => {
  return axios.delete(`/contacts/${id}`);
};

const contactsApi = { getContacts, addContact, deleteContact };
export default contactsApi;
