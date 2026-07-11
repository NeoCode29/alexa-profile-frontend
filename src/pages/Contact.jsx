import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPlus, FaMinus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import styles from './Contact.module.css';
import { usePageContent } from '../hooks/usePageContent';

const defaultContactData = {
  heroTitle: "HUBUNGI KAMI",
  heroSubtitle: "Jadwalkan konsultasi untuk kebutuhan transformasi digital perusahaan Anda.",
  addressTitle: "Kantor Pusat",
  addressText: "Jl. Teknologi No. 45\nJakarta Selatan, 12345, ID",
  phoneTitle: "Telepon",
  phoneText: "(021) 555-0198\n+62 811 2233 4455",
  emailTitle: "Email",
  emailText: "info@alexagroup.com\nsupport@alexagroup.com",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24040909062!2d106.75924765!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%20Selatan%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1689230504746!5m2!1sid!2sid",
  faqTitle: "Frequently Asked Questions",
  faqSubtitle: "Pertanyaan umum mengenai layanan korporat kami.",
  faqList: [
    {
      q: 'Dimana lokasi operasional PT. Alexa Computindo Group?',
      a: 'Kantor pusat kami berlokasi di Jl. Teknologi No. 45, Jakarta Selatan. Kami melayani kunjungan klien enterprise pada hari kerja (Senin - Jumat), pukul 09:00 - 17:00 WIB.'
    },
    {
      q: 'Apakah layanan pengembangan software (WebMedia) termasuk maintenance?',
      a: 'Ya, seluruh proyek perangkat lunak dari WebMedia memiliki SLA dan masa maintenance mulai dari 3 hingga 12 bulan, yang dapat diperpanjang melalui kontrak support enterprise.'
    },
    {
      q: 'Berapa lama proses pemasangan internet corporate InetMedia?',
      a: 'Proses survei, penarikan kabel fiber optik, dan aktivasi internet khusus corporate rata-rata memakan waktu 3-5 hari kerja setelah SPK disetujui.'
    }
  ]
};

const Contact = () => {
  const pageData = usePageContent('contact', defaultContactData);
  const [activeFaq, setActiveFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const faqs = pageData.faqList && pageData.faqList.length > 0 ? pageData.faqList : defaultContactData.faqList;

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Pesan Terkirim!',
      text: 'Terima kasih, representatif kami akan segera menghubungi Anda.',
      icon: 'success',
      confirmButtonColor: '#3BAE7C',
      background: '#1E293B',
      color: '#fff'
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const renderMultiLine = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => (
      <span key={idx}>
        {line}
        {idx < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div>
      <section className={`${styles.contactHero} clip-diagonal-bottom`}>
        <div className="container text-center">
          <h1 className="section-title" style={{ color: 'var(--color-white)' }}>{pageData.heroTitle || defaultContactData.heroTitle}</h1>
          <p className="section-subtitle" style={{ color: '#94A3B8' }}>{pageData.heroSubtitle || defaultContactData.heroSubtitle}</p>
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
                  <h4>{pageData.addressTitle || defaultContactData.addressTitle}</h4>
                  <p>{renderMultiLine(pageData.addressText || defaultContactData.addressText)}</p>
                </div>
              </div>
              <div className={`${styles.infoBox} sharp-box`}>
                <div className={styles.infoIcon}><FaPhoneAlt /></div>
                <div>
                  <h4>{pageData.phoneTitle || defaultContactData.phoneTitle}</h4>
                  <p>{renderMultiLine(pageData.phoneText || defaultContactData.phoneText)}</p>
                </div>
              </div>
              <div className={`${styles.infoBox} sharp-box`}>
                <div className={styles.infoIcon}><FaEnvelope /></div>
                <div>
                  <h4>{pageData.emailTitle || defaultContactData.emailTitle}</h4>
                  <p>{renderMultiLine(pageData.emailText || defaultContactData.emailText)}</p>
                </div>
              </div>
            </div>

            <div className={`${styles.mapContainer} sharp-box`}>
              <iframe 
                src={pageData.mapEmbedUrl || defaultContactData.mapEmbedUrl} 
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
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Kirim Pesan</button>
            </form>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className="container text-center">
          <h2 className="section-title">{pageData.faqTitle || defaultContactData.faqTitle}</h2>
          <p className="section-subtitle">{pageData.faqSubtitle || defaultContactData.faqSubtitle}</p>
          
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
