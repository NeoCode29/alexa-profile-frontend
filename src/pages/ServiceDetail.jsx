import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import styles from './ServiceDetail.module.css';
import { serviceDetailsData } from '../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = serviceDetailsData[serviceId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="container text-center" style={{ padding: '8rem 0', minHeight: '60vh' }}>
        <h1 className="section-title">Layanan Tidak Ditemukan</h1>
        <p style={{ color: '#64748B', marginTop: '1rem', marginBottom: '2rem' }}>
          Divisi layanan yang Anda cari tidak tersedia di sistem kami.
        </p>
        <Link to="/services" className="btn btn-primary">
          <FaArrowLeft /> Kembali ke Daftar Layanan
        </Link>
      </div>
    );
  }

  return (
    <div className="service-detail-wrapper">
      
      {/* 1. Hero Section */}
      <section className={`${styles.detailHero} clip-diagonal-bottom`}>
        <div className="container">
          <Link to="/services" style={{ color: 'var(--color-green)', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', fontWeight: 600 }}>
            <FaArrowLeft /> Kembali ke Daftar Layanan
          </Link>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.badge}>{service.badge}</div>
            <h1 className={styles.title}>{service.name}</h1>
            <h2 className={styles.tagline}>{service.tagline}</h2>
            <p className={styles.heroDesc}>{service.heroDesc}</p>
            
            <div className={styles.heroActions}>
              <a href="#pricing" className="btn btn-primary">
                Lihat Paket Harga <FaArrowRight />
              </a>
              <Link to="/contact" className="btn btn-outline" style={{ borderColor: 'var(--color-white)', color: 'var(--color-white)' }}>
                Konsultasi Proyek
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Deep Dive Description & Features */}
      <section className={styles.descSection}>
        <div className="container">
          <div className={styles.descGrid}>
            <motion.div 
              className={styles.descText}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2>Keunggulan Divisi {service.name}</h2>
              <div className={styles.divider}></div>
              <p>{service.fullDesc}</p>
              <Link to="/contact" className="btn btn-secondary" style={{ marginTop: '1rem' }}>
                Jadwalkan Pertemuan <FaArrowRight />
              </Link>
            </motion.div>

            <div className={styles.featuresGrid}>
              {service.features.map((feat, idx) => (
                <motion.div 
                  key={idx} 
                  className={`${styles.featureCard} sharp-box`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                >
                  <div className={styles.featureNumber}>0{idx + 1}</div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pricing & Packages */}
      <section id="pricing" className={`${styles.pricingSection} clip-diagonal-top clip-diagonal-bottom`}>
        <div className="container text-center">
          <motion.div className={styles.pricingHeader} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="section-title" style={{ color: 'var(--color-white)' }}>Paket & Investasi</h2>
            <p className="section-subtitle" style={{ color: '#94A3B8' }}>Pilih paket layanan yang paling sesuai dengan skala dan ambisi korporasi Anda.</p>
          </motion.div>

          <div className={styles.pricingGrid}>
            {service.pricing.map((pkg, idx) => (
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
                  {pkg.features.map((feat, i) => (
                    <li key={i}><FaCheckCircle className={styles.checkIcon} /> <span>{feat}</span></li>
                  ))}
                </ul>
                <Link to="/contact" className={`btn ${pkg.isPopular ? 'btn-primary' : 'btn-outline'}`} style={{ marginTop: 'auto', width: '100%' }}>
                  Pilih Paket Ini
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Dedicated Portfolio & Case Studies */}
      <section className={styles.portfolioSection}>
        <div className="container text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="section-title">Showcase Proyek {service.name}</h2>
            <p className="section-subtitle">Bukti nyata dedikasi dan kualitas implementasi kami untuk klien korporasi.</p>
          </motion.div>

          <div className={styles.portfolioGrid}>
            {service.portfolios.map((item, idx) => (
              <motion.div 
                key={idx} 
                className={`${styles.portfolioCard} sharp-box`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
              >
                <div className={styles.portfolioImgWrapper}>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className={styles.portfolioContent} style={{ textAlign: 'left' }}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Client Testimonials */}
      <section className={styles.testiSection}>
        <div className="container">
          <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="section-title">Testimoni Klien {service.name}</h2>
          </motion.div>

          <div className={styles.testiGrid}>
            {service.testimonials.map((testi, idx) => (
              <motion.div 
                key={idx} 
                className={`${styles.testiCard} sharp-box`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className={styles.testiQuote}>"{testi.quote}"</p>
                <div className={styles.testiAuthor}>
                  <h4>{testi.name}</h4>
                  <span>{testi.company}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Bottom CTA Banner */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2>Siap Membangun Solusi {service.name}?</h2>
            <p>Jadwalkan sesi konsultasi gratis dengan tim spesialis kami dan wujudkan transformasi digital perusahaan Anda sekarang.</p>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
              Hubungi Spesialis Kami <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ServiceDetail;
