import * as React from 'react';
import Button from '@mui/material/Button';
import homeStyles from './Home.styles';
import {MediaCardsContainer} from "../../components/Media_Cards/MediaCardsContainer.jsx";


function Home() {
  return (
    <div className="page-container">
    <MediaCardsContainer></MediaCardsContainer>
    </div>
  );
}

export default Home;