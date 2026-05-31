import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "mainEmail", title: "Main email", type: "email" }),
    defineField({ name: "mainPhone", title: "Main phone", type: "string" }),
    defineField({
      name: "address",
      title: "Address",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
    defineField({ name: "footerText", title: "Footer text", type: "text" }),
    defineField({
      name: "newsletterText",
      title: "Newsletter text",
      type: "text",
    }),
    defineField({
      name: "seoDefaults",
      title: "SEO defaults",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "openGraphImage",
          title: "OpenGraph image",
          type: "image",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "siteName",
      subtitle: "mainEmail",
    },
  },
});
