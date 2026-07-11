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
      } else {
        console.warn('Failed to fetch clients, using fallback mock data.');
        setClients(clientsData);
        setError(res.message);
      }
      setLoading(false);
    }

    loadClients();
  }, []);

  return { clients, loading, error };
}
