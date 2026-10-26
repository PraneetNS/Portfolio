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

export const articlesData: Article[] = []
