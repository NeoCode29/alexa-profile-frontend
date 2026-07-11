import { useState, useEffect } from 'react';
import { servicesData as fallbackServicesData } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const useServices = () => {
  const [services, setServices] = useState(fallbackServicesData);

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const parsed = json.data.map((svc) => {
            let featuresArray = [];
            let portfoliosArray = [];
            let testimonialsArray = [];
            try { featuresArray = typeof svc.features === 'string' ? JSON.parse(svc.features) : (svc.features || []); } catch (e) {}
            featuresArray = (Array.isArray(featuresArray) ? featuresArray : []).map(f => {
              if (typeof f === 'string') {
                const parts = f.split('|');
                return parts.length > 1
                  ? { title: parts[0].trim(), desc: parts.slice(1).join('|').trim() }
                  : { title: f.trim(), desc: '' };
              }
              return typeof f === 'object' && f !== null ? { title: f.title || '', desc: f.desc || '' } : { title: '', desc: '' };
            });
            try { portfoliosArray = typeof svc.portfolios === 'string' ? JSON.parse(svc.portfolios) : (svc.portfolios || []); } catch (e) {}
            try { testimonialsArray = typeof svc.testimonials === 'string' ? JSON.parse(svc.testimonials) : (svc.testimonials || []); } catch (e) {}
            return {
              ...svc,
              features: featuresArray,
              portfolios: portfoliosArray,
              testimonials: testimonialsArray
            };
          });
          setServices(parsed);
        }
      })
      .catch(() => {
        // Fallback to static mockData if API offline
      });
  }, []);

  return services;
};
