import { client } from "./client";
import { CONTACT_PAGE_QUERY } from "./queries";
import {
  fallbackContactPage,
  type ContactPageContent,
} from "@/data/contact";
import { isSanityConfigured } from "../env";

type SanityContactPage = Partial<ContactPageContent> | null;

export async function getContactPage(): Promise<ContactPageContent> {
  if (!isSanityConfigured) {
    return fallbackContactPage;
  }

  try {
    const page = await client.fetch<SanityContactPage>(
      CONTACT_PAGE_QUERY,
      {},
      { next: { revalidate: 60 } },
    );

    if (!page) {
      return fallbackContactPage;
    }

    return {
      ...fallbackContactPage,
      ...page,
      offices:
        page.offices && page.offices.length > 0
          ? page.offices
          : fallbackContactPage.offices,
      salesContacts:
        page.salesContacts && page.salesContacts.length > 0
          ? page.salesContacts
          : fallbackContactPage.salesContacts,
    };
  } catch (error) {
    console.error("Failed to load contact page from Sanity", error);
    return fallbackContactPage;
  }
}
