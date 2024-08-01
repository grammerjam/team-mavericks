import {useState, useEffect, Fragment} from 'react';
import { getImagePath } from '../../services/getImagePath.js';
import bookmarkActive from '../../assets/bookmark-active.png';
import bookmarkInactive from '../../assets/bookmark-inactive.png';
import {BookmarkImage} from "./MediaCardsContainer.styles.js";

const MediaCard = ({ movie, type }) => {
    const [imgSrc, setImgSrc] = useState('');

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
            <BookmarkImage src={bookmarkActive}></BookmarkImage>
          </div>
        ) : (
          <div className="recommended-card">
            <img src={imgSrc} alt={movie.title} />
            <img src={bookmarkActive} className="bookmark-icon"/>
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
