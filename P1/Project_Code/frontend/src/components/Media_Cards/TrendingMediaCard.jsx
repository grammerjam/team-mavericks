import React, { useState } from 'react';
import { BookmarkImage, TrendingContainer, PlayButton, PlayText } from "./MediaCard.styles.jsx";
import bookmarkActive from '../../assets/bookmark-active.png';
import bookmarkInactive from '../../assets/bookmark-inactive.png';
import bookmarkHover from '../../assets/bookmark-hover.svg';
import playIcon from '../../assets/icon-play.svg';
import MovieIcon from "../../assets/icon-category-movie.svg";
import TvIcon from "../../assets/icon-category-tv.svg";

const TrendingMediaCard = ({ imgSrc, movie, isBookmarked, toggleBookmark }) => {
    const [isHovered, setIsHovered] = useState(false); // State to track hover

    return (
      <TrendingContainer imgSrc={imgSrc}>
        <PlayButton className="play-button">
          <img className="play-button-img" src={playIcon} alt="play button" />
          <PlayText>Play</PlayText>
        </PlayButton>
        <div className="trending-media-info">
          <div className="media-info">
            <h4 className="media-info-item">{movie.year} •</h4>
            <img
              className="img-icon"
              src={movie.category === "movie" ? MovieIcon : TvIcon}
              style={{
                height: "12px",
                paddingTop: "24px",
                paddingLeft: "5px",
                  zIndex: "1",
              }}
            ></img>
            <h4 className="media-info-item">
              {movie.category === "movie" ? "Movie" : "TV Series"} •
            </h4>
            <h4 className="media-info-item">{movie.rating}</h4>
          </div>
          <div className="media-title" style={{ position: "relative" }}>
            {movie.title}
          </div>
        </div>
          <BookmarkImage
              src={isHovered ? bookmarkHover : isBookmarked ? bookmarkActive : bookmarkInactive} // Toggle between hover and normal states
              onClick={toggleBookmark}
              onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
              onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
          />
      </TrendingContainer>
    );
};
export default TrendingMediaCard;
