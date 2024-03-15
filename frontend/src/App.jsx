import React from 'react';
import './App.css';
import SignUp from './pages/signup/SignUp'; // Adjusted import path
import Home from './pages/home/Home';

function App() {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      {/* <SignUp/> */}
      <Home/>
    </div>
  );
}

export default App;
