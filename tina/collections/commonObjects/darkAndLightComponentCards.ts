export const darkAndLightComponentCards = {
  name: "darkAndLightComponentCards",
  label: "Dark And Light Component Cards",
  type: "object",
  list: true,
  ui: {
    itemProps: (props) => {
      return { label: props.title };
    },
  },
  fields: [
    { name: "icon", label: "icon", type: "image" },
    { name: "title", label: "title", type: "string", required: true },
    {
      name: "description",
      label: "description",
      type: "string",
      required: true,
    },
  ],
};
