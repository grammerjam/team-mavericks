import {useState, useEffect, Fragment} from 'react';
import { getImagePath } from '../../services/getImagePath.js';
import bookmarkActive from '../../assets/bookmark-active.png';
import bookmarkInactive from '../../assets/bookmark-inactive.png';
import {BookmarkImage} from "./MediaCard.styles.jsx";

const MediaCard = ({ movie, type }) => {
    const [imgSrc, setImgSrc] = useState('');
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmarkToggle = () => {
        setIsBookmarked(!isBookmarked);
    };

    // Get the static path to the image required for the media card
    useEffect(() => {
        const imagePath = getImagePath(movie.pics.regular.medium);
        setImgSrc(imagePath);
    }, [movie]);

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
            <BookmarkImage src={isBookmarked ? bookmarkActive : bookmarkInactive} onClick={handleBookmarkToggle}
            ></BookmarkImage>
          </div>
        ) : (
            <div className="recommended-card">
                <img src={imgSrc} alt={movie.title}/>
                <img
                    src={isBookmarked ? bookmarkActive : bookmarkInactive}
                    className="bookmark-icon"
                    alt="Bookmark Icon"
                    onClick={handleBookmarkToggle}
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
