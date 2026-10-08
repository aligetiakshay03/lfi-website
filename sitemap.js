const fs = require('fs');
const path = require('path');

// Define your website URL
const baseUrl = 'https://www.linkfields.com';

// Define your static routes
const staticRoutes = [
    '/',
    '/ai-analytics',
    '/careers',
    '/company/about-us',
    '/company/blog',
    '/company/news-and-articles',
    '/company/our-approach',
    '/contact-us',
    '/cookies-policy',
    '/explore-more/innovationAndTransformation',
    '/industries',
    '/industries/banking',
    '/industries/fintech',
    '/industries/fmcg',
    '/industries/insurance',
    '/industries/manufacturing',
    '/industries/mining',
    '/industries/oil-gas',
    '/industries/telecom',
    '/privacy-policy',
    '/services',
    '/services/automation',
    '/services/automation/digital-transformation',
    '/services/automation/robotic-process-automation',
    '/services/cloud',
    '/services/cloud/cloud-consulting',
    '/services/cloud/cloud-development',
    '/services/cloud/cloud-migration',
    '/services/cloud/kubernetes-services',
    '/services/cloud/ipaas',
    '/services/consulting',
    '/services/consulting/product-discovery',
    '/services/consulting/solution-discovery',
    '/services/consulting/technology-advisory',
    '/services/consulting/uiux-design',
    '/services/engineering',
    '/services/engineering/application-development',
    '/services/engineering/devops',
    '/services/engineering/quality-control',
    '/services/itinfraandsolutions',
    '/services/teams',
    '/services/teams/managed-team',
    '/services/teams/staff-augmentation',
    '/services/technology',
    '/services/technology/ai-ml',
    '/services/technology/big-data',
    '/solutions/erp-solutions',
    '/solutions/erp-solutions/microsoft-dynamics',
    '/solutions/erp-solutions/odoo',
    '/solutions/erp-solutions/salesforce',
    '/solutions/erp-solutions/sap',
    '/solutions/erp-solutions/sap/core-sap-expertise',
    '/solutions/erp-solutions/sap/data-services',
    '/solutions/erp-solutions/sap/sap-hana',
    '/solutions/erp-solutions/sap/sap-special-expertise',
    '/solutions/erp-solutions/sap/service&amp;more',
    '/terms-of-use',
    '/company/blog/Privacy%20Policy',
    '/company/blog/Privacy%20Policy%204'
  ];

// Function to generate XML for a route
// Function to generate the sitemap XML
function generateSitemap() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticRoutes.map(route => `
<url>
<loc>${baseUrl}${route}</loc>
<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
<changefreq>weekly</changefreq>
<priority>${route === '/' ? '1.0' : '0.8'}</priority>
</url>
    `).join('')}
</urlset>`;

    fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully.');
}

// Call the function to generate sitemap
generateSitemap();
