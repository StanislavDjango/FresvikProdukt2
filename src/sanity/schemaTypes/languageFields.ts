import { defineField } from "sanity";

export const languageFields = [
  defineField({
    name: "language",
    title: "Language",
    type: "string",
    initialValue: "nn",
    options: {
      list: [
        { title: "Norwegian", value: "nn" },
        { title: "English", value: "en" },
      ],
      layout: "radio",
    },
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "translationGroup",
    title: "Translation group",
    type: "string",
    description:
      "Stable shared key for the Norwegian document and its translations.",
  }),
  defineField({
    name: "translatedFrom",
    title: "Translated from",
    type: "reference",
    to: [
      { type: "page" },
      { type: "product" },
      { type: "service" },
      { type: "newsArticle" },
      { type: "referenceProject" },
    ],
  }),
  defineField({
    name: "sourceLanguage",
    title: "Source language",
    type: "string",
    description:
      "Optional migration marker for imported translations. Usually nn for English documents translated from Norwegian.",
    options: {
      list: [
        { title: "Norwegian", value: "nn" },
        { title: "English", value: "en" },
      ],
    },
  }),
];
