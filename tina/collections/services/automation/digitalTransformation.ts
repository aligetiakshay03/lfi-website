import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { projectFlow } from "../../commonObjects/projectFlow";
import { cards } from "../../commonObjects/cards";
import { collapseComponent } from "../../commonObjects/collapsecomponents";
import { flowCards } from "../../commonObjects/flowCards";
import { mediaSection } from "../../commonObjects/mediaSection";

export const digitalTransformationSchema: Collection = {
  label: "Digital transformation Page",
  name: "digitalTransformation",
  path: "content/services/automation/digitalTransformation",
  format: "json",
  ui: {
    router: () => {
      return "/services/automation/digital-transformation";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("Projectflow", "Project flow section"),
    messageBannerDataSection("messageBannerData", "Message Banner Data"),
    cards as TinaField,
    mediaSection as TinaField,
    {
      name: "digitalEvolutionMediaSection",
      label: "Digital evolution media section",
      type: "object",
      fields: [
        {
          name: "status",
          label: "Status",
          type: "string",
        },
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "imageURL",
          label: "Image",
          type: "image",
        },
      ],
    },
    projectFlow("UseCases", "Use cases section"),
    flowCards("UseCasesCards", "Use cases cards"),
  ],
};
