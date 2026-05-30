import { defineField, defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
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
      name: "email",
      title: "Main email",
      type: "email",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryPhone",
      title: "Primary phone",
      type: "string",
    }),
  ],
});
