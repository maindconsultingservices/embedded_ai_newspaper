import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Embed.module.css';

declare global {
  interface Window {
    UnbiasedAIEmbed: {
      init: (containerId: string, category: string, options: any) => void;
    };
  }
}

export default function EmbedPage() {
  const router = useRouter();
  const { category } = router.query;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (category && typeof category === 'string') {
      const script = document.createElement('script');
      script.src = 'https://ai-newspaper.vercel.app/embed.js';
      script.async = true;
      script.onload = () => {
        initEmbed();
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [category, currentPage]);

  const initEmbed = () => {
    if (window.UnbiasedAIEmbed && category) {
      window.UnbiasedAIEmbed.init('unbiased-ai-content', category as string, {
        width: '100%',
        height: '600px',
        theme: 'light',
        showPagination: false,
        page: currentPage,
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    router.push(`/embed/${category}?page=${newPage}`, undefined, { shallow: true });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{`UnbiasedAI - ${category} Content`}</title>
        <meta name="description" content={`Embedded UnbiasedAI content for ${category}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{category} Content</h1>
        <div id="unbiased-ai-content" className={styles.embedContainer}></div>
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          )}
          <span>Page {currentPage}</span>
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="/" className={styles.backLink}>Back to Home</a>
      </footer>
    </div>
  );
}
