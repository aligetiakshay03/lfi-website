import { TinaField } from "tinacms";

export const projectFlow = (flowName?: string, flowLabel?: string) => {
  const schema: TinaField = {
    name: flowName || "projectflow",
    label: flowLabel || "Project flow section",
    type: "object",
    fields: [
      { name: "status1", label: "status1", type: "string", required: true },
      { name: "heading1", label: "heading1", type: "string",required: true  },
      { name: "desc", label: "description", type: "string" },
    ],
  };

  return schema;
};
