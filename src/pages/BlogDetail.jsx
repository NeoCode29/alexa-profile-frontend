import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaEye, FaArrowLeft, FaLinkedin, FaWhatsapp, FaFacebook, FaLink } from 'react-icons/fa';
import styles from './BlogDetail.module.css';
import { useArticles } from '../hooks/useArticles';

const BlogDetail = () => {
  const { articleId } = useParams();
  
  const { articleDetail: article, loading: detailLoading } = useArticles(null, null, articleId);
  const { articles: allArticles, loading: allLoading } = useArticles();

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

      // Inject Article Schema langsung ke dalam <head>
      let scriptSchema = document.getElementById('schema-article');
      if (!scriptSchema) {
        scriptSchema = document.createElement('script');
        scriptSchema.type = 'application/ld+json';
        scriptSchema.id = 'schema-article';
        document.head.appendChild(scriptSchema);
      }
      const baseUrl = window.location.origin;
      const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.metaDescription || article.excerpt || '',
        "author": {
          "@type": "Person",
          "name": article.author || "Tim Editorial MediaKampung"
        },
        "datePublished": new Date(article.createdAt || article.date || Date.now()).toISOString().split('T')[0],
        "dateModified": new Date(article.updatedAt || article.createdAt || article.date || Date.now()).toISOString().split('T')[0],
        "image": article.image ? (article.image.startsWith('http') ? article.image : baseUrl + article.image) : `${baseUrl}/favicon.svg`,
        "publisher": {
          "@type": "Organization",
          "name": "Alexa Computindo Group",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/favicon.svg`
          }
        }
      };
      scriptSchema.textContent = JSON.stringify(articleSchema, null, 2);
    }

    return () => {
      const existing = document.getElementById('schema-article');
      if (existing) existing.remove();
    };
  }, [article]);

  useEffect(() => {
    if (article) {
      const viewKey = `viewed_article_${article.id}`;
      if (!sessionStorage.getItem(viewKey)) {
        import('../services/api').then(({ fetchApi }) => {
          fetchApi(`/articles/${article.id}/view`, { method: 'POST' });
          sessionStorage.setItem(viewKey, 'true');
        });
      }
    }
  }, [article]);

  if (detailLoading || allLoading || !article) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;
  }

  // Related articles (exclude current, take top 4)
  const relatedArticles = (allArticles || [])
    .filter(a => a.id !== article.id && a.slug !== article.slug)
    .slice(0, 4);

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
              <FaCalendarAlt size={14} style={{ color: 'var(--color-green)' }} /> {new Date(article.date || article.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}
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
              <img src={article.image?.startsWith('http') ? article.image : (article.image?.includes('uploads/') ? `http://localhost:4000${article.image.startsWith('/') ? '' : '/'}${article.image}?v=1` : article.image)} alt={article.title} className={styles.featuredImage} />
            </div>

            <div className={styles.articleBody}>
              {article.content ? (
                Array.isArray(article.content) ? (
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
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                )
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
                  <Link key={rel.slug || rel.id} to={`/blog/${rel.slug || rel.id}`} className={styles.relatedItem}>
                    <div className={`${styles.relatedImgWrapper} sharp-box`}>
                      <img src={rel.image?.includes('uploads/') ? `http://localhost:4000${rel.image.startsWith('/') ? '' : '/'}${rel.image}` : rel.image} alt={rel.title} className={styles.relatedImg} />
                    </div>
                    <div className={styles.relatedInfo}>
                      <h5 className={styles.relatedTitle}>{rel.title}</h5>
                      <span className={styles.relatedDate}>{new Date(rel.date || rel.createdAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
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
