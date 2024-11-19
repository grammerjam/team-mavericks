export const getMovieYear = (movie, isBookmarkedMedia = false) => {
    let mediaType = "";
    let releaseDate = "";
    let firstAirDate = "";
  
    if(isBookmarkedMedia){
        mediaType = movie.mediaType;
        releaseDate = movie.releaseDate;
        firstAirDate = movie.releaseDate;
    }else{
        mediaType = movie.media_type;
        releaseDate = movie.release_date;
        firstAirDate = movie.first_air_date;
    }

    return mediaType === "movie" ? 
    releaseDate?.slice(0, 4) : firstAirDate?.slice(0, 4);
}