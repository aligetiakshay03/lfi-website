import { Collection, Form, Reference, TinaCMS } from "tinacms";

export const blogsCollections: Collection = {
  label: "Blogs Collection",
  name: "blogsCollection",
  path: "content/blogs",
  format: "json",
  ui: {
    router: () => {
      return "/company/blog";
    },
  },
  defaultItem: () => {
    return {
      createdAt: new Date().toISOString(),
    };
  },
  fields: [
    {
      name: "blogs",
      label: "Blogs",
      type: "object",
      list: true,
      ui: {
        itemProps: (props) => {
          return { label: props.title };
        },
      },
      fields: [
        {
          name: "image",
          label: "Image",
          type: "image",
        },
        {
          name: "blogType",
          label: "Blog Type",
          type: "string",
        },
        {
          name: "author",
          label: "Author",
          type: 'reference',
          collections: ['authors']
        },
        {
          name: "createdAt",
          label: "Created Date",
          type: "datetime",
          required: false,
        },
        {
          name: "content",
          label: "Content",
          type: "rich-text",
        },
        {
          name: "url",
          label: "URL",
          type: "string",
        },
        {
          name: "alignment",
          label: "Alignement",
          type: "string",
        },
        {
          name: "description",
          label: "Description",
          type: "string",
        },
        {
          name: "heading",
          label: "Heading",
          type: "string",
        },
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "contentSectionStyle",
          label: "Content Section Style",
          type: "object",
          list: false,
          fields: [
            {
              name: "backgroundColor",
              label: "Background Color",
              type: "string",
            },
          ],
        },
        {
          name: "textContentStyle",
          label: "Text Content Style",
          type: "object",
          list: false,
          fields: [
            {
              name: "color",
              label: "Text Color",
              type: "string",
            },
          ],
        },
        {
          name: "type",
          label: "Blog Type",
          type: "string",
        },
      ],
    },
    {
      name: "author",
      label: "Author",
      type: "object",
      list: true,
      fields: [
        {
          name: "name",
          label: "Name",
          type: "string",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "string",
        },
      ],
    },
  ],
};
