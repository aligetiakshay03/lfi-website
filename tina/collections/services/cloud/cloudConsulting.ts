import { Collection, TinaField } from "tinacms";
import { projectFlow } from "../../commonObjects/projectFlow";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { flowCards } from "../../commonObjects/flowCards";
import { collapseComponent } from "../../commonObjects/collapsecomponents";
import { whatweoffer } from "../../commonObjects/whatweoffer";
import { mediaSection } from "../../commonObjects/mediaSection";

export const CloudConsultingSchema: Collection = {
  label: "Cloud consulting Page",
  name: "CloudConsultingPage",
  path: "content/services/cloud/cloud-consulting",
  format: "json",
  ui: {
    router: () => {
      return "/services/cloud/cloud-consulting";
    },
  },
  fields: [
    heroSectionData as TinaField,
    whatweoffer as TinaField,
    messageBannerDataSection('growthmessage', 'Growth Message Banner'),
    //mediasection
    mediaSection as TinaField,
  ],
};