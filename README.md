This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


app/
├── admin/
│   ├── layout.jsx                    ← admin shell (sidebar + topbar); add auth guard here
│   ├── dashboard/page.jsx            ← stat cards + quick actions + recent products table
│   ├── login/
│   │   ├── layout.jsx                ← overrides parent layout (full-screen, no sidebar)
│   │   ├── page.jsx                  ← split-panel login page
│   │   └── LoginForm.jsx             ← client: email/password form + show/hide toggle
│   ├── register/
│   │   ├── page.jsx                  ← fetches roles server-side
│   │   └── RegisterForm.jsx          ← client: name/email/role/password + confirm
│   ├── categories/
│   │   ├── page.jsx                  ← categories table with image thumbnails
│   │   ├── CategoryForm.jsx          ← shared create/edit form (auto-slugify)
│   │   ├── new/page.jsx              ← wraps CategoryForm for creation
│   │   └── [id]/page.jsx             ← detail view + edit form + products sub-table
│   └── products/
│       ├── page.jsx                  ← products table with thumbnails
│       ├── ProductForm.jsx           ← shared create/edit form (auto-slugify, price int)
│       ├── new/page.jsx              ← wraps ProductForm; accepts ?category= param
│       └── [id]/page.jsx             ← detail view + edit form
└── components/admin/
    ├── AdminSidebar.jsx              ← dark sidebar, active link highlighting
    ├── AdminTopbar.jsx               ← page title + user avatar + sign out
    └── FormField.jsx                 ← Field, Input, Textarea, Select, SubmitButton, Card