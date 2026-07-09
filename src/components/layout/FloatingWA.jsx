import { FaWhatsapp } from 'react-icons/fa';
import styles from './FloatingWA.module.css';

const FloatingWA = () => {
  return (
    <div className={styles.floatingContainer}>
      <div className={styles.waTooltip}>Butuh Bantuan? Chat Kami!</div>
      <a href="https://wa.me/6283870120901?text=Halo%20tim%20AG%20Group,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20Anda." target="_blank" rel="noopener noreferrer" className={styles.floatingBtn}>
        <FaWhatsapp size={32} />
      </a>
    </div>
  );
};

export default FloatingWA;
