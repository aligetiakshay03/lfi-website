import { IcontactUsInputs, IOdooContactInputs } from "../interfaces";

export const contactUsInputs: Array<IcontactUsInputs> = [
  {
    label: "Your name",
    type: "text",
    name: "name",
    placeHolder: "Your name *",
    required: true,
  },
  {
    label: "Phone no",
    type: "tel",
    name: "phoneNo",
    placeHolder: "Phone no *",
    required: true,
  },
  {
    label: "Email",
    type: "text",
    name: "email",
    placeHolder: "Email *",
    required: true,
  },
  {
    label: "Select service",
    type: "select",
    name: "service",
    placeHolder: "Select service *",
    required: true,
  },
  {
    label: "Message",
    type: "text",
    name: "message",
    placeHolder: "Message *",
    required: true,
  },
];

export const odooContactUsInputs: Array<IOdooContactInputs> = [
  {
    label: "Your name",
    type: "text",
    name: "name",
    placeHolder: "Your name *",
    required: true,
  },
  {
    label: "Phone no",
    type: "tel",
    name: "phoneNo",
    placeHolder: "Phone no *",
    required: true,
  },
  {
    label: "Email",
    type: "text",
    name: "email",
    placeHolder: "Email *",
    required: true,
  },
  {
    label: "Industry",
    type: "text",
    name: "industry",
    placeHolder: "Industry *",
    required: true,
  },
  {
    label: "Company size",
    type: "select",
    name: "companySize",
    placeHolder: "Company size *",
    required: true,
    // Values must match Odoo's create_lead enum exactly: 1-10, 11-50, 51-200, 201-500, 500+
    options: [
      { label: "Company Size *", value: "" },
      { label: "1 to 10 Employees", value: "1-10" },
      { label: "11 to 50", value: "11-50" },
      { label: "51 to 200", value: "51-200" },
      { label: "201 to 500", value: "201-500" },
      { label: "500+", value: "500+" },
    ],
  },
  {
    label: "ERP implementation timeline",
    type: "select",
    name: "timeline",
    placeHolder: "What is your expected ERP implementation timeline? *",
    required: true,
    // Values must match Odoo's create_lead enum exactly: 0-3 months, 3-6 months, 6-12 months, 12+ months
    options: [
      {
        label: "What is your expected ERP implementation timeline? *",
        value: "",
      },
      { label: "Within 3 months", value: "0-3 months" },
      { label: "3 to 6 months", value: "3-6 months" },
      { label: "6 to 12 months", value: "6-12 months" },
      { label: "More than 12 months", value: "12+ months" },
    ],
  },
  {
    label: "Message",
    type: "text",
    name: "message",
    placeHolder: "Message (optional)",
    required: false,
  },
];

/** Service options for the contact form (shared by the legacy and modern forms). */
export const contactServices = [
  { label: "Select Service *", value: "" },
  { label: "SAP", value: "SAP" },
  { label: "Odoo", value: "Odoo" },
  { label: "Microsoft Dynamics", value: "Microsoft Dynamics" },
  { label: "Salesforce", value: "Salesforce" },
  { label: "iPaaS", value: "iPaaS" },
  {
    label: "Robotic process automation",
    value: "Robotic process automation",
  },
  { label: "Application Development", value: "Application Development" },
  { label: "Quality Control", value: "Quality Control" },
  { label: "DevOps", value: "DevOps" },
  { label: "Product Discovery", value: "Product Discovery" },
  { label: "Solution Discovery", value: "Solution Discovery" },
  { label: "UX/UI Design", value: "UX/UI Design" },
  { label: "Technology Advisory", value: "Technology Advisory" },
  { label: "Cloud Consulting", value: "Cloud Consulting" },
  { label: "Cloud Migration", value: "Cloud Migration" },
  { label: "Cloud Development", value: "Cloud Development" },
  { label: "Kubernetes Services", value: "Kubernetes Services" },
  { label: "Big Data Engineering", value: "Big Data Engineering" },
  { label: "AI & Machine Learning", value: "AI & Machine Learning" },
  { label: "Digital transformation", value: "Digital transformation" },
  { label: "Staff Augmentation", value: "Staff Augmentation" },
  { label: "Managed Team", value: "Managed Team" },
  { label: "IT Infrastructure", value: "IT Infrastructure" },
  { label: "Others", value: "Others" },
];

/** "What happens next?" steps shown beside the contact form. */
export const contactNextSteps = [
  {
    description: "Our sales team will get in touch within 24 hours",
  },
  {
    description:
      "If required, we sign on a NDA with you, to assure the highest level of privacy.",
  },
  {
    description:
      "Once we have analysed your business requirements our sales team will provide you with the next steps.",
  },
];
