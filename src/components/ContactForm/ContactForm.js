import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsSelectors } from '../../redux/contacts';
import { store } from 'react-notifications-component';
import { contactsOperations } from '../../redux/contacts';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const items = useSelector(contactsSelectors.getItems);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleGetValue = e => {
    const field = e.currentTarget.name;

    switch (field) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        throw new Error();
    }
  };

  const showNotification = () => {
    store.addNotification({
      title: 'Oops!',
      message:
        'But there’s already a contact with that name on your contact list',
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };

  const repeatCheck = newName => {
    return items.find(({ name }) => name === newName);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (repeatCheck(name)) {
      showNotification();
      return;
    }

    dispatch(contactsOperations.addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          value={name}
          onChange={handleGetValue}
          placeholder="Elon Reeve Musk"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label className={s.label}>
        Number
        <input
          className={s.input}
          value={number}
          onChange={handleGetValue}
          placeholder="1-800-613-8840"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>
      <button className={s.button} type="submit" aria-label="button-submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
