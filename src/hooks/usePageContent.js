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

  useEffect(() => {
    if (!content) return;
    if (content.seoTitle) {
      document.title = content.seoTitle;
    }
    if (content.seoDescription) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = content.seoDescription;
    }
    if (content.seoKeywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = content.seoKeywords;
    }
  }, [content]);

  return content;
};
