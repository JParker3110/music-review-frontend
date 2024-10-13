import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReviewList from '../src/components/ReviewList';
import ReviewForm from '../src/components/ReviewForms';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Music Review App</h1>
          <p>Discover and share your favorite music reviews</p>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ReviewList />} />
            <Route path="/add-review" element={<ReviewForm />} />
          </Routes>
        </main>
        <footer>
          <p>© 2024 Music Review App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
