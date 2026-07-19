import './Header.css';

const sunIcon = `
    <svg class="sunIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
`;

const moonIcon = `
    <svg class="moonIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
`;

export const createHeader = () => {
    const header = document.createElement('header');

    header.className = 'header';

    const currentTheme = document.body.getAttribute('data-theme') || 'light';
    const initialIcon = currentTheme === 'dark' ? sunIcon : moonIcon;

    header.innerHTML = `
        <div class='headerContent'>
            <div class='logoContainer'>
                <img src="${import.meta.env.BASE_URL}assets/book.svg" alt="logo"/>
            </div>
            <div class='headerTextBlock'>
                <h1>The Library</h1>
                <p>Discover your next favorite book</p>
            </div>
        </div>
        <button id="themeToggle" class="themeBtn" aria-label="Toggle theme">
            ${initialIcon}
        </button>
    `;

    const themeBtn = header.querySelector('#themeToggle');
    
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('app-theme', newTheme);
        
        themeBtn.innerHTML = newTheme === 'dark' ? sunIcon : moonIcon;
    });

    return header;
};