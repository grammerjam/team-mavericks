import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getImagePath } from '../../services/getImagePath.js';
import bookmarkActive from '../../assets/bookmark-active.png';
import bookmarkInactive from '../../assets/bookmark-inactive.png';
import { BookmarkImage } from "./MediaCard.styles.jsx";
import { UserContext } from "../../context/User.context.jsx";

const MediaCard = ({ movie, type }) => {
    const [imgSrc, setImgSrc] = useState('');
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [allBookmarks, setAllBookmarks] = useState([]);
    const { user } = useContext(UserContext);

    const unbookmarkMediaCard = async () => {
        try {
            const response = await axios.delete("http://localhost:8000/api/bookmark", {
                params: { userID: user.id, mediaID: movie.id },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const bookmarkMediaCard = async () => {
        try {
            const response = await axios.post("http://localhost:8000/api/bookmark",{
                userID: user.id, mediaID: movie.id
            });
            console.log(response.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleBookmarkToggle = () => {
        if(isBookmarked){
            unbookmarkMediaCard();
        }else {
            bookmarkMediaCard();
        }
        // Optionally, make an API call to update the bookmark status in the database
        setIsBookmarked(!isBookmarked);
    };

    // Get the static path to the image required for the media card
    useEffect(() => {
        const imagePath = getImagePath(movie.pics.regular.medium);
        setImgSrc(imagePath);
    }, [movie]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/bookmarks", {
                    params: { userID: user.id }
                });
                setAllBookmarks(response.data.bookmarks);
                // console.log(user.id);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchBookmarks();
    }, []);

    useEffect(() => {
        const isBookmarked = allBookmarks.some(bookmark => bookmark.title === movie.title);
        setIsBookmarked(isBookmarked);
    }, [allBookmarks, movie.title]);

    if (!imgSrc) {
        return <p style={{ color: "white" }}>Loading...</p>;
    }

    return (
        <>
            {type.toLowerCase() === "trending" ? (
                <div
                    className="trending-media-card"
                    style={{ backgroundImage: `url(${imgSrc})` }}
                >
                    <div className="trending-media-info">
                        <div className="media-info">
                            <h4 className="media-info-item">{movie.year} •</h4>
                            <h4 className="media-info-item">{movie.category} •</h4>
                            <h4 className="media-info-item">{movie.rating}</h4>
                        </div>
                        <div className="media-title">{movie.title}</div>
                    </div>
                    <BookmarkImage src={isBookmarked ? bookmarkActive : bookmarkInactive} onClick={() => handleBookmarkToggle()}
                    ></BookmarkImage>
                </div>
            ) : (
                <div className="recommended-card">
                    <img src={imgSrc} alt={movie.title} />
                    <img
                        src={isBookmarked ? bookmarkActive : bookmarkInactive}
                        className="bookmark-icon"
                        alt="Bookmark Icon"
                        onClick={()=> handleBookmarkToggle()}
                    />
                    <div className="media-info">
                        <h4 className="media-info-item">{movie.year} •</h4>
                        <h4 className="media-info-item">{movie.category} •</h4>
                        <h4 className="media-info-item">{movie.rating}</h4>
                    </div>
                    <div className="media-title">{movie.title}</div>
                </div>
            )}
        </>
    );
};

export default MediaCard;

