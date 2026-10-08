import { Collection, TinaField } from "tinacms";
import { projectFlow } from "../../commonObjects/projectFlow";
import { heroSectionData } from "../../commonObjects/heroSectionData";
import { messageBannerDataSection } from "../../commonObjects/messageBannerDataSection";
import { flowCards } from "../../commonObjects/flowCards";
import { collapseComponent } from "../../commonObjects/collapsecomponents";

export const ManagedTeamSchema: Collection = {
  label: "Managed Team Page",
  name: "managedTeam",
  path: "content/services/teams/managedTeams",
  format: "json",
  ui: {
    router: () => {
      return "/services/teams/managed-team";
    },
  },
  fields: [
    heroSectionData as TinaField,
    projectFlow('bringingBest', 'Bringing best out cards section'),
    messageBannerDataSection('growthmessage', 'Growth Message Banner'),
    flowCards("transformationCards", "Transformation cards"),
    collapseComponent as TinaField,
  ],
};