import { defineQuery } from "next-sanity";

export const CONTACT_PAGE_QUERY = defineQuery(`*[_type == "contactPage"][0]{
  heroEyebrow,
  title,
  intro,
  mainEmail,
  primaryPhone,
  responseNote,
  officeHours,
  locationsLabel,
  salesEyebrow,
  salesTitle,
  salesIntro,
  formEyebrow,
  formTitle,
  formIntro,
  footerText,
  "offices": offices[]{
    name,
    label,
    address,
    phone,
    email,
    mapUrl
  },
  "salesContacts": salesContacts[]{
    name,
    role,
    location,
    phone,
    email
  }
}`);
