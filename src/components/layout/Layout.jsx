import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWA from './FloatingWA';
import Breadcrumbs from './Breadcrumbs';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
        <Breadcrumbs />
        {children}
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
};

export default Layout;
