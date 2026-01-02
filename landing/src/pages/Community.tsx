import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Button, 
  SimpleGrid, 
  Icon,
  Badge,
  useColorModeValue
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { 
  FaAnchor, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaUtensils,
  FaComments,
  FaRoute
} from 'react-icons/fa'

const Community = () => {
  const cardBg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  const communityFeatures = [
    {
      icon: FaMapMarkerAlt,
      title: "Know Where Your Friends Are",
      description: "See who's docked at your marina and discover fellow travelers on your route. Never feel alone on the water.",
      color: "blue.500"
    },
    {
      icon: FaUtensils,
      title: "Tonight's Dock Party",
      description: "Find out what's happening at your marina tonight. Grilling, music, board games, or just sharing stories over a beer.",
      color: "orange.500"
    },
    {
      icon: FaRoute,
      title: "Travel Together",
      description: "Connect with others planning the same routes. The Great Loop, Caribbean cruising, or coastal adventures.",
      color: "green.500"
    },
    {
      icon: FaComments,
      title: "Share & Learn",
      description: "Exchange tips, reviews, and local knowledge. From the best anchorages to where to find parts.",
      color: "purple.500"
    }
  ]

  const marinaStories = [
    {
      location: "Marathon, Florida Keys",
      story: "Every Friday night, we gather at the tiki bar. Last week, three boats from different states shared their route plans for the Bahamas. Now we're all going together.",
      author: "Sarah & Mike, SV Wanderlust"
    },
    {
      location: "Annapolis, Maryland", 
      story: "When our water pump failed, we posted in the marina chat. Within an hour, three neighbors offered spare parts and one even came over to help install it.",
      author: "Captain Tom, SV Freedom"
    },
    {
      location: "Charleston, South Carolina",
      story: "The marina organized a potluck for all the liveaboards. We met families from Canada, couples from California, and locals who've been here for years.",
      author: "Lisa & David, SV Coastal Dreams"
    }
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box textAlign="center" py={20}>
        <Container maxW="container.xl">
          <VStack spacing={8}>
            <Heading 
              as="h1" 
              size="3xl" 
              color={useColorModeValue('navy.600', 'white')}
              fontWeight="bold"
            >
              From Tethered to Free
            </Heading>
            
            <Text fontSize="xl" maxW="4xl" color={useColorModeValue('gray.600', 'gray.300')}>
              For centuries, we've been tied to the land, first by agriculture, then by where we work. 
              The new age is untethered living: income is remote, food is mobile, energy is distributed.
            </Text>
            
            <Text fontSize="lg" maxW="3xl" color={useColorModeValue('gray.700', 'gray.200')} fontStyle="italic">
              "You don't have to lose your community when you gain your freedom on the water."
            </Text>
          </VStack>
        </Container>
      </Box>

      <Container maxW="container.xl" py={16}>
        <VStack spacing={20} align="stretch">
          
          {/* The Real Anxiety Section */}
          <Box>
            <VStack spacing={8} align="stretch">
              <Box textAlign="center">
                <Heading as="h2" size="2xl" mb={4} color={useColorModeValue('navy.600', 'white')}>
                  The Real Anxiety Isn't Travel, It's Belonging
                </Heading>
                <Text fontSize="lg" maxW="3xl" mx="auto" color={useColorModeValue('gray.600', 'gray.300')}>
                  When people uproot, their biggest fear isn't food or money, it's losing their community.
                  Social media already solves keeping in touch with the past. Naval Nomad is about building 
                  community in the present, wherever you dock.
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mt={8}>
                <Box p={8} bg={cardBg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                  <VStack align="start" spacing={4}>
                    <HStack>
                      <Icon as={FaHeart} color="red.500" boxSize={6} />
                      <Heading as="h3" size="lg" color={useColorModeValue('navy.600', 'white')}>The Fear</Heading>
                    </HStack>
                    <Text color={useColorModeValue('gray.600', 'gray.300')}>
                      "What if I'm lonely? What if I can't find people who understand this lifestyle? 
                      What if I'm just floating alone in a sea of strangers?"
                    </Text>
                  </VStack>
                </Box>

                <Box p={8} bg={cardBg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
                  <VStack align="start" spacing={4}>
                    <HStack>
                      <Icon as={FaUsers} color="green.500" boxSize={6} />
                      <Heading as="h3" size="lg" color={useColorModeValue('navy.600', 'white')}>The Solution</Heading>
                    </HStack>
                    <Text color={useColorModeValue('gray.600', 'gray.300')}>
                      "You'll always know where your friends are docked. You'll see what's happening 
                      tonight at the marina. You'll discover others traveling your route."
                    </Text>
                  </VStack>
                </Box>
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Marina as Village Section */}
          <Box>
            <VStack spacing={8} align="stretch">
              <Box textAlign="center">
                <Heading as="h2" size="2xl" mb={4} color={useColorModeValue('navy.600', 'white')}>
                  A Marina Is More Than Slips, It's a Village
                </Heading>
                <Text fontSize="lg" maxW="3xl" mx="auto" color={useColorModeValue('gray.600', 'gray.300')}>
                  Every marina is a potential social hub: grilling out, music on the dock, spontaneous meetups. 
                  If we build the network, we make it easy to find people with common interests, 
                  both locals and fellow travelers.
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                {communityFeatures.map((feature, index) => (
                  <Box 
                    key={index}
                    p={6} 
                    bg={cardBg} 
                    borderRadius="lg" 
                    borderWidth="1px" 
                    borderColor={borderColor}
                    _hover={{ shadow: "lg", transform: "translateY(-2px)" }}
                    transition="all 0.2s"
                  >
                    <VStack align="start" spacing={4}>
                      <Icon as={feature.icon} color={feature.color} boxSize={8} />
                      <Heading as="h3" size="md" color={useColorModeValue('navy.600', 'white')}>{feature.title}</Heading>
                      <Text color={useColorModeValue('gray.600', 'gray.300')} fontSize="sm">{feature.description}</Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Real Stories Section */}
          <Box>
            <VStack spacing={8} align="stretch">
              <Box textAlign="center">
                <Heading as="h2" size="2xl" mb={4} color={useColorModeValue('navy.600', 'white')}>
                  This Is Already Happening
                </Heading>
                <Text fontSize="lg" maxW="3xl" mx="auto" color={useColorModeValue('gray.600', 'gray.300')}>
                  People find connection at marinas every day. Let's make it easier, together.
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {marinaStories.map((story, index) => (
                  <Box 
                    key={index}
                    p={6} 
                    bg={cardBg} 
                    borderRadius="lg" 
                    borderWidth="1px" 
                    borderColor={borderColor}
                    position="relative"
                  >
                    <VStack align="start" spacing={4}>
                      <Badge colorScheme="blue" variant="subtle">
                        {story.location}
                      </Badge>
                      <Text color={useColorModeValue('gray.700', 'gray.200')} fontStyle="italic">
                        "{story.story}"
                      </Text>
                      <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')} fontWeight="medium">
                        - {story.author}
                      </Text>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Community as Platform Section */}
          <Box bg={cardBg} p={10} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <VStack spacing={8} align="stretch">
              <Box textAlign="center">
                <Heading as="h2" size="2xl" mb={4} color={useColorModeValue('navy.600', 'white')}>
                  Community as the Platform
                </Heading>
                <Text fontSize="lg" maxW="3xl" mx="auto" color={useColorModeValue('gray.600', 'gray.300')}>
                  Features revolve around connection. Every interaction strengthens the mesh of liveaboards across regions.
                </Text>
              </Box>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                <VStack align="start" spacing={4}>
                  <Heading as="h3" size="lg" color={useColorModeValue('navy.600', 'white')}>What We're Building</Heading>
                  <VStack align="start" spacing={3}>
                    <HStack>
                      <Icon as={FaMapMarkerAlt} color="blue.500" />
                      <Text color={useColorModeValue('gray.700', 'gray.200')}>Know where your friends are docked</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaUtensils} color="orange.500" />
                      <Text color={useColorModeValue('gray.700', 'gray.200')}>See what's happening tonight at the marina</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaRoute} color="green.500" />
                      <Text color={useColorModeValue('gray.700', 'gray.200')}>Discover others traveling your route</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaComments} color="purple.500" />
                      <Text color={useColorModeValue('gray.700', 'gray.200')}>Share reviews, tips, and content that make it easier to belong</Text>
                    </HStack>
                  </VStack>
                </VStack>

                <VStack align="start" spacing={4}>
                  <Heading as="h3" size="lg" color={useColorModeValue('navy.600', 'white')}>Why This Works</Heading>
                  <VStack align="start" spacing={3}>
                    <Text color={useColorModeValue('gray.700', 'gray.200')}>• <strong>Feel at home anywhere:</strong> The community and familiarity of the app become your anchor, not any single location.</Text>
                    <Text color={useColorModeValue('gray.700', 'gray.200')}>• <strong>Every review you write helps everyone:</strong> Your marina insights become valuable data for fellow travelers, reducing anxiety about new destinations.</Text>
                    <Text color={useColorModeValue('gray.700', 'gray.200')}>• <strong>Natural network growth:</strong> As Great Loopers, snowbirds, and cruisers spread the platform, your comfort zone expands with them.</Text>
                    <Text color={useColorModeValue('gray.700', 'gray.200')}>• <strong>Rising tides raise all ships:</strong> The more naval nomads and marinas that join, the easier it becomes to feel at home wherever you dock. And the more opinions you feed back to the community, the easier it will be for the next nomad to start their adventure.</Text>
                  </VStack>
                </VStack>
              </SimpleGrid>
            </VStack>
          </Box>

          {/* Early Adopter Pitch */}
          <Box>
            <VStack spacing={8} align="stretch">
              <Box textAlign="center">
                <Heading as="h2" size="2xl" mb={4} color={useColorModeValue('navy.600', 'white')}>
                  For Early Adopters
                </Heading>
                <Text fontSize="lg" maxW="4xl" mx="auto" color={useColorModeValue('gray.600', 'gray.300')}>
                  Here's what we're building:
                </Text>
              </Box>

              <Box 
                p={8} 
                bg={useColorModeValue('blue.50', 'gray.700')} 
                borderRadius="lg" 
                borderLeft="4px solid" 
                borderLeftColor="blue.500"
              >
                <Text fontSize="lg" color={useColorModeValue('gray.700', 'gray.200')} fontStyle="italic">
                  "We're building something that makes marinas more than slips, it makes them communities. 
                  You'll always know where your friends are and what's happening tonight. This isn't about 
                  social media noise; it's about knowing you'll have people to grill with, to share a beer with, 
                  to swap parts or stories with, wherever you go."
                </Text>
              </Box>
            </VStack>
          </Box>

          {/* CTA Section */}
          <Box textAlign="center" py={10} bg={cardBg} borderRadius="lg" borderWidth="1px" borderColor={borderColor}>
            <VStack spacing={6}>
              <Heading as="h2" size="xl" color={useColorModeValue('navy.600', 'white')}>
                Ready to Build Community on the Water?
              </Heading>
              <Text fontSize="lg" color={useColorModeValue('gray.600', 'gray.300')} maxW="2xl">
                Join the early adopters who are already living the untethered life. 
                Be part of the network that makes every marina feel like home.
              </Text>
              <HStack spacing={4}>
                <Button
                  as={RouterLink}
                  to="/marina-explorer"
                  colorScheme="blue"
                  size="lg"
                  leftIcon={<FaAnchor />}
                >
                  Start Your Journey
                </Button>
                <Button
                  as="a"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe_sD8IZFdH84GxvExbsrJuk78ZrDCIOr5RZMyNHVSPuh-5AQ/viewform?usp=header"
                  target="_blank"
                  colorScheme="blue"
                  variant="outline"
                  size="lg"
                  leftIcon={<FaUsers />}
                >
                  Join the Community
                </Button>
              </HStack>
            </VStack>
          </Box>

        </VStack>
      </Container>
    </Box>
  )
}

export default Community
