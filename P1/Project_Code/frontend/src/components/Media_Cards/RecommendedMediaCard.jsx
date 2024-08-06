import React from 'react';
import bookmarkActive from '../../assets/bookmark-active.png';
import bookmarkInactive from '../../assets/bookmark-inactive.png';

const RecommendedMediaCard = ({ imgSrc, movie, isBookmarked, toggleBookmark }) => (
    <div className="recommended-card">
        <img src={imgSrc} alt={movie.title} />
        <img
            src={isBookmarked ? bookmarkActive : bookmarkInactive}
            className="bookmark-icon"
            alt="Bookmark Icon"
            onClick={toggleBookmark}
        />
        <div className="media-info">
            <h4 className="media-info-item">{movie.year} •</h4>
            <h4 className="media-info-item">{movie.category} •</h4>
            <h4 className="media-info-item">{movie.rating}</h4>
        </div>
        <div className="media-title">{movie.title}</div>
    </div>
);

export default RecommendedMediaCard;
