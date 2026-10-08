import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "../commonObjects/heroSectionData";
import { flowCards } from "../commonObjects/flowCards";
import { TechonolgyDetails } from "../commonObjects/techonolgyDetails";
import { variousMedias } from "../commonObjects/mediaVariousSection";
import { projectFlow } from "../commonObjects/projectFlow";

export const aboutUs: Collection = {
  label: "About us Page",
  name: "aboutUs",
  path: "content/company/aboutUs",
  format: "json",
  ui: {
    router: () => {
      return "/company/about-us";
    },
  },
  fields: [
    heroSectionData as TinaField,
    flowCards("visionCards", "Vision Cards"),
    projectFlow("transformationFlow", "Transformation Component"),
    flowCards("transformationCards", "Transformation Cards"),
    variousMedias("transformingFuture", "Transforming future media section"),
    variousMedias("betterFuture", "Better future media sextion")
  ],
};
