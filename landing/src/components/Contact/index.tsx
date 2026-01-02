import { Box, Container, Heading, Text, Stack, Button, useColorModeValue } from '@chakra-ui/react'

const Contact = () => {
  const handleJoinWaitlist = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSe_sD8IZFdH84GxvExbsrJuk78ZrDCIOr5RZMyNHVSPuh-5AQ/viewform?usp=header', '_blank')
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
              Join the Waitlist
            </Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')} maxW="2xl" mx="auto">
              Be among the first to experience Naval Nomad. Sign up for our waitlist to get early access and exclusive updates.
            </Text>
          </Stack>

          <Box>
            <Button
              onClick={handleJoinWaitlist}
              colorScheme="blue"
              size="lg"
              px={8}
            >
              Join Naval Nomad Waitlist
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}

export default Contact 