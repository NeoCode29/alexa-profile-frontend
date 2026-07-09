import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = (path) => {
    setIsOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        
        <Link to="/" className={styles.logo}>
          <img src="/logo.png" alt="AG Group" style={{ height: '50px', objectFit: 'contain' }} />
        </Link>

        <div className={styles.menuIcon} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>

        <div className={`${styles.navMenu} ${isOpen ? styles.active : ''}`}>
          <ul className={styles.navLinks}>
            <li><Link to="/" className={location.pathname === '/' ? styles.activeLink : ''} onClick={() => handleLinkClick('/')}>Beranda</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? styles.activeLink : ''} onClick={() => handleLinkClick('/about')}>Tentang Kami</Link></li>
            <li><Link to="/services" className={location.pathname === '/services' ? styles.activeLink : ''} onClick={() => handleLinkClick('/services')}>Layanan</Link></li>
            <li><Link to="/blog" className={location.pathname === '/blog' ? styles.activeLink : ''} onClick={() => handleLinkClick('/blog')}>Artikel</Link></li>
          </ul>
          
          <Link to="/contact" className="btn btn-primary" onClick={() => setIsOpen(false)}>
            Hubungi Kami
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
