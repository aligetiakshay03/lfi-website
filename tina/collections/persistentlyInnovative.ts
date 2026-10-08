import { Collection } from "tinacms";

export const PersistentlyInnovativeCollection: Collection = {
  name: "persistentlyInnovative",
  label: "Persistently Innovative",
  path: "content/persistentlyInnovative",
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
      name: "analytics",
      label: "Analytics",
      type: "object",
      list: true,
      ui: {
        itemProps: (props) => {
          return { label: props.time + " " + props.suffix };
        },
      },
      fields: [
        {
          name: "time",
          label: "Time",
          type: "string",
        },
        {
          name: "suffix",
          label: "Suffix",
          type: "string",
        },
        {
          name: "description",
          label: "Description",
          type: "string",
        },
      ],
    },
  ],
};
