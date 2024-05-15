import * as React from 'react';
import Button from '@mui/material/Button';
import homeStyles from './Home.styles';
import {RecommendedContainer} from "../Recommended/RecommendedContainer.jsx";
import {TrendingContainter} from "../Trending/TrendingContainter.jsx";

function Home() {
  return (
    <div className="page-container">
        <RecommendedContainer></RecommendedContainer>
        <TrendingContainter></TrendingContainter>
    </div>
  );
}

export default Home;