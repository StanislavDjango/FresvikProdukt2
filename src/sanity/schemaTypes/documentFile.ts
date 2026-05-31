import { defineField, defineType } from "sanity";

export const documentFile = defineType({
  name: "documentFile",
  title: "Document file",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Produktdokumentasjon",
          "Monteringsanvisning",
          "Sertifikat",
          "Juridisk",
          "Anna",
        ],
      },
    }),
    defineField({ name: "file", title: "File", type: "file" }),
    defineField({ name: "externalUrl", title: "External URL", type: "url" }),
    defineField({
      name: "relatedProduct",
      title: "Related product",
      type: "reference",
      to: [{ type: "product" }],
    }),
    defineField({ name: "language", title: "Language", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
    },
  },
});
