import { TinaField } from "tinacms";

export const platforms = (platformName?: string, platformLabel?: string) => {
  const schema: TinaField = {
    name: platformName || "platforms",
    label: platformLabel || "Platforms",
    type: "object",
    fields: [
      { name: "heading", label: "heading", type: "string" },
      { name: "headingPosition", label: "heading position", type: "string" },
      { name: "headingColor", label: "heading color", type: "string" },
      {
        name: "platformCardsData",
        label: "Platform Cards data",
        type: "object",
        list: true,
        ui: {
          itemProps: (props) => {
            return { label: props.icon };
          },
        },
        fields: [
          { name: "icon", label: "icon", type: "image", required: true },
        ],
      },
    ],
  };

  return schema;
};
