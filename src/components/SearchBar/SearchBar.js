import './SearchBar.css';
import { debounce } from '../../utils/debounce.js';

export const createSearchBar = (onSearch) => {
    const container = document.createElement('div');
    container.className = 'searchBar';

    container.innerHTML = `
        <input type="text" id="searchInput" placeholder="Search for books by title or author..." />
    `;

    const input = container.querySelector('#searchInput');
    input.style.backgroundImage = `url('${import.meta.env.BASE_URL}assets/search.svg')`;

    const debouncedSearch = debounce((query) => {
        const searchQuery = query.trim() === '' ? 'fiction' : query;
        onSearch(searchQuery);
    }, 600);

    input.addEventListener('input', (event) => {
        debouncedSearch(event.target.value);
    });

    return container;
};