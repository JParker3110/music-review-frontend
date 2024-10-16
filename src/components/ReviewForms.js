import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import supabase from '../utils/supabaseClient';


const ReviewForm = () => {
  const location = useLocation();
  const { songLink, songTitle } = location.state || {};
  const [review, setReview] = useState('');
  const [rating,] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('reviews')
      .insert([{ title: songTitle, content: review, rating, song_link: songLink, likes: 0 }]);
    if (error) console.error('Error adding review:', error);
    else console.log('Review added:', data);
  };

  return (
    <div>
      <h2>Add a Review for {songTitle}</h2>
      <form onSubmit={handleSubmit}>
        {/* <StarRating rating={rating} onRatingChange={setRating} /> */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
