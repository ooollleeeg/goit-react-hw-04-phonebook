import { useState } from 'react';
import PropTypes from 'prop-types';

import initialState from './initialState';

import styles from './contactForm.module.scss';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setState({ ...initialState });
  };

  const { name, number } = state;

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Name</label>
        <input
          value={name}
          onChange={handleChange}
          name="name"
          placeholder="Name"
        />
      </div>
      <div className={styles.formGroup}>
        <label>Phone number</label>
        <input
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          placeholder="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button className={styles.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = { onSubmit: PropTypes.func.isRequired };

// class ContactForm extends Component {
//   state = { ...initialState };

//   reset() {
//     this.setState({ ...initialState });
//   }

//   handleChange = ({ target }) => {
//     const { name, number, value } = target;
//     this.setState({ [name]: value, [number]: value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const { onSubmit } = this.props;
//     onSubmit({ ...this.state });
//     this.reset();
//   };

//   render() {
//     const { handleChange, handleSubmit } = this;
//     const { name, number } = this.state;
//     return (
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label>Name</label>
//           <input
//             value={name}
//             onChange={handleChange}
//             name="name"
//             placeholder="Name"
//           />
//         </div>
//         <div className={styles.formGroup}>
//           <label>Phone number</label>
//           <input
//             value={number}
//             onChange={handleChange}
//             type="tel"
//             name="number"
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             placeholder="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </div>
//         <button type="submit">Add contact</button>
//       </form>
//     );
//   }
// }
