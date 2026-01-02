/**
 * Home Page Content
 * 
 * This file demonstrates the intended structure for page content.
 * 
 * NOTE: This content is NOT yet wired into pages. It serves as a placeholder
 * to document the intended content organization pattern.
 * 
 * Currently, home page content is defined in src/config/site.ts under
 * the `home` key. This file shows an alternative organization pattern
 * that may be adopted in future phases.
 */

export interface HomePageContent {
  hero: {
    title: string
    subtitle: string
    description: string
    primaryButton: {
      text: string
      to: string
    }
    secondaryText: string
  }
  coreFeatures: Array<{
    title: string
    description: string
  }>
  networkFeatures: Array<{
    title: string
    description: string
  }>
  networkLevels: Array<{
    badge: string
    badgeColor: string
    title: string
    description: string
  }>
  cta: {
    title: string
    description: string
    buttons: Array<{
      text: string
      to: string
      variant?: 'solid' | 'outline' | 'ghost' | 'link'
      iconName?: string
    }>
  }
}

/**
 * Example content structure (not yet used)
 * 
 * This demonstrates how home page content could be organized
 * separately from the site configuration.
 */
export const homeContentExample: HomePageContent = {
  hero: {
    title: "Your Homepage Title",
    subtitle: "Your Homepage Subtitle",
    description: "Your homepage description.",
    primaryButton: {
      text: "Get Started",
      to: "/signup",
    },
    secondaryText: "Your secondary text",
  },
  coreFeatures: [
    {
      title: "Feature 1",
      description: "Description of feature 1.",
    },
  ],
  networkFeatures: [
    {
      title: "Network Feature 1",
      description: "Description of network feature 1.",
    },
  ],
  networkLevels: [
    {
      badge: "LEVEL 1",
      badgeColor: "blue",
      title: "Level 1",
      description: "Description of level 1.",
    },
  ],
  cta: {
    title: "Call to Action",
    description: "Your CTA description.",
    buttons: [
      {
        text: "Button 1",
        to: "/path1",
        variant: "solid",
        iconName: "FaMapMarkerAlt",
      },
    ],
  },
}

