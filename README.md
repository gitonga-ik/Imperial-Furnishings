# Imperial Furnishings

> **Furniture That Tells a Story**  
> Handcrafted pieces designed for the way you live. Timeless quality meets modern elegance.

Imperial Furnishings is a full-stack e-commerce and showcase platform built for a luxury handcrafted furniture brand based in Nairobi, Kenya. The application offers customers an immersive browsing experience for bespoke furniture collections, direct inquiry and ordering channels via WhatsApp and phone, and an administrative back-office portal for managing products, categories, media, and staff.

---

## Table of Contents

- [About the Platform](#about-the-platform)
  - [Customer Storefront](#customer-storefront)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started & Setup Instructions](#getting-started--setup-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Setup the Database & Prisma ORM](#4-setup-the-database--prisma-orm)
  - [5. Seed Initial Roles](#5-seed-initial-roles)
  - [6. Start the Development Server](#6-start-the-development-server)
- [Admin Access & Management](#admin-access--management)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)

---

## About the Platform

### Customer Storefront

- **Curated Collections & Categories:** Browse handcrafted furniture across spaces such as Living Room, Bedroom, and Dining Room.
- **Instant Product Search:** Real-time search by piece name or category on the catalog page.
- **Rich Product Detail Pages:** View high-resolution imagery, pricing in Kenyan Shillings (KES / Ksh), descriptions, and dimension specifications.
- **Direct WhatsApp & Phone Inquiries:** Seamless one-click WhatsApp chat integration pre-filled with the item of interest for rapid custom quotes and ordering.
- **Showroom Location:** Interactive Google Maps embed directing clients to the Nairobi showroom.
- **Luxury Aesthetic:** Styled with warm earth tones, DM Sans body text, and Playfair Display serif typography.

### Administrative Portal (`/admin`)

- **Secure JWT Authentication:** HTTP-only cookie-based authentication verified via Next.js proxy middleware.
- **Dashboard Overview:** Real-time statistics including total listed products, categories, staff count, and recent inventory additions.
- **Product Management:** Full CRUD capabilities for adding, updating, and removing products with auto-generated URL slugs.
- **Category Management:** Create and organize furniture categories with dedicated cover images and descriptions.
- **Cloudinary Image Hosting:** Direct image upload pipeline powered by Cloudinary for high-performance delivery and optimization.
- **Staff Registration & Role Assignment:** Register administrative team members and link them to designated system roles.

---

## Tech Stack

| Layer              | Technology                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**      | [Next.js 16](https://nextjs.org/) (App Router)                                                                                                                      |
| **UI & Styling**   | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/), [Bootstrap Icons](https://icons.getbootstrap.com/) |
| **Database**       | [PostgreSQL](https://www.postgresql.org/) (compatible with Neon, Supabase, AWS RDS, local Postgres)                                                                 |
| **ORM**            | [Prisma 7](https://www.prisma.io/) with `@prisma/adapter-pg` driver adapter                                                                                         |
| **Media Storage**  | [Cloudinary](https://cloudinary.com/) (`cloudinary`, `next-cloudinary`)                                                                                             |
| **Authentication** | [Jose](https://github.com/panva/jose) (JWT) & [bcrypt](https://github.com/kelektiv/node.bcrypt.js)                                                                  |
| **Validation**     | [Zod](https://zod.dev/)                                                                                                                                             |
| **Analytics**      | [@vercel/analytics](https://vercel.com/analytics)                                                                                                                   |

---

## Prerequisites

Before starting, ensure you have the following installed on your machine:

- **Node.js**: `v20.x` or higher (compatible with React 19 and Next.js 16)
- **Package Manager**: `npm` (comes with Node), `pnpm`, or `yarn`
- **PostgreSQL Database**: A running instance (local PostgreSQL or cloud-hosted such as [Neon](https://neon.tech/), [Supabase](https://supabase.com/), or [Railway](https://railway.app/))
- **Cloudinary Account**: A free account at [cloudinary.com](https://cloudinary.com/) for media uploads

---

## Getting Started & Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Imperial-Furnishings.git
cd Imperial-Furnishings
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project. You can copy the provided `.env.example`:

```bash
cp .env.example .env
```

Open `.env` and fill in the required environment variables:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/imperial_furnishings?sslmode=require"

# Cloudinary configuration (found in your Cloudinary Dashboard under Settings > Access Keys)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Secret key for signing JWT tokens (generate a strong random string)
JWT_SECRET_KEY="your-secure-random-32-or-64-char-secret-string"
```

> [!TIP]
> You can generate a strong JWT secret using OpenSSL in your terminal:
>
> ```bash
> openssl rand -hex 64
> ```

### 4. Setup the Database & Prisma ORM

Run the database migrations to apply the schema to your PostgreSQL database:

```bash
npx prisma migrate dev
```

Generate the Prisma client artifacts:

```bash
npx prisma generate
```

### 5. Seed Initial Roles

The user registration form requires a valid `role` record in the database. You can populate the `role` table by opening Prisma Studio or running a SQL query.

#### Option A: Using Prisma Studio (GUI)

```bash
npx prisma studio
```

1. Navigate to the `role` table in the browser GUI.
2. Add a new record:
   - **role_name:** `Admin`
   - **slug:** `admin`
   - **role_description:** `Full administrative access`
3. Save the changes.

#### Option B: Using SQL directly

Execute the following query against your PostgreSQL database:

```sql
INSERT INTO "role" ("id", "role_name", "slug", "role_description")
VALUES (gen_random_uuid(), 'Admin', 'admin', 'Full administrative access');
```

### 6. Start the Development Server

```bash
npm run dev
```

The application will be live at:

- **Storefront:** [http://localhost:3000](http://localhost:3000)
- **Admin Login:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Admin Access & Management

1. **Initial Registration:** Visit [http://localhost:3000/admin/register](http://localhost:3000/admin/register) to register your first administrator account with the `admin` role created in Step 5.
2. **Login:** Access [http://localhost:3000/admin/login](http://localhost:3000/admin/login) using your registered email and password.
3. **Route Protection:** All routes matching `/admin` (except `/admin/login`) are protected by [`proxy.ts`](proxy.ts). Unauthorized requests are redirected to the login screen.
4. **Media Uploads:** When adding or editing products or categories, product images are uploaded directly to your Cloudinary media library.

---

## Available Scripts

| Command                  | Description                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| `npm run dev`            | Runs the Next.js development server on `http://localhost:3000`        |
| `npm run build`          | Generates the Prisma Client and compiles the Next.js production build |
| `npm run start`          | Starts the Next.js production server (requires `npm run build` first) |
| `npm run lint`           | Runs ESLint to inspect code quality and catch syntax issues           |
| `npx prisma studio`      | Opens an interactive database GUI in your browser                     |
| `npx prisma migrate dev` | Applies database schema migrations during development                 |

---

## Deployment

### Vercel

1. Push your repository to GitHub / GitLab / Bitbucket.
2. Import the project into [Vercel](https://vercel.com/).
3. Add the environment variables (`DATABASE_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `JWT_SECRET_KEY`) under **Project Settings > Environment Variables**.
4. The build command in `package.json` (`prisma generate && next build`) will automatically generate the Prisma Client before building the Next.js application.
