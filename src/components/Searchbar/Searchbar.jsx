import PropTypes from 'prop-types';
import { useState } from 'react';
import s from 'components/Styles.module.css';
import { IconContext } from 'react-icons';
import { FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (this.state.value.trim() === '') {
      toast.warning('Enter data in the search field!');
      return;
    }

    onSubmit(query.trim().toLowerCase());

    setQuery('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={s.SearchForm_button}>
          <IconContext.Provider value={{ size: '1.5em' }}>
            <div>
              <FiSearch />
            </div>
          </IconContext.Provider>

          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.handleInputChange}
          value={this.state.value}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
