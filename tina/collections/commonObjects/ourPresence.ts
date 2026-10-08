export const OurPresence = {
    name: "ourPresence",
    label: "Our Presence all over the world",
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
            name: "locationCard",
            label: "Location card",
            type: "object",
            list: true,
            ui: {
              itemProps: (props) => {
                return { label: props.country };
              },
            },
            fields: [
              {
                name: "country",
                label: "Country",
                type: "string",
              },
              {
                name: "building",
                label: "building",
                type: "string",
              },
              {
                name: "landmark",
                label: "landmark",
                type: "string",
              },
              {
                name: "city",
                label: "city",
                type: "string",
              },
              {
                name: "pinCode",
                label: "pin code",
                type: "string",
              },
              {
                name: "countryfullName",
                label: "full country name",
                type: "string",
              },
            ],
          },
    ]
  };