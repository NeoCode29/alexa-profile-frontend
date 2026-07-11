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
        } else {
          console.warn(`Failed to fetch service detail for ${serviceId}, using fallback.`);
          setServiceDetail(serviceDetailsData[serviceId]);
        }
      } else {
        const res = await fetchApi('/services');
        if (res.success && res.data) {
          setServices(res.data);
        } else {
          console.warn('Failed to fetch services, using fallback.');
          setServices(servicesData);
        }
      }
      setLoading(false);
    }
    loadServices();
  }, [serviceId]);

  return { services, serviceDetail, loading, error };
}
