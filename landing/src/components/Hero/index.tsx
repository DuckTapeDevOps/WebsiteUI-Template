import { Box, Container, Heading, Text, Button, Stack, Image } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { siteConfig } from '../../config/site'

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
              {siteConfig.hero.title}
            </Heading>
            <Text fontSize="xl" opacity={0.9}>
              {siteConfig.hero.description}
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
              <Button
                as={RouterLink}
                to={siteConfig.hero.primaryButton.to}
                size="lg"
                colorScheme="brand"
                bg="brand.500"
                _hover={{ bg: 'brand.600' }}
              >
                {siteConfig.hero.primaryButton.text}
              </Button>
              {siteConfig.hero.secondaryButton && (
                <Button
                  as={RouterLink}
                  to={siteConfig.hero.secondaryButton.to}
                  size="lg"
                  variant="outline"
                  borderColor="white"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                >
                  {siteConfig.hero.secondaryButton.text}
                </Button>
              )}
            </Stack>
          </Stack>
          <Box
            display={{ base: 'none', md: 'block' }}
            position="relative"
            w="500px"
            h="400px"
          >
            <Image
              src={siteConfig.hero.image.src}
              alt={siteConfig.hero.image.alt}
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