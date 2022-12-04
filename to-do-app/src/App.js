import './App.css';
import CreateToDo from './CreateToDo';
import Home from './Home';
import Edit from './Edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<CreateToDo />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
