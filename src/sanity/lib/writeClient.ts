import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export function getSanityWriteClient() {
  const token = process.env.SANITY_AUTH_TOKEN;

  if (!token) {
    throw new Error(
      "SANITY_AUTH_TOKEN is required for administrative content updates.",
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}
