import { VStack, SimpleGrid, Badge, Text, useColorModeValue } from '@chakra-ui/react'

interface NetworkLevel {
  badge: string
  badgeColor: string
  title: string
  description: string
}

interface NetworkSectionProps {
  levels: NetworkLevel[]
}

export const NetworkSection = ({ levels }: NetworkSectionProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
      {levels.map((level, index) => (
        <VStack 
          key={index}
          spacing={3} 
          p={6} 
          bg={useColorModeValue('white', 'gray.600')} 
          borderRadius="lg" 
          shadow="sm"
        >
          <Badge colorScheme={level.badgeColor} fontSize="sm" px={3} py={1}>
            {level.badge}
          </Badge>
          <Text fontSize="sm" textAlign="center" color={useColorModeValue('gray.600', 'gray.300')}>
            {level.description}
          </Text>
        </VStack>
      ))}
    </SimpleGrid>
  )
}
