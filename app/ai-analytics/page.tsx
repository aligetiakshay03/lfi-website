import type { Metadata } from "next";
import AIAnalyticsPage from "../../components/modern/AIAnalyticsPage";
import { aiIntro } from "../../utils/data/lfiAi";

export const metadata: Metadata = {
  title: "AI & Analytics | Linkfields Innovations",
  description: aiIntro.summary,
  keywords:
    "Linkfields AI, LFI AI, AI and analytics, RAG chatbot, document intelligence, fraud detection, customer churn, demand forecasting, credit risk analytics",
  alternates: { canonical: "https://www.linkfields.com/ai-analytics" },
  openGraph: {
    title: "AI & Analytics | Linkfields Innovations",
    description: aiIntro.summary,
    url: "https://www.linkfields.com/ai-analytics",
    siteName: "Linkfields Innovations",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function AIAnalytics() {
  return <AIAnalyticsPage />;
}
