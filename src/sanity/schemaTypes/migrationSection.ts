import { defineField, defineType } from "sanity";

export const migrationSection = defineType({
  name: "migrationSection",
  title: "Migrated section",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "migrationCard" }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "intro",
    },
  },
});
