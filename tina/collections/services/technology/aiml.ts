import { Collection, TinaField } from "tinacms";
import { projectFlow } from "../../commonObjects/projectFlow";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { flowCards } from "../../commonObjects/flowCards";
import { mediaSection } from "../../commonObjects/mediaSection";

export const AiMlSchema: Collection = {
  label: "AIML Page",
  name: "AiMl",
  path: "content/services/technology/ai-ml",
  format: "json",
  ui: {
    router: () => {
      return "/services/technology/ai-ml";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("aiMlCardSection", "AI-ml card section"),
    flowCards("aiMlCards", "AI-ml cards"),
    messageBannerDataSection("growthmessage", "Growth Message Banner"),
    mediaSection as TinaField,
  ],
};
