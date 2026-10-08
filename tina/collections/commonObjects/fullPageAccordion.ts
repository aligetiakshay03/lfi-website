export const fullPageAccordion = {
    name: "fullPageAccordion",
    label: "Accordions",
    type: "object",
    list: true,
    ui: {
      itemProps: (props) => {
        return { label: props.title };
      },
    },
    fields: [
        { name: "title", label: "Title", type: "string" },
        { 
            name: "content",
            label: "Content cards",
            type: "object",
            list: true,
            ui: {
                itemProps: (props) => {
                  return { label: props.heading };
                },
              },
            fields: [
                {
                    name: "heading",
                    label: "Heading",
                    type: "string",
                },
                {
                    name: "description",
                    label: "description",
                    type: "string"
                },
                {
                  name: "list",
                  label: "list",
                  type: "object",
                  list: true,
                  ui: {
                    itemProps: (props) => {
                      return { label: props.listItem };
                    },
                  },
                  fields: [
                    {
                      name: "listItem",
                      label: "List item",
                      type: "string"
                    }
                  ]
                }
            ]
        }
    ],
  };
  