import { Box } from '@chakra-ui/react';
import { NauticalMap } from '../components/NauticalMap';

export function MapPage() {
  return (
    <Box 
      width="100vw" 
      height="calc(100vh - 64px)" // Subtract navbar height
      position="relative"
      overflow="hidden"
    >
      <NauticalMap />
    </Box>
  );
} 