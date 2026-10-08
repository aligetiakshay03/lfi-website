import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "./commonObjects/heroSectionData";
import { projectFlow } from "./commonObjects/projectFlow";
import { cards } from "./commonObjects/cards";
import { flowCards } from "./commonObjects/flowCards";
import { messageBannerData } from "./commonObjects/messageBannerData";
import { TechonolgyDetails } from "./commonObjects/techonolgyDetails";

export const InnovationAndTransformationPage : Collection = {
    label: "Innovation and Transformation",
    name: "innovationAndTransformation",
    path: "content/innovationAndTransformation",
    format: "json",
    ui: {
        router: () => {
            return "/explore-more/innovationAndTransformation";
        },
    },
    fields: [
        heroSectionData as TinaField,
        projectFlow("HowCanWeHelpSection", "How can we help"),
        cards as TinaField,
        messageBannerData as TinaField,
        TechonolgyDetails("innovationAndTransformationSection", "Innovation and Transformation Section"),
        flowCards("innovationCards", "innovations cards"),
    ],
};
