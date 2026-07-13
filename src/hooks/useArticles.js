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
          setError(null);
        } else {
          console.warn(`Gagal mengambil detail artikel ${slug}: ${res.message}`);
          setArticleDetail(null);
          setError(res.message || 'Akses Ditolak / API Token Tidak Valid');
        }
      } else {
        let url = '/articles?';
        if (category && category !== 'All') url += `category=${encodeURIComponent(category)}&`;
        if (search) url += `search=${encodeURIComponent(search)}&`;
        
        const res = await fetchApi(url);
        if (res.success && res.data) {
          setArticles(res.data);
          setError(null);
        } else {
          console.warn(`Gagal mengambil daftar artikel: ${res.message}`);
          setArticles([]);
          setError(res.message || 'Akses Ditolak / API Token Tidak Valid');
        }
      }
      setLoading(false);
    }
    loadArticles();
  }, [category, search, slug]);

  return { articles, articleDetail, loading, error };
}
