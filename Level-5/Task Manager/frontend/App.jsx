import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './login'
import Task from './task';
import "./Global.css";


function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/task' element={<Task/>}/>
    </Routes>
    </Router>
  )
}

export default App
