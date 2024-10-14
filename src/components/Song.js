// src/components/Song.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spotify } from 'react-spotify-embed';
import StarRating from './StarRating';

const Song = ({ link, title }) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const handleClick = () => {
    navigate('/add-review', { state: { songLink: link, songTitle: title, songRating: rating } });
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Spotify link={link} />
      <p>{title}</p>
      <StarRating rating={rating} onRatingChange={setRating} />
    </div>
  );
};

export default Song;
