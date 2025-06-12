import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './App.css';
import Register from './Register';
import Login from './Login';
import Dashboard from './pages/Dashboard';
import Searched from './pages/Searched';
import Saved from './pages/Saved';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/searched/:query' element={<Searched/>}/>
        <Route path="/Saved" element={<Saved/>} />
      </Routes>
    </Router>
  )
}

export default App