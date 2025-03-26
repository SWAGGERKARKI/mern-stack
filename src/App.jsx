import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/Home.jsx';
import Create from './components/Create.jsx';
import Edit from "./components/Edit.jsx";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  )
}

export default App
