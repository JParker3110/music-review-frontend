import React, { useEffect, useState } from 'react';
import axios from 'axios';
import supabase from '../utils/supabaseClient';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*');

      if (error) {
        console.error('Error fetching reviews:', error);
      } else {
        setReviews(data);
      }
    };

    fetchReviews();
  }, []);

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

  const getAlbumInfo = (albumId) => {
    return albums.find(album => album.id === albumId);
  };

  return (
    <div>
      <h2>Review List</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => {
            const album = getAlbumInfo(review.album_id);
            return (
              <li key={review.id}>
                {album && (
                  <div>
                    <img src={album.images[0].url} alt={album.name} />
                    <p>{album.name} by {album.artists[0].name}</p>
                  </div>
                )}
                <h3>{review.title}</h3>
                <p>{review.content}</p>
                <p>Rating: {review.rating}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default ReviewList;
