import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaEye, FaArrowLeft, FaLinkedin, FaWhatsapp, FaFacebook, FaLink } from 'react-icons/fa';
import styles from './BlogDetail.module.css';
import { articlesData } from '../data/mockData';

const BlogDetail = () => {
  const { articleId } = useParams();
  
  // Find current article or fallback to first
  const article = articlesData.find(a => a.id === Number(articleId)) || articlesData[0];

  // Related articles (exclude current, take top 4)
  const relatedArticles = articlesData
    .filter(a => a.id !== article.id)
    .slice(0, 4);

  useEffect(() => {
    if (article) {
      document.title = `${article.metaTitle || article.title} | Alexa Group`;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = article.metaDescription || article.excerpt || '';
    }
  }, [article]);

  const handleShareCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Tautan artikel berhasil disalin ke clipboard!');
  };

  const authorName = article.author || 'Tim Editorial MediaKampung';
  const authorInitial = authorName.charAt(0);

  return (
    <div className={styles.detailWrapper}>
      
      {/* Hero Section */}
      <section className={`${styles.heroSection} clip-diagonal-bottom`}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.metaRow}>
            <span className={`${styles.categoryBadge} sharp-box`}>{article.category}</span>
            <span className={styles.metaItem}>
              <FaCalendarAlt size={14} style={{ color: 'var(--color-green)' }} /> {article.date}
            </span>
            <span className={styles.metaItem}>
              <FaUser size={14} style={{ color: 'var(--color-green)' }} /> {authorName}
            </span>
            <span className={styles.metaItem}>
              <FaEye size={14} style={{ color: 'var(--color-green)' }} /> {article.views || '1,500 Kali Dibaca'}
            </span>
          </div>
          <h1 className={styles.heroTitle}>{article.title}</h1>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={`container ${styles.contentGrid}`}>
          
          {/* Main Article Body */}
          <main className={`${styles.mainArticle} sharp-box`}>
            <div className={`${styles.featuredImageWrapper} sharp-box`}>
              <img src={article.image} alt={article.title} className={styles.featuredImage} />
            </div>

            <div className={styles.articleBody}>
              {article.content ? (
                article.content.map((paragraph, idx) => {
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={idx}>{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={idx}>{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('> ')) {
                    return <blockquote key={idx}>{paragraph.replace('> ', '').replace(/"/g, '"')}</blockquote>;
                  }
                  return <p key={idx}>{paragraph}</p>;
                })
              ) : (
                <p>{article.excerpt}</p>
              )}
            </div>

            {/* Share Buttons */}
            <div className={styles.shareSection}>
              <span className={styles.shareTitle}>Bagikan Artikel Ini:</span>
              <div className={styles.shareButtons}>
                <a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - ' + window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${styles.shareBtn} sharp-box`}
                  style={{ backgroundColor: '#25D366' }}
                >
                  <FaWhatsapp size={16} /> WhatsApp
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${styles.shareBtn} sharp-box`}
                  style={{ backgroundColor: '#0A66C2' }}
                >
                  <FaLinkedin size={16} /> LinkedIn
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${styles.shareBtn} sharp-box`}
                  style={{ backgroundColor: '#1877F2' }}
                >
                  <FaFacebook size={16} /> Facebook
                </a>
                <button 
                  onClick={handleShareCopy} 
                  className={`${styles.shareBtn} sharp-box`}
                  style={{ backgroundColor: 'var(--color-dark)' }}
                >
                  <FaLink size={14} /> Salin Tautan
                </button>
              </div>
            </div>

            <div className={styles.backBtnContainer}>
              <Link to="/blog" className={`${styles.backBtn} sharp-box`}>
                <FaArrowLeft size={14} /> Kembali ke Database Artikel
              </Link>
            </div>
          </main>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            
            {/* Author Box */}
            <div className={`${styles.authorBox} sharp-box`}>
              <div className={styles.authorAvatar}>
                {authorInitial}
              </div>
              <h4 className={styles.authorName}>{authorName}</h4>
              <span className={styles.authorRole}>Divisi Publikasi & Riset</span>
              <p className={styles.authorBio}>
                Tim riset dan teknologi korporat Alexa Computindo Group yang berdedikasi membagikan insight seputar inovasi digital, infrastruktur jaringan, dan pemasaran strategis.
              </p>
            </div>

            {/* Related Articles Widget */}
            <div className={`${styles.relatedWidget} sharp-box`}>
              <h3>Artikel Terkait</h3>
              <div className={styles.relatedList}>
                {relatedArticles.map(rel => (
                  <Link key={rel.id} to={`/blog/${rel.id}`} className={styles.relatedItem}>
                    <div className={`${styles.relatedImgWrapper} sharp-box`}>
                      <img src={rel.image} alt={rel.title} className={styles.relatedImg} />
                    </div>
                    <div className={styles.relatedInfo}>
                      <h5 className={styles.relatedTitle}>{rel.title}</h5>
                      <span className={styles.relatedDate}>{rel.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </section>

    </div>
  );
};

export default BlogDetail;
