module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
      {
        source: '/about-us',
        destination: '/company/about-us',
      },
      {
        source: '/kubernetes-services',
        destination: '/services/cloud/kubernetes-services',
      },
      {
        source: '/ai-machine-learning',
        destination: '/services/technology/ai-ml',
      },
      {
        source: '/application-development',
        destination: '/services/engineering/application-development',
      },
      {
        source: '/cloud-consulting',
        destination: '/services/cloud/cloud-consulting',
      },
      {
        source: '/big-data-engineering',
        destination: '/services/technology/big-data',
      },
      {
        source: '/cloud-development',
        destination: '/services/cloud/cloud-development',
      },
      {
        source: '/managed-team',
        destination: '/services/teams/managed-team',
      },
      {
        source: '/ux-ui-design',
        destination: '/services/consulting/uiux-design',
      },
      {
        source: '/staff-augmentation',
        destination: '/services/teams/staff-augmentation',
      },
      {
        source: '/technology-advisory',
        destination: '/services/consulting/technology-advisory',
      },
      {
        source: '/category/blog',
        destination: '/company/blog',
      },
      {
        source: '/cloud-migration',
        destination: '/services/cloud/cloud-migration'
      }

    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images-linkfields-poc.s3.eu-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  poweredByHeader: false,
  staticPageGenerationTimeout: 1000,
};
