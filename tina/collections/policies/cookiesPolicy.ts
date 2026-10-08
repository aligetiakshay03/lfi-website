import { Collection } from "tinacms";

export const CookiesPolicyCollection: Collection = {
  name: "cookiesPolicy",
  label: "Cookies Policy",
  path: "content/policies/cookiesPolicy",
  format: "md",
  ui: {
    router: (props) => {
      if (props.document._sys.relativePath === "cookies-policy") {
        return "/cookiesPolicy";
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
