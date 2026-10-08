import { Collection } from "tinacms";

export const PrivacyPolicyCollection: Collection = {
  name: "privacyPolicy",
  label: "Privacy Policy",
  path: "content/policies/privacyPolicy",
  format: "md",
  ui: {
    router: (props) => {
      if (props.document._sys.relativePath === "privacy-policy") {
        return "/privacyPolicy";
      }
    },
  },
  fields: [
    {
      name: "heading",
      label: "Heading",
      type: "string",
    },
    {
      label: "Content",
      name: "content",
      type: "rich-text",
      templates: [
        {
          name: "Cta",
          label: "Cta",
          fields: [
            {
              name: "text",
              label: "Text",
              type: "string",
            },
            { name: "url", label: "URL", type: "string" },
          ],
        },
      ],
    },
  ],
};
