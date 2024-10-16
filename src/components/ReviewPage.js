import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewPage = ({ match }) => {
  const [album, setAlbum] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchAlbum = async () => {
      const response = await axios.get(`https://api.spotify.com/v1/albums/${match.params.id}`, {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
      });
      setAlbum(response.data);
    };

    fetchAlbum();
  }, [match.params.id]);

  const handleCommentSubmit = async () => {
   
    setComments([...comments, newComment]);
    setNewComment('');
  };

  return (
    <div>
      {album && (
        <div>
          <h2>{album.name} by {album.artists[0].name}</h2>
          <img src={album.images[0].url} alt={album.name} />
          <div>
            <h3>Comments</h3>
            <ul>
              {comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
