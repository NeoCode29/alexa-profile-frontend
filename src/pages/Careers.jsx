import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import styles from './Careers.module.css';
import { careersData } from '../data/mockData';

const Careers = () => {
  return (
    <div className={styles.careersWrapper}>
      
      {/* Hero Section */}
      <section className={`${styles.careersHero} clip-diagonal-bottom`}>
        <div className="container text-center">
          <h1 className="section-title" style={{ color: 'var(--color-white)' }}>Karir di AG GROUP</h1>
          <p className="section-subtitle" style={{ color: '#94A3B8' }}>
            Bergabunglah dengan talenta-talenta terbaik bangsa dalam membangun masa depan digital.
          </p>
        </div>
      </section>

      {/* Culture Section */}
      <section className={styles.cultureSection}>
        <div className="container">
          <div className={styles.cultureGrid}>
            <div className={styles.cultureText}>
              <h2>Budaya Kerja Kami</h2>
              <div className={styles.divider}></div>
              <p>Kami percaya bahwa inovasi lahir dari kolaborasi. AG Group menerapkan lingkungan kerja yang inklusif, fleksibel, namun tetap berorientasi pada hasil dan profesionalisme tinggi.</p>
              <ul className={styles.cultureList}>
                <li>Mendukung inovasi dan kebebasan berekspresi.</li>
                <li>Fasilitas kesehatan dan program wellness.</li>
                <li>Peluang pengembangan karir dan mentorship.</li>
              </ul>
            </div>
            <div className={styles.cultureImgWrapper}>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team Culture" />
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Listing */}
      <section className={styles.jobsSection}>
        <div className="container text-center">
          <h2 className="section-title">Posisi Terbuka</h2>
          <div className={styles.jobsGrid}>
            {careersData.map(job => (
              <div key={job.id} className={`${styles.jobCard} sharp-box`}>
                <div className={styles.jobHeader}>
                  <span className={styles.jobDept}>{job.department}</span>
                  <span className={styles.jobType}>{job.type}</span>
                </div>
                <h3>{job.title}</h3>
                <p className={styles.jobDesc}>{job.description}</p>
                
                <div className={styles.jobFooter}>
                  <div className={styles.jobLocation}>
                    <FaMapMarkerAlt /> {job.location}
                  </div>
                  <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    Lamar Sekarang <FaArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;
