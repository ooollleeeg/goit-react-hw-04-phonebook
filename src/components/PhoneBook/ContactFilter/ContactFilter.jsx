import PropTypes from 'prop-types';

import styles from './contactFilter.module.css';

const ContactFilter = ({ handleChange }) => {
  return (
    <div className={styles.formGroup}>
      <label>Find contact</label>
      <input
        onChange={handleChange}
        name="filter"
        placeholder="enter contact"
      />
    </div>
  );
};

export default ContactFilter;

ContactFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
