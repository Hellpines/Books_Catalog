import './MainTextBlock.css';

export const createMainText = () => {
    const container = document.createElement('div');

    container.className = 'mainTextContainer';

    container.innerHTML = `
        <h1 class='mainTitle'>Discover Your Next Great Read</h1>
        <p>Search million of books, build your personal library, and never lose track of what to read next.</p>
    `;

    return container;
};