import { Collection } from "tinacms";

export const ConstantlyInnovatingCollection: Collection = {
  name: "constantlyInnovating",
  label: "Constantly Innovating",
  path: "content/constantlyInnovating",
  format: "json",
  ui: {
    router: () => "/services/engineering",
  },
  fields: [
    {
      name: "status",
      label: "Status",
      type: "string",
    },
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "description",
      label: "Description",
      type: "string",
    },
    {
      name: "imageBlock",
      label: "Image Block",
      type: "object",
      list: true,
      ui: {
        itemProps: (props) => {
          return { label: props.title };
        },
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "cardImage",
          label: "Card Image",
          type: "image",
        },
      ],
    },
  ],
};
