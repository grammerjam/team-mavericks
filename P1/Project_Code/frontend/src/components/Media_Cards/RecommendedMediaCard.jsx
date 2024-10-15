import React from 'react';
import bookmarkActive from '../../assets/bookmark-active.png';
import bookmarkInactive from '../../assets/bookmark-inactive.png';
import MovieIcon from "../../assets/icon-category-movie.svg";
import TvIcon from "../../assets/icon-category-tv.svg";
import { RecommendedContainer, PlayButton, PlayText } from './MediaCard.styles';
import playIcon from '../../assets/icon-play.svg';

const RecommendedMediaCard = ({
  imgSrc,
  movie,
  isBookmarked,
  toggleBookmark,
}) => (
  <>
    <RecommendedContainer>
      <img src={imgSrc} alt={movie.title} />
      <img
        src={isBookmarked ? bookmarkActive : bookmarkInactive}
        className="bookmark-icon"
        alt="Bookmark Icon"
        onClick={toggleBookmark}
      />
      <PlayButton className="play-button">
        <img className="play-button-img" src={playIcon} alt="play button" />
        <PlayText>Play</PlayText>
      </PlayButton>
    </RecommendedContainer>
    <div className="media-info">
      <h4 className="media-info-item">{movie.year} •</h4>
      <img
        className="img-icon"
        src={movie.category === "movie" ? MovieIcon : TvIcon}
        style={{
            height: "12px",
            paddingLeft: "5px"
        }}
      ></img>
      <h4 className="media-info-item">{movie.category === "movie" ? "Movie  " : "TV Series"} •</h4>
      <h4 className="media-info-item">{movie.rating}</h4>
    </div>
    <div className="media-title">{movie.title}</div>
  </>
);

export default RecommendedMediaCard;
