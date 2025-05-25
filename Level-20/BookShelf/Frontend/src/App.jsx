import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Searched from './pages/Searched';
import BookDetails from './pages/BookDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/saved' element={<Saved/>}></Route>
        <Route path="/book/:id" element={<BookDetails/>} />
        <Route path="/search/:term" element={<Searched/>}></Route>
        <Route path="/searched/:term" element={<Searched/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;



