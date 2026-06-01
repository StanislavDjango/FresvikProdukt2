import { defineField, defineType } from "sanity";

export const referenceProject = defineType({
  name: "referenceProject",
  title: "Reference project",
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
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({
      name: "migratedImagePath",
      title: "Migrated local image path",
      type: "string",
      description:
        "Temporary public/assets path used before the image is imported as a Sanity asset.",
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({
      name: "customerType",
      title: "Customer type",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "image",
    },
  },
});
