import { TinaField } from "tinacms"

export const CareersComponent=(name, label)=>{
    const careers:TinaField={
        name: name,
        label: label,
        type: "object",
        fields: [
          {
            name: "status",
            label: "Status",
            type: "string",
          },
          {
            name: "title",
            label: "Title",
            type: "string",
          },
          {
            name: "description",
            label: "Description",
            type: "string",
          },
          {
            name: "background",
            label: "Background",
            type: "boolean",
          },
          {
            name: "actionButton",
            label: "Action Button",
            type: "object",
            fields: [
              {
                label: "Text",
                name: "text",
                type: "string",
              },
              {
                label: "URL",
                name: "url",
                type: "string",
              },
              {
                label: "bgColor",
                name: "bgColor",
                type: "string",
              },
            ]
          },
        ]
      }
      
      return careers
}