import Footer from "../components/modern/Footer";
import "./globals.css";
import databaseClient from "../tina/__generated__/databaseClient";
import Header from "../components/modern/Header";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ConfigProvider, ThemeConfig } from "antd";
import NewsArticleButton from "../components/NewsArticleButton";
import { GoogleAnalytics } from "@next/third-parties/google";
import BackToTop from "../components/modern/BackToTop";
import Script from "next/script";

// Heavy geometric display face for headlines and UI labels.
const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-lf-display",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navbar, footerData] = await Promise.all([
    databaseClient.queries.navbar({
      relativePath: "navbar.json",
    }),
    databaseClient.queries.footer({
      relativePath: "footer.json",
    }),
  ]);

  const themeConfiguration: ThemeConfig = {
    hashed: false,
    token: {
      colorPrimary: "#FF7800",
      controlHeight: 70,
      borderRadius: 12,
      colorText: "white",
      fontFamily: "HelveticaNeue",
    },
    components: {
      Button: {
        paddingContentHorizontal: 32,
      },
    },
  };

  const navigationThemeConfiguration: ThemeConfig = {
    hashed: false,
    token: {
      colorPrimary: "#FF7800",
      controlHeight: 70,
      borderRadius: 12,
      colorText: "white",
      fontFamily: "HelveticaNeueSmall",
    },
    components: {
      Button: {
        paddingContentHorizontal: 32,
      },
    },
  };

  return (
    <html lang="en" className={display.variable}>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
              var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window, document, 'script', 'dataLayer', 'GTM-MZJ7SJK');
          `,
          }}
        />
        <link
          rel="preconnect"
          href="https://use.typekit.net"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var l=document.createElement('link');l.rel='stylesheet';l.href='https://use.typekit.net/nim2uog.css';document.head.appendChild(l);}catch(e){}})();",
          }}
        />

        <meta
          name="google-site-verification"
          content="RetGHQddE3Sw6ySF78rjzOsMv5oK5V5B-W-RrwggY7U"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(require("../public/corporation.json")),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(require("../public/website.json")),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(require("../public/localBusiness.json")),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(require("../public/localBuisness2.json")),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(require("../public/corporation2.json")),
          }}
        />
      </head>
      <ConfigProvider theme={themeConfiguration}>
        <body className="lf-shell">
          {navbar && footerData && (
            <div className="flex flex-col min-h-screen w-full max-w-[1920px] mx-auto">
              <div className="flex-grow relative">
                <ConfigProvider theme={navigationThemeConfiguration}>
                  <Header navBar={JSON.parse(JSON.stringify(navbar))} />
                  {/* <NewsArticleButton /> */}
                </ConfigProvider>
                <BackToTop />
                <main>{children}</main>
              </div>
              <Footer footerData={JSON.parse(JSON.stringify(footerData))} />
            </div>
          )}
        </body>
        <GoogleAnalytics gaId="GTM-MZJ7SJK" />
      </ConfigProvider>
    </html>
  );
}
