# Notion Blog

A minimal, high-performance blog built with Next.js and powered by Notion as the CMS.

## Features

- **Notion as CMS**: Write and manage content directly in Notion.
- **Next.js 16**: Built with the latest App Router and Server Components.
- **Glassmorphism UI**: Modern, sleek interface with glassmorphic cards and interactive background.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile.
- **Fast & SEO Friendly**: Statically generated pages with incremental revalidation.
- **Tailwind CSS v4**: Styled with the latest utility-first CSS framework.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, Lucide React (Icons)
- **Animations**: Custom DotGrid
- **Data Fetching**: `@notionhq/client`, `notion-to-md`

## Getting Started

### Prerequisites

- Node.js 18+
- A Notion Integration Token
- A Notion Database ID with the following properties:
  - `Title` (Title)
  - `Slug` (Text)
  - `Published Date` (Date)
  - `Status` (Status: "Published")
  - `Cover` (Files & Media or URL)

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
NOTION_TOKEN=your_integration_token
NOTION_DATABASE_ID=your_database_id
```

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## Deployment

Deploy easily on [Vercel](https://vercel.com) or any platform that supports Next.js.
