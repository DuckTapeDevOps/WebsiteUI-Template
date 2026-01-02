# Architecture Decisions

This document records key architectural decisions for the WebsiteUI-Template repository.

## Why This Template Exists

This repository serves as an **upstream skeleton/template** for creating new website projects. It provides:
- A proven build system (Vite + React + TypeScript)
- A working deployment architecture (S3 + CloudFront + Route53)
- Reusable UI component patterns
- Infrastructure as Code (Terraform) setup

Future projects (e.g., `DuckTapeDevOpsUI`) are created from this template via GitHub Template functionality.

## What Stays Reusable vs What's Configurable

### Reusable Skeleton (Preserve Structure)
- **Build System**: Vite configuration, TypeScript config, build scripts
- **Infrastructure Architecture**: Terraform resource definitions, deployment flow
- **Component Patterns**: Reusable UI components (HeroSection, FeatureGrid, etc.)
- **Application Structure**: Router setup, provider patterns, file organization

### Configurable/Brand-Specific
- **Content**: Page text, feature descriptions, navigation labels
- **Visual Identity**: Colors, fonts, images, logos
- **Domain/Infrastructure**: Domain names, bucket names, resource names
- **Business Logic**: Domain-specific pages and features

## Build and Deployment Preservation Requirements

**Critical:** The build output structure and deployment behavior must remain unchanged.

### Build Output
- Output directory: `landing/dist/`
- Structure: `index.html` + `assets/` directory
- Build command: `npm run build` (unchanged)
- Asset paths: Relative paths from root (unchanged)

### Deployment Flow
1. Build → `dist/` directory
2. Upload → S3 bucket (via GitHub Actions or manual)
3. Invalidate → CloudFront cache
4. Route → Route53 DNS

**No changes to:**
- Build commands
- Output directory structure
- Upload process
- CloudFront configuration
- SPA routing (403/404 → index.html)

## Abstraction Patterns

### Configuration Files
- Use `src/config/` directory for brand/site configuration
- Separate concerns: `site.ts` (content), `theme.ts` (styling)
- Import config in components, don't hardcode values

### Component Props
- Make text content prop-driven
- Provide sensible defaults from config
- Keep component structure unchanged

### Infrastructure Variables
- Remove all hardcoded defaults
- Require explicit values in `terraform.tfvars`
- Provide `terraform.tfvars.example` files

### Theme System
- Keep Chakra UI theme extension structure
- Make colors/fonts configurable via config files
- Provide default neutral theme

## Configuration Override Pattern

Child repositories should override `landing/src/config/site.ts` to customize branding:

1. Copy `landing/src/config/site.example.ts` as a reference
2. Modify `landing/src/config/site.ts` with your brand values
3. All components automatically use the config values

The config file exports a `SiteConfig` interface and `siteConfig` object containing:
- Brand name, tagline, description
- Navigation items
- Contact/waitlist URLs and text
- Hero section content
- Home page features and content
- How it works steps

## Reference Documents

- `docs/PROJECT_CONTEXT.md` - Current repository state (authoritative)
- `docs/CLEANUP_PREPARATION.md` - Phased execution plan
- `docs/TEMPLATE_SETUP.md` - Template usage guide

