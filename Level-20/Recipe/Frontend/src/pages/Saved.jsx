import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Saved = () => {
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    const fetchSavedItems = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      try {
        const res = await axios.get(`http://localhost:3000/Saved`, {
          params: { userId }
        });
        console.log('Saved items:', res.data);
        setSavedItems(res.data);
      } catch (error) {
        console.error('Error fetching saved items:', error);
      }
    };

    fetchSavedItems();
  }, []);

  return (
    <div className="saved-container">
      <h2>My Saved Items</h2>
      <div className="saved-list">
        {savedItems.length === 0 ? (
          <p>No saved items yet.</p>
        ) : (
          savedItems.map((item) => (
            <div key={item._id} className="saved-card">
              <h3>{item.title}</h3>
              {item.image && <img src={item.image} alt={item.title} />}
              <p>{item.instructions}</p> 
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Saved;
