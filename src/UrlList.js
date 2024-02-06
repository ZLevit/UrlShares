// src/components/UrlList.js
import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    const unsubscribe = firestore.collection('urls').onSnapshot((snapshot) => {
      const newUrls = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUrls(newUrls);
    });

    return () => unsubscribe();
  }, []);

  const addUrl = async () => {
    await firestore.collection('urls').add({
      url: newUrl,
      // other fields if needed
    });
    setNewUrl('');
  };

  const removeUrl = async (id) => {
    await firestore.collection('urls').doc(id).delete();
  };

  return (
    <div>
      <ul>
        {urls.map((url) => (
          <li key={url.id}>
            {url.url}{' '}
            <button onClick={() => removeUrl(url.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
      />
      <button onClick={addUrl}>Add URL</button>
    </div>
  );
};

export default UrlList;
