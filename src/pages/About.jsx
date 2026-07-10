import { FaEye, FaBullseye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { teamData } from '../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const About = () => {
  return (
    <div className={styles.aboutWrapper}>
      
      {/* Hero */}
      <section className={`${styles.aboutHero} clip-diagonal-bottom`}>
        <div className="container">
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            TENTANG KAMI
          </motion.h1>
          <motion.p 
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            PT. Alexa Computindo Group adalah entitas teknologi terintegrasi yang berfokus pada pembangunan infrastruktur digital korporat, 
            penyediaan layanan internet berskala besar, dan media massa digital.
          </motion.p>
        </div>
      </section>

      {/* History */}
      <section className={styles.historySection}>
        <div className="container">
          <div className={styles.historyGrid}>
            <motion.div className={styles.historyText} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="section-title">Sejarah Perusahaan</h2>
              <div style={{ height: '3rem' }}></div>
              <p>Berdiri pada tahun 2018, kami memulai langkah sebagai perusahaan pengembangan perangkat lunak yang melayani sektor korporat (B2B). Melihat kebutuhan infrastruktur yang terintegrasi, kami berekspansi secara agresif.</p>
              <p>Hingga kini, struktur grup kami menaungi tiga divisi utama yang beroperasi secara sinergis: <strong>MediaKampung</strong> (Media), <strong>InetMedia</strong> (ISP), dan <strong>WebMedia</strong> (Pengembangan Perangkat Lunak).</p>
            </motion.div>
            
            <div className={styles.historyTimeline}>
              {['2018', '2020', '2023'].map((year, idx) => (
                <motion.div 
                  key={year}
                  className={styles.timelineBox}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                >
                  <div className={styles.timelineYear}>{year}</div>
                  <div className={styles.timelineContent}>
                    {year === '2018' && (
                      <><h3>Pendirian WebMedia</h3><p>Fokus awal pada arsitektur sistem informasi enterprise.</p></>
                    )}
                    {year === '2020' && (
                      <><h3>Ekspansi InetMedia</h3><p>Memperoleh lisensi ISP nasional untuk infrastruktur jaringan.</p></>
                    )}
                    {year === '2023' && (
                      <><h3>Akuisisi MediaKampung</h3><p>Membentuk pilar media digital yang kuat.</p></>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Mission */}
      <section className={styles.vmSection}>
        <div className="container">
          <div className={styles.vmGrid}>
            
            <motion.div 
              className={`${styles.vmCard} sharp-box`}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <div className={styles.vmHeader}>
                <FaEye size={40} className={styles.vmIcon} />
                <h3>Visi</h3>
              </div>
              <p>Menjadi grup perusahaan teknologi terdepan di Asia Tenggara yang memberikan dampak nyata melalui infrastruktur digital yang inklusif, handal, dan inovatif.</p>
            </motion.div>

            <motion.div 
              className={`${styles.vmCard} sharp-box`}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <div className={styles.vmHeader}>
                <FaBullseye size={40} className={styles.vmIcon} />
                <h3>Misi</h3>
              </div>
              <ul className={styles.vmList}>
                <li>Membangun infrastruktur jaringan internet dengan skalabilitas tinggi.</li>
                <li>Menyajikan jurnalisme digital yang kredibel dan berwawasan.</li>
                <li>Mengembangkan arsitektur perangkat lunak berstandar global.</li>
                <li>Menjaga tata kelola perusahaan yang bersih dan profesional.</li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <div className="container text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-title">Manajemen Inti</motion.h2>
          <div className={styles.teamGrid}>
            {teamData.map((member, idx) => (
              <motion.div 
                key={member.id} 
                className={`${styles.teamCard} sharp-box`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.4 }}
              >
                <div className={styles.teamImgWrapper}>
                  <img src={member.image} alt={member.name} />
                  <div className={styles.teamHover}>
                    <p>{member.bio}</p>
                  </div>
                </div>
                <div className={styles.teamInfo}>
                  <h3>{member.name}</h3>
                  <h4>{member.role}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
};

export default About;
