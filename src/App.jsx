import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Home from './components/Home.jsx';
import Create from './components/Create.jsx';
import Edit from "./components/Edit.jsx";
import { AnimatePresence } from "motion/react";

// without using AnimatePresence

// function App() {

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/create" element={<Create />} />
//         <Route path="/edit/:id" element={<Edit />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App

// using AnimatePresence for animating page transitions
// function for making route animation using AnimatePresence
function AnimatedRoutes() {
  // use current location for the animation
  const location = useLocation();
  console.log('Current Location:', location);
  console.log('Location Pathaname:', location.pathname);

  return(
    // mode wait means AnimatePresence waits to complete animation before removing pages.
    <AnimatePresence mode="wait">
      {/* Animation done using current location and change location path  */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return(
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
