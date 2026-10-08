export const howCanWeHelpData = {
  name: "howCanWeHelp",
  label: "How we can help",
  type: "object",
  list: true,
  ui: {
    itemProps: (props) => {
      return { label: props.description };
    },
  },
  fields: [{ name: "description", label: "description", type: "string" }],
};
