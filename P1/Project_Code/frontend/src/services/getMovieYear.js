export const getMovieYear = (movie) => {

    return movie.media_type === "movie" ? 
    movie.release_date?.slice(0, 4) : movie.first_air_date?.slice(0, 4);
}