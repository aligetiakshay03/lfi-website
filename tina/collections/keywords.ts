import { Collection } from "tinacms";
export const GroupsCollection: Collection = {
  label: "Keywords",
  name: "keyWords",
  path: "content/company/blogs/keywords",
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
        name: "categoryKeyWords",
        label: "Category key words",
        type: "object",
        list: true,
        ui: {
          itemProps: (props) => {
            return { label: props.subCategories };
          },
        },
        fields: [
            {
                name: 'subCategories',
                label: 'Keywords',
                type: 'reference',
                collections: ["categories"]
            }
        ],
      },
    
  ],
};
export default GroupsCollection;