export const config = {
    // Use environment variable for external article data location
    articlesBasePath: import.meta.env.VITE_ARTICLES_PATH || ''
};
