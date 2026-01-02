import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  Button, 
  SimpleGrid,
  Icon,
  Badge,
  useColorModeValue
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaRoute, FaUsers, FaMapMarkerAlt, FaCompass, FaBell } from 'react-icons/fa'

const RouteExplorer = () => {
  const cardBg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={12} align="stretch">
        {/* Hero Section */}
        <Box textAlign="center" py={10}>
          <Badge colorScheme="orange" fontSize="lg" px={4} py={2} mb={6} borderRadius="full">
            COMING SOON
          </Badge>
          <Heading as="h1" size="2xl" mb={4} color={useColorModeValue('navy.600', 'white')}>
            Community Route Planning
          </Heading>
          <Text fontSize="xl" mb={8} maxW="3xl" mx="auto" color={useColorModeValue('gray.600', 'gray.300')}>
            Connect with fellow boaters planning the same routes. Share experiences, 
            travel together, and make every journey a community adventure.
          </Text>
        </Box>

        {/* Planned Features */}
        <Box>
          <Heading as="h2" size="xl" textAlign="center" mb={8} color={useColorModeValue('navy.600', 'white')}>
            What's Coming
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Box p={8} bg={cardBg} borderRadius="xl" textAlign="center" border="2px solid" borderColor={borderColor}>
              <Icon as={FaUsers} boxSize={12} color="blue.500" mb={4} />
              <Heading as="h3" size="md" mb={3} color={useColorModeValue('blue.700', 'blue.300')}>Find Travel Buddies</Heading>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                Connect with boaters planning similar routes. Travel in fleets for safety and companionship.
              </Text>
            </Box>
            
            <Box p={8} bg={cardBg} borderRadius="xl" textAlign="center" border="2px solid" borderColor={borderColor}>
              <Icon as={FaRoute} boxSize={12} color="green.500" mb={4} />
              <Heading as="h3" size="md" mb={3} color={useColorModeValue('green.700', 'green.300')}>Community Routes</Heading>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                Browse routes shared by the community. The Great Loop, Caribbean cruising, and more.
              </Text>
            </Box>
            
            <Box p={8} bg={cardBg} borderRadius="xl" textAlign="center" border="2px solid" borderColor={borderColor}>
              <Icon as={FaMapMarkerAlt} boxSize={12} color="purple.500" mb={4} />
              <Heading as="h3" size="md" mb={3} color={useColorModeValue('purple.700', 'purple.300')}>Hidden Gems</Heading>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                Discover secret anchorages and must-visit spots recommended by experienced cruisers.
              </Text>
            </Box>
            
            <Box p={8} bg={cardBg} borderRadius="xl" textAlign="center" border="2px solid" borderColor={borderColor}>
              <Icon as={FaCompass} boxSize={12} color="orange.500" mb={4} />
              <Heading as="h3" size="md" mb={3} color={useColorModeValue('orange.700', 'orange.300')}>Interactive Planning</Heading>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                Plan routes collaboratively with your crew and fleet. Share waypoints and timing.
              </Text>
            </Box>
            
            <Box p={8} bg={cardBg} borderRadius="xl" textAlign="center" border="2px solid" borderColor={borderColor}>
              <Icon as={FaBell} boxSize={12} color="red.500" mb={4} />
              <Heading as="h3" size="md" mb={3} color={useColorModeValue('red.700', 'red.300')}>Route Alerts</Heading>
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
                Get notified when connections are planning routes you're interested in.
              </Text>
            </Box>
            
            <Box p={8} bg={cardBg} borderRadius="xl" textAlign="center" border="2px solid" borderColor={borderColor} opacity={0.7}>
              <Text fontSize="lg" mb={2}>🚧</Text>
              <Heading as="h3" size="md" mb={3} color={useColorModeValue('gray.600', 'gray.400')}>More Features</Heading>
              <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
                Weather integration, fuel stops, provisioning guides, and community reviews.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Community First Message */}
        <Box bg={useColorModeValue('blue.50', 'gray.700')} p={10} borderRadius="xl" textAlign="center">
          <VStack spacing={6}>
            <Heading as="h2" size="xl" color={useColorModeValue('navy.600', 'white')}>
              Community First, Features Second
            </Heading>
            <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')} maxW="3xl">
              We're building Naval Nomad based on what our community needs most. 
              Join us now to help shape these features and connect with fellow boaters.
            </Text>
            <Button
              as={RouterLink}
              to="/community"
              colorScheme="blue"
              size="lg"
              px={8}
            >
              Join the Community
            </Button>
          </VStack>
        </Box>

        {/* Notify Me */}
        <Box textAlign="center">
          <VStack spacing={4}>
            <Heading as="h3" size="lg" color={useColorModeValue('navy.600', 'white')}>
              Want to be notified when route planning launches?
            </Heading>
            <Text color={useColorModeValue('gray.600', 'gray.300')}>
              Join our community and you'll be the first to know when these features go live.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default RouteExplorer