import React, { useEffect, useState } from 'react';
import axios from 'axios';
import supabase from '../utils/supabaseClient';

const ReviewForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('');
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');

  useEffect(() => {
    const fetchAlbums = async () => {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`http://localhost:3000/albums?access_token=${token}`);
          setAlbums(response.data.items);
        } catch (error) {
          console.error('Error fetching albums:', error);
        }
      }
    };

    fetchAlbums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { title, content, rating, album_id: selectedAlbum };

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([newReview]);

      if (error) {
        throw error;
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Album</label>
        <select value={selectedAlbum} onChange={(e) => setSelectedAlbum(e.target.value)}>
          {albums.map(album => (
            <option key={album.id} value={album.id}>
              {album.name} by {album.artists[0].name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      </div>
      <div>
        <label>Rating</label>
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;
