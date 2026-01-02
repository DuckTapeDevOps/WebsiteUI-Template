# Project Context

This document provides authoritative guidance on the current state of the WebsiteUI-Template repository. It describes the existing structure, technologies, deployment architecture, and the distinction between reusable components and brand-specific content.

## File Structure

### Root Level
```
/
├── CONTRIBUTING.md          # Contribution guidelines and IP notice
├── LICENSE                  # MIT License
├── README.md                # Project overview and Naval Nomad branding
└── docs/
    └── PROJECT_CONTEXT.md   # This file
```

### Frontend Application (`/landing`)
```
landing/
├── package.json             # Dependencies and build scripts
├── package-lock.json
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TS config
├── tsconfig.node.json       # Node-specific TS config
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── README.md                # Vite template README
│
├── public/                  # Static assets
│   ├── 404.html
│   ├── hero-image.svg
│   └── vite.svg
│
├── src/                     # Source code
│   ├── main.tsx            # React entry point
│   ├── App.tsx             # Root component with routing
│   ├── App.css
│   ├── index.css           # Global styles
│   ├── theme.ts            # Chakra UI theme configuration
│   ├── vite-env.d.ts       # Vite type definitions
│   │
│   ├── components/         # React components
│   │   ├── index.ts        # Component exports
│   │   ├── Navbar.tsx      # Navigation bar (brand-specific)
│   │   ├── HeroSection.tsx # Reusable hero component
│   │   ├── FeatureGrid.tsx # Reusable feature grid
│   │   ├── SectionWrapper.tsx # Reusable section wrapper
│   │   ├── CTASection.tsx  # Reusable CTA section
│   │   ├── NetworkSection.tsx # Reusable network display
│   │   ├── NauticalMap.tsx # Map component
│   │   ├── RoutePlanner.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Hero/           # Alternative hero component
│   │   │   └── index.tsx
│   │   ├── Benefits/
│   │   │   └── index.tsx
│   │   ├── Contact/
│   │   │   └── index.tsx   # Contact/waitlist page
│   │   └── HowItWorks/
│   │       └── index.tsx
│   │
│   └── pages/              # Page components
│       ├── Home.tsx        # Homepage (brand-specific content)
│       ├── Community.tsx
│       ├── MarinaExplorer.tsx
│       ├── Routes.tsx
│       ├── MapPage.tsx
│       └── LiveaboardGuides.tsx
│
└── infra/                   # Infrastructure as Code
    ├── bootstrap/          # Bootstrap infrastructure
    │   ├── backend.tf      # Terraform backend config
    │   ├── backend.tfvars
    │   ├── providers.tf
    │   ├── variables.tf
    │   ├── terraform.tfvars
    │   ├── github.tf        # GitHub OIDC and IAM role
    │   └── outputs.tf       # Bootstrap outputs
    │
    └── frontend/            # Frontend infrastructure
        ├── backend.tf       # Terraform backend config
        ├── backend.tfvars
        ├── providers.tf     # AWS provider config
        ├── variables.tf     # Input variables
        ├── terraform.tfvars # Variable values (navalnomad.com)
        ├── s3.tf            # S3 bucket configuration
        ├── cloudfront.tf    # CloudFront distribution
        ├── route53.tf       # DNS configuration
        ├── cognito.tf       # Cognito (if used)
        ├── secrets.tf       # Secrets management
        └── outputs.tf       # Infrastructure outputs (commented out)
```

## Frontend Framework and Build System

### Technology Stack
- **Framework**: React 18.2.0 with TypeScript
- **Build Tool**: Vite 6.3.5
- **UI Library**: Chakra UI 2.8.2
- **Routing**: React Router DOM 7.6.2
- **Maps**: MapLibre GL 5.6.0, @mapbox/mapbox-gl-draw 1.5.0
- **Styling**: Emotion (via Chakra UI), CSS modules
- **Icons**: Lucide React, React Icons, Chakra UI Icons
- **Animation**: Framer Motion 11.0.3
- **Geospatial**: @turf/turf 7.2.0
- **AWS**: aws-amplify 6.15.0 (configured but auth currently removed)

### Build Configuration
- **Entry Point**: `src/main.tsx`
- **HTML Template**: `index.html`
- **Output Directory**: `dist/` (configured in `vite.config.ts`)
- **Assets Directory**: `assets/` (within dist)
- **Source Maps**: Enabled for production builds
- **Base Path**: `/` (root-relative)

### Build Scripts
- `npm run dev`: Start Vite dev server (port 3000, host: true)
- `npm run build`: TypeScript type check + Vite production build
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build locally

### TypeScript Configuration
- Uses project references (`tsconfig.app.json`, `tsconfig.node.json`)
- Strict type checking enabled
- ES modules with modern target

## Build and Deployment Architecture

### Build Process
1. **Local Development**: `npm run dev` serves the app via Vite dev server
2. **Production Build**: `npm run build` executes:
   - TypeScript compilation check (`tsc`)
   - Vite production build to `dist/` directory
   - Asset optimization and bundling

### Deployment Infrastructure (AWS)

The site is deployed using **Terraform/OpenTofu** Infrastructure as Code with the following architecture:

#### Infrastructure Layers

**1. Bootstrap Infrastructure** (`landing/infra/bootstrap/`)
- **Purpose**: Sets up foundational AWS resources required for the frontend deployment
- **Resources**:
  - Terraform backend: S3 bucket + DynamoDB table for state locking
  - GitHub OIDC provider for CI/CD authentication
  - IAM role for GitHub Actions with permissions to:
    - Upload to S3 bucket (`s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`, `s3:ListBucket`)
    - Create CloudFront invalidations (`cloudfront:CreateInvalidation`)
- **Backend**: Remote state stored in S3 (configured via `backend.tf`)

**2. Frontend Infrastructure** (`landing/infra/frontend/`)
- **S3 Bucket** (`s3.tf`):
  - Bucket name: `navalnomad.com` (from `domain_name` variable)
  - Private bucket (all public access blocked)
  - Website configuration with `index.html` as index and error document (for SPA routing)
  - Bucket policy allows CloudFront Origin Access Identity (OAI) to read objects
  
- **CloudFront Distribution** (`cloudfront.tf`):
  - Origin: S3 bucket via Origin Access Identity
  - Default root object: `index.html`
  - Custom error responses: 403/404 → 200 with `/index.html` (SPA routing support)
  - SSL/TLS: ACM certificate (must be in `us-east-1`)
  - Aliases: `navalnomad.com` and `www.navalnomad.com`
  - Caching: TTLs configurable (default: min 0, default 3600, max 86400)
  - Price class: `PriceClass_100` (North America and Europe only)
  
- **Route53 DNS** (`route53.tf`):
  - A records (alias) for root domain and www subdomain
  - Points to CloudFront distribution

- **Cognito** (`cognito.tf`):
  - Present in infrastructure but authentication is currently disabled in the app

#### Deployment Flow
1. **Build**: `npm run build` creates optimized static files in `dist/`
2. **Upload**: Files are uploaded to S3 bucket (via GitHub Actions or manual)
3. **Invalidation**: CloudFront cache is invalidated to serve new content
4. **DNS**: Route53 routes traffic from domain to CloudFront distribution

#### CI/CD
- **Method**: GitHub Actions with OIDC authentication (no stored credentials)
- **Trigger**: Automatic deployment on push to main branch (per README)
- **IAM Role**: `github-actions-deployer` (created by bootstrap infrastructure)
- **Permissions**: S3 upload + CloudFront invalidation

### Environment Configuration
- **Domain**: `navalnomad.com` (hardcoded in `terraform.tfvars`)
- **Environment**: `prod` (default)
- **Region**: `us-east-1` (required for CloudFront ACM certificates)
- **CloudFront Price Class**: `PriceClass_100` (configurable)

## Brand-Specific Content

The following elements are specific to the Naval Nomad brand and should be customized for other sites:

### Theme and Styling (`src/theme.ts`)
- **Brand Colors**:
  - `brand`: Blue color palette (#0057E6 primary)
  - `navy`: Dark navy palette (#001D2E primary)
- **Fonts**:
  - Heading: "Playfair Display" (serif)
  - Body: "Inter" (sans-serif)
- **Color Mode**: Light mode default with system preference detection

### Brand Name and Text
- **Brand Name**: "Naval Nomad" (appears in Navbar, page titles, content)
- **Tagline**: "Turning Marinas into Villages"
- **Domain**: `navalnomad.com` (in infrastructure, navbar links, etc.)

### Page Content
- **Home Page** (`src/pages/Home.tsx`):
  - Hero title: "Naval Nomad Community"
  - Feature descriptions specific to maritime community
  - Network levels: Connections, Crew, Fleet (maritime-specific)
  
- **Navbar** (`src/components/Navbar.tsx`):
  - Brand name "Naval Nomad" in logo area
  - Navigation links: Community, Marina Explorer, Route Planner, Contact
  
- **Contact Page** (`src/components/Contact/index.tsx`):
  - Links to Naval Nomad-specific Google Form waitlist
  - Brand-specific messaging

- **Marina Explorer** (`src/pages/MarinaExplorer.tsx`):
  - Maritime-specific content and featured marinas
  - Liveaboard-focused messaging

- **HTML Title** (`index.html`):
  - "Naval Nomad - Live Your Dream Life at Sea"

### Static Assets
- `public/hero-image.svg`: Brand-specific hero image

### Infrastructure Variables
- `landing/infra/frontend/terraform.tfvars`: Contains `domain_name = "navalnomad.com"`
- `landing/infra/bootstrap/variables.tf`: Contains `github_repo` and `s3_bucket_name` defaults

## Reusable vs Site-Specific Components

### Reusable Components (Generic UI)
These components accept props and contain no brand-specific content:

- **`HeroSection.tsx`**: Generic hero section with title, subtitle, description, and CTA button
- **`FeatureGrid.tsx`**: Displays an array of features with icons, titles, and descriptions
- **`SectionWrapper.tsx`**: Wrapper component for page sections with optional title and background variants
- **`CTASection.tsx`**: Call-to-action section with title, description, and multiple buttons
- **`NetworkSection.tsx`**: Displays network levels with badges and descriptions (content via props)

### Site-Specific Components (Brand Content)
These components contain hardcoded brand-specific content:

- **`Navbar.tsx`**: Contains "Naval Nomad" brand name and navigation structure
- **`Contact/index.tsx`**: Links to Naval Nomad waitlist form
- **`Hero/index.tsx`**: Alternative hero with brand-specific text ("Live Your Dream Life at Sea")
- **All Page Components** (`src/pages/*`): Contain brand-specific content, copy, and data

### Hybrid Components
- **`NauticalMap.tsx`**: Map component (reusable structure, but may contain maritime-specific features)
- **`RoutePlanner.tsx`**: Route planning component (structure reusable, content may be domain-specific)
- **`Onboarding.tsx`**: Onboarding flow (structure reusable, content brand-specific)

### Theme Configuration
- **`theme.ts`**: Brand-specific colors and fonts, but structure is reusable (can be swapped with different color palettes and fonts)

## Application Architecture

### Routing
- **Router**: React Router DOM with BrowserRouter
- **Routes** (defined in `App.tsx`):
  - `/` → Home page
  - `/marina-explorer` → Marina Explorer page
  - `/routes` → Route Explorer page
  - `/community` → Community page
  - `/map` → Map Page
  - `/contact` → Contact/Waitlist page

### State Management
- **Current State**: No global state management library (React local state only)
- **Auth**: Previously used AWS Amplify, currently removed/disabled (comments in code indicate "Auth removed")

### Component Organization
- **Pages**: Full page components in `src/pages/`
- **Components**: Reusable UI components in `src/components/`
- **Exports**: Centralized component exports in `src/components/index.ts`

### Styling Approach
- **Primary**: Chakra UI component library with theme customization
- **Global Styles**: `index.css` for base styles
- **Component Styles**: `App.css` for app-specific styles
- **Color Mode**: Light/dark mode support via Chakra UI (system preference detection)

## Key Configuration Files

### Build Configuration
- **`vite.config.ts`**: Vite build settings, dev server config, base path
- **`tsconfig.json`**: TypeScript project configuration
- **`package.json`**: Dependencies, scripts, Node.js version requirement (>=24.2.0)

### Infrastructure Configuration
- **`landing/infra/frontend/terraform.tfvars`**: Domain and environment settings
- **`landing/infra/bootstrap/terraform.tfvars`**: Bootstrap-specific variables
- **`landing/infra/*/backend.tf`**: Remote state backend configuration

## Notes for Future Development

1. **Authentication**: Currently disabled. AWS Amplify is installed but not configured in the app.
2. **Cognito**: Infrastructure exists but may not be actively used.
3. **GitHub Actions**: Workflow files are not present in the repository, but infrastructure supports OIDC-based deployment.
4. **Outputs**: Infrastructure outputs are commented out in `landing/infra/frontend/outputs.tf`.
5. **Component Duplication**: Both `HeroSection.tsx` and `Hero/index.tsx` exist - may be legacy or alternative implementations.
6. **Map Components**: Multiple map-related components exist (`NauticalMap.tsx`, `RoutePlanner.tsx`, `MapPage.tsx`) - structure suggests maritime navigation features.

## Dependencies Summary

### Production Dependencies
- React ecosystem (react, react-dom, react-router-dom)
- Chakra UI and related styling libraries
- Map libraries (maplibre-gl, mapbox-gl-draw, turf)
- AWS Amplify (installed but auth disabled)
- Icons and animations (lucide-react, react-icons, framer-motion)

### Development Dependencies
- Vite and React plugin
- TypeScript and type definitions
- ESLint and TypeScript ESLint plugins

---

**This document reflects the current state of the repository as of the last scan. It should be treated as authoritative guidance for understanding the project structure and making informed decisions about modifications.**
