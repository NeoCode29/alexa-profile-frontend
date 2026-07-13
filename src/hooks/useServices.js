import { useState, useEffect } from 'react';
import { fetchApi } from '../services/api';
import { servicesData, serviceDetailsData } from '../data/mockData';

export function useServices(serviceId = null) {
  const [services, setServices] = useState(null);
  const [serviceDetail, setServiceDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      if (serviceId) {
        const res = await fetchApi(`/services/${serviceId}`);
        if (res.success && res.data) {
          // Parse JSON strings if needed based on API docs
          const parsedData = { ...res.data };
          
          // Parse top-level JSON fields
          const jsonFields = ['features', 'portfolios', 'testimonials', 'packages'];
          jsonFields.forEach(field => {
            if (typeof parsedData[field] === 'string') {
              try { parsedData[field] = JSON.parse(parsedData[field]); } catch(e) { parsedData[field] = []; }
            }
          });

          // Parse features inside packages if it's an array
          if (Array.isArray(parsedData.packages)) {
            parsedData.packages = parsedData.packages.map(pkg => {
              if (typeof pkg.features === 'string') {
                try { pkg.features = JSON.parse(pkg.features); } catch(e) { pkg.features = []; }
              }
              return pkg;
            });
          }

          // In ServiceDetail.jsx, 'name' is expected but backend might return 'title'
          if (parsedData.title && !parsedData.name) {
            parsedData.name = parsedData.title;
          }
          if (parsedData.subtitle && !parsedData.tagline) {
            parsedData.tagline = parsedData.subtitle;
          }

          setServiceDetail(parsedData);
          setError(null);
        } else {
          console.warn(`Gagal mengambil detail layanan ${serviceId}: ${res.message}`);
          setServiceDetail(null);
          setError(res.message || 'Akses Ditolak / API Token Tidak Valid');
        }
      } else {
        const res = await fetchApi('/services');
        if (res.success && res.data) {
          const parsedServices = res.data.map(svc => {
            const parsed = { ...svc };
            const jsonFields = ['features', 'portfolios', 'testimonials'];
            jsonFields.forEach(field => {
              if (typeof parsed[field] === 'string') {
                try { parsed[field] = JSON.parse(parsed[field]); } catch(e) { parsed[field] = []; }
              }
            });
            if (parsed.title && !parsed.name) parsed.name = parsed.title;
            if (parsed.subtitle && !parsed.tagline) parsed.tagline = parsed.subtitle;
            return parsed;
          });
          setServices(parsedServices);
          setError(null);
        } else {
          console.warn(`Gagal mengambil daftar layanan: ${res.message}`);
          setServices([]);
          setError(res.message || 'Akses Ditolak / API Token Tidak Valid');
        }
      }
      setLoading(false);
    }
    loadServices();
  }, [serviceId]);

  return { services, serviceDetail, loading, error };
}
