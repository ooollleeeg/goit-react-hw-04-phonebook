import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactsList from './ContactsList/ContactsList';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactForm from './ContactForm/ContactForm';

import styles from './phoneBooks.module.css';

const PhoneBook = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(localStorage.getItem('phone-book'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('phone-book', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(result);
  };

  const addContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    setContacts(prevContacts => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [newContact, ...prevContacts];
    });
    return true;
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  };

  const filteredContacts = getFilteredContacts();
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div>
      <h1>PhoneBook</h1>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <h3>Add contact</h3>
          <ContactForm onSubmit={addContact} />
        </div>
        <div className={styles.block}>
          <ContactFilter handleChange={handleFilter} />
          {isContacts && (
            <ContactsList
              removeContact={removeContact}
              contacts={filteredContacts}
            />
          )}
          {!isContacts && <p>No contacts in list</p>}
        </div>
      </div>
    </div>
  );
};
export default PhoneBook;
