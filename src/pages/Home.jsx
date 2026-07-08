import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegNewspaper, FaWifi, FaLaptopCode, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
// import Marquee from 'react-fast-marquee';
import styles from './Home.module.css';
import { servicesData, clientsData, articlesData } from '../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Home = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80"
  ];
  
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIdx((prevIdx) => (prevIdx + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'FaRegNewspaper': return <FaRegNewspaper size={48} />;
      case 'FaWifi': return <FaWifi size={48} />;
      case 'FaLaptopCode': return <FaLaptopCode size={48} />;
      default: return null;
    }
  };

  return (
    <div className={styles.homeWrapper}>
      
      {/* Hero Section */}
      <section className={`${styles.hero} clip-diagonal-bottom`}>
        <div className={`container ${styles.heroContainer}`}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={styles.heroTitle}>
              Membangun Infrastruktur <br />
              <span className={styles.textHighlight}>Digital Masa Depan</span>
            </h1>
            <p className={styles.heroDesc}>
              PT. Alexa Computindo Group menyediakan solusi Media Digital, ISP Berkecepatan Tinggi, dan Arsitektur Perangkat Lunak untuk skala Enterprise.
            </p>
            <div className={styles.heroActions}>
              <Link to="/services" className="btn btn-primary">
                Eksplorasi Layanan <FaArrowRight />
              </Link>
              <Link to="/about" className="btn btn-outline" style={{ borderColor: 'var(--color-white)', color: 'var(--color-white)' }}>
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </motion.div>
          <motion.div
            className={styles.heroImageWrapper}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIdx}
                src={heroImages[currentImageIdx]}
                alt="Tech Corporate"
                className={styles.heroImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </motion.div>
        </div>
        <div className={styles.heroTriangle}></div>
      </section>

      {/* Intro Section */}
      <section className={styles.introSection}>
        <div className="container">
          <div className={styles.introGrid}>
            <motion.div 
              className={styles.introImageWrapper}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="Corporate Office" />
              <div className={styles.imageOverlay}></div>
            </motion.div>
            <motion.div 
              className={styles.introText}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, delay: 0.2 }}
            >
              <h2 className={styles.introTitle}>Fundamen Solid.<br/>Inovasi Tanpa Henti.</h2>
              <div className={styles.divider}></div>
              <p>
                Didirikan sejak tahun 2018, kami telah bertransformasi dari pengembang perangkat lunak independen menjadi raksasa teknologi dengan tiga pilar utama. 
                Kami tidak sekadar beradaptasi dengan perubahan digital; kami yang menciptakannya.
              </p>
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <h3>8+</h3>
                  <span>Tahun Pengalaman</span>
                </div>
                <div className={styles.statBox}>
                  <h3>99.9%</h3>
                  <span>Uptime Server</span>
                </div>
                <div className={styles.statBox}>
                  <h3>200+</h3>
                  <span>Klien Enterprise</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className="container text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-title">Divisi Utama Kami</motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-subtitle">Tiga pilar strategis yang menggerakkan ekosistem digital kami.</motion.p>
          
          <div className={styles.servicesGrid}>
            {servicesData.map((service, idx) => (
              <motion.div 
                key={service.id} 
                className={`${styles.serviceCard} sharp-box clip-triangle-corner`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className={styles.serviceIcon}>
                  {getIcon(service.icon)}
                </div>
                <h3>{service.title}</h3>
                <h4 className={styles.serviceSubtitle}>{service.subtitle}</h4>
                <p>{service.description}</p>
                <Link to={`/services/${service.id}`} className={styles.serviceLink}>
                  Pelajari <FaArrowRight size={14} />
                </Link>
                <div className={styles.serviceNumber}>0{idx + 1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className={styles.clientsSection}>
        <div className="container">
          <p className="text-center" style={{ color: 'var(--color-dark)', fontWeight: 700, letterSpacing: '2px', marginBottom: '3rem' }}>
            DIPERCAYA OLEH PERUSAHAAN TERKEMUKA
          </p>
          <div className={styles.marqueeContainer}>
            <div className={styles.marqueeTrack}>
              {[...clientsData, ...clientsData, ...clientsData].map((client, idx) => (
                <div key={`${client.id}-${idx}`} className={styles.clientLogo}>
                  <img src={client.image} alt={client.name} className={styles.clientImg} />
                  <span>{client.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className={`${styles.articlesSection} clip-diagonal-top`}>
        <div className="container">
          <div className={styles.articlesHeader}>
            <h2 className="section-title" style={{ margin: 0, color: 'var(--color-white)' }}>Berita & Insight</h2>
            <Link to="/blog" className="btn btn-primary" style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-dark)' }}>Lihat Semua</Link>
          </div>
          
          <div className={styles.articlesGrid}>
            {articlesData.slice(0, 3).map((article, idx) => (
              <motion.div 
                key={article.id} 
                className={`${styles.articleCard} sharp-box`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className={styles.articleImgWrapper}>
                  <img src={article.image} alt={article.title} />
                  <div className={styles.articleCategory}>{article.category}</div>
                </div>
                <div className={styles.articleContent}>
                  <div className={styles.articleDate}>{article.date}</div>
                  <h3>{article.title}</h3>
                  <Link to={`/blog/${article.id}`} className={styles.articleLink}>Baca Selengkapnya <FaArrowRight /></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
