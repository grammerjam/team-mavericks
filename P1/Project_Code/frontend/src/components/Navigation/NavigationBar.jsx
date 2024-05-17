import {Link} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import GridViewIcon from '@mui/icons-material/GridView';

export const NavigationBar = () => {
    return (
        <div className="NavigationContainer" style={{border: "1px solid white"}}>
            <MovieIcon  sx={{ color: 'red'}} />
            <nav>
                <ul style={{listStyleType: 'none', display: 'flex', justifyContent: 'space-around'}}>
                    <li><Link to="/"><GridViewIcon sx={{ color: "white" }} /></Link></li>
                    <li><Link to="/movies"><LocalMoviesIcon sx={{ color: "white" }} /></Link></li>
                    <li><Link to="/bookmarks"><BookmarkIcon sx={{ color: "white" }} /></Link></li>
                    <li><Link to="/tv-series"><TvIcon sx={{ color: "white" }}/></Link></li>
                </ul>
            </nav>
            <AccountCircleIcon sx={{ color: 'white'}}></AccountCircleIcon>
        </div>
    )
}