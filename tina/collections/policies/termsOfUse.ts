import { Collection } from "tinacms";

export const TermsOfUseCollection: Collection = {
  name: "termsOfUse",
  label: "Terms of use",
  path: "content/policies/termsOfUse",
  format: "md",
  ui: {
    router: (props) => {
      if (props.document._sys.relativePath === "terms-of-use") {
        return "/termsOfUse";
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
