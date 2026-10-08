export const cards = {
  name: "Cards",
  label: "Cards",
  type: "object",
  list: true,
  ui: {
    itemProps: (props) => {
      return { label: props.heading };
    },
  },
  fields: [
    { name: "logo", label: "logo", type: "image" },
    { name: "bgcolor", label: "bgcolor", type: "string" },
    { name: "heading", label: "heading", type: "string", required: true },
    { name: "content", label: "content", type: "string" },
    {
      name: "actionButton",
      label: "Action Button",
      type: "object",
      fields: [
        {
          label: "Text",
          name: "text",
          type: "string",
        },
        {
          label: "URL",
          name: "url",
          type: "string",
        },
      ],
    },
  ],
};
