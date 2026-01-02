# Template Generalization: Phased Execution Plan

## Confirmation

**Status:** No source code, routing, build configuration, or deployment configuration has been modified. This document is planning-only.

**Current State:** This repository contains NavalNomad-specific content that must be abstracted to create a reusable website template.

**Goal:** Transform this repository into a reusable template while preserving build output and deployment behavior (S3 + CloudFront).

---

## Current State Inventory

### NavalNomad-Specific Files and Content

#### Root Level Documentation
- **`README.md`**
  - Line 1: "Naval Nomad Community" title
  - Line 3: "Turning Marinas into Villages" tagline
  - Lines 5-33: Maritime/boating-specific feature descriptions
  - Line 55: "Production (navalnomad.com)" deployment reference
  - Lines 78-82: NavalNomad-specific development philosophy

- **`CONTRIBUTING.md`**
  - Line 1: "Contributing to Naval Nomad" title
  - Lines 11-12: NavalNomad IP notice and brand protection language

- **`LICENSE`**
  - Line 4: "Copyright (c) 2024 Naval Nomad" (if present)

#### Frontend Application

**HTML Entry Point:**
- **`landing/index.html`**
  - Line 7: `<title>Naval Nomad - Live Your Dream Life at Sea</title>`

**Theme Configuration:**
- **`landing/src/theme.ts`**
  - Lines 11-22: `brand` color palette (NavalNomad blue #0057E6)
  - Lines 23-34: `navy` color palette (NavalNomad navy #001D2E)
  - Line 37: `heading: '"Playfair Display", serif'`
  - Line 38: `body: '"Inter", sans-serif'`

**Components:**
- **`landing/src/components/Navbar.tsx`**
  - Line 16: Hardcoded "Naval Nomad" brand name
  - Lines 24-83: Navigation items (Community, Marina Explorer, Route Planner) - maritime domain-specific

- **`landing/src/components/Contact/index.tsx`**
  - Line 5: NavalNomad-specific Google Form waitlist URL
  - Line 22: "Be among the first to experience Naval Nomad" messaging
  - Line 33: "Join Naval Nomad Waitlist" button text

- **`landing/src/components/Hero/index.tsx`**
  - Line 26: "Live Your Dream Life at Sea" heading
  - Lines 28-30: Maritime-specific description text
  - Lines 39, 48: "Find Your Boat" / "List Your Boat" button text

- **`landing/src/components/HowItWorks/index.tsx`**
  - Line 23: "begin your life as a Naval Nomad" description

**Pages:**
- **`landing/src/pages/Home.tsx`**
  - Line 73: `title="Naval Nomad Community"`
  - Lines 6-25: Maritime-specific core features (Find Your Fleet, Marina Chat, Maritime Story)
  - Lines 27-46: Maritime network features (Connect, Share Location, Build Community)
  - Lines 48-67: Maritime network levels (Connections, Crew, Fleet)

- **`landing/src/pages/Community.tsx`**
  - Line 113: "Naval Nomad is about building" reference
  - Line 266: "naval nomads and marinas" reference
  - Entire file: Maritime/boating-specific community content

- **`landing/src/pages/MarinaExplorer.tsx`**
  - Entire file: Maritime-specific marina explorer page
  - Lines 7-27: Featured marinas (Miami, Charleston, Norfolk)
  - Line 38: "Find liveaboard-friendly marinas along the East Coast"

- **`landing/src/pages/Routes.tsx`**
  - Line 100: "We're building Naval Nomad" reference
  - Entire file: Maritime route planning content

- **`landing/src/pages/LiveaboardGuides.tsx`**
  - Entire file: Maritime-specific liveaboard guides

- **`landing/src/pages/MapPage.tsx`**
  - Uses `NauticalMap` component (may be maritime-specific)

**Static Assets:**
- **`landing/public/hero-image.svg`**
  - NavalNomad-specific hero image (maritime/yacht imagery)

- **`landing/public/404.html`**
  - Line 5: `<title>Naval Nomad</title>`

**Vite Configuration:**
- **`landing/vite.config.ts`**
  - Line 7: Comment referencing `/NavalNomadUI/` (verify if still present)

#### Infrastructure Configuration

**Bootstrap Infrastructure:**
- **`landing/infra/bootstrap/variables.tf`**
  - Line 4: Default `github_repo = "krypton/NavalNomadUI"`
  - Line 10: Default `s3_bucket_name = "naval-nomad-frontend"`
  - Line 27: Default `domain_name = "navalnomad.com"`

- **`landing/infra/bootstrap/terraform.tfvars`**
  - `github_repo = "DuckTapeDevOps/NavalNomadUI"`
  - `s3_bucket_name = "navalnomad.com"`

- **`landing/infra/bootstrap/backend.tfvars`**
  - `bucket = "naval-nomad-terraform-state"`
  - `dynamodb_table = "naval-nomad-terraform-locks"`

**Frontend Infrastructure:**
- **`landing/infra/frontend/variables.tf`**
  - Line 4: Default `domain_name = "navalnomad.com"`

- **`landing/infra/frontend/terraform.tfvars`**
  - `domain_name = "navalnomad.com"`

- **`landing/infra/frontend/backend.tfvars`**
  - `bucket = "naval-nomad-terraform-state"`
  - `dynamodb_table = "naval-nomad-terraform-locks"`

- **`landing/infra/frontend/cognito.tf`**
  - Line 3: `name = "naval-nomad-web-client"`
  - Line 70: `bucket = "naval-nomad-terraform-state"`
  - Line 78: `name = "naval-nomad-cognito-auth-role"`

- **`landing/infra/frontend/secrets.tf`**
  - Line 2: `name = "naval-nomad/google-oauth"`
  - Line 3: Description containing "Naval Nomad"
  - Line 10: Comment with NavalNomad reference

---

## Target Template Boundaries

### Reusable Skeleton (Preserve Structure, Abstract Values)

**Build System (No Changes):**
- `landing/vite.config.ts` - Keep all build configuration
- `landing/tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - Keep TypeScript config
- `landing/eslint.config.js` - Keep linting config
- `landing/package.json` - Keep dependencies and scripts
- Build output: `landing/dist/` directory structure unchanged

**Infrastructure Architecture (Preserve Structure, Abstract Values):**
- `landing/infra/bootstrap/*.tf` - Keep Terraform resource definitions
- `landing/infra/frontend/*.tf` - Keep infrastructure resource definitions
- Variable system structure (remove defaults, require explicit values)
- Backend configuration pattern
- GitHub OIDC setup pattern
- Deployment flow: Build → S3 → CloudFront → Route53 (unchanged)

**Reusable Components (Keep, May Need Props):**
- `landing/src/components/HeroSection.tsx` - Already prop-driven
- `landing/src/components/FeatureGrid.tsx` - Already prop-driven
- `landing/src/components/SectionWrapper.tsx` - Already prop-driven
- `landing/src/components/CTASection.tsx` - Already prop-driven
- `landing/src/components/NetworkSection.tsx` - Already prop-driven
- `landing/src/components/index.ts` - Component exports

**Application Structure (Preserve Patterns):**
- `landing/src/App.tsx` - Router structure (routes may change)
- `landing/src/main.tsx` - Entry point unchanged
- ChakraProvider pattern
- Theme extension structure (colors/fonts become configurable)
- Page component organization pattern

### Brand/Config/Content (Abstract or Replace)

**Configuration System (New):**
- `landing/src/config/site.ts` - Brand name, theme, navigation, metadata
- `landing/src/config/theme.ts` - Color palettes, fonts (or extend theme.ts)

**Content Directories (New in Phase 2):**
- `landing/content/` - Page content, feature descriptions
- `landing/public/brand/` - Brand-specific assets (hero images, logos)

**Theme Values (Abstract):**
- Replace `brand` and `navy` color palettes with configurable system
- Replace "Playfair Display" and "Inter" fonts with configurable system
- Provide default neutral theme

**Component Content (Abstract via Props/Config):**
- Navbar: Brand name and navigation items from config
- Contact: Form URL and messaging from config
- Hero: All text content from props/config
- Pages: Content from config or placeholder templates

**Infrastructure Values (Abstract):**
- Remove all default domain names, bucket names, repo references
- Require explicit values in `terraform.tfvars`
- Provide `terraform.tfvars.example` files

**Documentation (Replace):**
- README: Template setup instructions
- CONTRIBUTING: Generic contribution guidelines

---

## Phases

### Phase 0: Documentation + Guardrails

**Objective:** Establish documentation and development guardrails without changing code.

**Tasks:**
1. Create `docs/DECISIONS.md` documenting:
   - Why this template exists
   - What stays reusable vs what's configurable
   - Build and deployment preservation requirements
   - Abstraction patterns to follow

2. Create `.cursorrules` file with:
   - Instructions to preserve build output structure
   - Instructions to preserve deployment behavior
   - Guidance on abstraction patterns (config files, props)
   - Reminder to check PROJECT_CONTEXT.md before major changes

3. Update `docs/PROJECT_CONTEXT.md if needed (already exists)

4. Create `docs/TEMPLATE_SETUP.md` (placeholder, filled in later phases):
   - How to use this template
   - What to customize
   - Configuration guide

**Deliverables:**
- `docs/DECISIONS.md`
- `.cursorrules`
- `docs/TEMPLATE_SETUP.md` (skeleton)

**Verification:**
- No code changes
- Documentation files created
- Build still works: `cd landing && npm run build`

---

### Phase 1: Brand/Config Abstraction (No File Moves)

**Objective:** Abstract brand-specific values into configuration without moving files or changing structure.

**Tasks:**

1. **Create Configuration System:**
   - Create `landing/src/config/site.ts`:
     ```typescript
     export const siteConfig = {
       brand: {
         name: "Naval Nomad", // Will be replaced in Phase 3
         tagline: "Turning Marinas into Villages", // Will be replaced
       },
       navigation: [...], // Current nav items
       contact: {
         waitlistUrl: "...", // Current Google Form URL
       },
       // ... other config
     }
     ```

2. **Abstract Theme:**
   - Modify `landing/src/theme.ts` to import colors/fonts from config
   - Create `landing/src/config/theme.ts` with current NavalNomad values
   - Theme structure unchanged, values come from config

3. **Abstract Navbar:**
   - Modify `landing/src/components/Navbar.tsx`:
     - Import brand name from `siteConfig`
     - Import navigation items from `siteConfig`
     - Keep component structure identical

4. **Abstract Contact Component:**
   - Modify `landing/src/components/Contact/index.tsx`:
     - Import waitlist URL and messaging from `siteConfig`
     - Keep component structure identical

5. **Abstract Hero Component:**
   - Modify `landing/src/components/Hero/index.tsx`:
     - Accept all text content via props
     - Import defaults from `siteConfig`
     - Keep component structure identical

6. **Abstract Infrastructure Variables:**
   - Remove defaults from `landing/infra/bootstrap/variables.tf`
   - Remove defaults from `landing/infra/frontend/variables.tf`
   - Create `landing/infra/bootstrap/terraform.tfvars.example`
   - Create `landing/infra/frontend/terraform.tfvars.example`
   - Update existing `terraform.tfvars` files to keep current values (for now)

7. **Abstract Infrastructure Resource Names:**
   - Modify `landing/infra/frontend/cognito.tf`:
     - Use variables for resource names
     - Add variables to `variables.tf`
   - Modify `landing/infra/frontend/secrets.tf`:
     - Use variables for secret names
     - Add variables to `variables.tf`

**Deliverables:**
- `landing/src/config/site.ts` (with NavalNomad values)
- `landing/src/config/theme.ts` (with NavalNomad values)
- Components modified to use config (but still show NavalNomad content)
- Infrastructure variables abstracted (but terraform.tfvars still has values)

**Verification:**
- Build output unchanged: `cd landing && npm run build && ls -la dist/`
- Dev server works: `cd landing && npm run dev` (verify site loads)
- TypeScript compiles: `cd landing && npm run build` (no TS errors)
- Routes still work: All pages accessible
- Visual appearance unchanged (still shows NavalNomad branding)

---

### Phase 2: Move Brand Assets/Content to Dedicated Locations

**Objective:** Organize brand-specific content into dedicated directories for easy replacement.

**Tasks:**

1. **Create Content Directories:**
   - Create `landing/content/` directory
   - Create `landing/public/brand/` directory

2. **Move Static Assets:**
   - Move `landing/public/hero-image.svg` → `landing/public/brand/hero-image.svg`
   - Update references in components (Hero/index.tsx)

3. **Move Content to Config:**
   - Move page content definitions to `landing/src/config/content.ts`:
     - Home page features
     - Home page network levels
     - Page metadata (titles, descriptions)
   - Import and use in pages

4. **Update Component Imports:**
   - Update all references to moved assets
   - Update imports to use content config

5. **Create Placeholder Assets:**
   - Create generic placeholder hero image (or remove reference)
   - Document what assets projects should provide

**Deliverables:**
- `landing/content/` directory structure
- `landing/public/brand/` directory with moved assets
- `landing/src/config/content.ts` with page content
- Components updated to use new asset paths

**Verification:**
- Build succeeds: `cd landing && npm run build`
- Assets load correctly: Check `dist/` for correct asset paths
- Dev server works: Verify images/assets display
- No broken imports: TypeScript compiles without errors

---

### Phase 3: Replace NavalNomad Pages with Generic Placeholders

**Objective:** Replace brand-specific content with generic placeholder content while keeping routes stable.

**Tasks:**

1. **Update Site Config with Placeholders:**
   - Modify `landing/src/config/site.ts`:
     - Replace "Naval Nomad" with "Your Brand Name"
     - Replace tagline with generic placeholder
     - Replace navigation with generic items (Home, About, Features, Contact)
     - Replace contact URL with placeholder

2. **Update Theme Config with Neutral Values:**
   - Modify `landing/src/config/theme.ts`:
     - Replace brand colors with neutral palette (grays, blues)
     - Replace fonts with system fonts or generic web fonts
     - Keep theme structure identical

3. **Replace Home Page Content:**
   - Modify `landing/src/pages/Home.tsx`:
     - Replace "Naval Nomad Community" with generic hero
     - Replace maritime features with generic feature examples
     - Replace network levels with generic examples
     - Keep component composition pattern

4. **Replace or Remove Domain-Specific Pages:**
   - **Option A (Keep as Examples):**
     - `landing/src/pages/Community.tsx` → Generic community page template
     - `landing/src/pages/MarinaExplorer.tsx` → Generic explorer/directory template
     - `landing/src/pages/Routes.tsx` → Generic routes/navigation template
     - `landing/src/pages/LiveaboardGuides.tsx` → Generic guides/resources template
   - **Option B (Remove):**
     - Delete domain-specific pages
     - Update `App.tsx` routes to remove deleted pages
     - Keep only: Home, Contact, Map (if generic)

5. **Update App.tsx Routes:**
   - Keep route structure stable
   - Update route paths if pages removed
   - Ensure all routes have corresponding pages

6. **Update HTML Title:**
   - Modify `landing/index.html`:
     - Replace with "Website Template" or generic title

7. **Update 404 Page:**
   - Modify `landing/public/404.html`:
     - Replace "Naval Nomad" with generic text

8. **Update Root Documentation:**
   - Modify `README.md`:
     - Replace with template setup instructions
     - Keep project structure, development, deployment sections (generalized)
   - Modify `CONTRIBUTING.md`:
     - Replace with generic contribution guidelines

**Deliverables:**
- All pages show generic placeholder content
- Routes still work (same paths or documented changes)
- Theme uses neutral colors/fonts
- Documentation updated for template usage

**Verification:**
- Build succeeds: `cd landing && npm run build`
- All routes accessible: Test each route in dev server
- No broken links: Check navigation and internal links
- Visual appearance: Generic/neutral branding visible
- TypeScript compiles: No type errors

---

### Phase 4: Verify Build + Deploy Remains Unchanged

**Objective:** Ensure build output and deployment behavior are identical to original.

**Tasks:**

1. **Build Output Verification:**
   - Run `cd landing && npm run build`
   - Verify `dist/` directory structure:
     - `dist/index.html` exists
     - `dist/assets/` directory exists
     - Asset files present and named correctly
   - Compare file sizes (should be similar, may vary slightly)
   - Verify source maps generated (if enabled)

2. **Infrastructure Verification:**
   - Verify `landing/infra/frontend/s3.tf`:
     - Bucket configuration unchanged
     - Website configuration unchanged
     - OAI policy unchanged
   - Verify `landing/infra/frontend/cloudfront.tf`:
     - Distribution configuration unchanged
     - Cache behavior unchanged
     - Error responses unchanged (SPA routing)
     - Aliases use variables (not hardcoded)
   - Verify `landing/infra/frontend/route53.tf`:
     - DNS configuration unchanged
     - Uses variables for domain

3. **Deployment Flow Verification:**
   - Document deployment steps (unchanged):
     1. `npm run build` → creates `dist/`
     2. Upload `dist/*` to S3 bucket
     3. Invalidate CloudFront cache
     4. Route53 routes traffic
   - Verify no changes to:
     - Build command
     - Output directory
     - Upload process
     - Invalidation process

4. **CI/CD Compatibility:**
   - Verify GitHub Actions workflow (if exists) still works
   - Verify OIDC authentication unchanged
   - Verify IAM permissions unchanged
   - Document any required workflow updates

5. **Create Verification Documentation:**
   - Document expected build output structure
   - Document deployment checklist
   - Document what must remain unchanged

**Deliverables:**
- Build output verification report
- Infrastructure comparison (before/after)
- Deployment flow documentation
- CI/CD compatibility confirmation

**Verification:**
- Build produces identical structure: `dist/` layout matches original
- Infrastructure Terraform plans show no resource changes (only variable changes)
- Deployment process unchanged: Same commands, same steps
- No breaking changes: Existing deployments continue to work

---

## Verification Checklist

### Local Build Verification

**Commands to Run:**
```bash
cd landing
npm install          # Ensure dependencies installed
npm run build        # Production build
npm run dev          # Dev server (verify it starts)
npm run lint         # Linting (should pass)
```

**Output Directory to Verify:**
- `landing/dist/` must contain:
  - `index.html` (root)
  - `assets/` directory with:
    - JavaScript bundles (`.js` files)
    - CSS files (`.css` files)
    - Source maps (`.map` files, if enabled)
    - Other assets (images, fonts, etc.)

**What to Check:**
- [ ] `dist/index.html` exists and references correct asset paths
- [ ] `dist/assets/` contains bundled JS and CSS
- [ ] Asset paths in HTML are relative (e.g., `/assets/...`)
- [ ] No broken asset references
- [ ] Build completes without errors
- [ ] TypeScript compilation succeeds
- [ ] No linting errors (or only acceptable warnings)

### CI Verification

**What to Check in CI:**
- [ ] Build step succeeds (`npm run build`)
- [ ] Type checking passes (`tsc` or via build)
- [ ] Linting passes (`npm run lint`)
- [ ] Build artifacts are generated
- [ ] No new dependencies added (check `package-lock.json` changes)
- [ ] Build time is similar (not significantly slower)

**CI Commands:**
```bash
npm ci              # Clean install
npm run build       # Build
npm run lint        # Lint
```

### Deployment Workflow Verification

**What Must Remain Unchanged:**

1. **Build Process:**
   - [ ] Build command: `npm run build` (unchanged)
   - [ ] Build output: `dist/` directory (unchanged)
   - [ ] Build artifacts: HTML, JS, CSS, assets (structure unchanged)

2. **S3 Upload:**
   - [ ] Upload source: `dist/*` (unchanged)
   - [ ] Upload destination: S3 bucket (variable, but process unchanged)
   - [ ] Upload method: Same (GitHub Actions, CLI, etc.)

3. **CloudFront:**
   - [ ] Invalidation: Same process (distribution ID from variable)
   - [ ] Cache behavior: Unchanged (TTL settings, etc.)
   - [ ] Error handling: SPA routing (403/404 → index.html) unchanged

4. **Infrastructure:**
   - [ ] Terraform apply: Same process
   - [ ] Resource creation: No new resources, no deleted resources
   - [ ] Resource configuration: Only variable values change, structure unchanged

5. **DNS:**
   - [ ] Route53 configuration: Unchanged (uses variables)
   - [ ] Domain routing: Same pattern (root + www aliases)

**Deployment Commands (Should Remain Same):**
```bash
# Build (unchanged)
cd landing && npm run build

# Upload to S3 (unchanged process, variable bucket name)
aws s3 sync dist/ s3://${BUCKET_NAME}/

# Invalidate CloudFront (unchanged process, variable distribution ID)
aws cloudfront create-invalidation \
  --distribution-id ${DISTRIBUTION_ID} \
  --paths "/*"
```

### Regression Testing

**Before Each Phase:**
- [ ] Take snapshot of `dist/` output structure
- [ ] Document current build time
- [ ] Test dev server functionality
- [ ] Test all routes work

**After Each Phase:**
- [ ] Compare `dist/` structure to snapshot
- [ ] Verify build time similar
- [ ] Test dev server functionality
- [ ] Test all routes work
- [ ] Verify no console errors
- [ ] Verify no broken assets

### Final Verification (After All Phases)

**Build Output:**
- [ ] `dist/` structure matches original
- [ ] All assets load correctly
- [ ] No 404s for assets
- [ ] HTML references correct asset paths

**Infrastructure:**
- [ ] Terraform plan shows no resource changes (only variable updates)
- [ ] All `.tf` files use variables (no hardcoded values)
- [ ] Example `terraform.tfvars.example` files provided

**Functionality:**
- [ ] All routes accessible
- [ ] Navigation works
- [ ] Components render correctly
- [ ] Theme applies correctly
- [ ] No JavaScript errors
- [ ] No TypeScript errors

**Documentation:**
- [ ] README explains template usage
- [ ] Configuration guide exists
- [ ] Setup instructions clear
- [ ] Example values provided

---

## Constraints Summary

**Must Preserve:**
- Build output structure (`dist/` directory layout)
- Build commands (`npm run build`, etc.)
- Deployment process (S3 upload, CloudFront invalidation)
- Infrastructure resource definitions (S3, CloudFront, Route53 structure)
- Routing structure (paths may change, but pattern preserved)
- Component composition patterns

**Must Not Change:**
- Framework (React)
- Build tool (Vite)
- Routing library (React Router)
- UI library (Chakra UI)
- TypeScript configuration
- Build output format
- Deployment infrastructure architecture

**Can Change:**
- Content (text, copy, features)
- Theme values (colors, fonts) - but structure preserved
- Configuration system (new files for abstraction)
- File organization (Phase 2+)
- Documentation

**No New Dependencies:**
- Do not add new npm packages
- Use existing dependencies only
- Configuration system uses TypeScript/JavaScript only

---

## Success Criteria

**Template is Ready When:**
1. ✅ All NavalNomad-specific content removed or abstracted
2. ✅ Build output structure unchanged
3. ✅ Deployment process unchanged
4. ✅ Infrastructure uses variables (no hardcoded values)
5. ✅ Generic placeholder content in place
6. ✅ Configuration system documented
7. ✅ Setup instructions clear
8. ✅ All phases verified and tested

**Ready for GitHub Template:**
- Repository can be marked as template
- New projects can use "Use this template"
- Projects can customize brand/config without touching skeleton code
- Build and deploy process works identically for all projects

---

**This document is the execution plan. Each phase should be completed, verified, and merged before proceeding to the next phase.**
