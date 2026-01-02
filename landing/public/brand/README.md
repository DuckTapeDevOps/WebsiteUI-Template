# Brand Assets

This directory contains brand-specific static assets that should be customized for each project.

## Required Assets

### Hero Image
- **File**: `hero-image.svg` (or `.png`, `.jpg`)
- **Usage**: Main hero image displayed on the homepage
- **Current**: Copied from `public/hero-image.svg` as placeholder
- **Customization**: Replace with your brand's hero image

### Favicon
- **File**: `favicon.ico`
- **Usage**: Browser tab icon
- **Current**: Referenced in `index.html` but not yet created
- **Customization**: Add your brand's favicon file here

## Optional Assets

You may also want to add:
- Logo files (`.svg`, `.png`)
- Brand-specific images
- Other visual assets

## Path References

Assets in this directory are referenced via `/brand/` paths in the configuration:
- Hero image: `/brand/hero-image.svg` (configured in `src/config/site.ts`)
- Favicon: `/brand/favicon.ico` (referenced in `index.html`)

## Note

These assets are copied to the build output during the build process. Ensure all paths in your configuration use `/brand/` prefix.

