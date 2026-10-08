import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { whatweoffer } from "../commonObjects/whatweoffer";
import { flowCards } from "../commonObjects/flowCards";
import OurOffering from "../../../components/OurOfferings";
import { ourOfferings } from "../commonObjects/ourOfferings";

export const OurApproach: Collection = {
  label: "Our Approach Page",
  name: "ourApproach",
  path: "content/company/ourApproach",
  format: "json",
  ui: {
    router: () => {
      return "/company/our-approach";
    },
  },
  fields: [
    heroSectionData as TinaField,
    whatweoffer as TinaField,
    ourOfferings("exploration", "ExplorationCards"),
  ],
};
