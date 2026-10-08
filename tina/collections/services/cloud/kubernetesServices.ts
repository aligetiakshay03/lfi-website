import { Collection, TinaField } from "tinacms";
import { projectFlow } from "../../commonObjects/projectFlow";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { flowCards } from "../../commonObjects/flowCards";
import { mediaSection } from "../../commonObjects/mediaSection";

export const KubernetesServicesSchema: Collection = {
  label: "Kubernetes Services Page",
  name: "kubernetesServices",
  path: "content/services/cloud/kubernetesServices",
  format: "json",
  ui: {
    router: () => {
      return "/services/cloud/kubernetes-services";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow('kubernetesCardsSection', 'Kubernetes card section'),
    flowCards("kubernetesCards", "Kubernetes cards"),
    messageBannerDataSection('growthmessage', 'Growth Message Banner'),
    mediaSection as TinaField
  ],
};