import { defineField, defineType } from "sanity";
import { languageFields } from "./languageFields";

export const documentFile = defineType({
  name: "documentFile",
  title: "Document file",
  type: "document",
  fields: [
    ...languageFields,
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
      name: "localPath",
      title: "Migrated local file path",
      type: "string",
      description:
        "Temporary public/assets path used before the file is imported as a Sanity asset.",
    }),
    defineField({
      name: "relatedProduct",
      title: "Related product",
      type: "reference",
      to: [{ type: "product" }],
    }),
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
