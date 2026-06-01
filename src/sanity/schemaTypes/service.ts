import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({
      name: "migratedImagePath",
      title: "Migrated local image path",
      type: "string",
      description:
        "Temporary public/assets path used before the image is imported as a Sanity asset.",
    }),
    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text" }),
          ],
        },
      ],
    }),
    defineField({ name: "ctaText", title: "CTA text", type: "text" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "image",
    },
  },
});
