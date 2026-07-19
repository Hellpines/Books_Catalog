import './Footer.css';

export const createFooter = () => {
    const footer = document.createElement('footer');

    footer.className = 'footer';

    footer.innerHTML = `
        <p>Powered by <span>Open Library</span></p>
    `;

    return footer;
};