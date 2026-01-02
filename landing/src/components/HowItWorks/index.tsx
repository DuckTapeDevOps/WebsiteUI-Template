import { Box, Container, Heading, SimpleGrid, Stack, Text, Icon } from '@chakra-ui/react'
import { FaSearch, FaCalendarAlt, FaHandshake, FaAnchor } from 'react-icons/fa'
import { siteConfig } from '../../config/site'

const iconMap: Record<number, typeof FaSearch> = {
  0: FaSearch,
  1: FaCalendarAlt,
  2: FaHandshake,
  3: FaAnchor,
}

const steps = siteConfig.howItWorks.steps.map((step, index) => ({
  icon: iconMap[index] || FaSearch,
  title: step.title,
  description: step.description,
}))

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
              {siteConfig.howItWorks.title}
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
              {siteConfig.howItWorks.description}
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