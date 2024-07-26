export const getImagePath = (relativePath) => {
    return new URL(`../assets/thumbnails/${relativePath}`, import.meta.url).href;
};
