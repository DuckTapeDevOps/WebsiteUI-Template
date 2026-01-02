/**
 * Site Configuration
 * 
 * This file contains all brand-specific configuration values.
 * Child repositories should override these values to customize the site.
 */

export interface NavigationItem {
  label: string
  path: string
  badge?: {
    text: string
    colorScheme: string
  }
  disabled?: boolean
}

export interface SiteConfig {
  brand: {
    name: string
    tagline: string
    description: string
  }
  metadata: {
    title: string
    description: string
  }
  navigation: NavigationItem[]
  contact: {
    waitlistUrl: string
    waitlistButtonText: string
    waitlistHeading: string
    waitlistDescription: string
  }
  hero: {
    title: string
    subtitle: string
    description: string
    primaryButton: {
      text: string
      to: string
    }
    secondaryButton?: {
      text: string
      to: string
    }
    image: {
      src: string
      alt: string
    }
  }
  home: {
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
  howItWorks: {
    title: string
    description: string
    steps: Array<{
      title: string
      description: string
    }>
  }
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "Naval Nomad",
    tagline: "Turning Marinas into Villages",
    description: "A community-first platform designed to transform marinas from transient stops into vibrant maritime villages.",
  },
  metadata: {
    title: "Naval Nomad - Live Your Dream Life at Sea",
    description: "Connect with fellow boaters, share your location with your maritime network, and transform every marina from a transient stop into a vibrant community.",
  },
  navigation: [
    {
      label: "Community",
      path: "/community",
    },
    {
      label: "Marina Explorer",
      path: "/marina-explorer",
      badge: {
        text: "BETA",
        colorScheme: "orange",
      },
    },
    {
      label: "Route Planner",
      path: "/routes",
      disabled: true,
      badge: {
        text: "SOON",
        colorScheme: "gray",
      },
    },
    {
      label: "Contact",
      path: "/contact",
    },
  ],
  contact: {
    waitlistUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe_sD8IZFdH84GxvExbsrJuk78ZrDCIOr5RZMyNHVSPuh-5AQ/viewform?usp=header",
    waitlistButtonText: "Join Naval Nomad Waitlist",
    waitlistHeading: "Join the Waitlist",
    waitlistDescription: "Be among the first to experience Naval Nomad. Sign up for our waitlist to get early access and exclusive updates.",
  },
  hero: {
    title: "Live Your Dream Life at Sea",
    subtitle: "",
    description: "Connect with boat owners and find your perfect liveaboard experience. Whether you're a digital nomad seeking adventure or a boat owner looking to share your vessel.",
    primaryButton: {
      text: "Find Your Boat",
      to: "/",
    },
    secondaryButton: {
      text: "List Your Boat",
      to: "/",
    },
    image: {
      src: "/hero-image.svg",
      alt: "Luxury yacht at sunset",
    },
  },
  home: {
    hero: {
      title: "Naval Nomad Community",
      subtitle: "Turning Marinas into Villages",
      description: "Connect with fellow boaters, share your location with your maritime network, and transform every marina from a transient stop into a vibrant community where you always have friends nearby.",
      primaryButton: {
        text: "Join the Community",
        to: "/community",
      },
      secondaryText: "Your maritime network awaits • Privacy-first location sharing",
    },
    coreFeatures: [
      {
        title: "Find Your Fleet",
        description: "See which marina your connections are docked at. Never wonder if friends are nearby again.",
      },
      {
        title: "Marina Chat",
        description: "Join location-based conversations. Share local tips, organize meetups, or just say hello.",
      },
      {
        title: "Maritime Story",
        description: "Share your journey, routes, and experiences with the community that gets it.",
      },
    ],
    networkFeatures: [
      {
        title: "Connect",
        description: "Build your maritime network. Follow fellow boaters and stay connected across anchorages.",
      },
      {
        title: "Share Location",
        description: "Let your network know where you are. Privacy controls let you choose who sees what level of detail.",
      },
      {
        title: "Build Community",
        description: "Transform every marina from a transient stop into a place where you have friends.",
      },
    ],
    networkLevels: [
      {
        badge: "CONNECTIONS",
        badgeColor: "blue",
        title: "Connections",
        description: "Your broader maritime network - follow and connect with the friends you make along your journey",
      },
      {
        badge: "CREW",
        badgeColor: "green",
        title: "Crew",
        description: "People linked to your vessel with access to shared dashboards and planning",
      },
      {
        badge: "FLEET",
        badgeColor: "purple",
        title: "Fleet",
        description: "Groups of vessels traveling together - temporary or ongoing maritime partnerships",
      },
    ],
    cta: {
      title: "🔮 Coming Soon",
      description: "We're building the future of maritime community. Here's what's on the horizon:",
      buttons: [
        {
          text: "Explore Marinas",
          to: "/marina-explorer",
          variant: "solid",
          iconName: "FaMapMarkerAlt",
        },
        {
          text: "Plan Routes",
          to: "/routes",
          variant: "outline",
          iconName: "FaShip",
        },
      ],
    },
  },
  howItWorks: {
    title: "How It Works",
    description: "Whether you're a boat owner or a digital nomad, our platform makes it easy to connect and start your liveaboard journey.",
    steps: [
      {
        title: "Find Your Perfect Match",
        description: "Browse through our curated selection of boats and slips, filtered by location, amenities, and your preferences.",
      },
      {
        title: "Book Your Stay",
        description: "Select your dates, review the terms, and secure your spot with our simple booking process.",
      },
      {
        title: "Connect with Hosts",
        description: "Communicate directly with boat owners, ask questions, and get to know your future home.",
      },
      {
        title: "Start Your Journey",
        description: "Arrive at your new floating home, settle in, and begin your life as a Naval Nomad.",
      },
    ],
  },
}

