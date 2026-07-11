import { Link } from 'react-router-dom';
import { FaRegNewspaper, FaWifi, FaLaptopCode, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './Services.module.css';
import { usePageContent } from '../hooks/usePageContent';
import { useServices } from '../hooks/useServices';
import { testimonials as fallbackTestimonials } from '../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Services = () => {
  const { data: pageData, loading: pageLoading } = usePageContent('services');
  const { services, loading: servicesLoading } = useServices();

  if (pageLoading || servicesLoading || !pageData) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'FaRegNewspaper': return <FaRegNewspaper size={36} />;
      case 'FaWifi': return <FaWifi size={36} />;
      case 'FaLaptopCode': return <FaLaptopCode size={36} />;
      case 'Newspaper': return <FaRegNewspaper size={36} />; // Handle API icons
      case 'Wifi': return <FaWifi size={36} />;
      case 'Laptop': return <FaLaptopCode size={36} />;
      default: return <FaLaptopCode size={36} />; // Fallback
    }
  };

  const getHighlights = (service) => {
    if (service.features && Array.isArray(service.features) && service.features.length > 0) {
      return service.features.slice(0, 3);
    }
    const id = service.slug || service.id;
    switch(id) {
      case 'webmedia':
        return [
          'Custom Software Architecture',
          'SLA Support 24/7 & Uptime 99.9%',
          'Integrasi API & Cloud AWS/GCP'
        ];
      case 'inetmedia':
        return [
          'Bandwidth Dedicated 1:1 Simetris',
          'Infrastruktur Fiber Optik Redundant',
          'MRTG Monitoring Real-time'
        ];
      case 'mediakampung':
        return [
          'Jurnalisme Faktual & Kredibel',
          'Jangkauan Ratusan Ribu Audiens',
          'Advertorial & Brand Reputasi'
        ];
      default:
        return ['Solusi Digital Terdepan', 'Dukungan Profesional 24/7', 'Standar Mutu Enterprise'];
    }
  };

  // Aggregate testimonials from all services if available
  let allTestimonials = [];
  if (services && services.length > 0) {
    services.forEach(s => {
      if (s.testimonials && Array.isArray(s.testimonials)) {
        allTestimonials = [...allTestimonials, ...s.testimonials];
      }
    });
  }
  if (allTestimonials.length === 0) {
    allTestimonials = fallbackTestimonials;
  }

  return (
    <div className={styles.servicesWrapper}>
      
      {/* Hero */}
      <section className={`${styles.servicesHero} clip-diagonal-bottom`}>
        <div className="container text-center">
          <motion.h1 
            className="section-title" style={{ color: 'var(--color-white)' }}
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            {pageData.heroTitle}
          </motion.h1>
          <motion.p 
            className="section-subtitle" style={{ color: '#94A3B8' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
          >
            {pageData.heroDesc}
          </motion.p>
        </div>
      </section>

      {/* Services Hub Directory Grid */}
      <section className={styles.serviceSection}>
        <div className="container">
          <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="section-title">{pageData.mainSectionTitle}</h2>
            <p className="section-subtitle">{pageData.mainSectionSubtitle}</p>
          </motion.div>

          <div className={styles.hubGrid}>
            {services && services.map((service, idx) => (
              <motion.div 
                key={service.slug || service.id} 
                className={`${styles.divisionCard} sharp-box`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
              >
                <div className={styles.iconWrapper}>
                  {getIcon(service.icon)}
                </div>
                <h3>{service.title}</h3>
                <div className={styles.divisionSubtitle}>{service.tagline || service.subtitle}</div>
                <p className={styles.divisionDesc}>{service.description}</p>

                <ul className={styles.highlightList}>
                  {getHighlights(service).map((hl, i) => (
                    <li key={i}>
                      <FaCheckCircle className={styles.checkIcon} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                <Link to={`/services/${service.slug || service.id}`} className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>
                  Lihat Detail Divisi <FaArrowRight />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${styles.testiSection} clip-diagonal-top`}>
        <div className="container text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-title">{pageData.testimonialTitle}</motion.h2>
          <div className={styles.testiGrid}>
            {allTestimonials.slice(0, 4).map((testi, idx) => (
              <motion.div 
                key={testi.id || idx} 
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
                    <h4>{testi.author || testi.name}</h4>
                    <span>{testi.role || testi.company}</span>
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
