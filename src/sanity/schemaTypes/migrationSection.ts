import { defineField, defineType } from "sanity";

export const migrationSection = defineType({
  name: "migrationSection",
  title: "Migrated section",
  type: "object",
  fields: [
    defineField({
      name: "kind",
      title: "Stable section kind",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "translationKey",
      title: "Translation key",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
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
      kind: "kind",
      translationKey: "translationKey",
    },
    prepare({ title, kind, translationKey }) {
      return {
        title,
        subtitle: [kind, translationKey].filter(Boolean).join(" · "),
      };
    },
  },
});
