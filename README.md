# Imperial Furnishings

Welcome to the **Imperial Furnishings** web application. This is a premium showcase website for a luxury, handcrafted furniture showroom based in Nairobi, Kenya. It features a modern, responsive user experience built with Next.js (App Router), React, Tailwind CSS (v4), and TypeScript.

---

## Features

- **Luxury Aesthetics & Typography**: Styled using a premium color palette (terracotta, linen, warm cream, gold, and charcoal) combined with elegant typography (Playfair Display for headings and DM Sans for body text).
- **Interactive Showroom Map**: A dedicated [Visit Us](app/visit/page.jsx) route featuring an embedded Google Maps view of the physical showroom.
- **Social Media & Order Inquiries**: Deep integration with WhatsApp and Instagram for customers to browse handcrafted designs or directly submit customized design requests.
- **Image Optimization**: Fully integrated with Cloudinary for fast, responsive, and optimized asset delivery via the Next.js `Image` component.

---

## Tech Stack & Architecture

- **Framework**: [Next.js v16](package.json) (App Router)
- **UI & Components**: [React v19](package.json)
- **Styling**: [Tailwind CSS v4](tailwind.config.js) (custom theme properties defined in [globals.css](app/globals.css)) & [Bootstrap v5](package.json)
- **Media Hosting**: [Cloudinary](next.config.ts) (remote pattern whitelist configured)

---

## Repository Structure

Below is the layout of the project, including descriptions of key directories and files:

```text

├── app/                              # Next.js App Router root
│   ├── components/                   # Shared UI components
│   │   ├── Footer.jsx                # Site footer containing contact details & links
│   │   └── Navbar.jsx                # Responsive header navigation
│   ├── visit/                        # Visit Us route
│   │   └── page.jsx                  # Showroom Google Maps locator
│   ├── globals.css                   # Global styles & Tailwind v4 customizations
│   ├── layout.jsx                    # Root HTML layout wrapping Navbar, Footer, and Fonts
│   ├── not-found.jsx                 # Custom 404 page
│   └── page.jsx                      # Main home page component
├── public/                           # Static assets
│   └── images/                       # Logo, icons, favicon, and hero images
├── eslint.config.mjs                 # ESLint settings
├── next.config.ts                    # Next.js configuration (Cloudinary patterns)
├── package.json                      # NPM scripts and dependencies
├── postcss.config.mjs                # PostCSS rules for Tailwind integration
├── tailwind.config.js                # Custom Tailwind configuration (colors and fonts)
└── tsconfig.json                     # TypeScript configuration
```

### Key Files:

- [package.json](package.json): Lists runtime dependencies, dev dependencies, and execution scripts.
- [next.config.ts](next.config.ts): Holds the Next.js runtime configurations (e.g. image hostname patterns).
- [tailwind.config.js](tailwind.config.js): Defines font-family stacks and the `imperial` color palette theme.
- [app/layout.jsx](app/layout.jsx): Sets up Google Fonts (`Playfair Display` and `DM Sans`) as CSS variables and applies default styles to the body.
- [app/page.jsx](app/page.jsx): The main page showcasing the company hero and lead-generation CTAs.
- [app/globals.css](app/globals.css): Custom components styles (`.btn-imperial`, `.btn-whatsapp`, `.btn-instagram`, `.nav-link-underline`).
- [app/components/Navbar.jsx](app/components/Navbar.jsx) & [app/components/Footer.jsx](app/components/Footer.jsx): Site header and footer.
- [app/visit/page.jsx](app/visit/page.jsx): Shows the interactive location component.

---

## Getting Started

### 1. Prerequisites

Make sure you have Node.js (version 18+ recommended) installed.

### 2. Installation

Clone the repository, navigate to the directory, and install dependencies:

```bash
npm install
```

### 3. Running the Development Server

Start the Next.js local server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

### 4. Build for Production

To generate a production-ready optimized build:

```bash
npm run build
npm run start
```

---

## Contact & Support

For queries or custom designs, reach out to the showroom:

- **Phone / WhatsApp**: `+254 704 338 341`
- **Instagram**: [@imperial*furnishings*](https://instagram.com/imperial_furnishings_)
- **Showroom Address**: Located in Nairobi, Kenya (see [Visit Us Page](app/visit/page.jsx) for details).
