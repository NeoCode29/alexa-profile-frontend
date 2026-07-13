import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import styles from './Breadcrumbs.module.css';
import { serviceDetailsData, articlesData } from '../../data/mockData';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Helper untuk mendapatkan nama yang lebih ramah
  const getBreadcrumbName = (path, idx) => {
    if (pathnames[0] === 'services' && idx === 1) {
      const service = serviceDetailsData[path];
      if (service) return service.name;
    }
    if (pathnames[0] === 'blog' && idx === 1) {
      const article = articlesData.find(a => a.id === parseInt(path));
      if (article) return article.title.length > 30 ? article.title.substring(0, 30) + '...' : article.title;
    }
    switch (path.toLowerCase()) {
      case 'about': return 'Tentang Kami';
      case 'services': return 'Layanan';
      case 'blog': return 'Artikel';
      case 'contact': return 'Hubungi Kami';
      default: return path.charAt(0).toUpperCase() + path.slice(1);
    }
  };

  useEffect(() => {
    if (pathnames.length === 0) return;

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://alexagroup.co.id';
    const schemaItemList = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/`
      },
      ...pathnames.map((value, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": getBreadcrumbName(value, index),
        "item": `${baseUrl}/${pathnames.slice(0, index + 1).join('/')}`
      }))
    ];

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": schemaItemList
    };

    let scriptSchema = document.getElementById('schema-breadcrumb');
    if (!scriptSchema) {
      scriptSchema = document.createElement('script');
      scriptSchema.type = 'application/ld+json';
      scriptSchema.id = 'schema-breadcrumb';
      document.head.appendChild(scriptSchema);
    }
    scriptSchema.textContent = JSON.stringify(breadcrumbSchema, null, 2);

    return () => {
      const existing = document.getElementById('schema-breadcrumb');
      if (existing) existing.remove();
    };
  }, [location.pathname]);

  // Jangan tampilkan di halaman utama
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <div className={styles.breadcrumbsContainer}>
      <div className="container">
        <ul className={styles.breadcrumbsList}>
          <li>
            <Link to="/" className={styles.breadcrumbLink}>
              <FaHome className={styles.homeIcon} />
            </Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            
            return (
              <li key={to} className={styles.breadcrumbItem}>
                <FaChevronRight className={styles.separator} />
                {isLast ? (
                  <span className={styles.breadcrumbActive}>{getBreadcrumbName(value, index)}</span>
                ) : (
                  <Link to={to} className={styles.breadcrumbLink}>
                    {getBreadcrumbName(value, index)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumbs;
