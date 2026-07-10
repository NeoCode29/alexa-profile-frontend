import { useLocation, Link } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import styles from './Breadcrumbs.module.css';
import { serviceDetailsData, articlesData } from '../../data/mockData';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Jangan tampilkan di halaman utama
  if (pathnames.length === 0) {
    return null;
  }

  // Helper untuk mendapatkan nama yang lebih ramah
  const getBreadcrumbName = (path, idx) => {
    // Jika ini adalah path services detail
    if (pathnames[0] === 'services' && idx === 1) {
      const service = serviceDetailsData[path];
      if (service) return service.name;
    }
    
    // Jika ini adalah path blog detail
    if (pathnames[0] === 'blog' && idx === 1) {
      const article = articlesData.find(a => a.id === parseInt(path));
      if (article) return article.title.length > 30 ? article.title.substring(0, 30) + '...' : article.title;
    }

    // Nama default berdasarkan path
    switch (path.toLowerCase()) {
      case 'about': return 'Tentang Kami';
      case 'services': return 'Layanan';
      case 'blog': return 'Artikel';
      case 'contact': return 'Hubungi Kami';
      default: return path.charAt(0).toUpperCase() + path.slice(1);
    }
  };

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
