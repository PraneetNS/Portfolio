// ==================================================
// PRANEET SAVANT — VERIFIED SUBSTACK WRITING ARCHIVE
// Source: https://praneetsavant.substack.com/feed
// Profile: https://substack.com/@praneetsavant
// ==================================================

export interface Article {
  slug: string
  title: string
  subtitle: string
  date: string
  isoDate: string
  url: string
  topic: string
  readTime: string
  coverImage?: string
}

export const SUBSTACK_PROFILE_URL = 'https://substack.com/@praneetsavant'
export const SUBSTACK_PUBLICATION_URL = 'https://praneetsavant.substack.com'
export const SUBSTACK_ARCHIVE_URL = 'https://praneetsavant.substack.com/archive'
export const SUBSTACK_SUBSCRIBE_URL = 'https://praneetsavant.substack.com/subscribe'

export const articlesData: Article[] = []
