"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './newsarticlebutton.module.scss'

const NewsArticleButton = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/company/news-and-articles');
    };

    return (
        <div className={styles.container}>
            <button className={styles.newsbutton} onClick={handleButtonClick}>
                <span className={styles.newstext}>News and Articles</span>
            </button>
        </div>
    );
};

export default NewsArticleButton;
