import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";

export const EngineeringPageSchema: Collection = {
  label: "Engineering Schema",
  name: "engineering",
  path: "content/services/engineering",
  format: "json",
  ui: {
    router: () => {
      return "/services/engineering";
    },
  },
  fields: [
    heroSectionData as TinaField,
    {
      name: "tabItems",
      label: "tab items",
      type: "object",
      list: true,
      ui: {
        itemProps: (props) => {
          return { label: props.title };
        },
      },
      fields: [
        { name: "title", label: "title", type: "string" },
        { name: "descriptions", label: "Description", type: "rich-text" },
        { name: "imageUrl", label: "image", type: "image" },
        {
          name: "button",
          label: "Button",
          type: "object",
          fields: [
            { name: "link", label: "URL", type: "string" },
            { name: "label", label: "Label", type: "string" },
          ],
        },
      ],
    },
    messageBannerDataSection("messageBannerData", "Message Banner Data"),
  ],
};
