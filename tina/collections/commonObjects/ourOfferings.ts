import { TinaField } from "tinacms";

export const ourOfferings = (name, label) => {
  const schema: TinaField = {
    name: name,
    label: label,
    type: "object",
    fields: [
      { name: "heading", label: "heading", type: "string", required: true },
      { name: "title", label: "title", type: "string", required: true },
      {
        name: "cardsData",
        label: "Cards data",
        type: "object",
        list: true,
        ui: {
          itemProps: (props) => {
            return { label: props.title };
          },
        },
        fields: [
          { name: "icon", label: "icon", type: "image", required: true },
          { name: "title", label: "title", type: "string", required: true },
        ],
      },
    ],
  };

  return schema;
};
