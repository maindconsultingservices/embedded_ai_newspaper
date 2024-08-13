import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const categories = [
  'Politics', 'Economy', 'Sports', 'Technology', 'Science',
  'Culture', 'Lifestyle', 'Fashion', 'Others'
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>UnbiasedAI Embed Demo</title>
        <meta name="description" content="Demo site for UnbiasedAI content embed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to UnbiasedAI Embed Demo
        </h1>

        <p className={styles.description}>
          Select a category to view embedded content:
        </p>

        <div className={styles.grid}>
          {categories.map((category) => (
            <button
              key={category}
              className={styles.card}
              onClick={() => setSelectedCategory(category.toLowerCase())}
            >
              <h2>{category}</h2>
            </button>
          ))}
        </div>

        {selectedCategory && (
          <Link href={`/embed/${selectedCategory}`}>
            <a className={styles.viewButton}>View {selectedCategory} content</a>
          </Link>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://ai-newspaper.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by UnbiasedAI
        </a>
      </footer>
    </div>
  );
}
