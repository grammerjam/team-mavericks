import * as React from 'react';
import { BrowserRouter ,Routes, Route } from "react-router-dom";

// Import Route Components
import Home from './routes/Home/Home.route';
import Login from './routes/Login/Login.route';
import Register from './routes/Register/Register.route';

function App() 
{
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index={true} element={< Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
