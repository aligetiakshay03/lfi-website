export const heroSectionData = {
  name: "heroSectionData",
  label: "heroSectionData",
  type: "object",
  //   list: true,
  required: true,
  fields: [
    { name: "heading1", label: "Heading 1", type: "string", required: true },
    {
      name: "subheading1",
      label: "Subheading 1",
      type: "string",
      required: true,
    },
    { name: "imagesrc", label: "Image Source", type: "image", required: true },
    { name: "status1", label: "Status 1", type: "string" },
    {
      name: "subheading2",
      label: "Subheading 2",
      type: "string",
    },
    { name: "para1", label: "Paragraph 1", type: "rich-text" },
    { name: "status2", label: "Status 2", type: "string" },
    { name: "subheading3", label: "Subheading 3", type: "string" },
    { name: "para2", label: "para 2", type: "string" },
  ],
};
