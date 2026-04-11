# VickyBytes — Live Tech Events Platform

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-61dafb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-3178c6)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-black)

A responsive live event streaming platform built as a frontend engineering assignment for VickyBytes.

## Project Overview

VickyBytes is a live tech events platform that helps developers discover and watch curated engineering sessions with an engaging, modern UI. The application provides a smooth discovery-to-streaming flow with strong focus on interaction quality, responsive behavior, and production-style UX patterns. It is a two-page application consisting of an Event Listing Page and an Event Streaming Page. The platform includes real-time search and filtering, live chat simulation, YouTube video integration, custom thumbnails, advanced filters, responsive design, preloader animation, and SEO optimization.

## Features

- Real-time search filtering by title
- Category filter pills across 9 categories
- Advanced filters: Sort A-Z, Time Range, Time of Day, Event Type, Trending, Upcoming
- Grid and List view toggle
- Like button toggle on each card
- Share button with clipboard copy
- Hover play button overlay on cards
- Event streaming page with YouTube iframe embed
- Custom thumbnail before video plays
- Live chat simulation with auto-scroll and fake messages
- Subscribe/Unsubscribe button with confirmation popup
- Share modal with social platform buttons
- Preloader with typing animation
- Scroll-triggered entry animations
- Sticky navbar
- Profile dropdown panel
- Fully responsive across mobile, tablet, desktop
- SEO metadata with Open Graph and Twitter Card support

## Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16.2.3 | Framework with App Router |
| React 19.2.4 | UI Library |
| TypeScript | Type safety across components |
| Tailwind CSS | Utility-first responsive styling |
| CSS Animations | Scroll reveals, transitions, preloader |
| Vercel | Production deployment |
| Cloudinary | Custom event thumbnail hosting |
| YouTube iFrame API | Embedded video streaming |
| Unsplash | Stock photography for event images |
| IntersectionObserver API | Scroll-triggered animations |

## Setup Instructions

1. Clone the repository:
	`git clone https://github.com/Aravindhan450/Event-Listing-Page.git`
2. Install dependencies:
	`npm install`
3. Run the development server:
	`npm run dev`
4. Open browser at:
	`http://localhost:3000` or your respective localhost port

## Project Structure

Vicky_Bytes/
├── app/
│   ├── layout.tsx                  # Root layout + SEO metadata
│   ├── page.tsx                    # Homepage entry point
│   ├── globals.css
│   └── events/
│       └── [id]/
│           └── page.tsx            # Event streaming page
│
├── components/
│   ├── ui/                         # Reusable atomic components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── VideoPlayer.tsx
│   │
│   ├── home/                       # Sections used only on HomePage
│   │   ├── HeroSection.tsx
│   │   ├── EventGrid.tsx
│   │   ├── EventCard.tsx
│   │   ├── FilterBar.tsx
│   │   ├── SearchBar.tsx
│   │   ├── StatsRow.tsx
│   │   └── WhyHostSection.tsx
│   │
│   └── event/                      # Sections used only on EventPage
│       ├── LiveChat.tsx
│       ├── EventInfo.tsx
│       └── ShareModal.tsx
│
├── data/
│   └── events.js                   # Events data array
│
├── hooks/
│   └── useDebounce.ts              # Custom hooks
│
├── public/
│   ├── robots.txt
│   └── sitemap.xml
│
├── next.config.ts
├── package.json
└── tsconfig.json

## Deployment

### Live Demo

Deployment platform: Vercel

Live URL: [https://event-listing-page-sepia.vercel.app/](https://event-listing-page-sepia.vercel.app/)





