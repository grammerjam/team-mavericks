import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/User.context.jsx";

const useBookmark = (movie) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [allUsersBookmarks, setAllUsersBookmarks] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user?.id) {
      // If user.id is null or undefined, clear bookmarks and return early
      setAllUsersBookmarks([]);
      return;
    }

    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(
            "http://localhost:8000/api/bookmarks",
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
    if (!movie?.title) {
      // If movie.title is null or undefined, do nothing
      return;
    }

    const isBookmarked = allUsersBookmarks.some(
        (bookmark) => bookmark.title === movie.title
    );
    setIsBookmarked(isBookmarked);
  }, [allUsersBookmarks, movie?.title]);

  const toggleBookmark = async () => {
    if (!user?.id || !movie?.id) {
      // If user.id or movie.id is null or undefined, do nothing
      return;
    }

    try {
      if (isBookmarked) {
        await axios.delete("http://localhost:8000/api/bookmark", {
          params: { userID: user.id, mediaID: movie.id },
        });
      } else {
        await axios.post("http://localhost:8000/api/bookmark", {
          userID: user.id,
          mediaID: movie.id,
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
