import { Box, Container, Heading, SimpleGrid, Stack, Text, Icon } from '@chakra-ui/react'
import { FaSearch, FaCalendarAlt, FaHandshake, FaAnchor } from 'react-icons/fa'

const steps = [
  {
    icon: FaSearch,
    title: 'Find Your Perfect Match',
    description: 'Browse through our curated selection of boats and slips, filtered by location, amenities, and your preferences.'
  },
  {
    icon: FaCalendarAlt,
    title: 'Book Your Stay',
    description: 'Select your dates, review the terms, and secure your spot with our simple booking process.'
  },
  {
    icon: FaHandshake,
    title: 'Connect with Hosts',
    description: 'Communicate directly with boat owners, ask questions, and get to know your future home.'
  },
  {
    icon: FaAnchor,
    title: 'Start Your Journey',
    description: 'Arrive at your new floating home, settle in, and begin your life as a Naval Nomad.'
  }
]

const HowItWorks = () => {
  return (
    <Box py={20} bg="gray.50">
      <Container maxW="container.xl">
        <Stack spacing={12}>
          <Stack spacing={4} textAlign="center">
            <Heading
              as="h2"
              size="xl"
              fontFamily="heading"
              color="navy.500"
            >
              How It Works
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
              Whether you're a boat owner or a digital nomad, our platform makes it easy to connect and start your liveaboard journey.
            </Text>
          </Stack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
            {steps.map((step, index) => (
              <Stack
                key={index}
                spacing={4}
                p={6}
                bg="white"
                borderRadius="lg"
                boxShadow="sm"
                transition="all 0.3s"
                _hover={{ transform: 'translateY(-4px)', boxShadow: 'md' }}
              >
                <Box
                  w={12}
                  h={12}
                  bg="brand.50"
                  color="brand.500"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={step.icon} w={6} h={6} />
                </Box>
                <Heading as="h3" size="md" color="navy.500">
                  {step.title}
                </Heading>
                <Text color="gray.600">
                  {step.description}
                </Text>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  )
}

export default HowItWorks 