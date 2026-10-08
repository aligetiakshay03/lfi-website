import { TinaField } from "tinacms";

export const TechonolgyDetails = (flowName?: string, flowLabel?: string) => {
  const schema: TinaField = {
    name: flowName || "dynamics365",
    label: flowLabel || "Dynamics 365 section",
    type: "object",
    fields: [
      { name: "logo", label: "logo", type: "image" },
      { name: "heading1", label: "heading1", type: "string", required: true },
      { name: "desc", label: "description", type: "string" },
    ],
  };

  return schema;
};
