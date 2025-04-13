import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ padding: "20px", textAlign: "center" }}
  >
    {children}
  </motion.div>
);

const Home = () => <PageWrapper><h2>Home Page</h2></PageWrapper>;
const About = () => <PageWrapper><h2>About Page</h2></PageWrapper>;
const Contact = () => <PageWrapper><h2>Contact Page</h2></PageWrapper>;

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <Router>
    <nav style={{ display: "flex", gap: "20px", justifyContent: "center", padding: "10px" }}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
    <AnimatedRoutes />
  </Router>
);

export default App;
