# Cleanup Preparation: Template Generalization

This document identifies NavalNomad-specific elements that need to be removed or abstracted to transform this repository into a reusable website template. It also defines the boundary between reusable skeleton code and brand-specific content.

## Understanding

This repository (`WebsiteUI-Template`) is the **upstream skeleton/template** for future website projects. Future child repositories (e.g., `DuckTapeDevOpsUI`) will be created from this template via GitHub Template functionality.

**Preservation Goals:**
- Maintain existing build and deployment behavior
- Preserve infrastructure architecture (S3 + CloudFront + Route53)
- Keep reusable component structure intact
- Maintain build system configuration (Vite, TypeScript, etc.)

**Generalization Goals:**
- Remove or abstract all NavalNomad-specific content
- Make theme configurable (colors, fonts)
- Abstract domain and infrastructure defaults
- Create placeholder/template content for pages

---

## Checklist: NavalNomad-Specific Elements to Remove or Abstract

### Root Level Files

- [ ] **`README.md`**
  - Remove: "Naval Nomad Community" title
  - Remove: "Turning Marinas into Villages" tagline
  - Remove: All NavalNomad-specific feature descriptions
  - Remove: Maritime/boating-specific content
  - Remove: "Production (navalnomad.com)" deployment section
  - Abstract: Replace with generic template README explaining structure and usage
  - Keep: Project structure, development, deployment, infrastructure sections (generalized)

- [ ] **`CONTRIBUTING.md`**
  - Remove: "Contributing to Naval Nomad" title
  - Remove: NavalNomad IP notice
  - Abstract: Replace with generic contribution guidelines
  - Keep: Code of conduct, development process, PR process, style guide structure

- [ ] **`LICENSE`**
  - Update: Copyright holder (if applicable)
  - Keep: MIT License structure

### Frontend Application (`/landing`)

#### Configuration Files

- [ ] **`index.html`**
  - Remove: "Naval Nomad - Live Your Dream Life at Sea" title
  - Abstract: Replace with generic placeholder (e.g., "Website Template")

- [ ] **`vite.config.ts`**
  - Remove: Comment referencing `/NavalNomadUI/` (already changed, but verify)
  - Keep: All build configuration

- [ ] **`package.json`**
  - Review: Consider if map libraries (maplibre, mapbox, turf) are template-appropriate or domain-specific
  - Keep: All dependencies (they're reusable)

#### Theme and Styling

- [ ] **`src/theme.ts`**
  - Remove: `brand` color palette (NavalNomad blue #0057E6)
  - Remove: `navy` color palette (NavalNomad navy #001D2E)
  - Remove: "Playfair Display" heading font
  - Remove: "Inter" body font
  - Abstract: Replace with generic neutral color palette and system fonts, or create theme configuration system
  - Keep: Theme structure, color mode support, Chakra UI extension pattern

#### Components

- [ ] **`src/components/Navbar.tsx`**
  - Remove: Hardcoded "Naval Nomad" brand name (line 16)
  - Remove: Navigation items specific to maritime domain (Marina Explorer, Route Planner)
  - Abstract: Make brand name configurable (prop or config)
  - Abstract: Make navigation items configurable (array prop or config file)
  - Keep: Component structure, routing, color mode toggle

- [ ] **`src/components/Contact/index.tsx`**
  - Remove: NavalNomad-specific waitlist Google Form URL
  - Remove: "Join the Waitlist" NavalNomad messaging
  - Abstract: Make contact form/URL configurable (prop or config)
  - Keep: Component structure and layout

- [ ] **`src/components/Hero/index.tsx`**
  - Remove: "Live Your Dream Life at Sea" heading
  - Remove: Maritime-specific description text
  - Remove: "Find Your Boat" / "List Your Boat" button text
  - Abstract: Make all text content configurable via props
  - Keep: Component structure, image handling, layout

- [ ] **`src/components/Benefits/index.tsx`**
  - Review: Check for NavalNomad-specific content
  - Abstract: If present, make content configurable

- [ ] **`src/components/HowItWorks/index.tsx`**
  - Review: Check for NavalNomad-specific content (line 23 mentions "Naval Nomad")
  - Abstract: Make content configurable

- [ ] **`src/components/NauticalMap.tsx`**
  - Review: Determine if this is domain-specific (maritime) or reusable
  - Decision: If maritime-specific, consider renaming or abstracting
  - Keep: Map component structure if reusable

- [ ] **`src/components/RoutePlanner.tsx`**
  - Review: Determine if this is domain-specific (maritime routes) or reusable
  - Decision: If maritime-specific, consider abstracting or removing
  - Keep: Component structure if reusable

- [ ] **`src/components/Onboarding.tsx`**
  - Review: Check for brand-specific content
  - Abstract: Make content configurable

#### Pages

- [ ] **`src/pages/Home.tsx`**
  - Remove: "Naval Nomad Community" title
  - Remove: "Turning Marinas into Villages" subtitle
  - Remove: Maritime-specific feature descriptions
  - Remove: Maritime network levels (Connections, Crew, Fleet)
  - Abstract: Replace with generic placeholder content or make fully configurable
  - Keep: Component composition pattern (HeroSection, FeatureGrid, etc.)

- [ ] **`src/pages/Community.tsx`**
  - Remove: All maritime/boating-specific content
  - Remove: "Naval Nomad" references (lines 113, 266)
  - Abstract: Replace with generic community page template or remove if domain-specific
  - Decision: Determine if this page is reusable or domain-specific

- [ ] **`src/pages/MarinaExplorer.tsx`**
  - Remove: Entire file (maritime-specific)
  - OR: Abstract into generic "Explorer" or "Directory" page template
  - Decision: Determine if explorer pattern is reusable

- [ ] **`src/pages/Routes.tsx`**
  - Remove: "Naval Nomad" reference (line 100)
  - Remove: Maritime route planning content
  - Abstract: Replace with generic routes/navigation page or remove if domain-specific
  - Decision: Determine if route planning is reusable

- [ ] **`src/pages/MapPage.tsx`**
  - Review: Check for maritime-specific content
  - Abstract: Make generic map page or remove if domain-specific

- [ ] **`src/pages/LiveaboardGuides.tsx`**
  - Remove: Entire file (maritime-specific)
  - OR: Abstract into generic "Guides" or "Resources" page template

#### Static Assets

- [ ] **`public/hero-image.svg`**
  - Remove: NavalNomad-specific hero image
  - Abstract: Replace with generic placeholder or remove (let projects add their own)

- [ ] **`public/404.html`**
  - Remove: "Naval Nomad" title
  - Abstract: Replace with generic 404 page

#### App Configuration

- [ ] **`src/App.tsx`**
  - Review: Routes may reference domain-specific pages
  - Abstract: Make routes configurable or provide example routes
  - Keep: Router structure, ChakraProvider setup

### Infrastructure (`/landing/infra`)

#### Bootstrap Infrastructure

- [ ] **`landing/infra/bootstrap/variables.tf`**
  - Remove: Default `github_repo = "krypton/NavalNomadUI"` (line 4)
  - Remove: Default `s3_bucket_name = "naval-nomad-frontend"` (line 10)
  - Remove: Default `domain_name = "navalnomad.com"` (line 27)
  - Abstract: Remove defaults or set to placeholder values
  - Keep: Variable definitions and structure

- [ ] **`landing/infra/bootstrap/terraform.tfvars`**
  - Remove: `github_repo = "DuckTapeDevOps/NavalNomadUI"`
  - Remove: `s3_bucket_name = "navalnomad.com"`
  - Abstract: Replace with placeholder values or remove (require explicit values)
  - Keep: File structure

- [ ] **`landing/infra/bootstrap/backend.tfvars`**
  - Remove: `bucket = "naval-nomad-terraform-state"`
  - Remove: `dynamodb_table = "naval-nomad-terraform-locks"`
  - Abstract: Replace with placeholder values
  - Keep: File structure

#### Frontend Infrastructure

- [ ] **`landing/infra/frontend/variables.tf`**
  - Remove: Default `domain_name = "navalnomad.com"` (line 4)
  - Abstract: Remove default or set to placeholder
  - Keep: Variable definitions

- [ ] **`landing/infra/frontend/terraform.tfvars`**
  - Remove: `domain_name = "navalnomad.com"`
  - Abstract: Replace with placeholder or remove (require explicit value)
  - Keep: File structure

- [ ] **`landing/infra/frontend/backend.tfvars`**
  - Remove: `bucket = "naval-nomad-terraform-state"`
  - Remove: `dynamodb_table = "naval-nomad-terraform-locks"`
  - Abstract: Replace with placeholder values
  - Keep: File structure

- [ ] **`landing/infra/frontend/cognito.tf`**
  - Remove: `name = "naval-nomad-web-client"` (line 3)
  - Remove: `bucket = "naval-nomad-terraform-state"` (line 70)
  - Remove: `name = "naval-nomad-cognito-auth-role"` (line 78)
  - Abstract: Make names configurable via variables
  - Keep: Cognito infrastructure structure (if keeping Cognito)

- [ ] **`landing/infra/frontend/secrets.tf`**
  - Remove: `name = "naval-nomad/google-oauth"` (line 2)
  - Remove: NavalNomad-specific description
  - Remove: Comment with NavalNomad reference (line 10)
  - Abstract: Make secret names configurable via variables
  - Keep: Secrets management structure

- [ ] **`landing/infra/frontend/route53.tf`**
  - Keep: Structure is already generic (uses variables)
  - Verify: No hardcoded domain references

- [ ] **`landing/infra/frontend/cloudfront.tf`**
  - Keep: Structure is already generic (uses variables)
  - Verify: No hardcoded domain references

- [ ] **`landing/infra/frontend/s3.tf`**
  - Keep: Structure is already generic (uses variables)
  - Verify: No hardcoded bucket names

---

## Proposed Boundary: Reusable Skeleton vs Brand-Specific Content

### Reusable Skeleton (Keep and Generalize)

**Build System & Configuration:**
- Vite configuration (`vite.config.ts`)
- TypeScript configuration (`tsconfig.*.json`)
- ESLint configuration (`eslint.config.js`)
- Package dependencies (`package.json`, `package-lock.json`)
- Build scripts and processes

**Infrastructure Architecture:**
- Terraform file structure and organization
- Infrastructure resource definitions (S3, CloudFront, Route53, etc.)
- Variable system (structure, not defaults)
- Backend configuration structure
- GitHub OIDC setup pattern
- Deployment flow architecture

**Reusable Components:**
- `HeroSection.tsx` - Generic hero with props
- `FeatureGrid.tsx` - Generic feature display
- `SectionWrapper.tsx` - Generic section wrapper
- `CTASection.tsx` - Generic CTA section
- `NetworkSection.tsx` - Generic network/badge display
- Component export system (`components/index.ts`)

**Application Structure:**
- React Router setup pattern
- Chakra UI provider pattern
- Theme extension structure (without specific colors/fonts)
- Page component organization pattern
- Routing structure (as example/template)

**Development Workflow:**
- Dev server configuration
- Build process
- Linting setup
- Type checking setup

### Brand-Specific Content (Remove or Abstract)

**Content & Copy:**
- All page content (text, descriptions, features)
- Brand names and taglines
- Navigation labels and structure
- Button text and CTAs
- Error messages and placeholders

**Visual Identity:**
- Color palettes (brand, navy)
- Font families (Playfair Display, Inter)
- Hero images and graphics
- Favicon (if present)

**Domain & Infrastructure:**
- Domain names (navalnomad.com)
- S3 bucket names
- GitHub repository references
- Cognito resource names
- Secrets Manager names
- Terraform state bucket names

**Business Logic:**
- Domain-specific pages (MarinaExplorer, LiveaboardGuides)
- Domain-specific components (NauticalMap, RoutePlanner - if maritime-specific)
- Contact/waitlist form URLs
- Feature descriptions and use cases

**Documentation:**
- README content (replace with template instructions)
- CONTRIBUTING content (generalize)
- Project-specific documentation

### Abstraction Strategy

**Configuration Files:**
- Create `src/config/brand.ts` or `src/config/site.ts` for:
  - Brand name
  - Theme colors
  - Fonts
  - Navigation items
  - Contact information
  - Page metadata

**Theme System:**
- Keep theme structure but make colors/fonts configurable
- Provide default neutral theme
- Allow theme override via config

**Component Props:**
- Make all text content prop-driven
- Provide sensible defaults or require props
- Document required vs optional props

**Infrastructure Variables:**
- Remove all defaults
- Require explicit values in `terraform.tfvars`
- Provide example `terraform.tfvars.example` files
- Document required variables

**Page Templates:**
- Replace brand-specific pages with template/example pages
- Show component composition patterns
- Include placeholder content that demonstrates structure

---

## GitHub Template Usage Confirmation

**Confirmed:** Future child repositories (e.g., `DuckTapeDevOpsUI`) should be created from this repository using GitHub's **Template Repository** functionality.

**Process:**
1. Mark this repository as a template in GitHub settings
2. New projects use "Use this template" button
3. GitHub creates a new repository with all files
4. Child repositories customize:
   - Brand configuration
   - Theme colors and fonts
   - Domain and infrastructure variables
   - Page content
   - Navigation structure
   - Static assets

**Benefits:**
- Preserves git history (optional)
- Creates clean starting point
- Maintains separation between template and projects
- Allows template updates without affecting child repos

**Template Repository Requirements:**
- All NavalNomad-specific content removed or abstracted
- Clear documentation on what to customize
- Example/placeholder content showing structure
- Configuration system for easy customization

---

## Next Steps (After Cleanup)

1. **Create Configuration System:**
   - `src/config/site.ts` for brand/site configuration
   - Document all configurable values

2. **Create Example Files:**
   - `terraform.tfvars.example` files
   - Example page content showing patterns
   - Example theme configuration

3. **Update Documentation:**
   - Template README with setup instructions
   - Configuration guide
   - Customization guide

4. **Test Template:**
   - Create test child repository
   - Verify customization process
   - Document any issues

5. **Mark as Template:**
   - Enable GitHub Template Repository setting
   - Add template badge/notice to README

---

**This document serves as the preparation guide for cleanup. No changes should be made until explicit approval to proceed with cleanup tasks.**

