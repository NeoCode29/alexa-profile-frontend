import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const usePageContent = (pageName, defaultData) => {
  const [content, setContent] = useState(defaultData);

  useEffect(() => {
    fetch(`${API_BASE_URL}/pages/${pageName}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setContent({ ...defaultData, ...json.data });
        }
      })
      .catch(() => {
        // Tetap gunakan defaultData bila server offline atau belum tersambung
      });
  }, [pageName]);

  return content;
};
