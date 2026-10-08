export const collapseComponent = {
  name: "CollapseComponentData",
  label: "Collapse Component Data",
  type: "object",
  fields: [
    { name: "header", label: "header", type: "string" },
    { name: "title", label: "title", type: "string" },
    { name: "description", label: "description", type: "string" },
    { name: "image", label: "image", type: "image" },
    { name: "imageStyles", label: "image styles", type: "string" },
    { name: "imageList", label: "image List", type: "boolean" },
    { name: "bg", label: "bg", type: "boolean" },
    {
      name: "list",
      label: "list",
      type: "object",
      list: true,
      ui: {
        itemProps: (props) => {
          return { label: props.title };
        },
      },
      fields: [
        { name: "title", label: "title", type: "string" },
        { name: "description", label: "description", type: "string" },
      ],
    },
  ],
};
