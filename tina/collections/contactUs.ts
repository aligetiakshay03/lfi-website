import { Collection } from "tinacms";

export const ContactUsCollection: Collection = {
  name: "contactUsPage",
  label: "Contact us",
  path: "content/contactUs",
  format: "json",
  ui: {
    router: () => "/contact-us",
  },
  fields: [
    {
      name: "banner",
      label: "banner",
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
          name: "emailId",
          label: "email ID",
          type: "string",
        },
      ],
    },
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
      name: "locationCard",
      label: "Location card",
      type: "object",
      list: true,
      ui: {
        itemProps: (props) => {
          return { label: props.country };
        },
      },
      fields: [
        {
          name: "imageUrl",
          label: "Image URL",
          type: "image",
        },
        {
          name: "country",
          label: "Country",
          type: "string",
        },
        {
          name: "building",
          label: "building",
          type: "string",
        },
        {
          name: "landmark",
          label: "landmark",
          type: "string",
        },
        {
          name: "city",
          label: "city",
          type: "string",
        },
        {
          name: "pinCode",
          label: "pin code",
          type: "string",
        },
        // {
        //   name: "countryfullName",
        //   label: "full country name",
        //   type: "string",
        // },
        {
          name: "actionButton",
          label: "Action Button",
          type: "object",
          fields: [
            {
              name: "labelText",
              type: "string",
              label: "Button Label Text",
            },
            {
              name: "url",
              type: "string",
              label: "Button URL",
            },
          ],
        },
      ],
    },
  ],
};
