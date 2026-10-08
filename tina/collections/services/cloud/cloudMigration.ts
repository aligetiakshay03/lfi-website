import { Collection, TinaField } from "tinacms";
import { projectFlow } from "../../commonObjects/projectFlow";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { flowCards } from "../../commonObjects/flowCards";
import { collapseComponent } from "../../commonObjects/collapsecomponents";
import { whatweoffer } from "../../commonObjects/whatweoffer";

export const CloudMigrationSchema: Collection = {
  label: "Cloud Migration Page",
  name: "cloudMigration",
  path: "content/services/cloud/cloudMigration",
  format: "json",
  ui: {
    router: () => {
      return "/services/cloud/cloud-migration";
    },
  },
  fields: [
    heroSectionData as TinaField,
    whatweoffer as TinaField,
    messageBannerDataSection('growthmessage', 'Growth Message Banner'),
    collapseComponent as TinaField
  ],
};