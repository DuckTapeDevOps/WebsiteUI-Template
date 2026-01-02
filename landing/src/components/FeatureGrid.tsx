import { SimpleGrid, Box, Icon, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import { type IconType } from 'react-icons'

interface Feature {
  icon: IconType
  title: string
  description: string
  color?: string
}

interface FeatureGridProps {
  features: Feature[]
  columns?: { base: number; md: number; lg?: number }
  variant?: 'card' | 'simple'
}

export const FeatureGrid = ({ 
  features, 
  columns = { base: 1, md: 3 }, 
  variant = 'card' 
}: FeatureGridProps) => {
  const cardBg = useColorModeValue('white', 'gray.700')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const simpleBg = useColorModeValue('blue.50', 'gray.700')
  const simpleBorder = useColorModeValue('blue.100', 'gray.600')

  return (
    <SimpleGrid columns={columns} spacing={variant === 'card' ? 6 : 8}>
      {features.map((feature, index) => (
        <Box
          key={index}
          p={variant === 'card' ? 6 : 8}
          bg={variant === 'card' ? cardBg : simpleBg}
          borderRadius={variant === 'card' ? 'lg' : 'xl'}
          textAlign="center"
          border={variant === 'card' ? '1px solid' : '2px solid'}
          borderColor={variant === 'card' ? borderColor : simpleBorder}
        >
          <Icon 
            as={feature.icon} 
            boxSize={12} 
            color={feature.color || 'blue.500'} 
            mb={4} 
          />
          <Heading 
            as="h3" 
            size="md" 
            mb={3} 
            color={useColorModeValue(
              variant === 'card' ? 'gray.800' : 'blue.700', 
              variant === 'card' ? 'white' : 'blue.300'
            )}
          >
            {feature.title}
          </Heading>
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
            {feature.description}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}
