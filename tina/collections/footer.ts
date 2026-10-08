import { Collection } from "tinacms";
export const footerCollection: Collection = {
  label: "Footer",
  name: "footer",
  path: "content/footer",
  format: "json",
  ui: {
    router: () => {
      return "/";
    },
  },
  fields: [

    // {
    //   name: "quickLinks",
    //   label: "Quick Links",
    //   type: "object",
    //   ui: {
    //     itemProps: (props) => {
    //       return { label: props.label };
    //     },
    //   },
    //   fields: [
    //     {
    //       label: "Title",
    //       name: "title",
    //       type: "string",
    //     },
    //     {
    //       label: "Links",
    //       name: "links",
    //       type: "object",
    //       list: true,
    //       ui: {
    //         itemProps: (props) => {
    //           return { label: props.label };
    //         },
    //       },
    //       fields: [
    //         {
    //           label: "Label",
    //           name: "label",
    //           type: "string",
    //         },
    //         {
    //           label: "Link",
    //           name: "link",
    //           type: "string",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   name: "services",
    //   label: "Services",
    //   type: "object",
    //   ui: {
    //     itemProps: (props) => {
    //       return { label: props.title };
    //     },
    //   },
    //   fields: [
    //     {
    //       name: "title",
    //       label: "Title",
    //       type: "string",
    //     },
    //     {
    //       name: "services",
    //       label: "Services",
    //       type: "object",
    //       list: true,
    //       ui: {
    //         itemProps: (props) => {
    //           return { label: props.serviceName };
    //         },
    //       },
    //       fields: [
    //         {
    //           name: "serviceName",
    //           label: "Service Name",
    //           type: "string",
    //         },
    //         {
    //           label: "URL",
    //           name: "url",
    //           type: "string",
    //         },
    //         {
    //           name: "subServices",
    //           label: "Sub Services",
    //           type: "object",
    //           list: true,
    //           ui: {
    //             itemProps: (props) => {
    //               return { label: props.label };
    //             },
    //           },
    //           fields: [
    //             {
    //               label: "Label",
    //               name: "label",
    //               type: "string",
    //             },
    //             {
    //               label: "Link",
    //               name: "link",
    //               type: "string",
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },

    // {
    //   name: "solutions",
    //   label: "Solutions",
    //   type: "object",
    //   ui: {
    //     itemProps: (props) => {
    //       return { label: props.label };
    //     },
    //   },
    //   fields: [
    //     {
    //       label: "Title",
    //       name: "title",
    //       type: "string",
    //     },
    //     {
    //       label: "Links",
    //       name: "links",
    //       type: "object",
    //       list: true,
    //       ui: {
    //         itemProps: (props) => {
    //           return { label: props.label };
    //         },
    //       },
    //       fields: [
    //         {
    //           label: "Label",
    //           name: "label",
    //           type: "string",
    //         },
    //         {
    //           label: "Link",
    //           name: "link",
    //           type: "string",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   name: "industries",
    //   label: "Induestries",
    //   type: "object",
    //   ui: {
    //     itemProps: (props) => {
    //       return { label: props.label };
    //     },
    //   },
    //   fields: [
    //     {
    //       label: "Title",
    //       name: "title",
    //       type: "string",
    //     },
    //     {
    //       label: "Links",
    //       name: "links",
    //       type: "object",
    //       list: true,
    //       ui: {
    //         itemProps: (props) => {
    //           return { label: props.label };
    //         },
    //       },
    //       fields: [
    //         {
    //           label: "Label",
    //           name: "label",
    //           type: "string",
    //         },
    //         {
    //           label: "Link",
    //           name: "link",
    //           type: "string",
    //         },
    //       ],
    //     },
    //   ],
    // },
   

    // {
    //   name: "sections",
    //   label: "sections",
    //   type: "object",
    //   list: true,
    //   ui: {
    //     itemProps: (props) => {
    //       return { label: props.label };
    //     },
    //   },

    //   fields: [
    //     {
    //       label: "Title",
    //       name: "title",
    //       type: "string",
    //     },
    //     {
    //       label: "Logos",
    //       name: "logos",
    //       type: "object",
    //       list: true,
    //       ui: {
    //         itemProps: (props) => {
    //           return { label: props.label };
    //         },
    //       },
    //       fields: [{ name: "image", label: "Image", type: "image" }],
    //     },
    //   ],
    // },

    {
      name: "sections",
      label: "sections",
      type: "object",
      list: true,
      ui: {
        itemProps: (props) => {
          return { label: props.label };
        },
      },

      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Title",
          name: "title",
          type: "string",
        },
        {
          label: "MobileVisible",
          name: "mobileVisible",
          type: "boolean",
        },
        {
          label: "Logos",
          name: "logos",
          type: "object",
          list: true,
          ui: {
            itemProps: (props) => {
              return { label: props.label };
            },
          },
          fields: [
            { name: "image", label: "Image", type: "image" },
            { name: "height", label: "Height", type: "number" },
            { name: "width", label: "Width", type: "number" },
          ],
        },
        {
          label: "Links",
          name: "links",
          type: "object",
          list: true,
          ui: {
            itemProps: (props) => {
              return { label: props.label };
            },
          },
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string",
            },
            {
              label: "Link",
              name: "link",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "bottomFooterLinks",
      label: "Bottom Footer Links",
      type: "object",
      ui: {
        itemProps: (props) => {
          return { label: props.label };
        },
      },
      fields: [
        {
          name: "aboutCompanyLinks",
          label: "About Company Links",
          type: "object",
          list: true,
          ui: {
            itemProps: (props) => {
              return { label: props.label };
            },
          },
          fields: [
            {
              label: "Label",
              name: "label",
              type: "string",
            },
            {
              label: "Link",
              name: "link",
              type: "string",
            },
          ],
        },
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
  ],
};
export default footerCollection;
