import React from "react";
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import TodoList from "./features/TodoList";
import FocusMode from "./features/FocusMode";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-flow-renderer/dist/style.css';
import MindMap from "./features/MindMap";
import Notes from "./features/Notes";



function App() {
  return (
<Router>
  <nav>
  <Link to='/todos'>Todos </Link>
  <Link to='/mind-map'>Mind Map </Link>
  <Link to='/focus-mode'>Focus Mode </Link>
  <Link to='/notes'>Notes</Link>
  </nav>
  <Routes>
    <Route path='/todos' element={<TodoList/>}/>
    <Route path='/mind-map' element={<MindMap/>}/>
    <Route path='/focus-mode' element={<FocusMode/>}/>
    <Route path='/notes' element={<Notes/>}/>
  </Routes>
</Router>    
  );
}

export default App;

// http://localhost:5173/todos