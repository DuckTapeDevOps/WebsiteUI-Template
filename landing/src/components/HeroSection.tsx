import { Box, Heading, Text, VStack, Button, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { type ReactNode } from 'react'

interface HeroSectionProps {
  title: string
  subtitle?: string
  description: string
  primaryButton: {
    text: string
    to: string
    icon?: ReactNode
  }
  secondaryText?: string
}

export const HeroSection = ({ 
  title, 
  subtitle, 
  description, 
  primaryButton, 
  secondaryText 
}: HeroSectionProps) => {
  return (
    <Box textAlign="center" py={20}>
      <Heading as="h1" size="3xl" mb={4} color={useColorModeValue('navy.600', 'white')}>
        {title}
      </Heading>
      {subtitle && (
        <Text fontSize="2xl" mb={6} color={useColorModeValue('blue.600', 'blue.300')} fontWeight="semibold">
          {subtitle}
        </Text>
      )}
      <Text fontSize="xl" mb={8} maxW="4xl" mx="auto" color={useColorModeValue('gray.600', 'gray.300')}>
        {description}
      </Text>
      <VStack spacing={4}>
        <Button
          as={RouterLink}
          to={primaryButton.to}
          colorScheme="blue"
          size="lg"
          px={8}
          leftIcon={primaryButton.icon as any}
        >
          {primaryButton.text}
        </Button>
        {secondaryText && (
          <Text fontSize="sm" color={useColorModeValue('gray.500', 'gray.400')}>
            {secondaryText}
          </Text>
        )}
      </VStack>
    </Box>
  )
}
