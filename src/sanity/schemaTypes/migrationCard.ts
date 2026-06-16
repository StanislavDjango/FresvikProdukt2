import { defineField, defineType } from "sanity";

export const migrationCard = defineType({
  name: "migrationCard",
  title: "Migrated card",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "text", title: "Text", type: "text", rows: 4 }),
    defineField({ name: "href", title: "Original/new href", type: "string" }),
    defineField({ name: "meta", title: "Meta", type: "string" }),
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({ name: "imageAlt", title: "Image alt text", type: "string" }),
    defineField({ name: "file", title: "File", type: "file" }),
    defineField({
      name: "migratedImagePath",
      title: "Migrated local image path",
      type: "string",
      description: "Temporary local image path kept for migration traceability.",
    }),
    defineField({
      name: "migrationLocalDocumentPath",
      title: "Migrated local document path",
      type: "string",
      description: "Temporary local document path kept for migration traceability.",
    }),
    defineField({
      name: "migrationBackupLocalPath",
      title: "Migration backup local path",
      type: "string",
      description: "Original local path before a Sanity asset reference was added.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "href",
      media: "image",
    },
  },
});
