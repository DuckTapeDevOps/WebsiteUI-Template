import { Container, VStack } from '@chakra-ui/react'
import { FaUsers, FaMapMarkerAlt, FaComments, FaShip, FaHeart } from 'react-icons/fa'
import { HeroSection, FeatureGrid, SectionWrapper, NetworkSection, CTASection } from '../components'

const Home = () => {
  const coreFeatures = [
    {
      icon: FaMapMarkerAlt,
      title: "Find Your Fleet",
      description: "See which marina your connections are docked at. Never wonder if friends are nearby again.",
      color: "blue.500"
    },
    {
      icon: FaComments,
      title: "Marina Chat", 
      description: "Join location-based conversations. Share local tips, organize meetups, or just say hello.",
      color: "blue.500"
    },
    {
      icon: FaShip,
      title: "Maritime Story",
      description: "Share your journey, routes, and experiences with the community that gets it.",
      color: "blue.500"
    }
  ]

  const networkFeatures = [
    {
      icon: FaUsers,
      title: "Connect",
      description: "Build your maritime network. Follow fellow boaters and stay connected across anchorages.",
      color: "blue.500"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Share Location",
      description: "Let your network know where you are. Privacy controls let you choose who sees what level of detail.",
      color: "green.500"
    },
    {
      icon: FaHeart,
      title: "Build Community",
      description: "Transform every marina from a transient stop into a place where you have friends.",
      color: "red.500"
    }
  ]

  const networkLevels = [
    {
      badge: "CONNECTIONS",
      badgeColor: "blue",
      title: "Connections",
      description: "Your broader maritime network - follow and connect with the friends you make along your journey"
    },
    {
      badge: "CREW", 
      badgeColor: "green",
      title: "Crew",
      description: "People linked to your vessel with access to shared dashboards and planning"
    },
    {
      badge: "FLEET",
      badgeColor: "purple", 
      title: "Fleet",
      description: "Groups of vessels traveling together - temporary or ongoing maritime partnerships"
    }
  ]

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={16} align="stretch">
        <HeroSection
          title="Naval Nomad Community"
          subtitle="Turning Marinas into Villages"
          description="Connect with fellow boaters, share your location with your maritime network, and transform every marina from a transient stop into a vibrant community where you always have friends nearby."
          primaryButton={{
            text: "Join the Community",
            to: "/community",
            icon: <FaUsers />
          }}
          secondaryText="Your maritime network awaits • Privacy-first location sharing"
        />

        <SectionWrapper title="🌊 Community-First Features">
          <FeatureGrid features={coreFeatures} variant="simple" />
        </SectionWrapper>

        <SectionWrapper title="🚢 Maritime Network">
          <FeatureGrid features={networkFeatures} variant="card" />
        </SectionWrapper>

        <SectionWrapper title="Your Maritime Network" bg="accent">
          <NetworkSection levels={networkLevels} />
        </SectionWrapper>

        <CTASection
          title="🔮 Coming Soon"
          description="We're building the future of maritime community. Here's what's on the horizon:"
          buttons={[
            {
              text: "Explore Marinas",
              to: "/marina-explorer",
              icon: <FaMapMarkerAlt />
            },
            {
              text: "Plan Routes", 
              to: "/routes",
              variant: "outline",
              icon: <FaShip />
            }
          ]}
        />
      </VStack>
    </Container>
  )
}

export default Home