/**
 * Site Configuration Example
 * 
 * Copy this file to site.ts and customize the values for your brand.
 * This file demonstrates the structure and types for all configurable values.
 */

import type { SiteConfig } from './site'

export const siteConfigExample: SiteConfig = {
  brand: {
    name: "Your Brand Name",
    tagline: "Your Tagline",
    description: "Your brand description.",
  },
  metadata: {
    title: "Your Brand - Your Tagline",
    description: "Your site description for SEO.",
  },
  navigation: [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "About",
      path: "/about",
    },
    {
      label: "Features",
      path: "/features",
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ],
  contact: {
    waitlistUrl: "https://your-waitlist-form-url.com",
    waitlistButtonText: "Join Waitlist",
    waitlistHeading: "Join the Waitlist",
    waitlistDescription: "Sign up to get early access and updates.",
  },
  hero: {
    title: "Your Hero Title",
    subtitle: "Your Hero Subtitle",
    description: "Your hero description text.",
    primaryButton: {
      text: "Get Started",
      to: "/signup",
    },
    secondaryButton: {
      text: "Learn More",
      to: "/about",
    },
    image: {
      src: "/brand/hero-image.svg",
      alt: "Your hero image description",
    },
  },
  home: {
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
      {
        title: "Feature 2",
        description: "Description of feature 2.",
      },
      {
        title: "Feature 3",
        description: "Description of feature 3.",
      },
    ],
    networkFeatures: [
      {
        title: "Network Feature 1",
        description: "Description of network feature 1.",
      },
      {
        title: "Network Feature 2",
        description: "Description of network feature 2.",
      },
      {
        title: "Network Feature 3",
        description: "Description of network feature 3.",
      },
    ],
    networkLevels: [
      {
        badge: "LEVEL 1",
        badgeColor: "blue",
        title: "Level 1",
        description: "Description of level 1.",
      },
      {
        badge: "LEVEL 2",
        badgeColor: "green",
        title: "Level 2",
        description: "Description of level 2.",
      },
      {
        badge: "LEVEL 3",
        badgeColor: "purple",
        title: "Level 3",
        description: "Description of level 3.",
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
        {
          text: "Button 2",
          to: "/path2",
          variant: "outline",
          iconName: "FaShip",
        },
      ],
    },
  },
  howItWorks: {
    title: "How It Works",
    description: "Description of how it works.",
    steps: [
      {
        title: "Step 1",
        description: "Description of step 1.",
      },
      {
        title: "Step 2",
        description: "Description of step 2.",
      },
      {
        title: "Step 3",
        description: "Description of step 3.",
      },
      {
        title: "Step 4",
        description: "Description of step 4.",
      },
    ],
  },
}

