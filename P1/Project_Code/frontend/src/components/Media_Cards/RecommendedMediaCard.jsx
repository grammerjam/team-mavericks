import React, { useEffect, useState } from "react";
import bookmarkActive from "../../assets/bookmark-active.png";
import bookmarkInactive from "../../assets/bookmark-inactive.png";
import bookmarkHover from "../../assets/bookmark-hover.svg";
import MovieIcon from "../../assets/icon-category-movie.svg";
import TvIcon from "../../assets/icon-category-tv.svg";
import { RecommendedContainer, PlayButton, PlayText, PlayButtonImg } from "./MediaCard.styles";
import playIcon from "../../assets/icon-play.svg";
import { getMovieYear } from "../../services/getMovieYear";
import { updateShortenedTitle } from '../../services/updateShortenedTitle';
import { useNavigate } from "react-router-dom";

const RecommendedMediaCard = ({
  imgSrc,
  movie,
  isBookmarked,
  toggleBookmark,
  isBookmarkedMedia
}) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const [mediaType, setMediaType] = useState();
  const [title, setTitle] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let movieTitle = "";
    const maxWinWidth = 768;
    const maxLength = 23;

    if(isBookmarkedMedia){
      setMediaType(movie.mediaType);
      movieTitle = movie.title;
    }else{
      setMediaType(movie.media_type);
      movieTitle = movie.media_type === "movie" ? movie.title : movie.name;
    }

    //Shorten the title based on screen width
    updateShortenedTitle(movieTitle, maxWinWidth, maxLength, setTitle);
    //Function reference for the event listener
    const handleResize = () => updateShortenedTitle(movieTitle, maxWinWidth, maxLength, setTitle);
    //Event Listener
    window.addEventListener("resize", handleResize);
    //Cleanup function runs when component unmounts
    return () => window.removeEventListener("resize", handleResize);
  },[movie])

  const handlePlayClick = () => {
    const mediaID = isBookmarkedMedia ? movie.mediaID : movie.id;
    const mediaType = isBookmarkedMedia ? movie.mediaType : movie.media_type; 
    navigate(`/watch/${mediaType}/${mediaID}`);
  }

  return (
    <>
      <RecommendedContainer>
        <img src={imgSrc} alt={movie.title} onClick={handlePlayClick}/>
        <img
          src={
            isHovered
              ? bookmarkHover
              : isBookmarked
                ? bookmarkActive
                : bookmarkInactive
          } // Toggle between hover and normal states
          className="bookmark-icon"
          alt="Bookmark Icon"
          onClick={toggleBookmark}
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true on mouse enter
          onMouseLeave={() => setIsHovered(false)} // Reset hover state on mouse leave
        />
        <PlayButton className="play-button" onClick={handlePlayClick}>
          <PlayButtonImg>
            <img className="play-button-img" src={playIcon} alt="play button" />
          </PlayButtonImg>
          <PlayText>Play</PlayText>
        </PlayButton>
      </RecommendedContainer>
      <div className="media-info">
        <h4 className="media-info-item">{getMovieYear(movie, isBookmarkedMedia)} •</h4>
        <img
          className="img-icon"
          src={mediaType === "movie" ? MovieIcon : TvIcon}
          style={{
            height: "12px",
            paddingLeft: "5px",
          }}
        ></img>
        <h4 className="media-info-item">
          {mediaType === "movie" ? "Movie  " : "TV Series"}
        </h4>
        <h4 className="media-info-item">{movie.rating}</h4>
      </div>
      <div className="media-title" style={{marginBottom: "40px"}}>{title}</div>
    </>
  );
};

export default RecommendedMediaCard;
