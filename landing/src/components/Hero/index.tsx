import { Box, Container, Heading, Text, Button, Stack, Image } from '@chakra-ui/react'

const Hero = () => {
  return (
    <Box
      bg="navy.500"
      color="white"
      py={20}
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          gap={8}
          align="center"
          justify="space-between"
        >
          <Stack gap={6} maxW="600px">
            <Heading
              as="h1"
              size="2xl"
              fontFamily="heading"
              lineHeight="1.2"
            >
              Live Your Dream Life at Sea
            </Heading>
            <Text fontSize="xl" opacity={0.9}>
              Connect with boat owners and find your perfect liveaboard experience. 
              Whether you're a digital nomad seeking adventure or a boat owner looking to share your vessel.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
              <Button
                size="lg"
                colorScheme="brand"
                bg="brand.500"
                _hover={{ bg: 'brand.600' }}
              >
                Find Your Boat
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
              >
                List Your Boat
              </Button>
            </Stack>
          </Stack>
          <Box
            display={{ base: 'none', md: 'block' }}
            position="relative"
            w="500px"
            h="400px"
          >
            <Image
              src="/hero-image.svg"
              alt="Luxury yacht at sunset"
              objectFit="cover"
              w="100%"
              h="100%"
              borderRadius="xl"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Hero 