import { Collection, TinaField } from "tinacms";
import { ContactCards } from "./commonObjects/contactCards";

export const HomeCollection: Collection = {
  name: "home",
  label: "Home",
  path: "content/home",
  format: "json",
  ui: {
    router: () => "/",
  },
  fields: [
    //Hero section
    {
      name: "HeroSection",
      label: "Hero Section",
      type: "object",
      fields: [
        // {
        //   label: "Hero Video",
        //   name: "heroVideo",
        //   type: "image",
        // },
        // {
        //   label: "Hero Mobile Video",
        //   name: "heroMobileVideo",
        //   type: "image",
        // },
        {
          label: "Services",
          name: "services",
          type: "object",
          list: true,
          ui: {
            itemProps: (props) => {
              return { label: props.title }
            }
          },
          fields: [
            {
              label: "Title",
              name: "title",
              type: "string",
            },
            {
              label: "Description",
              name: "description",
              type: "string",
            },
            {
              label: 'Button',
              name: 'btn',
              type: 'object',
              ui: {
                itemProps: (props) => {
                  return { label: props.label }
                }
              },
              fields: [
                {
                  label: 'Label',
                  name: 'label',
                  type: 'string',
                },
                {
                  label: 'Link',
                  name: 'link',
                  type: 'string',
                },
              ],
            },
          ]
        },
        {
          label: "Slider",
          name: "slider",
          type: "object",
          list: true,
          ui: {
              itemProps: (props) => {
                  return { label: props.title }
              }
          },
          fields: [
              {
                  label: "Title",
                  name: "title",
                  type: "string",
              },
              {
                  label: "Image",
                  name: "image",
                  type: "image",
              }
          ]
      },
      {
        name: 'achievementList',
        label: 'Achievements list',
        type: 'object',
        list: true,
        ui: {
          itemProps: (props) => {
            return {label: props.title}
          }
        },
        fields: [
          { name: "title", label: "Title", type: "string" },
          { name: "achievementImage", label: "Achievement Image", type: "image" },
        ]
      }
      ],
    },
    //New services tab 
    {
        name: "ourServices",
        label: "Our Services Tabs",
        type: "object",
        list: false,
        
        fields: [
          {
            name: "mainTitle", 
            label: "Main Title", 
            type: "string"
          },
          {
            name: "mainDesc", 
            label: "Main Description", 
            type: "string"
          },
          {
            name: "button",
            label: "Action Button",
            type: "object",
            fields:[
              {
                name: "labelText",
                type: "string",
                label: "Label Text"
              },
              {
                name: "url",
                type: "string",
                label: "Button url",
              }
            ]
          },
          {
            name: "serviceTabs",
            label: "Service Tabs",
            type: "object",
            list: true,
            ui: {
              itemProps: (props) => {
                return { label: props.TabName }
              }
            },
            fields: [
              {
                name: "TabName",
                label: "Tab Name",
                type: "string",
              },
              {
                name: "tabImage",
                label: "Tab Image",
                type: "image"
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
                name: "url",
                label: "URL",
                type: "string",
              },
              {
                name: "serviceBlocks",
                label: "Service Blocks",
                type: "object",
                list: true,
                ui: {
                  itemProps: (props) => {
                    return { label: props.TabName }
                  }
                },
                fields: [
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
                    name: "actionButton",
                    label: "Action Button",
                    type: "string",
                  },
                  {
                    name: "url",
                    label: "Url",
                    type: "string",
                  },
                  {
                    name: "blockSize",
                    label: "Block Size",
                    // type: "reference",
                    type: "string",
                  },
                ]
              },
            ],
          },
          
        ]
        
    },
    //Service Tabs
    // {
    //   name: "ourServices",
    //   label: "Our Services Tabs",
    //   type: "object",
    //   list: true,
    //   ui: {
    //     itemProps: (props) => {
    //       return { label: props.TabName }
    //     }
    //   },
    //   fields: [
    //     {
    //       name: "TabName",
    //       label: "Tab Name",
    //       type: "string",
    //     },
    //     {
    //       name: "title",
    //       label: "Title",
    //       type: "string",
    //     },
    //     {
    //       name: "description",
    //       label: "Description",
    //       type: "string",
    //     },
    //     {
    //       name: "serviceBlocks",
    //       label: "Service Blocks",
    //       type: "object",
    //       list: true,
    //       ui: {
    //         itemProps: (props) => {
    //           return { label: props.title }
    //         }
    //       },
    //       fields: [
    //         {
    //           name: "title",
    //           label: "Title",
    //           type: "string",
    //         },
    //         {
    //           name: "description",
    //           label: "Description",
    //           type: "string",
    //         },
    //         {
    //           name: "actionButton",
    //           label: "Action Button",
    //           type: "string",
    //         },
    //         {
    //           name: "url",
    //           label: "Url",
    //           type: "string",
    //         },
    //         {
    //           name: "blockSize",
    //           label: "Block Size",
    //           // type: "reference",
    //           type: "string",
    //         },
    //       ]
    //     },
    //   ],
    // },
    //solutions
    {
      name: "ourSolutions",
      label: "Our Solutions",
      type: "object",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "subtitle",
          label: "Subtitle",
          type: "string",
        },
        {
          name: "details",
          label: "Details",
          type: "object",
          list: true,
          ui: {
            itemProps: (props) => {
              return { label: props.title }
            }
          },
          fields: [
            {
              name: "title",
              label: "Title",
              type: "string",
            },
            {
              name: "image",
              label: "Image",
              type: "image",
            },
            {
              name: "vDivider",
              label: "verticle divider",
              type: "string",
            },
            {
              name: "hDivider",
              label: "horizontal divider",
              type: "string",
            },
            {
              name: "description",
              label: "Description",
              type: "string",
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
                }
              ]
            },
          ]
        }
      ]
    },
    //awards & recognition
    {
      name: "awardsAndRecognition",
      label: "Awards and Recognition",
      type: "object",
      list: true,
      ui: {
        itemProps: (props) => {
          return { label: props.title }
        }
      },
      fields: [
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
            }
          ]
        },
        {
          name: "image",
          label: "Image",
          type: "image",
        },
      ]
    },
    //Industries
    {
      name: "industry",
      label: "Industry",
      type: "object",
      list: true,
      ui: {
        itemProps: (props) => {
          return { label: props.title }
        }
      },
      fields: [
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
            }
          ]
        },
        {
          name: "backgroundImage",
          label: "Background Image",
          type: "image",
        },
      ]
    },
    {
      name: "technologies",
      label: "Technology images",
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
    //ourJourney
    {
      name: "ourJourney",
      label: "Our Journey",
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
            }
          ]
        },
        {
          name: "analytics",
          label: "Analytics",
          type: "object",
          list: true,
          ui: {
            itemProps: (props) => {
              return { label: props.description }
            }
          },
          fields: [
            {
              name: "time",
              label: "Time",
              type: "string",
            },
            {
              name: "suffix",
              label: "Suffix",
              type: "string",
            },
            {
              name: "description",
              label: "Description",
              type: "string",
            },
          ]
        },
      ]
    },
    //Carrers
    {
      name: "carrers",
      label: "Carrers",
      type: "object",
      fields: [
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
            }
          ]
        },
      ]
    },
    //Contact us
    {
      name: "contactField",
      label: "Contact Field",
      type: "object",
      fields: [
        ContactCards as TinaField
      ]
    },
  ],
};
