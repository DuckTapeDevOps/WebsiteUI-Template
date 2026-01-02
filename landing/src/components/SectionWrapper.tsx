import { Box, VStack, Heading, useColorModeValue } from '@chakra-ui/react'
import { type ReactNode } from 'react'

interface SectionWrapperProps {
  title?: string
  children: ReactNode
  bg?: 'default' | 'accent' | 'transparent'
  spacing?: number
  py?: number
}

export const SectionWrapper = ({ 
  title, 
  children, 
  bg = 'default',
  spacing = 8,
  py = 10
}: SectionWrapperProps) => {
  const getBgColor = () => {
    switch (bg) {
      case 'accent':
        return useColorModeValue('gray.50', 'gray.700')
      case 'transparent':
        return 'transparent'
      default:
        return 'transparent'
    }
  }

  return (
    <Box bg={getBgColor()} p={bg === 'accent' ? py : 0} borderRadius={bg === 'accent' ? 'xl' : 'none'}>
      <VStack spacing={spacing} align="stretch">
        {title && (
          <Heading as="h2" size="xl" textAlign="center" color={useColorModeValue('navy.600', 'white')}>
            {title}
          </Heading>
        )}
        {children}
      </VStack>
    </Box>
  )
}
