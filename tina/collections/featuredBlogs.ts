import { Collection } from "tinacms";
export const FeaturedBlogs: Collection = {
  label: "Featured Blogs",
  name: "featuredBlogs",
  path: "content/company/featuredBlogs",
  format: "json",
  ui: {
    router: () => {
      return "/";
    },
  },
  
  fields: [
    {
        name: 'featuredBlogs',
        label: 'Featured Blogs',
        type: 'string',
    },
    {
      name: "blogListArray",
      label: "blog list array",
      type: "object",
      list: true,
      ui: {
        itemProps: (props) => {
          return { label: props.blogList };
        },
      },
      fields: [
        {
            name: 'blogList',
            label: 'blog list',
            type: 'reference',
            collections: ["blogsSection", "newsSection"],
        },
      ],
    },
  ],
};
export default FeaturedBlogs;
