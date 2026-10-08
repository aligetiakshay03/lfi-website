import { Collection } from "tinacms";
export const CategoriesCollection: Collection = {
  label: "Categories",
  name: "categories",
  path: "content/company/blogs/categories",
  format: "json",
  ui: {
    // router: () => {
    //   return "/";
    // },
  },
  
  fields: [
    {
        name: 'name',
        label: 'Name',
        type: 'string',
    },
    {
        name: 'color',
        label: 'Color',
        type: 'string',
    }
  ],
};
export default CategoriesCollection;