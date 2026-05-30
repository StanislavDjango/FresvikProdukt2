import { defineQuery } from "next-sanity";

export const CONTACT_PAGE_QUERY = defineQuery(`*[_type == "contactPage"][0]{
  title,
  intro,
  email,
  primaryPhone
}`);
