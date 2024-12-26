import React, { useState, useEffect } from 'react';
import { BookmarkImage, TrendingContainer, PlayButton, PlayText, BlankWrapper, PlayButtonImg } from "./MediaCard.styles.jsx";
import bookmarkActive from '../../assets/bookmark-active.png';
import bookmarkInactive from '../../assets/bookmark-inactive.png';
import bookmarkHover from '../../assets/bookmark-hover.svg';
import playIcon from '../../assets/icon-play.svg';
import MovieIcon from "../../assets/icon-category-movie.svg";
import TvIcon from "../../assets/icon-category-tv.svg";
import { updateShortenedTitle } from '../../services/updateShortenedTitle.js';
import { getMovieYear } from '../../services/getMovieYear.js';
import { useNavigate } from 'react-router-dom';

const TrendingMediaCard = ({ imgSrc, movie, isBookmarked, toggleBookmark }) => {
    const [isHovered, setIsHovered] = useState(false); // State to track hover
    const [title, setTitle] = useState();
    const navigate = useNavigate();

    useEffect(()=> {
      const movieTitle = movie.media_type === "movie" ? movie.title : movie.name;
      const maxWinWidth = 768;
      const maxLength = 18;

      //Shorten the title based on screen width
      updateShortenedTitle(movieTitle, maxWinWidth, maxLength, setTitle);
      //Function reference for the event listener
      const handleResize = () => updateShortenedTitle(movieTitle, maxWinWidth, maxLength, setTitle);
      //Event Listener
      window.addEventListener("resize", handleResize);
      //Cleanup function runs when component unmounts
      return () => window.removeEventListener("resize", handleResize);
    },[movie]);

    const handleCardClick = () => {
      navigate(`/watch/${movie.media_type}/${movie.id}`);
    }

    return (
      <TrendingContainer imgSrc={imgSrc}>
        <BlankWrapper onClick={handleCardClick}>
          <PlayButton className="play-button">
            <PlayButtonImg>
              <img className="play-button-img" src={playIcon} alt="play button" />
            </PlayButtonImg>
            <PlayText>Play</PlayText>
          </PlayButton>
          <div className="trending-media-info">
            <div className="media-info">
              <h4 className="media-info-item">{getMovieYear(movie)} •</h4>
              <img
                className="img-icon"
                src={movie.media_type === "movie" ? MovieIcon : TvIcon}
                style={{
                  height: "12px",
                  paddingTop: "24px",
                  paddingLeft: "5px",
                    zIndex: "1",
                }}
              ></img>
              <h4 className="media-info-item">
                {movie.media_type === "movie" ? "Movie" : "TV Series"}
              </h4>
              <h4 className="media-info-item">{movie.rating}</h4>
            </div>
            <div className="media-title" style={{ position: "relative" }}>
              {title}
            </div>
          </div>
        </BlankWrapper>
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
