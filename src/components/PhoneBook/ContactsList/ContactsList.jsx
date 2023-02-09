import PropTypes from 'prop-types';

import styles from './contactsList.module.scss';

const ContactsList = ({ removeContact, contacts }) => {
  const phoneContacts = contacts.map(({ id, name, number }) => (
    <li key={id} className={styles.contactItem}>
      <span className={styles.itemTitle}>Name:</span>
      <span className={styles.itemName}>{name}</span>
      <span className={styles.itemTitle}>Phone number:</span>
      <span className={styles.itemName}>{number}</span>

      <button
        className={styles.btn}
        onClick={() => removeContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));
  return <ul className={styles.listItem}>{phoneContacts}</ul>;
};

export default ContactsList;

ContactsList.defaultProps = { contacts: [] };

ContactsList.propTypes = {
  removeContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
