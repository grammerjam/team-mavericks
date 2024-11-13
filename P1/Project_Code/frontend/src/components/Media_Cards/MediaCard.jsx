import { useState, useEffect } from "react";
import { getImagePath } from "../../services/getImagePath.js";
import useBookmark from "../../hooks/useBookmark.jsx";
import TrendingMediaCard from "./TrendingMediaCard.jsx";
import RecommendedMediaCard from "./RecommendedMediaCard.jsx";

const MediaCard = ({ movie, type, onRemove = () => {}, isBookmarkedMedia = false }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [isBookmarked, toggleBookmark] = useBookmark(movie, isBookmarkedMedia);
  const moviePosterUrl = "https://image.tmdb.org/t/p/w500";

  // Get the static path to the image required for the media card
  useEffect(() => {
    let imagePath = "";
    if(type.toLowerCase() === "trending"){
      imagePath = `${moviePosterUrl}${movie.backdrop_path}`;
    }else{
      imagePath = isBookmarkedMedia ? `${moviePosterUrl}${movie.posterPath}`:
                                      `${moviePosterUrl}${movie.poster_path}`
    }
    setImgSrc(imagePath);
  }, [movie]);

  const handleToggleBookmark = async () => {
    await toggleBookmark();

    if(isBookmarked){
      if(isBookmarkedMedia){
        onRemove(movie.mediaID);
      }else{
        onRemove(movie.id);
      }
    }
  }

  if (!imgSrc) {
    return <p style={{ color: "white" }}>Loading...</p>;
  }

  return (
    <>
      {type.toLowerCase() === "trending" ? (
        <TrendingMediaCard
          imgSrc={imgSrc}
          movie={movie}
          isBookmarked={isBookmarked}
          toggleBookmark={handleToggleBookmark}
        ></TrendingMediaCard>
      ) : (
        <RecommendedMediaCard
          imgSrc={imgSrc}
          movie={movie}
          isBookmarked={isBookmarked}
          toggleBookmark={handleToggleBookmark}
          isBookmarkedMedia={isBookmarkedMedia}
        ></RecommendedMediaCard>
      )}
    </>
  );
};

export default MediaCard;
