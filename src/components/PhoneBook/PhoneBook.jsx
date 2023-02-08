import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactsList from './ContactsList/ContactsList';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactForm from './ContactForm/ContactForm';

import styles from './phoneBooks.module.css';

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('phone-book'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      localStorage.setItem('phone-book', JSON.stringify(contacts));
    }
  }

  removeContact = id => {
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);
      return { contacts: newContacts };
    });
  };

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      return alert(`${name} is already in contacts`);
    }
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return {
        contacts: [newContact, ...contacts],
      };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDublicate(name, number) {
    const normalizedName = name.toLowerCase();
    const { contacts } = this.state;
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(result);
  }

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });
    return result;
  }

  render() {
    const { addContact, removeContact } = this;
    const contacts = this.getFilteredContacts();

    return (
      <div>
        <h1>PhoneBook</h1>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <h3>Add contact</h3>
            <ContactForm onSubmit={addContact} />
          </div>
          <div className={styles.block}>
            <ContactFilter handleChange={this.handleFilter} />
            <ContactsList removeContact={removeContact} contacts={contacts} />
          </div>
        </div>
      </div>
    );
  }
}

export default PhoneBook;
