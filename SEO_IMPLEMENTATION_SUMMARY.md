# SEO Implementation Summary

## Updated files
- `app/layout.tsx`
- `app/page.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `next.config.ts`
- `package.json`

## Implemented changes

### Metadata and canonical setup
- Added `metadataBase` with the production origin.
- Replaced the generic game title/description with SEO-friendly homepage metadata for the product.
- Added canonical metadata, OG/Twitter metadata, and keyword tags.
- Preserved the Google Search Console verification token.

### Homepage SEO content
- Updated the main H1 to better reflect the product name and party-game intent.
- Added structured content blocks for:
  - how to play the imposter game
  - why play the game
  - game rules and win conditions
  - play with friends
  - FAQ
  - final CTA
- Added JSON-LD `WebApplication` structured data to the homepage.

### Sitemap and robots
- Kept the sitemap in the Next.js MetadataRoute format.
- Pointed it to the production origin.
- Added a `robots.ts` route to allow crawling and reference the sitemap.

### Security and compatibility
- Upgraded Next.js from `16.4.2` to `16.4.6` to address the known security advisory.
- Added the required `experimental.agentUpgrade = "security"` setting in `next.config.ts`.

## Validation
- `npx tsc --noEmit` ✅
- `npm run build` ✅

## Result
The site now has stronger on-page SEO, cleaner metadata, public crawl guidance, and a patched Next.js runtime for the security advisory.
