import { TinaField } from "tinacms";

export const flowCards = (name: string, label: string) => {
  const cardSchema: TinaField = {
    name: name || "Cards",
    label: label || "Cards",
    type: "object",
    list: true,
    ui: {
      itemProps: (props) => {
        return { label: props.heading?props.heading:props.content };
      },
    },
    fields: [
      { name: "logo", label: "logo", type: "image" },
      { name: "heading", label: "heading", type: "string" },
      { name: "content", label: "content", type: "string", required: true },
    ],
  };

  return cardSchema;
};
