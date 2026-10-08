import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerData } from "../../commonObjects/messageBannerData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";

export const TeamsSchema: Collection = {
  label: "Teams Schema",
  name: "teams",
  path: "content/services/teams",
  format: "json",
  ui: {
    router: () => {
      return "/services/teams";
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
    // messageBannerData as TinaField,messageBannerDataSection("messageBannerData2", "Message Banner Data2"),
    messageBannerDataSection("messageBannerData", "Message Banner Data"),
    messageBannerDataSection("messageBannerData2", "Message Banner Data2"),
    // messageBannerData as TinaField,
  ],
};
