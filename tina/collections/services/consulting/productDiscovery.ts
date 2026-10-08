import { Collection, TinaField } from "tinacms";
import { projectFlow } from "../../commonObjects/projectFlow";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { flowCards } from "../../commonObjects/flowCards";
import { mediaSection } from "../../commonObjects/mediaSection";

export const ProductDiscoverySchema: Collection = {
  label: "Product discovery Page",
  name: "productDiscovery",
  path: "content/services/consulting/productDiscovery",
  format: "json",
  ui: {
    router: () => {
      return "/services/consulting/product-discovery";
    },
  },
  fields: [
    heroSectionData as TinaField,
    // projectFlowCards as TinaField,
    projectFlow('Projectflow', 'Project flow section'),
    messageBannerDataSection('growthmessage', 'Growth Message Banner'),
    flowCards("transformationCards", "Transformation cards"),
    mediaSection as TinaField,
  ],
};