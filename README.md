# Praneet Savant — AI Engineer & Full-Stack Developer Portfolio

A responsive, high-performance personal portfolio built with **React 19**, **TypeScript**, and **Vite**. Features an editorial design system, interactive floating dock, live command palette, Substack archive integration, and cinematic decode animations.

🌐 **Live Website**: [praneetsavant.in](https://praneetsavant.in) · [portfolio-praneet.vercel.app](https://portfolio-praneet.vercel.app)  
✍️ **Substack**: [praneetsavant.substack.com](https://praneetsavant.substack.com)  
💻 **GitHub**: [@PraneetNS](https://github.com/PraneetNS)  
💼 **LinkedIn**: [in/praneetsavant](https://linkedin.com/in/praneetsavant)  

---

## ✨ Highlights & Key Features

* **Cinematic Decode Intro**: Progressive left-to-right character scramble decode animation with graceful fallback for reduced motion (`prefers-reduced-motion`).
* **Persistent Bottom Dock**: Glassmorphism navigation dock with real-time section spy tracking (`#top`, `#about`, `#work`, `#writing`, `#skills`, `#projects`, `#education`).
* **Interactive Command Palette (`Ctrl + K` / `Cmd + K`)**: Quick-jump search modal for navigating sections, filtering projects, exploring articles, and executing actions.
* **Verified Work Experience Timeline**: Chronological role progression with authentic company marks and badges (Edutainer, VRIF).
* **Substack Writings Archive**: Curated technical essays covering AI inference economics, agentic systems, MoE hybrid architectures, and LLM retrieval pipelines.
* **Interactive Project Showcase**: Deep dives into production-ready AI architectures (Aether AI Tutor, EduBot Course RAG, Clinical Documentation AI).
* **Zero CSS Framework Bloat**: Pure vanilla CSS design tokens, smooth scroll behavior, micro-interactions, and mobile responsiveness.

---

## 🛠️ Tech Stack

* **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: Vanilla CSS with custom properties (`:root` design tokens, glassmorphism, responsive grid & flexbox layouts)
* **Audio & Haptics**: Web Audio synthesis for tactile UI interaction feedback
* **Fonts**: Inter & JetBrains Mono (preconnect CDN)
* **Deployment**: [Vercel](https://vercel.com/) with automated Git CI/CD

---

## 📁 Project Structure

```text
Portfolio-main/
├── public/
│   ├── favicon.svg             # Bespoke monogram brandmark
│   └── images/                 # Company and product brand marks (Edutainer, VRIF)
├── src/
│   ├── app/
│   │   ├── data/
│   │   │   └── articles.ts     # Verified Substack articles archive data & schema
│   │   ├── App.tsx             # Main portfolio architecture, dock, sections & modal
│   │   ├── BrandLogo.tsx       # Custom SVG PS monogram logo component
│   │   └── portfolio.css       # Core design system, layouts, keyframes & responsive rules
│   ├── styles/
│   │   └── global.css          # CSS reset, :root variables, typography & accessibility
│   └── main.tsx                # React application root entrypoint
├── index.html                  # HTML5 shell with Open Graph, Twitter cards, & font preconnects
├── package.json
├── tsconfig.app.json
└── vite.config.ts
```

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation & Development
1. Clone the repository:
   ```bash
   git clone https://github.com/PraneetNS/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   Generates optimized assets in the `dist/` folder.

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 🚢 Deployment

The repository is configured for automated deployments with **Vercel**:
* **Branch**: `main`
* **Build Command**: `npm run build`
* **Output Directory**: `dist`
* **Install Command**: `npm install`

---

## 📄 License

Created by **Praneet Savant**. Code is available under the [MIT License](LICENSE).
