import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReviewList from '../src/components/ReviewList';
import ReviewForm from '../src/components/ReviewForms';
import './App.css';
import Song from './components/Song';

function App() {
  const backendUrl = 'https://your-backend-url.vercel.app'; // Replace with your actual backend URL

  const handleHomepageClick = () => {
    fetch(`${backendUrl}/homepage`)
      .then(response => response.json())
      .then(data => {
        console.log('Homepage data:', data);
      })
      .catch(error => {
        console.error('Error fetching homepage data:', error);
      });
  };

  const handleMusicClick = () => {
    fetch(`${backendUrl}/music`)
      .then(response => response.json())
      .then(data => {
        console.log('Music data:', data);
      })
      .catch(error => {
        console.error('Error fetching music data:', error);
      });
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Niecey's Music Review App</h1>
          <p>Listen to some of my favorite songs, rate and then share a review!</p>
          <nav>
            <button onClick={handleHomepageClick}>Homepage</button>
            <button onClick={handleMusicClick}>Music</button>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ReviewList />} />
            <Route path="/add-review" element={<ReviewForm />} />
            <Route path="/music" element={<MusicPage />} />
          </Routes>
        </main>
        <footer>
          <p>© 2024 Music Review App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

function MusicPage() {
  return (
    <div className="App">
      <h1>Some of My Favorite Tracks</h1>
      <Song link="https://open.spotify.com/track/1A1ifX8sWzelNpkL5PxcHT?si=4309bdda05c64ae9" title="Last Heartbreak" />
      <Song link="https://open.spotify.com/track/20eow7UKdChiyPGiOHXD3v?si=4a2c80edf34b4cfd" title="Everything We See" />
      <Song link="https://open.spotify.com/track/4929bxPQHzXBD2SEMFb2AM?si=74df9ad8bdee4e70" title="Overflow" />
      <Song link="https://open.spotify.com/track/7JCJouqq9muFdSRXWyi6vZ?si=1081b3f99f364892" title="Don't Give Up on Me" />
      <Song link="https://open.spotify.com/track/38ujZj9RBPQHfB3FChJtVD?si=3035090aec994f15" title="Can't Let it Show" />
      <Song link="https://open.spotify.com/track/0nmAQK8212pUfGsI7SJSF4?si=a40f595f1c2f4963" title="Rain" />
      <Song link="https://open.spotify.com/track/2x7cfyDxSXc1xxqxZM3hbc?si=2e201fc0d9314845" title="Please Don't Fall in Love" />
      <Song link="https://open.spotify.com/track/4jZ6qYMSOsbYF8f30z9VDM?si=43796e0f31fe4b46" title="Time Flies" />
    </div>
  );
}

export default App;
