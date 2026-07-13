import { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';
import { clientsData } from '../data/mockData';

export function useClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadClients() {
      setLoading(true);
      const res = await fetchApi('/clients');
      if (res.success && res.data) {
        setClients(res.data);
        setError(null);
      } else {
        console.warn(`Gagal mengambil klien: ${res.message}`);
        setClients([]);
        setError(res.message || 'Akses Ditolak / API Token Tidak Valid');
      }
      setLoading(false);
    }

    loadClients();
  }, []);

  return { clients, loading, error };
}
