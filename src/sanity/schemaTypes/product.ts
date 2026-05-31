import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
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
    defineField({ name: "heroImage", title: "Hero image", type: "image" }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "technicalData",
      title: "Technical data",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        },
      ],
    }),
    defineField({
      name: "applications",
      title: "Applications",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "documents",
      title: "Documents",
      type: "array",
      of: [{ type: "reference", to: [{ type: "documentFile" }] }],
    }),
    defineField({
      name: "relatedProducts",
      title: "Related products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
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
      media: "heroImage",
    },
  },
});
