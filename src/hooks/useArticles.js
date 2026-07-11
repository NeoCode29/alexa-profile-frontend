import { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';
import { articlesData } from '../data/mockData';

export function useArticles(category = null, search = null, slug = null) {
  const [articles, setArticles] = useState([]);
  const [articleDetail, setArticleDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadArticles() {
      setLoading(true);
      if (slug) {
        const res = await fetchApi(`/articles/${slug}`);
        if (res.success && res.data) {
          setArticleDetail(res.data);
        } else {
          console.warn(`Failed to fetch article detail for ${slug}, using fallback.`);
          // Simple fallback logic to find by ID assuming slug is similar to ID in mock
          setArticleDetail(articlesData.find(a => a.id.toString() === slug) || articlesData[0]);
        }
      } else {
        let url = '/articles?';
        if (category && category !== 'All') url += `category=${encodeURIComponent(category)}&`;
        if (search) url += `search=${encodeURIComponent(search)}&`;
        
        const res = await fetchApi(url);
        if (res.success && res.data) {
          setArticles(res.data);
        } else {
          console.warn('Failed to fetch articles, using fallback.');
          let filtered = articlesData;
          if (category && category !== 'All') filtered = filtered.filter(a => a.category === category);
          if (search) filtered = filtered.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));
          setArticles(filtered);
        }
      }
      setLoading(false);
    }
    loadArticles();
  }, [category, search, slug]);

  return { articles, articleDetail, loading, error };
}
