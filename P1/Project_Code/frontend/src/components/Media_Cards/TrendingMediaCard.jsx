import React from 'react';
import { BookmarkImage, CardContainer, PlayButton } from "./MediaCard.styles.jsx";
import bookmarkActive from '../../assets/bookmark-active.png';
import bookmarkInactive from '../../assets/bookmark-inactive.png';
import playIcon from '../../assets/icon-play.svg';

const TrendingMediaCard = ({ imgSrc, movie, isBookmarked, toggleBookmark }) => {
    return (
        <CardContainer imgSrc={imgSrc}>
            <PlayButton className='play-button'>
                <img src={playIcon} alt='play button'/>
            </PlayButton>
            <div className="trending-media-info">
                <div className="media-info">
                    <h4 className="media-info-item">{movie.year} •</h4>
                    <h4 className="media-info-item">{movie.category} •</h4>
                    <h4 className="media-info-item">{movie.rating}</h4>
                </div>
                <div className="media-title">{movie.title}</div>
            </div>
            <BookmarkImage src={isBookmarked ? bookmarkActive : bookmarkInactive} onClick={toggleBookmark}
            ></BookmarkImage>
        </CardContainer>
    );
};
export default TrendingMediaCard;
