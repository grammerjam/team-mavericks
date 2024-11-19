//Shorten the title based on screen width
//Parameters:
//@title - Movie title
//@maxWindowWidth - The max screen width to trigger the shortening logic
//@maxLength - The max num of chars to retain before appending "..."
//@setTitle: Function to update the state of the title
export const updateShortenedTitle = (title, maxWindowWidth, maxLength, setTitle) => {
    if (window.innerWidth < maxWindowWidth && title.length > maxLength){
        setTitle(title.slice(0, maxLength) + "...");
    }else{
        setTitle(title);
    }
}