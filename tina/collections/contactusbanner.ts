// import { Collection } from "tinacms";
import { Collection, TinaField } from "tinacms";
import { ContactCards } from "./commonObjects/contactCards";


 export const ContactCardsbanner : Collection = {
  name: "contactusbanner",
  label: "ContactUsBanner",
  format: "json",
  path: "content/contactBanner",
  fields: [
    {
        type: "string",
        name: "heading",
        label: "Heading",
        
    },
    ContactCards as TinaField
  ],
};