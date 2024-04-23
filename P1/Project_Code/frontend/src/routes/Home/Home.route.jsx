import * as React from 'react';
import Button from '@mui/material/Button';

import homeStyles from './Home.styles';

function Home() {
  return (
    <div className="page-container">
      <h1 className="font-heading-L">I'm an h1</h1>
        <Button variant="contained" style={homeStyles.button}>Hello world</Button>
    </div>
  );
}

export default Home;