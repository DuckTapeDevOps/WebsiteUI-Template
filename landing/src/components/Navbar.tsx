import { Box, Flex, Button, Stack, useColorModeValue, Badge, IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useLocation } from 'react-router-dom'

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <Box bg={useColorModeValue('white', 'gray.800')} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <RouterLink to="/">
          <Box fontWeight="bold" fontSize="xl" color={useColorModeValue('navy.600', 'white')}>
            Naval Nomad
          </Box>
        </RouterLink>

        <Flex alignItems="center">
          <Stack direction="row" spacing={4}>
            <Button
              as={RouterLink}
              to="/community"
              colorScheme={isActive('/community') ? 'blue' : 'gray'}
              variant={isActive('/community') ? 'solid' : 'ghost'}
              bg={isActive('/community') ? 'blue.500' : 'transparent'}
              _hover={{
                bg: isActive('/community') ? 'blue.600' : useColorModeValue('gray.100', 'gray.700')
              }}
            >
              Community
            </Button>
            <Box position="relative">
              <Button
                as={RouterLink}
                to="/marina-explorer"
                variant={isActive('/marina-explorer') ? 'solid' : 'ghost'}
                colorScheme={isActive('/marina-explorer') ? 'blue' : 'gray'}
                bg={isActive('/marina-explorer') ? 'blue.500' : 'transparent'}
                _hover={{
                  bg: isActive('/marina-explorer') ? 'blue.600' : useColorModeValue('gray.100', 'gray.700')
                }}
              >
                Marina Explorer
              </Button>
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                colorScheme="orange"
                fontSize="xs"
                borderRadius="full"
              >
                BETA
              </Badge>
            </Box>
            <Box position="relative">
              <Button
                as={RouterLink}
                to="/routes"
                variant={isActive('/routes') ? 'solid' : 'ghost'}
                colorScheme={isActive('/routes') ? 'blue' : 'gray'}
                bg={isActive('/routes') ? 'blue.500' : 'transparent'}
                isDisabled
                opacity={0.6}
                _hover={{
                  bg: isActive('/routes') ? 'blue.600' : useColorModeValue('gray.100', 'gray.700')
                }}
              >
                Route Planner
              </Button>
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                colorScheme="gray"
                fontSize="xs"
                borderRadius="full"
              >
                SOON
              </Badge>
            </Box>
            <Button
              as={RouterLink}
              to="/contact"
              variant={isActive('/contact') ? 'solid' : 'ghost'}
              colorScheme={isActive('/contact') ? 'blue' : 'gray'}
              bg={isActive('/contact') ? 'blue.500' : 'transparent'}
              _hover={{
                bg: isActive('/contact') ? 'blue.600' : useColorModeValue('gray.100', 'gray.700')
              }}
            >
              Contact
            </Button>
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