import { Collection } from "tinacms";

const HeroSectionCollection: Collection = {
    label: 'Hero Section',
    name: 'HeroSection',
    path: 'content/heroSection',
    format: 'json',
    ui: {
        router: () => {
            return '/'
        }
    },
    fields: [
        {
            label: "Hero Video",
            name: "heroVideo",
            type: "image",
        },
        {
            label: "Hero Image",
            name: "heroImage",
            type: "image",
        },
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
                    label: "Selector",
                    name: "selector",
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
        }
    ],
};

export default HeroSectionCollection;
