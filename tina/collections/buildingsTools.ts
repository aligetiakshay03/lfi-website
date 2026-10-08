import { Collection } from "tinacms";

export const BuildingsToolsCollection: Collection = {
  name: "buildingsTools",
  label: "Buildings Tools",
  path: "content/buildingsTools",
  format: "json",
  ui: {
    router: () => "/industries/banking",
  },
  fields: [
    {
      name: "detailSection",
      label: "Detail section",
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
          name: "description",
          label: "Description",
          type: "string",
        },
        {
          name: "actionButton",
          label: "Action Button",
          type: "string",
        },
        {
          name: "url",
          label: "Url",
          type: "string",
        },
      ],
    },
  ],
};
