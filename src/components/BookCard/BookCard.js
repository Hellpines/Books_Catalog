import './BookCard.css';

export const createBookCard = (book, isFavorite, onToggleFavorite) => {
    const card = document.createElement('div');
    card.className = 'bookCard';

    const coverHtml = book.cover_i
        ? `<img src="https://covers.openlibrary.org/b/id/${book.cover_i}.jpg" alt="${book.title} cover" class="bookCover" />`
        : `<div class="noCover">No cover</div>`;

    card.innerHTML = `
        <div class="coverWrapper">
            ${coverHtml}
            <button class="favButton ${isFavorite ? 'active' : ''}">
                <svg class="heartIcon" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5928 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82671 2 9.00004 2.33333 8.00004 3.33333C7.00004 2.33333 6.17337 2 5.00004 2C4.02758 2 3.09495 2.38631 2.40732 3.07394C1.71968 3.76158 1.33337 4.69421 1.33337 5.66667C1.33337 7.2 2.33337 8.36667 3.33337 9.33333L8.00004 14L12.6667 9.33333Z" 
                    stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="bookInfo">
            <h3 class="bookTitle">${book.title}</h3>
            <p class="bookAuthor">${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            <p class="bookYear">${book.first_publish_year || 'Unknown Year'}</p>
        </div>
    `;

    const favBtn = card.querySelector('.favButton');
    favBtn.addEventListener('click', () => {
        onToggleFavorite(book);
    });

    return card;
};