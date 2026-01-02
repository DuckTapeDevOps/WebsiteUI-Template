import { Box, Flex, Button, Stack, useColorModeValue, Badge, IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { siteConfig } from '../config/site'

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <Box bg={useColorModeValue('white', 'gray.800')} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <RouterLink to="/">
          <Box fontWeight="bold" fontSize="xl" color={useColorModeValue('navy.600', 'white')}>
            {siteConfig.brand.name}
          </Box>
        </RouterLink>

        <Flex alignItems="center">
          <Stack direction="row" spacing={4}>
            {siteConfig.navigation.map((item) => (
              <Box key={item.path} position="relative">
                <Button
                  as={RouterLink}
                  to={item.path}
                  colorScheme={isActive(item.path) ? 'blue' : 'gray'}
                  variant={isActive(item.path) ? 'solid' : 'ghost'}
                  bg={isActive(item.path) ? 'blue.500' : 'transparent'}
                  isDisabled={item.disabled}
                  opacity={item.disabled ? 0.6 : 1}
                  _hover={{
                    bg: isActive(item.path) ? 'blue.600' : useColorModeValue('gray.100', 'gray.700')
                  }}
                >
                  {item.label}
                </Button>
                {item.badge && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    colorScheme={item.badge.colorScheme}
                    fontSize="xs"
                    borderRadius="full"
                  >
                    {item.badge.text}
                  </Badge>
                )}
              </Box>
            ))}
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="md"
            />
            {/* Auth removed: no sign-in/out buttons */}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}