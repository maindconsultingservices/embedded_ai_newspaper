import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styles from '../../styles/Embed.module.css';

// Declare the global UnbiasedAIEmbed type
declare global {
  interface Window {
    UnbiasedAIEmbed?: {
      init: (containerId: string, category: string, options: {
        width: string;
        height: string;
        theme: string;
        showPagination: boolean;
      }) => void;
    };
  }
}

export default function EmbedPage() {
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    if (category && typeof category === 'string') {
      const script = document.createElement('script');
      script.src = 'https://ai-newspaper.vercel.app/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.UnbiasedAIEmbed) {
          window.UnbiasedAIEmbed.init('unbiased-ai-content', category, {
            width: '100%',
            height: '600px',
            theme: 'light',
            showPagination: true
          });
        }
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [category]);

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
      </main>

      <footer className={styles.footer}>
        <a href="/" className={styles.backLink}>Back to Home</a>
      </footer>
    </div>
  );
}
