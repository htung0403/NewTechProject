import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../index.css';

const PublicLayout = ({ children }) => {
  useEffect(() => {
    const adjustFooterPosition = () => {
      const footer = document.querySelector("footer");
      const contentHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;

      if (contentHeight < windowHeight) {
        footer.classList.add("footer-absolute");
      } else {
        footer.classList.remove("footer-absolute");
      }
    };

    adjustFooterPosition();
    window.addEventListener('resize', adjustFooterPosition);

    return () => {
      window.removeEventListener('resize', adjustFooterPosition);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;