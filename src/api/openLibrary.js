export const fetchBooks = async (query) => {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Network error');
        }

        const data = await response.json();
        
        return data.docs;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};