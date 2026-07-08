import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWA from './FloatingWA';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '80px' }}>
        {children}
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
};

export default Layout;
