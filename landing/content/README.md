# Content Directory

This directory is intended for page-specific content files that can be imported and used by page components.

## Purpose

The content directory provides a dedicated location for organizing page content separately from component logic. This makes it easier to:
- Customize content without modifying component code
- Organize content by page or feature
- Potentially support content management or internationalization in the future

## Current Status

**Note**: Content files are not yet wired into pages. This directory structure is being established in Phase 2 as preparation for future content abstraction.

Currently, page content is defined in `src/config/site.ts`. In future phases, content may be moved here or organized alongside the config system.

## Intended Structure

When fully implemented, this directory might contain:

```
content/
├── home.ts          # Home page content (features, hero text, etc.)
├── community.ts     # Community page content
├── about.ts         # About page content
└── README.md        # This file
```

## Usage Pattern (Future)

Content files would export structured content objects that can be imported by page components:

```typescript
// content/home.ts (example structure, not yet implemented)
export const homeContent = {
  hero: {
    title: "...",
    description: "...",
  },
  features: [...],
  // ...
}
```

## Next Steps

- Determine whether content should live in `content/` directory or remain in `config/`
- Wire content files into page components (if moving to this directory)
- Update documentation with final content organization pattern

