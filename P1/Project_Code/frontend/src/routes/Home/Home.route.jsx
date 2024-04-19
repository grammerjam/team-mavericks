import * as React from 'react';
import Button from '@mui/material/Button';

const homeStyles = {
  button: {
    backgroundColor: "rgb(252, 71, 71)",
    fontFamily: "Outfit",
    fontSize: "13px",
    fontWeight: "300"

  }
};

function Home() {
  return (
    <div className="page-container">
        <Button variant="contained" className="body-S" style={homeStyles.button}>Hello world</Button>
    </div>
  );
}

export default Home;