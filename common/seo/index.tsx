import Head from 'next/head';
import React from 'react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords = '',
}) => {
    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </>
    );

};

export default SEO;
