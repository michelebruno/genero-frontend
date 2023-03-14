import {SanityDocument} from "@sanity/client";

export interface Item extends SanityDocument {
  title: string,
  description?: string,
}