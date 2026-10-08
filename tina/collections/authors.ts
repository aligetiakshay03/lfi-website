import { Collection } from "tinacms";
export const AuthorsCollection: Collection = {
  label: "Authors",
  name: "authors",
  path: "content/company/blogs/authors",
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
        name: 'avatar',
        label: 'Avatar',
        type: 'image',
    },
    {
        name: 'email',
        label: 'Email',
        type: 'string',
    }
  ],
};
export default AuthorsCollection;
