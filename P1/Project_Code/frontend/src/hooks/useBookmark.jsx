import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/User.context.jsx";
import {getApiUrl} from "../services/ApiUrl.js";

const useBookmark = (movie, isBookmarkedMedia) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [allUsersBookmarks, setAllUsersBookmarks] = useState([]);
  const { user } = useContext(UserContext);
  const apiURL = getApiUrl();

  useEffect(() => {
    if (!user?.id) {
      // If user.id is null or undefined, clear bookmarks and return early
      setAllUsersBookmarks([]);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(
            `${apiURL}/api/bookmarks`,
            {
              params: { userID: user.id },
            }
        );
        setAllUsersBookmarks(response.data.bookmarks);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBookmarks();
  }, [user?.id]);

  useEffect(() => {
    let mediaTitle = "";
    if(isBookmarkedMedia){
      mediaTitle = movie.title;
    }else{
      mediaTitle = movie.media_type === "movie" ? movie.title : movie.name; 
    }
    if (!mediaTitle) {
      // If movie.title is null or undefined, do nothing
      return;
    }

    const isBookmarked = allUsersBookmarks.some(
        (bookmark) => bookmark.title === mediaTitle
    );
    setIsBookmarked(isBookmarked);
  }, [allUsersBookmarks, movie?.title]);

  const toggleBookmark = async () => {
    const movieID = isBookmarkedMedia ? movie?.mediaID : movie?.id
    if (!user?.id || !movieID) {
      // If user.id or movie.id is null or undefined, do nothing
      return;
    }

    try {
      if (isBookmarked) {
        await axios.delete(`${apiURL}/api/bookmark`, {
          params: { userID: user.id, mediaID: movieID },
        });
      } else {
        await axios.post(`${apiURL}/api/bookmark`, {
          userID: user.id,
          mediaID: movie.id,
          mediaType: movie.media_type,
        });
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error(error.message);
    }
  };

  return [isBookmarked, toggleBookmark];
};

export default useBookmark;
