/**
 * LFI AI & Analytics portfolio — sourced from https://lfiai.com/ (audited 2026-09-24).
 *
 * - Category names are LFI AI's own catalogue sections (lfiai.com SEO/noscript summary).
 * - `description` is verbatim from lfiai.com's schema.org ItemList where one exists,
 *   otherwise the verbatim blurb from its catalogue summary; null when the site has none.
 * - `tags` mirror the Industries / Technologies menu paths on lfiai.com.
 * - `demoUrl` is exactly the live demo link published on lfiai.com.
 *
 * Deliberately excluded (see lfiai.com audit): "Cybersecurity LMS" (links to a private
 * IP, not publicly reachable), "Digital Twin" (links to the Unmanned Kiosk demo) and
 * "Inventory optimization" (same demo as Demand Forecasting, which covers it).
 */

export type AiCategoryId =
  | "conversational"
  | "banking"
  | "telecom"
  | "insurance"
  | "operations"
  | "talent";

export interface AiCategory {
  id: AiCategoryId;
  label: string;
  short: string;
}

export interface AiProduct {
  id: string;
  name: string;
  category: AiCategoryId;
  description: string | null;
  demoUrl: string;
  logo?: { src: string; plate: "light" | "framed" };
  tags: string[];
  featured?: boolean;
}

export const LFI_AI_URL = "https://lfiai.com/";

export const aiIntro = {
  title: "LFI AI & Analytics",
  // Verbatim from lfiai.com (catalogue introduction).
  description:
    "Linkfields Innovations (LFI) builds AI and advanced analytics solutions for banking, telecom, insurance, retail, healthcare and the public sector. This catalogue links to live, working demonstrations of that work.",
  // Verbatim from lfiai.com page metadata.
  summary:
    "Live AI and analytics demos from Linkfields Innovations - customer churn, fraud detection, RAG chatbots, forecasting and CLV for banking, telecom and insurance.",
};

export const aiCategories: AiCategory[] = [
  { id: "conversational", label: "Conversational AI and document intelligence", short: "Conversational AI & Documents" },
  { id: "banking", label: "Banking and financial services analytics", short: "Banking & Financial Services" },
  { id: "telecom", label: "Telecom analytics", short: "Telecom Analytics" },
  { id: "insurance", label: "Insurance analytics", short: "Insurance Analytics" },
  { id: "operations", label: "Operations, forecasting and customer experience", short: "Operations & Forecasting" },
  { id: "talent", label: "Talent and internal tools", short: "Talent & Internal Tools" },
];

export const aiProducts: AiProduct[] = [
  // --- Conversational AI and document intelligence ---
  {
    id: "rag-chatbot",
    name: "RAG Chatbot",
    category: "conversational",
    description: "Retrieval-augmented generation chatbot that answers questions grounded in an organisation's own documents.",
    demoUrl: "https://rag.lfiai.com/",
    tags: ["GenAI"],
    featured: true,
  },
  {
    id: "rag-chatbot-mobile",
    name: "RAG Chatbot Mobile App",
    category: "conversational",
    description: "The same assistant on mobile.",
    demoUrl: "https://ragmobile.lfiai.com/",
    tags: ["GenAI"],
  },
  {
    id: "unmanned-kiosk",
    name: "Unmanned Kiosk",
    category: "conversational",
    description: "Self-service AI kiosk for unattended customer interactions.",
    demoUrl: "https://uks.lfiai.com/",
    tags: ["GenAI"],
    featured: true,
  },
  {
    id: "textiq",
    name: "TextIQ",
    category: "conversational",
    description: "Document and text intelligence platform for extraction, classification and summarisation.",
    demoUrl: "https://textiq.lfidemo.com/",
    logo: { src: "/images/lfiai/textIQ_transparent.png", plate: "light" },
    tags: ["GenAI", "Products"],
    featured: true,
  },
  {
    id: "vajrax",
    name: "VajraX",
    category: "conversational",
    description: "Linkfields Innovations' AI platform for enterprise document and data workflows.",
    demoUrl: "https://vajrax.lfidemo.com/",
    logo: { src: "/images/lfiai/vajraX.png", plate: "framed" },
    tags: ["GenAI", "Products"],
    featured: true,
  },
  {
    id: "edupilot",
    name: "EduPilot",
    category: "conversational",
    description: "AI assistant for education workflows and learner support.",
    demoUrl: "https://edupilot.lfiai.com/",
    logo: { src: "/images/lfiai/EduPilot_transparent.png", plate: "light" },
    tags: ["GenAI", "Products"],
    featured: true,
  },
  {
    id: "consulate-sa",
    name: "Consulate SA",
    category: "conversational",
    description: null,
    demoUrl: "https://consulate-sa.lfidemo.com/",
    tags: ["GenAI", "POCs"],
  },
  {
    id: "consulate-la",
    name: "Consulate LA",
    category: "conversational",
    description: null,
    demoUrl: "https://consulate-la.lfidemo.com/",
    tags: ["GenAI", "POCs"],
  },

  // --- Banking and financial services analytics ---
  {
    id: "finsight",
    name: "FinSight",
    category: "banking",
    description: "Financial insight and reporting analytics for banking data.",
    demoUrl: "https://finsight.lfidemo.com/",
    logo: { src: "/images/lfiai/Finsight_transparent.png", plate: "light" },
    tags: ["GenAI", "Products"],
    featured: true,
  },
  {
    id: "credit-risk",
    name: "Credit Risk Analytics",
    category: "banking",
    description: "Credit risk scoring and portfolio risk analytics for lenders.",
    demoUrl: "https://creditrisk.lfidemo.com",
    tags: ["Banking", "Machine Learning"],
    featured: true,
  },
  {
    id: "banking-churn",
    name: "Banking customer churn and segmentation",
    category: "banking",
    description: null,
    demoUrl: "https://lfiai.com/BankingAnalytics",
    tags: ["Banking", "Machine Learning"],
  },
  {
    id: "banking-claims-fraud",
    name: "Banking Claims Fraud Detection",
    category: "banking",
    description: null,
    demoUrl: "https://bankingclaimsfraud.lfidemo.com",
    tags: ["Banking", "Fraud Detection"],
  },
  {
    id: "clv-banking-telecom",
    name: "Customer Lifetime Value analytics",
    category: "banking",
    description: null,
    demoUrl: "https://clvbankingtelecom.lfidemo.com",
    tags: ["Banking", "Telecom"],
  },
  {
    id: "sentiment-analysis",
    name: "Sentiment Analysis",
    category: "banking",
    description: null,
    demoUrl: "https://bankingsentimentanalysis.lfidemo.com/",
    tags: ["Banking"],
  },
  {
    id: "signature-fraud",
    name: "Signature Fraud Detection",
    category: "banking",
    description: null,
    demoUrl: "https://signaturefrauddetect.lfidemo.com/",
    tags: ["Banking", "Insurance", "Fraud Detection"],
  },

  // --- Telecom analytics ---
  {
    id: "telecom-churn",
    name: "Telecom customer churn and segmentation",
    category: "telecom",
    description: null,
    demoUrl: "https://lfiai.com/TelecomAnalytics",
    tags: ["Telecom", "Machine Learning"],
    featured: true,
  },
  {
    id: "banking-telecom-analytics",
    name: "Combined banking and telecom customer analytics",
    category: "telecom",
    description: null,
    demoUrl: "https://lfiai.com/BankingTelecomAnalytics",
    tags: ["Banking", "Telecom", "Machine Learning"],
  },
  {
    id: "nbo",
    name: "Next Best Offer (NBO) revenue analytics",
    category: "telecom",
    description: null,
    demoUrl: "https://bankingtelcorevenuenbo.lfidemo.com",
    tags: ["Banking", "Telecom"],
  },
  {
    id: "nbo-data-engine",
    name: "NBO Data Recommendation Engine",
    category: "telecom",
    description: null,
    demoUrl: "https://telecomnbodataaddon.lfidemo.com/",
    tags: ["Banking", "Telecom"],
  },

  // --- Insurance analytics ---
  {
    id: "insurance-claims-fraud",
    name: "Claims fraud and anomaly detection",
    category: "insurance",
    description: "Detects fraudulent and anomalous insurance claims using machine learning.",
    demoUrl: "https://insurancefraud.lfidemo.com",
    tags: ["Insurance", "Fraud Detection"],
    featured: true,
  },
  {
    id: "underwriting",
    name: "Underwriting optimisation and pricing segmentation",
    category: "insurance",
    description: null,
    demoUrl: "https://underwriting.lfidemo.com",
    tags: ["Insurance", "Machine Learning"],
  },
  {
    id: "insurance-platform",
    name: "Insurance analytics platform",
    category: "insurance",
    description: null,
    demoUrl: "https://insuranceplatform.lfidemo.com",
    tags: ["Insurance", "Machine Learning"],
  },
  {
    id: "clv-insurance",
    name: "Insurance customer lifetime value",
    category: "insurance",
    description: null,
    demoUrl: "https://clvinsurance.lfidemo.com",
    tags: ["Insurance"],
  },
  {
    id: "lapse-prediction",
    name: "Lapse Prediction and Retention Analytics",
    category: "insurance",
    description: null,
    demoUrl: "https://insurancelapseprediction.lfidemo.com/",
    tags: ["Insurance"],
  },
  {
    id: "network-fraud",
    name: "Network Fraud Detection",
    category: "insurance",
    description: null,
    demoUrl: "https://networkfrauddetect.lfidemo.com/",
    tags: ["Insurance", "Fraud Detection"],
  },

  // --- Operations, forecasting and customer experience ---
  {
    id: "demand-forecasting",
    name: "Demand Forecasting",
    category: "operations",
    description: "Time-series demand forecasting and inventory optimisation.",
    demoUrl: "https://forecasting.lfidemo.com/",
    tags: ["Retail", "Manufacturing", "Machine Learning"],
    featured: true,
  },
  {
    id: "predictive-maintenance",
    name: "Energy equipment failure and predictive maintenance",
    category: "operations",
    description: null,
    demoUrl: "https://equipment.lfidemo.com",
    tags: ["Energy"],
  },
  {
    id: "customer-360",
    name: "360 customer behaviour analytics",
    category: "operations",
    description: null,
    demoUrl: "https://customeranalytics.lfidemo.com",
    tags: ["Banking"],
  },
  {
    id: "engage360",
    name: "Engage360",
    category: "operations",
    description: "Customer engagement analytics across channels and touchpoints.",
    demoUrl: "https://engage360.lfidemo.com/",
    logo: { src: "/images/lfiai/Engage360.png", plate: "framed" },
    tags: ["GenAI", "Products"],
    featured: true,
  },
  {
    id: "smart-kpi",
    name: "Smart KPI monitoring",
    category: "operations",
    description: null,
    demoUrl: "https://kpi.lfidemo.com",
    tags: ["Telecom", "Machine Learning"],
  },
  {
    id: "digital-growth",
    name: "Digital Growth Intelligence",
    category: "operations",
    description: null,
    demoUrl: "https://seo.lfidemo.com/",
    tags: ["GenAI", "Products"],
  },

  // --- Talent and internal tools ---
  {
    id: "resume-summarisation",
    name: "Resume summarisation",
    category: "talent",
    description: null,
    demoUrl: "https://lfiai.com/resume-summarizer",
    tags: ["HR", "GenAI"],
  },
  {
    id: "jd-cv-comparison",
    name: "Job description and CV comparison",
    category: "talent",
    description: null,
    demoUrl: "https://lfiai.com/jd-cv-comparison",
    tags: ["HR", "GenAI"],
  },
  {
    id: "golf-pose",
    name: "Golf pose analyzer",
    category: "talent",
    description: "Computer-vision movement analysis.",
    demoUrl: "https://lfiai.com/golf-analyzer",
    tags: ["Computer Vision"],
  },
  {
    id: "internal-portal",
    name: "Internal Portal",
    category: "talent",
    description: null,
    demoUrl: "https://internal.lfidemo.com/",
    tags: ["GenAI", "Products"],
  },
];

export const featuredAiProducts = aiProducts.filter((p) => p.featured);

export const getCategory = (id: AiCategoryId) => aiCategories.find((c) => c.id === id)!;

export const productsByCategory = (id: AiCategoryId) => aiProducts.filter((p) => p.category === id);
