import './BookList.css';
import { createBookCard } from '../BookCard/BookCard.js';

export const createBookList = (books, favorites, onToggleFavorite) => {
    const bookList = document.createElement('div');
    bookList.className = 'bookList';

    books.forEach(book => {
        const isFav = favorites.some(fav => fav.key === book.key);
        const card = createBookCard(book, isFav, onToggleFavorite);
        bookList.appendChild(card);
    });

    return bookList;
};