/**
 * Official Linkfields imagery used by the modern homepage, keyed by the route each
 * item links to. Every URL is the hero/banner image of that page in the Tina content
 * (content/solutions/**, content/services/**), so the homepage shows the same visuals
 * as the detail pages.
 */

const S3 = "https://images-linkfields-poc.s3.eu-west-2.amazonaws.com";

export const solutionVisuals: Record<string, string> = {
  "/solutions/erp-solutions/sap": `${S3}/Frame 15880573.png`,
  "/solutions/erp-solutions/odoo": `${S3}/odobg-crop.png`,
  "/solutions/erp-solutions/microsoft-dynamics": `${S3}/microsoftDynamic-crop.jpg`,
  "/solutions/erp-solutions/salesforce": `${S3}/Sales force (1).png`,
  "/services/cloud/ipaas": `${S3}/ipaas.jpg`,
  "/services/automation/robotic-process-automation": `${S3}/RPA.jpg`,
};

/** Official display names (navbar wording) where the homepage CMS uses a shorthand. */
export const solutionNames: Record<string, string> = {
  "/solutions/erp-solutions/microsoft-dynamics": "Microsoft Dynamics",
  "/services/cloud/ipaas": "iPaaS",
};

/**
 * IT Infrastructure and Solutions is an official service (navbar, footer, its own page)
 * but is not one of the homepage service tabs in the CMS; its copy comes verbatim from
 * content/services/itinfraandsolutions/IITInfraAndSolutions.json.
 */
export const itInfraService = {
  TabName: "IT Infrastructure and Solutions",
  title: "IT Infrastructure and Solutions",
  description: "Transforming IT Infrastructure for the digital age",
  tabImage: `${S3}/IT infrastructure banner image.png`,
  url: "/services/itinfraandsolutions",
  serviceBlocks: [
    { title: "End User Computing", url: "/services/itinfraandsolutions" },
    { title: "Networking", url: "/services/itinfraandsolutions" },
    { title: "Digital Workplace", url: "/services/itinfraandsolutions" },
  ],
};

/** Official partner logos exactly as rendered in the live "OUR PARTNERS" strip. */
export const partners = [
  { name: "Automation Anywhere", href: "https://www.automationanywhere.com/", logo: "/images/automation-anywhere-vector.svg" },
  { name: "UiPath", href: "https://www.uipath.com/", logo: "/images/uipath-vector-logo 1.svg" },
  { name: "Salesforce", href: "https://www.salesforce.com/", logo: "/images/salesforce.svg" },
  { name: "Soterion", href: "https://soterion.com/", logo: "/images/Soterion logo.svg" },
  { name: "Odoo", href: "https://www.odoo.com/", logo: "/images/oddo-svgrepo-.svg" },
  { name: "AWS", href: "https://aws.amazon.com/", logo: "/images/AWS_P_Logo.svg" },
  { name: "Azure", href: "https://azure.microsoft.com/", logo: "/images/azure-svgrepo-com 1.svg" },
  { name: "Microsoft", href: "https://www.microsoft.com/", logo: "/images/microsoft-svgrepo-com 1.svg" },
  { name: "Blue Prism", href: "https://www.blueprism.com/", logo: "/images/blueprism.svg" },
];


/** Official service taglines + opening sentence, verbatim from each service page (content/services/*). */
export const serviceIntros: Record<string, { tagline: string; intro: string }> = {
  "/services/engineering": {
    "tagline": "Creating impact by harnessing technology",
    "intro": "Engineering relies on an expert’s ability to figure out a solution to a problem that seems impossible to achieve."
  },
  "/services/consulting": {
    "tagline": "Facilitating effective technology change",
    "intro": "We thrive on innovating and creating better processes for our clients through new digital models, defining roadmaps, and varied approaches for delivering digital transformation."
  },
  "/services/cloud": {
    "tagline": "The future is on the cloud",
    "intro": "Bringing the transformation in the manner in which businesses deal with data storage & computing power, without requiring active management through managed cloud services."
  },
  "/services/technology": {
    "tagline": "Facilitating change by mobilizing technology",
    "intro": "We research and study all the upcoming technologies to develop models that will make the technological transformation easier in the future."
  },
  "/services/automation": {
    "tagline": "Amplifying business growth with automation",
    "intro": "Designing a broad spectrum of technologies that reduce the requirement of human mediation in operations, freeing up employees for more imaginative tasks that boost productivity."
  },
  "/services/teams": {
    "tagline": "Synchronized teamwork for higher output",
    "intro": "By studying and analysis team outputs, we identify the discrepancies and shortcomings, and their specific areas of emergence."
  },
  "/services/itinfraandsolutions": {
    "tagline": "Transforming IT Infrastructure for the digital age",
    "intro": "Your business relies heavily on robust IT infrastructure to deliver exceptional user experiences and drive growth."
  }
};
