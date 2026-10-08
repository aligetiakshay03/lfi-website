export const specializationList={
    name: "specializationList",
    label: "Specialization List",
    type: "object",
    fields: [
      { name: "heading", label: "heading", type: "string", required:true },
      {
        name: "list",
        label: "List",
        type: "object",
        list: true,
        ui: {
          itemProps: (props) => {
            return { label: props.title };
          },
        },
        fields: [
          { name: "title", label: "title", type: "string",  required: true },
          { name: "desc", label: "description", type: "string", required: true },
          {name: "image", label:"image", type:"image"}
        ]
      },
    ]
  }