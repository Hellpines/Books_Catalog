import './AuthorFilter.css';

export const createAuthorFilter = (onFilterChange) => {
    const select = document.createElement('select');
    select.id = 'author-filter';
    select.className = 'authorSelect';
    
    select.innerHTML = '<option value="all">All Authors</option>';
    
    select.addEventListener('change', (e) => {
        onFilterChange(e.target.value);
    });
    
    return select;
};

export const updateAuthorOptions = (selectElement, books) => {
    const authors = new Set();
    
    books.forEach(book => {
        if (book.author_name) {
            book.author_name.forEach(author => authors.add(author));
        }
    });

    selectElement.innerHTML = '<option value="all">All Authors</option>';

    Array.from(authors).sort().forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        selectElement.appendChild(option);
    });
};