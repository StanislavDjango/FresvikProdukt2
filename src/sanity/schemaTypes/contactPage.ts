import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Kontakt side",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainEmail",
      title: "Main email",
      type: "email",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryPhone",
      title: "Primary phone",
      type: "string",
    }),
    defineField({
      name: "responseNote",
      title: "Response note",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "officeHours",
      title: "Office hours",
      type: "string",
    }),
    defineField({
      name: "locationsLabel",
      title: "Locations label",
      type: "string",
    }),
    defineField({
      name: "offices",
      title: "Offices",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "address",
              title: "Address",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({ name: "phone", title: "Phone", type: "string" }),
            defineField({ name: "email", title: "Email", type: "email" }),
            defineField({ name: "mapUrl", title: "Map URL", type: "url" }),
          ],
        },
      ],
    }),
    defineField({
      name: "salesEyebrow",
      title: "Sales eyebrow",
      type: "string",
    }),
    defineField({
      name: "salesTitle",
      title: "Sales title",
      type: "string",
    }),
    defineField({
      name: "salesIntro",
      title: "Sales intro",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "salesContacts",
      title: "Sales contacts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "role", title: "Role", type: "string" }),
            defineField({ name: "location", title: "Location", type: "string" }),
            defineField({ name: "phone", title: "Phone", type: "string" }),
            defineField({ name: "email", title: "Email", type: "email" }),
          ],
        },
      ],
    }),
    defineField({
      name: "formEyebrow",
      title: "Form eyebrow",
      type: "string",
    }),
    defineField({
      name: "formTitle",
      title: "Form title",
      type: "string",
    }),
    defineField({
      name: "formIntro",
      title: "Form intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "footerText",
      title: "Footer text",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "mainEmail",
    },
  },
});
