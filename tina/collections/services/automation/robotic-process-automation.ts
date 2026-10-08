import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { projectFlow } from "../../commonObjects/projectFlow";
import { cards } from "../../commonObjects/cards";
import { mediaSection } from "../../commonObjects/mediaSection";
import { darkAndLightComponentCards } from "../../commonObjects/darkAndLightComponentCards";
import { rpaFlowCards } from "../../commonObjects/rpaFlowCards";

export const roboticProcessAutomationSchema: Collection = {
  label: "Robotic process automation Page",
  name: "roboticProcessAutomation",
  path: "content/services/automation/rpa",
  format: "json",
  ui: {
    router: () => {
      return "/services/automation/robotic-process-automation";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow("Projectflow", "Project flow section"),
    cards as TinaField,
    messageBannerDataSection("messageBannerData", "Message Banner Data"),
    projectFlow("breakthrough", "Breakthrough"),
    rpaFlowCards("breakThroughCards", "Break through cards"),
    projectFlow("benefits", "Benefits"),
    darkAndLightComponentCards as TinaField,
    mediaSection as TinaField,
  ],
};
