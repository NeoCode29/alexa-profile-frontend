import { FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './Services.module.css';
import { pricingPackages, portfolios, testimonials } from '../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Services = () => {
  return (
    <div className={styles.servicesWrapper}>
      
      {/* Hero */}
      <section className={`${styles.servicesHero} clip-diagonal-bottom`}>
        <div className="container text-center">
          <motion.h1 
            className="section-title" style={{ color: 'var(--color-white)' }}
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            Layanan Kami
          </motion.h1>
          <motion.p 
            className="section-subtitle" style={{ color: '#94A3B8' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
          >
            Solusi digital komprehensif yang dirancang untuk skala enterprise.
          </motion.p>
        </div>
      </section>

      {/* WebMedia Services */}
      <section id="webmedia" className={styles.serviceSection}>
        <div className="container">
          <motion.div className={styles.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className={styles.headerLabel}>WEBMEDIA</div>
            <h2>Pengembangan Perangkat Lunak</h2>
            <p>Arsitektur sistem informasi, aplikasi mobile, dan website korporat yang dibangun menggunakan teknologi mutakhir untuk performa maksimal.</p>
          </motion.div>

          <div className={styles.pricingGrid}>
            {pricingPackages.webmedia.map((pkg, idx) => (
              <motion.div 
                key={idx} 
                className={`${styles.pricingCard} ${pkg.isPopular ? styles.popular : ''} sharp-box`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
              >
                {pkg.isPopular && <div className={styles.popularBadge}>Rekomendasi</div>}
                <h3>{pkg.name}</h3>
                <div className={styles.price}>{pkg.price}</div>
                <ul className={styles.featureList}>
                  {pkg.features.map((feature, i) => (
                    <li key={i}><FaCheckCircle className={styles.checkIcon} /> {feature}</li>
                  ))}
                </ul>
                <button className={`btn ${pkg.isPopular ? 'btn-primary' : 'btn-outline'}`} style={{ marginTop: 'auto' }}>
                  Pilih Paket
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div className={styles.portfolioBox} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3>Proyek Pilihan WebMedia</h3>
            <div className={styles.divider}></div>
            <div className={styles.portfolioGrid}>
              {portfolios.filter(p => p.category === 'WebMedia').map(item => (
                <div key={item.id} className={styles.portfolioItem}>
                  <img src={item.image} alt={item.title} />
                  <div className={styles.portfolioOverlay}>
                    <div className={styles.overlayContent}>
                      <h4>{item.title}</h4>
                      <a href="#" className={styles.portfolioLink}><FaExternalLinkAlt /></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* InetMedia Services */}
      <section id="inetmedia" className={`${styles.serviceSection} ${styles.bgDark} clip-diagonal-top clip-diagonal-bottom`}>
        <div className="container">
          <motion.div className={styles.sectionHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className={styles.headerLabel} style={{ backgroundColor: 'var(--color-green)', color: 'var(--color-white)' }}>INETMEDIA</div>
            <h2 style={{ color: 'var(--color-white)' }}>Internet Service Provider</h2>
            <p style={{ color: '#94A3B8' }}>Layanan koneksi internet super cepat, stabil, dan aman untuk menjamin produktivitas bisnis Anda tanpa henti.</p>
          </motion.div>

          <div className={styles.pricingGrid}>
            {pricingPackages.inetmedia.map((pkg, idx) => (
              <motion.div 
                key={idx} 
                className={`${styles.pricingCard} ${styles.pricingCardDark} ${pkg.isPopular ? styles.popularDark : ''} sharp-box`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
              >
                {pkg.isPopular && <div className={styles.popularBadge}>Enterprise Best</div>}
                <h3>{pkg.name}</h3>
                <div className={styles.price}>{pkg.price}</div>
                <ul className={styles.featureList}>
                  {pkg.features.map((feature, i) => (
                    <li key={i}><FaCheckCircle className={styles.checkIcon} /> {feature}</li>
                  ))}
                </ul>
                <button className={`btn ${pkg.isPopular ? 'btn-primary' : 'btn-outline'}`} style={{ marginTop: 'auto', borderColor: pkg.isPopular ? '' : 'var(--color-white)', color: pkg.isPopular ? '' : 'var(--color-white)' }}>
                  Berlangganan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MediaKampung */}
      <section id="mediakampung" className={styles.serviceSection}>
        <div className="container">
          <div className={styles.mediaBanner}>
            <motion.div 
              className={styles.mediaBannerContent}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <div className={styles.headerLabel}>MEDIAKAMPUNG</div>
              <h3>Platform Jurnalisme Digital</h3>
              <p>
                Menyajikan berita terkini, investigasi mendalam, dan opini berimbang. 
                Kami menjembatani informasi antara pusat kota dan pelosok daerah dengan integritas jurnalistik yang kuat.
              </p>
              <a href="https://mediakampung.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                Kunjungi Portal Media
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testiSection}>
        <div className="container text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-title">Kata Klien Kami</motion.h2>
          <div className={styles.testiGrid}>
            {testimonials.map((testi, idx) => (
              <motion.div 
                key={idx} 
                className={styles.testiCard}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className={styles.testiAccent}></div>
                <p className={styles.testiQuote}>"{testi.quote}"</p>
                <div className={styles.testiAuthor}>
                  <div className={styles.authorAvatar}></div>
                  <div>
                    <h4>{testi.name}</h4>
                    <span>{testi.company}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
