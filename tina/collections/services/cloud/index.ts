import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerData } from "../../commonObjects/messageBannerData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";

export const CloudSchema: Collection = {
  label: "Cloud Schema",
  name: "cloud",
  path: "content/services/cloud",
  format: "json",
  ui: {
    router: () => {
      return "/services/cloud";
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
    messageBannerDataSection("messageBannerData2", "Message Banner Data 2"),
  ],
};
