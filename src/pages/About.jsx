import { FaEye, FaBullseye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { teamData } from '../data/mockData';
import { usePageContent } from '../hooks/usePageContent';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const defaultAboutData = {
  heroTitle: "TENTANG KAMI",
  heroDesc: "PT. Alexa Computindo Group adalah entitas teknologi terintegrasi yang berfokus pada pembangunan infrastruktur digital korporat, penyediaan layanan internet berskala besar, dan media massa digital.",
  historyTitle: "Sejarah Perusahaan",
  historyContent: "<p>Berdiri pada tahun 2018, kami memulai langkah sebagai perusahaan pengembangan perangkat lunak yang melayani sektor korporat (B2B). Melihat kebutuhan infrastruktur yang terintegrasi, kami berekspansi secara agresif.</p><p>Hingga kini, struktur grup kami menaungi tiga divisi utama yang beroperasi secara sinergis: <strong>MediaKampung</strong> (Media), <strong>InetMedia</strong> (ISP), dan <strong>WebMedia</strong> (Pengembangan Perangkat Lunak).</p>",
  historyPar1: "<p>Berdiri pada tahun 2018, kami memulai langkah sebagai perusahaan pengembangan perangkat lunak yang melayani sektor korporat (B2B). Melihat kebutuhan infrastruktur yang terintegrasi, kami berekspansi secara agresif.</p>",
  historyPar2: "",
  timelineList: [
    { year: '2018', title: 'Pendirian WebMedia', desc: 'Fokus awal pada arsitektur sistem informasi enterprise.' },
    { year: '2020', title: 'Ekspansi InetMedia', desc: 'Memperoleh lisensi ISP nasional untuk infrastruktur jaringan.' },
    { year: '2023', title: 'Akuisisi MediaKampung', desc: 'Membentuk pilar media digital yang kuat.' }
  ],
  visionText: "<p>Menjadi grup perusahaan teknologi terdepan di Asia Tenggara yang memberikan dampak nyata melalui infrastruktur digital yang inklusif, handal, dan inovatif.</p>",
  missionRichText: "",
  missionList: [
    "Membangun infrastruktur jaringan internet dengan skalabilitas tinggi.",
    "Menyajikan jurnalisme digital yang kredibel dan berwawasan.",
    "Mengembangkan arsitektur perangkat lunak berstandar global.",
    "Menjaga tata kelola perusahaan yang bersih dan profesional."
  ],
  teamSectionTitle: "MANAJEMEN INTI",
  teamList: [
    { name: 'Budi Santoso', role: 'Chief Executive Officer', bio: 'Berpengalaman 15 tahun di industri IT dan manajemen strategis.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
    { name: 'Siti Aminah', role: 'Chief Operating Officer', bio: 'Ahli dalam operasional bisnis dan pengembangan produk digital.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
    { name: 'Andi Pratama', role: 'CTO / Head of Engineering', bio: 'Pakar arsitektur cloud, keamanan siber, dan jaringan berskala besar.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' }
  ]
};

const About = () => {
  const pageData = usePageContent('about', defaultAboutData);
  const timelines = pageData.timelineList && pageData.timelineList.length > 0 ? pageData.timelineList : defaultAboutData.timelineList;
  const teams = pageData.teamList && pageData.teamList.length > 0 ? pageData.teamList : defaultAboutData.teamList;

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
            {pageData.heroTitle || defaultAboutData.heroTitle}
          </motion.h1>
          <motion.p 
            className={styles.heroDesc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {pageData.heroDesc || defaultAboutData.heroDesc}
          </motion.p>
        </div>
      </section>

      {/* History */}
      <section className={styles.historySection}>
        <div className="container">
          <div className={styles.historyGrid}>
            <motion.div className={styles.historyText} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="section-title">{pageData.historyTitle || defaultAboutData.historyTitle}</h2>
              <div style={{ height: '3rem' }}></div>
              <div dangerouslySetInnerHTML={{ __html: pageData.historyContent || pageData.historyPar1 || defaultAboutData.historyContent }} />
              {pageData.historyPar2 && !pageData.historyContent && <div style={{ marginTop: '1rem' }} dangerouslySetInnerHTML={{ __html: pageData.historyPar2 }} />}
            </motion.div>
            
            <div className={styles.historyTimeline}>
              {timelines.map((item, idx) => (
                <motion.div 
                  key={idx}
                  className={styles.timelineBox}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                >
                  <div className={styles.timelineYear}>{item.year}</div>
                  <div className={styles.timelineContent}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
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
              <div dangerouslySetInnerHTML={{ __html: pageData.visionText || defaultAboutData.visionText }} />
            </motion.div>

            <motion.div 
              className={`${styles.vmCard} sharp-box`}
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}
            >
              <div className={styles.vmHeader}>
                <FaBullseye size={40} className={styles.vmIcon} />
                <h3>Misi</h3>
              </div>
              {pageData.missionRichText ? (
                <div dangerouslySetInnerHTML={{ __html: pageData.missionRichText }} />
              ) : (
                <ul className={styles.vmList}>
                  {(pageData.missionList || defaultAboutData.missionList).map((mission, idx) => (
                    <li key={idx}>{mission}</li>
                  ))}
                </ul>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <div className="container text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-title">
            {pageData.teamSectionTitle || defaultAboutData.teamSectionTitle}
          </motion.h2>
          <div className={styles.teamGrid}>
            {teams.map((member, idx) => (
              <motion.div 
                key={idx} 
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
