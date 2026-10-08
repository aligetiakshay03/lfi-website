import { TinaField } from "tinacms";

export const messageBannerDataSection = (name?: string, label?: string) => {
  const schema: TinaField = {
    name: name ?? "messageBannerData",
    label: label ?? "Message Banner Data",
    type: "object",
    fields: [
      { name: "title", label: "Title", type: "string", required: true },
      { name: "url", label: "URL", type: "string", required: true },
      { name: "description", label: "Description", type: "string" },
      {
        name: "urlMessage",
        label: "URL Message",
        type: "string",
        required: true,
      },
    ],
  };

  return schema;
};
