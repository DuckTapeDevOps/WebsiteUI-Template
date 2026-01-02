import React, { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { 
  Box, 
  Button, 
  Input, 
  VStack, 
  HStack, 
  Text, 
  IconButton,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText
} from '@chakra-ui/react'
import { FaGasPump, FaTachometerAlt, FaRoute, FaCalculator } from 'react-icons/fa'

interface RoutePlannerProps {
  onRouteChange?: (route: any) => void
  calculatedDistance?: number | null
  onDistanceUse?: (distance: number) => number
}

export default function RoutePlanner({ onRouteChange, calculatedDistance, onDistanceUse }: RoutePlannerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [fuelCapacity, setFuelCapacity] = useState('')
  const [fuelConsumption, setFuelConsumption] = useState('')
  const [cruisingSpeed, setCruisingSpeed] = useState('')
  const [distance, setDistance] = useState('')
  const [calculatedResults, setCalculatedResults] = useState<any>(null)

  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')

  // Auto-populate distance when calculated from map
  useEffect(() => {
    if (calculatedDistance) {
      setDistance(calculatedDistance.toFixed(1))
    }
  }, [calculatedDistance])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const calculateTrip = () => {
    const capacity = parseFloat(fuelCapacity)
    const consumption = parseFloat(fuelConsumption)
    const speed = parseFloat(cruisingSpeed)
    const dist = parseFloat(distance)

    if (capacity && consumption && speed && dist) {
      const tripTime = dist / speed // hours
      const fuelUsed = tripTime * consumption // gallons
      const fuelRemaining = capacity - fuelUsed
      const safetyMargin = fuelRemaining / consumption // hours of reserve

      setCalculatedResults({
        tripTime: tripTime.toFixed(1),
        fuelUsed: fuelUsed.toFixed(1),
        fuelRemaining: fuelRemaining.toFixed(1),
        safetyMargin: safetyMargin.toFixed(1),
        canMakeTrip: fuelRemaining > 0
      })
    }
  }

  const clearCalculations = () => {
    setCalculatedResults(null)
    setFuelCapacity('')
    setFuelConsumption('')
    setCruisingSpeed('')
    setDistance('')
  }

  return (
    <Box position="fixed" top="50%" right={4} transform="translateY(-50%)" zIndex={50}>
      {/* Toggle Button */}
      <IconButton
        aria-label="Fuel & Speed Calculator"
        icon={isExpanded ? <ChevronRightIcon /> : <FaCalculator />}
        onClick={toggleExpanded}
        colorScheme="blue"
        size="lg"
        borderRadius="full"
        boxShadow="lg"
        _hover={{ transform: 'scale(1.05)' }}
        transition="all 0.3s"
      />

      {/* Expanded Panel */}
      {isExpanded && (
        <Box
          position="absolute"
          right="60px"
          top={0}
          width="320px"
          bg={bgColor}
          borderRadius="lg"
          boxShadow="xl"
          border="1px"
          borderColor={borderColor}
          p={4}
          transition="all 0.3s"
        >
          <HStack justify="space-between" mb={4}>
            <HStack>
              <FaGasPump />
              <Text fontSize="lg" fontWeight="semibold">
                Fuel & Speed Calculator
              </Text>
            </HStack>
            <IconButton
              aria-label="Close Calculator"
              icon={<ChevronRightIcon />}
              onClick={toggleExpanded}
              size="sm"
              variant="ghost"
            />
          </HStack>

          <VStack spacing={3}>
            {/* Fuel Capacity */}
            <Box width="100%">
              <Text fontSize="sm" fontWeight="medium" mb={1}>
                Fuel Capacity (gallons)
              </Text>
              <Input
                value={fuelCapacity}
                onChange={(e) => setFuelCapacity(e.target.value)}
                placeholder="e.g., 200"
                size="sm"
                type="number"
              />
            </Box>

            {/* Fuel Consumption */}
            <Box width="100%">
              <Text fontSize="sm" fontWeight="medium" mb={1}>
                Fuel Consumption (gph)
              </Text>
              <Input
                value={fuelConsumption}
                onChange={(e) => setFuelConsumption(e.target.value)}
                placeholder="e.g., 2.5"
                size="sm"
                type="number"
              />
            </Box>

            {/* Cruising Speed */}
            <Box width="100%">
              <Text fontSize="sm" fontWeight="medium" mb={1}>
                Cruising Speed (knots)
              </Text>
              <Input
                value={cruisingSpeed}
                onChange={(e) => setCruisingSpeed(e.target.value)}
                placeholder="e.g., 8"
                size="sm"
                type="number"
              />
            </Box>

            {/* Distance */}
            <Box width="100%">
              <Text fontSize="sm" fontWeight="medium" mb={1}>
                Distance (nautical miles)
              </Text>
              <Input
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="e.g., 50"
                size="sm"
                type="number"
              />
            </Box>

            {/* Calculate Button */}
            <Button
              onClick={calculateTrip}
              disabled={!fuelCapacity || !fuelConsumption || !cruisingSpeed || !distance}
              width="100%"
              size="sm"
              colorScheme="blue"
              leftIcon={<FaCalculator />}
            >
              Calculate Trip
            </Button>

            {/* Results */}
            {calculatedResults && (
              <Box width="100%" p={3} bg="blue.50" borderRadius="md" border="1px" borderColor="blue.200">
                <VStack spacing={2} align="stretch">
                  <Stat size="sm">
                    <StatLabel>Trip Time</StatLabel>
                    <StatNumber>{calculatedResults.tripTime} hours</StatNumber>
                  </Stat>
                  
                  <Stat size="sm">
                    <StatLabel>Fuel Used</StatLabel>
                    <StatNumber>{calculatedResults.fuelUsed} gallons</StatNumber>
                  </Stat>
                  
                  <Stat size="sm">
                    <StatLabel>Fuel Remaining</StatLabel>
                    <StatNumber color={calculatedResults.canMakeTrip ? "green.500" : "red.500"}>
                      {calculatedResults.fuelRemaining} gallons
                    </StatNumber>
                  </Stat>
                  
                  <Stat size="sm">
                    <StatLabel>Safety Margin</StatLabel>
                    <StatNumber>{calculatedResults.safetyMargin} hours</StatNumber>
                    <StatHelpText>
                      {calculatedResults.canMakeTrip 
                        ? "✅ Safe to proceed" 
                        : "❌ Insufficient fuel"}
                    </StatHelpText>
                  </Stat>
                </VStack>
              </Box>
            )}

            {/* Clear Button */}
            {calculatedResults && (
              <Button
                onClick={clearCalculations}
                width="100%"
                size="sm"
                variant="outline"
                colorScheme="gray"
              >
                Clear & Reset
              </Button>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  )
} 