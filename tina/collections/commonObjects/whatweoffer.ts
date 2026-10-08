export const whatweoffer={
    name: "whatweoffer",
    label: "What we offer",
    type: "object",
    fields: [
      { name: "heading", label: "heading", type: "string", required:true },
      { name: "title", label: "title", type: "string", required:true },
      { name: "description", label: "description", type: "string" },
      {
        name: "list",
        label: "List",
        type: "string",
        list: true,
        defaultValue: true,
      },
      // {
      //   name: "list",
      //   label: "List",
      //   type: "object",
      //   list: true,
      //   ui: {
      //     itemProps: (props) => {
      //       return { label: props.list };
      //     },
      //   },
      //   fields:[{name:"listitem", label:"list item", type:"string", required: true}]
      // },
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
          { name: "title", label: "title", type: "string", required: true }
        ]
      },
    ]
  }