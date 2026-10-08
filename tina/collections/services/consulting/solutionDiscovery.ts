import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { whatweoffer } from "../../commonObjects/whatweoffer";
import { mediaSection } from "../../commonObjects/mediaSection";
import { howCanWeHelpData } from "../../commonObjects/howCanWeHelp";
import { projectFlow } from "../../commonObjects/projectFlow";

export const SolutionDiscoverySchema: Collection = {
  label: "Solution discovery Page",
  name: "solutionDiscovery",
  path: "content/services/consulting/solutionDiscovery",
  format: "json",
  ui: {
    router: () => {
      return "/services/consulting/solution-discovery";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("HowWeCanHelpSection", "How we can help section"),
    howCanWeHelpData as TinaField,
    messageBannerDataSection("growthmessage", "Growth Message Banner"),
    whatweoffer as TinaField,
    mediaSection as TinaField,
  ],
};
