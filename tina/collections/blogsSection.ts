import { Collection, Form, TinaCMS } from "tinacms";

export const blogsSection: Collection = {
  label: "Blogs Section",
  name: "blogsSection",
  path: "content/blogsSection",
  format: "md",
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
      name: "heading",
      label: "Heading",
      type: "string",
      description: 'Select the type if it is a blog or a news',
      options: ['Blog', 'News'],
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
      name: "image",
      label: "Image",
      type: "image",
    },
    {
      name: "category",
      label: "Category",
      type: "reference",
      collections:["keyWords"],
      // ui: {
      //   itemProps: (props) => {
      //     return { label: props.label };
      //   },
      // },
    },
    {
      name: "keyWord",
      label: "Key word for category (filter topics)",
      type: "reference",
      collections:["categories"],
      // ui: {
      //   itemProps: (props) => {
      //     return { label: props.label };
      //   },
      // },
    },
    {
      name: "content",
      label: "Content",
      type: "rich-text",
      isBody: true,
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
          options: ["#E6ECED", "#272727"]
        },
        {
          name: "backgroundColor",
          label: "Background Color",
          type: "string",
          options: ["#2D58C0", "#FF7800", "#FFF", "#59981A"]
        },
        {
          name: "alignment",
          label: "Alignement",
          type: "string",
          description: 'Select the type in which you want the content of blogs to appear in featured blogs, either left side or right side',
          options: ['right', 'left'],
        },
        {
          name: "type",
          label: "Blog Type", 
          type: "string",
          description: 'Select the type in which you want the blogs to appear in featured blogs, either full or half',
          options: ['full', 'semi'],
        },
      ],
    },
    {
      name: "createdAt",
      label: "Created Date",
      type: "datetime",
      required: false,
    },
    {
      name: "author",
      label: "Author",
      type: "reference",
      collections: ["authors"],
    },
  ],
};
