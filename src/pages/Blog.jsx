import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import styles from './Blog.module.css';
import { articlesData } from '../data/mockData';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(articlesData.map(a => a.category))];

  const filteredArticles = articlesData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.blogWrapper}>
      
      <section className={`${styles.blogHero} clip-diagonal-bottom`}>
        <div className="container text-center">
          <h1 className="section-title" style={{ color: 'var(--color-white)' }}>DATABASE ARTIKEL</h1>
          <p className="section-subtitle" style={{ color: '#94A3B8' }}>Insight dan pembaruan terbaru dari divisi MediaKampung dan internal perusahaan.</p>
        </div>
      </section>

      <section className={styles.blogSection}>
        <div className={`container ${styles.blogGrid}`}>
          
          <aside className={styles.sidebar}>
            <div className={`${styles.widget} sharp-box`}>
              <h3>Pencarian</h3>
              <div className={styles.searchBox}>
                <input 
                  type="text" 
                  placeholder="Ketik kata kunci..." 
                  className={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className={styles.searchBtn}><FaSearch /></button>
              </div>
            </div>

            <div className={`${styles.widget} sharp-box`}>
              <h3>Kategori</h3>
              <ul className={styles.categoryList}>
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <button 
                      className={`${styles.categoryBtn} ${activeCategory === cat ? styles.active : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className={styles.mainContent}>
            <div className={styles.articlesGrid}>
              {filteredArticles.length > 0 ? (
                filteredArticles.map(article => (
                  <div key={article.id} className={`${styles.articleCard} sharp-box`}>
                    <Link to={`/blog/${article.id}`} className={styles.articleImgWrapper}>
                      <img src={article.image} alt={article.title} />
                      <div className={styles.articleCategory}>{article.category}</div>
                    </Link>
                    <div className={styles.articleContent}>
                      <span className={styles.articleDate}>{article.date}</span>
                      <Link to={`/blog/${article.id}`}>
                        <h3>{article.title}</h3>
                      </Link>
                      <Link to={`/blog/${article.id}`} className={styles.readMore}>
                        Baca <FaArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>
                  <p>Tidak ada artikel yang cocok dengan pencarian Anda.</p>
                </div>
              )}
            </div>

            {filteredArticles.length > 0 && (
              <div className={styles.pagination}>
                <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
                <button className={styles.pageBtn}>2</button>
                <button className={styles.pageBtn}>&gt;</button>
              </div>
            )}
          </main>

        </div>
      </section>

    </div>
  );
};

export default Blog;
