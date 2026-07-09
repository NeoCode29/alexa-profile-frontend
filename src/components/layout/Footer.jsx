import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="AG Group" style={{ height: '80px', objectFit: 'contain', marginBottom: '1rem', filter: 'brightness(0) invert(100%)' }} />
          </div>
          <p className={styles.description}>
            PT. Alexa Computindo Group adalah perusahaan teknologi terkemuka yang menyediakan layanan ISP, Media Massa Digital, dan Pengembangan Perangkat Lunak.
          </p>
          <div className={styles.socials}>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className={styles.linksCol}>
          <h3>Layanan Kami</h3>
          <ul>
            <li><Link to="/services/mediakampung">MediaKampung</Link></li>
            <li><Link to="/services/inetmedia">InetMedia</Link></li>
            <li><Link to="/services/webmedia">WebMedia</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h3>Perusahaan</h3>
          <ul>
            <li><Link to="/about">Tentang Kami</Link></li>
            <li><Link to="/careers">Karir</Link></li>
            <li><Link to="/blog">Blog & Berita</Link></li>
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h3>Hubungi Kami</h3>
          <ul>
            <li><FaMapMarkerAlt className={styles.icon} /> Jl. Teknologi No. 45, Jakarta Selatan</li>
            <li><FaPhoneAlt className={styles.icon} /> (021) 555-0198</li>
            <li><FaEnvelope className={styles.icon} /> info@alexagroup.com</li>
          </ul>
        </div>

      </div>
      <div className={styles.copyright}>
        <div className="container">
          &copy; {new Date().getFullYear()} PT. Alexa Computindo Group. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
