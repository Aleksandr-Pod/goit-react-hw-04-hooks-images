import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {

    return (
        <header className="Searchbar">
        <form className="SearchForm" onSubmit={onSubmit}>
            <button type="submit" className="SearchForm-button">
                <FaSearch size={24}/>
            </button>

            <input
                className="SearchForm-input"
                name="searchName"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </form>
    </header>)
}
Searchbar.propTypes = {
    onSubmit: PropTypes.func
}