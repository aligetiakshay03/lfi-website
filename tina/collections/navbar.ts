import { Collection } from "tinacms";

export const navbarCollection: Collection = {
  label: 'Navbar',
  name: 'navbar',
  path: 'content/navbar',
  format: 'json',
  ui: {
    router: () => {
      return '/'
    }
  },
  fields: [
    {
      label: 'Logo',
      name: 'logo',
      type: 'image',
    },
    {
      label: 'Links',
      name: 'links',
      type: 'object',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.label }
        },
      },
      fields: [
        {
          label: 'Cover image',
          name: 'coverImage',
          type: 'image',
        },
        {
          label: 'Label',
          name: 'label',
          type: 'string',
          required:true,
        },
        {
          label: 'Description',
          name: 'description',
          type: 'string',
        },
        {
          label: 'URL',
          name: 'href',
          type: 'string',
        },
        {
          label: 'Children',
          name: 'children',
          type: 'object',
          list: true,
          ui: {
            itemProps: (props) => {
              return { label: props.label }
            }
          },
          fields: [
            {
              label: 'Icon',
              name: 'icon',
              type: 'image',
            },
            {
              label: 'Label',
              name: 'label',
              type: 'string',
              required:true,
            },
            {
              label: 'URL',
              name: 'href',
              type: 'string',
            },
            {
              label: 'NewTab',
              name: 'openInNewTab',
              type: 'boolean',
            },
            {
              label: 'Description', 
              type: 'string',
              name: 'description'
            },
            {
              name: 'navbutton',
              label: 'Button',
              type: 'object',
              fields: [
                {
                  name: 'label',
                  label: 'Label',
                  type: 'string',
                },
                {
                    label: 'URL',
                    name: 'href',
                    type: 'string',
                  
                }
              ]
            },
            {
              label: 'Children',
              name: 'children',
              type: 'object',
              list: true,
              ui: {
                itemProps: (props) => {
                  return { label: props.label }
                }
              },
              fields: [
                {
                  label: 'Label',
                  name: 'label',
                  type: 'string',
                  required:true,
                },
                {
                  label: 'URL',
                  name: 'href',
                  type: 'string',
                }
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Button',
      name: 'btn',
      type: 'object',
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
          required:true,
        },
        {
          label: 'URL',
          name: 'href',
          type: 'string',
          required:true
        },
      ],
    },
  ],
};

export default navbarCollection;
