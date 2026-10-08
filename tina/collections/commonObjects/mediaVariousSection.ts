import { TinaField } from "tinacms"

export const variousMedias=(name, label)=>{
    const variousMediaSection:TinaField={
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
            name: "bgImageURL",
            label: "Background Image",
            type: "image",
          },
          {
            name: "imageURL",
            label: "Image",
            type: "image",
          },
          {
            name: "points",
            label: "Points",
            type: "object",
            list: true,
            ui: {
              itemProps: (props) => {
                return { label: props.points };
              },
            },
            fields: [
              {
                name: "points",
                label: "Points",
                type: "string",
              },
            ],
          },
          {
            name: "ourOffering",
            label: "Our Offering",
            type: "object",
            ui: {
              itemProps: (props) => {
                return { label: props.points };
              },
            },
            fields: [
              {
                name: "heading",
                label: "Heading",
                type: "string",
              },
              {
                name: "platformCardsData",
                label: "Images",
                type: "object",
                list: true,
                ui: {
                  itemProps: (props) => {
                    return { label: props.icon };
                  },
                },
                fields: [
                  {
                    name: "icon",
                    label: "icon",
                    type: "image",
                  },
                ],
              },
            ],
          },
        ],
      };

    return variousMediaSection
      
}