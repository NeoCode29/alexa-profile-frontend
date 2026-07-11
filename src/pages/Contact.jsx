import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPlus, FaMinus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import styles from './Contact.module.css';
import { usePageContent } from '../hooks/usePageContent';
import { useSEO } from '../hooks/useSEO';
import { fetchApi } from '../services/api';

const Contact = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loadingForm, setLoadingForm] = useState(false);
  const { data: pageData, loading: pageLoading } = usePageContent('contact');

  useSEO({
    title: pageData?.seoTitle,
    description: pageData?.seoDescription,
    keywords: pageData?.seoKeywords,
    ogImage: pageData?.seoOgImage
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingForm(true);

    const response = await fetchApi('/inquiries', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    setLoadingForm(false);

    if (response.success) {
      Swal.fire({
        title: 'Pesan Terkirim!',
        text: response.message || 'Terima kasih, representatif kami akan segera menghubungi Anda.',
        icon: 'success',
        confirmButtonColor: '#3BAE7C',
        background: '#1E293B',
        color: '#fff'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      Swal.fire({
        title: 'Gagal',
        text: response.message || 'Terjadi kesalahan saat mengirim pesan.',
        icon: 'error',
        confirmButtonColor: '#d33',
        background: '#1E293B',
        color: '#fff'
      });
    }
  };

  if (pageLoading || !pageData) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  const parseJSON = (str, fallback) => {
    if (typeof str === 'string') {
      try { return JSON.parse(str); } catch(e) { return fallback; }
    }
    return str || fallback;
  };

  const faqs = parseJSON(pageData.faqList, []);

  return (
    <div>
      <section className={`${styles.contactHero} clip-diagonal-bottom`}>
        <div className="container text-center">
          <h1 className="section-title" style={{ color: 'var(--color-white)' }}>{pageData.heroTitle}</h1>
          <p className="section-subtitle" style={{ color: '#94A3B8' }}>{pageData.heroDesc}</p>
        </div>
      </section>

      <section className={styles.contactSection}>
        <div className={`container ${styles.contactGrid}`}>
          
          {/* Info & Map */}
          <div className={styles.infoCol}>
            <div className={styles.infoBoxWrapper}>
              <div className={`${styles.infoBox} sharp-box`}>
                <div className={styles.infoIcon}><FaMapMarkerAlt /></div>
                <div>
                  <h4>Kantor Pusat</h4>
                  <p>{pageData.officeAddress && pageData.officeAddress.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                </div>
              </div>
              <div className={`${styles.infoBox} sharp-box`}>
                <div className={styles.infoIcon}><FaPhoneAlt /></div>
                <div>
                  <h4>Telepon</h4>
                  <p>{pageData.phoneNumber && pageData.phoneNumber.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                </div>
              </div>
              <div className={`${styles.infoBox} sharp-box`}>
                <div className={styles.infoIcon}><FaEnvelope /></div>
                <div>
                  <h4>Email</h4>
                  <p>{pageData.emailAddress && pageData.emailAddress.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                </div>
              </div>
            </div>

            <div className={`${styles.mapContainer} sharp-box`}>
              <iframe 
                src={pageData.mapsEmbedUrl || "https://www.google.com/maps/embed"} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              ></iframe>
            </div>
          </div>

          {/* Form */}
          <div className={`${styles.formBox} sharp-box`}>
            <h3>Tinggalkan Pesan</h3>
            <div className={styles.divider}></div>
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Nama Lengkap / Perusahaan</label>
                <input 
                  type="text" 
                  className={styles.formInput} 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email Perusahaan</label>
                <input 
                  type="email" 
                  className={styles.formInput} 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Subjek Layanan</label>
                <input 
                  type="text" 
                  className={styles.formInput} 
                  required 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Detail Kebutuhan</label>
                <textarea 
                  className={styles.formInput} 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loadingForm}>
                {loadingForm ? 'Mengirim...' : 'Kirim Pesan'}
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className="container text-center">
          <h2 className="section-title">{pageData.faqTitle}</h2>
          <p className="section-subtitle">{pageData.faqSubtitle}</p>
          
          <div className={styles.faqContainer}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={`${styles.faqItem} sharp-box`}>
                <div 
                  className={`${styles.faqQuestion} ${activeFaq === idx ? styles.faqActive : ''}`} 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  {faq.q}
                  <span className={styles.faqIcon}>
                    {activeFaq === idx ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                {activeFaq === idx && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
