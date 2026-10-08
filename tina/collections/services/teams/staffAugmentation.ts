import { Collection, TinaField } from "tinacms";
import { projectFlow } from "../../commonObjects/projectFlow";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { flowCards } from "../../commonObjects/flowCards";
import { mediaSection } from "../../commonObjects/mediaSection";
import { platforms } from "../../commonObjects/platforms";

export const StaffAugmentationSchema: Collection = {
  label: "Staff Augmentation Page",
  name: "staffAugmentation",
  path: "content/services/teams/staff-augmentation",
  format: "json",
  ui: {
    router: () => {
      return "/services/teams/staff-augmentation";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("staffAugmentationSection", "Staff augmentation section"),
    flowCards("staffAugmentationCards", "staffAugmentation cards"),
    messageBannerDataSection("growthmessage", "Growth Message Banner"),
    mediaSection as TinaField,
    platforms(
      "performingLanguages",
      "Performing languages section"
    ),
    platforms("platforms", "Platforms section"),
  ],
};
