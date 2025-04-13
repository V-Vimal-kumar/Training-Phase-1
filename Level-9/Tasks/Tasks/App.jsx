import React from "react"
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Profile from "./profile"
import Contact from "./contact"
import Product from "./product"
import Index from "./index"
import About from "./About"
import Comments from "./comments"

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Index/>}/>
      <Route path="/Profile" element={<Profile/>}>
        <Route path="about" element={<About/>}/>
        <Route path="Comments" element={<Comments/>}/>
      </Route>  
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/product" element={<Product/>}/>
      </Routes>
    </Router>

)
}
export default App