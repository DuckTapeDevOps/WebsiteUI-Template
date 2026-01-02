import { Box, Container, Heading, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react'
import { siteConfig } from '../../config/site'

const Contact = () => {
  const handleJoinWaitlist = () => {
    window.open(siteConfig.contact.waitlistUrl, '_blank')
  }

  return (
    <Box py={20} bg={useColorModeValue('gray.50', 'gray.700')}>
      <Container maxW="container.xl">
        <Stack gap={12} textAlign="center">
          <Stack gap={4}>
            <Heading
              as="h2"
              size="xl"
              fontFamily="heading"
              color={useColorModeValue('navy.500', 'white')}
            >
              {siteConfig.contact.waitlistHeading}
            </Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')} maxW="2xl" mx="auto">
              {siteConfig.contact.waitlistDescription}
            </Text>
          </Stack>

          <Box>
            <Button
              onClick={handleJoinWaitlist}
              colorScheme="blue"
              size="lg"
              px={8}
            >
              {siteConfig.contact.waitlistButtonText}
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Contact 