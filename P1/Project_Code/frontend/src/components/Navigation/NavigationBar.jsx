import {Link} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import GridViewIcon from '@mui/icons-material/GridView';

export const NavigationBar = () => {
    return (
        <div className="NavigationContainer" style={{border: "1px solid black"}}>
            <MovieIcon  sx={{ color: 'red'}} />
            <nav>
                <ul style={{listStyleType: 'none', display: 'flex', justifyContent: 'space-around'}}>
                    <li><GridViewIcon sx={{ color: "black" }} /><Link to="/">Home</Link></li>
                    <li><LocalMoviesIcon sx={{ color: "gray" }} /><Link to="/movies">Movies</Link></li>
                    <li><BookmarkIcon sx={{ color: "black" }} /><Link to="/bookmarks">Bookmarks</Link></li>
                    <li><TvIcon sx={{ color: "gray" }}/><Link to="/tv-series">TV Series</Link></li>
                </ul>
            </nav>
            <AccountCircleIcon></AccountCircleIcon>
        </div>
    )
}