import { Link } from 'react-router-dom';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFoundWrapper}>
      <div className="container">
        <motion.div 
          className={styles.notFoundContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.iconWrapper}>
            <FaExclamationTriangle className={styles.icon} />
          </div>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Halaman Tidak Ditemukan</h2>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            Maaf, halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau memang tidak pernah ada.
          </p>
          <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <FaArrowLeft /> Kembali ke Beranda
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
