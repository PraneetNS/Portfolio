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

export const articlesData: Article[] = [
  {
    slug: 'the-20-illusion-is-cracking-but-your',
    title: 'The $20 Illusion Is Cracking. But Your Escape Hatch Is Getting More Expensive Too.',
    subtitle: "Why 'just self-host it' is worse advice in 2026 than it was a year ago",
    date: 'Sep 23, 2026',
    isoDate: '2026-09-23',
    url: 'https://praneetsavant.substack.com/p/the-20-illusion-is-cracking-but-your',
    topic: 'Inference & Hardware',
    readTime: '6 min read',
    coverImage: 'https://substackcdn.com/image/fetch/$s_!YGrz!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0787c602-49a0-40ae-85de-1e0c1f0d176c_1024x1536.png',
  },
  {
    slug: 'why-every-ai-startup-is-suddenly',
    title: 'Why Every AI Startup Is Suddenly "Agentic"',
    subtitle: 'A field guide to spotting relabeled RAG, orchestration scripts wearing a trench coat, and the ~130 companies actually doing something new',
    date: 'Aug 12, 2026',
    isoDate: '2026-08-12',
    url: 'https://praneetsavant.substack.com/p/why-every-ai-startup-is-suddenly',
    topic: 'Agentic Systems',
    readTime: '7 min read',
    coverImage: 'https://substackcdn.com/image/fetch/$s_!DOgY!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa07691b7-d949-4762-949a-c62cfd719b3f_1536x1024.png',
  },
  {
    slug: 'agentic-ai-just-got-its-first-casualty',
    title: "Agentic AI Just Got Its First Casualty (And It Wasn't Human)",
    subtitle: '2026 was supposed to be the year AI agents finally started doing real, billable work. They did. So did the ransomware.',
    date: 'Jul 20, 2026',
    isoDate: '2026-07-20',
    url: 'https://praneetsavant.substack.com/p/agentic-ai-just-got-its-first-casualty',
    topic: 'AI Security',
    readTime: '5 min read',
    coverImage: 'https://substackcdn.com/image/fetch/$s_!m5Gu!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4daf8215-5f5b-4a61-9537-d93d6238b951_1672x941.png',
  },
  {
    slug: 'the-20-illusion-why-ais-all-you-can',
    title: "The $20 Illusion: Why AI's All-You-Can-Eat Era Is Already Over",
    subtitle: 'Every prompt has a real cost. For three years, someone else was quietly paying it and that someone is running out of patience.',
    date: 'Jul 07, 2026',
    isoDate: '2026-07-07',
    url: 'https://praneetsavant.substack.com/p/the-20-illusion-why-ais-all-you-can',
    topic: 'AI Economics',
    readTime: '6 min read',
    coverImage: 'https://substackcdn.com/image/fetch/$s_!7sSL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe5cf4398-3c1d-4b96-bd84-598fb2db406f_1672x941.png',
  },
  {
    slug: 'will-ai-replace-programmers-the-productivity',
    title: 'Will AI Replace Programmers? The Productivity Paradox No One Can Explain',
    subtitle: "One of the most rigorous studies ever run on AI coding tools found it made experienced developers 19% slower. Another found a 26% gain. I'm about to graduate into this contradiction.",
    date: 'Jun 30, 2026',
    isoDate: '2026-06-30',
    url: 'https://praneetsavant.substack.com/p/will-ai-replace-programmers-the-productivity',
    topic: 'Developer Productivity',
    readTime: '8 min read',
    coverImage: 'https://substackcdn.com/image/fetch/$s_!nNlG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbfbc45e9-6134-4f16-bb21-553f6f4ab705_1536x1024.png',
  },
  {
    slug: 'attention-is-all-you-need-until-it',
    title: "Attention Is All You Need... Until It Isn't",
    subtitle: "Inside the quiet race to replace attention — and why nobody's shipping 'pure' anything anymore.",
    date: 'Jun 25, 2026',
    isoDate: '2026-06-25',
    url: 'https://praneetsavant.substack.com/p/attention-is-all-you-need-until-it',
    topic: 'Model Architectures',
    readTime: '6 min read',
    coverImage: 'https://substackcdn.com/image/fetch/$s_!cd6o!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe5bde3ec-8e5e-441c-ae0c-3a64b8bad111_960x580.svg',
  },
  {
    slug: 'mixture-of-experts-was-never-the',
    title: 'Mixture of Experts Was Never the Answer. Hybrid Architectures Are.',
    subtitle: "How Transformer attention, Mamba's state-space layers and sparse MoE routing quietly merged into one architecture and ended a three-year debate nobody won.",
    date: 'Jun 19, 2026',
    isoDate: '2026-06-19',
    url: 'https://praneetsavant.substack.com/p/mixture-of-experts-was-never-the',
    topic: 'Deep Learning',
    readTime: '7 min read',
    coverImage: 'https://substackcdn.com/image/fetch/$s_!oTgi!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fda371382-9958-475e-8b42-5d742b83d1de_722x355.png',
  },
  {
    slug: 'openai-vs-anthropic-vs-everyone-else',
    title: 'OpenAI vs Anthropic vs Everyone Else: The Real Battle Is the API Layer',
    subtitle: 'Prompt caching, tool-calling specs, and context pricing - not benchmarks are deciding who wins enterprise AI.',
    date: 'Jun 08, 2026',
    isoDate: '2026-06-08',
    url: 'https://praneetsavant.substack.com/p/openai-vs-anthropic-vs-everyone-else',
    topic: 'API Infrastructure',
    readTime: '5 min read',
    coverImage: 'https://substackcdn.com/image/fetch/$s_!umPR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbeefbd04-ec35-47b3-8600-330eed06bbd4_1694x929.png',
  },
  {
    slug: 'why-india-might-skip-the-llm-race',
    title: 'Why India Might Skip the LLM Race and Still Win',
    subtitle: 'Rethinking success in AI from parameter counts to real-world impact in a billion-user ecosystem',
    date: 'Apr 21, 2026',
    isoDate: '2026-04-21',
    url: 'https://praneetsavant.substack.com/p/why-india-might-skip-the-llm-race',
    topic: 'Ecosystem Strategy',
    readTime: '6 min read',
    coverImage: 'https://substackcdn.com/image/fetch/$s_!b8vc!,w_256,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F07899682-796c-4445-98b5-8f0f6227c50e_1381x1381.png',
  },
]
