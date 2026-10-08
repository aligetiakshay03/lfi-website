export const ContactCards = {
    name: "contactCards",
    label: "Contact Cards",
    type: "object",
    list: true,
    ui: {
      itemProps: (props) => {
        return { label: props.title };
      },
    },
    fields: [
      { name: "title", label: "title", type: "string", required: true },
      { name: "emailId", label: "emailId", type: "string" },
      { name: "icon", label: "icon", type: "image" },
      { name: "link", label: "link", type: "string" },
    ],
  };
