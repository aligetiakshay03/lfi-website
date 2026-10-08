import { Collection, TinaField } from "tinacms";
import { heroSectionData } from "./commonObjects/heroSectionData";
import { whatweoffer } from "./commonObjects/whatweoffer";
import { variousMedias } from "./commonObjects/mediaVariousSection";
import { CareersComponent } from "./commonObjects/careers";
import { OurPresence } from "./commonObjects/ourPresence";
import { projectFlow } from "./commonObjects/projectFlow";
import { flowCards } from "./commonObjects/flowCards";

export const CareersPage:Collection = {
  label: "Careers Page",
  name: "careersPage",
  path: "content/careers",
  format: "json",
  ui: {
    router: () => {
      return "/careers";
    },
  },
  fields: [
    {
        name: "slider",
        label: "Career Slider",
        type: "object",
        fields : [
            {name: "heading", label:"Heading", type: "string"},
            {name: "button", label: "Button", type: "object", fields:[
                {name:"buttonLabel", label:"Button label", type:"string"},
                {name: "action", label:"Action", type:"string"}
            ]},
            {name: "images", label:"images", type:"object", list:true, fields:[
                {name: "image", label:"image", type:"image"}
            ]}
        ]    
    },
    whatweoffer as TinaField,
    variousMedias("careersMedia", "Careers Media Section"),
    CareersComponent("nextLevelCareer", "Take your career to next level"),
    CareersComponent("letsBeFriends", "Lets be friends"),
    OurPresence as TinaField,
    projectFlow("ourTeam", "Our team"),
    {...flowCards("memberCards", "Member cards"), fields: [
      ...flowCards("memberCards", "Member cards").fields,
      {
        name: "actionButton",
        label: "Action Button",
        type: "object",
        list: true,
        ui: {
          itemProps: (props) => {
            return { label: props.linkName };
          },
        },
        fields: [
          {
            name:"icon",
            label:"Button icon",
            type:"image",
          },
          {
            name:"linkName",
            label:"Name of link (eg: twitter, facebook, linkedin)",
            type:"string"
          },
          {
            label: "URL",
            name: "url",
            type: "string",
          },
        ]
      },
    ],
    },
    {...variousMedias("locationSliderMedia", "Location slider"), fields:[
      ...variousMedias("locationSliderMedia", "Location slider").fields,
      {
        name: "imagesSlider",
        label: "Image slider",
        type: "object",
        list: true,
        ui: {
          itemProps: (props) => {
            return { label: props.location };
          },
        },
        fields: [
          {
            name: "image",
            label: "image",
            type: "image"
          },
          {
            name: "location",
            label: "location",
            type: "string"
          }
        ]
      },
    ]},
  ],
};
