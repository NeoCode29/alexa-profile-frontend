import { FaEye, FaBullseye } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import { usePageContent } from '../hooks/usePageContent';
import { teamData as fallbackTeamData } from '../data/mockData';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const About = () => {
  const { data: pageData, loading } = usePageContent('about');

  if (loading || !pageData) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  const safeParse = (data, fallback) => {
    if (typeof data === 'string') {
      try { return JSON.parse(data); } catch(e) { return fallback; }
    }
    return data || fallback;
  };

  const timelineList = safeParse(pageData.timelineList, []);
  const missionList = safeParse(pageData.missionList, []);
  const teamList = safeParse(pageData.teamList, fallbackTeamData);

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
            {pageData.heroTitle}
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
              <h2 className="section-title">{pageData.historyTitle}</h2>
              <div style={{ height: '3rem' }}></div>
              <p>{pageData.historyPar1}</p>
              {pageData.historyPar2 && <p>{pageData.historyPar2}</p>}
            </motion.div>
            
            <div className={styles.historyTimeline}>
              {timelineList.map((item, idx) => (
                <motion.div 
                  key={item.year}
                  className={styles.timelineBox}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
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
              <p>{pageData.visionText}</p>
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
                {missionList.map((m, idx) => <li key={idx}>{m}</li>)}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Team */}
      <section className={styles.teamSection}>
        <div className="container text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="section-title">{pageData.teamSectionTitle}</motion.h2>
          <div className={styles.teamGrid}>
            {teamList.map((member, idx) => (
              <motion.div 
                key={member.id} 
                className={`${styles.teamCard} sharp-box`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.4 }}
              >
                <div className={styles.teamImgWrapper}>
                  <img src={member.image?.includes('uploads/') ? `http://localhost:4000${member.image.startsWith('/') ? '' : '/'}${member.image}` : member.image} alt={member.name} />
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
