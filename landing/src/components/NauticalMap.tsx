import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box, Text, Button, Spinner, HStack, VStack, useToast } from '@chakra-ui/react';
import * as turf from '@turf/turf';
import RoutePlanner from './RoutePlanner';
import { FaRoute } from 'react-icons/fa';

interface NauticalMapProps {
  initialCenter?: [number, number];
  initialZoom?: number;
}

export function NauticalMap({ 
  initialCenter = [-81.4000, 30.2672], // Default to Jacksonville, FL
  initialZoom = 10 
}: NauticalMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const isInitialized = useRef(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
  const [calculatedDistance, setCalculatedDistance] = useState<number | null>(null);
  const [isRouteMode, setIsRouteMode] = useState(false);
  const toast = useToast();

  useLayoutEffect(() => {
    if (map.current || isInitialized.current) return; // prevent multiple initializations

    const initializeMap = () => {
      try {
        // Check if WebGL is supported
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          setError('WebGL is not supported in your browser. Please try a different browser.');
          return;
        }

        if (!mapContainer.current) {
          setError('Map container is not available. Please try refreshing the page.');
          return;
        }

        // Mark as initialized to prevent multiple instances
        isInitialized.current = true;

        // Create map with nautical style
        const mapStyle = {
          version: 8 as const,
          glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
          sources: {
            'osm': {
              type: 'raster' as const,
              tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenStreetMap contributors'
            },
            'marine': {
              type: 'raster' as const,
              tiles: ['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenSeaMap contributors'
            },
            'harbors': {
              type: 'raster' as const,
              tiles: ['https://tiles.openseamap.org/harbours/{z}/{x}/{y}.png'],
              tileSize: 256,
              attribution: '© OpenSeaMap contributors'
            }
          },
          layers: [
            {
              id: 'osm',
              type: 'raster' as const,
              source: 'osm',
              minzoom: 0,
              maxzoom: 19
            },
            {
              id: 'marine',
              type: 'raster' as const,
              source: 'marine',
              minzoom: 0,
              maxzoom: 19,
              paint: {
                'raster-opacity': 0.8
              }
            },
            {
              id: 'harbors',
              type: 'raster' as const,
              source: 'harbors',
              minzoom: 0,
              maxzoom: 19,
              paint: {
                'raster-opacity': 0.9
              }
            }
          ]
        };

        map.current = new maplibregl.Map({
          container: mapContainer.current!,
          style: mapStyle,
          center: initialCenter,
          zoom: initialZoom,
          maxZoom: 19,
          minZoom: 2,
          renderWorldCopies: true,
          trackResize: true,
          attributionControl: {
            compact: true
          }
        });

        // Add navigation controls
        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
        
        // Add scale control
        map.current.addControl(new maplibregl.ScaleControl({
          maxWidth: 200,
          unit: 'nautical'
        }));

        map.current.on('load', () => {
          console.log('Map loaded successfully');
          setMapLoaded(true);
          setupRouteSources();
        });

        // Add click event listener for route planning
        map.current.on('click', handleMapClick);

        map.current.on('error', (e) => {
          console.error('MapLibre error:', e);
          // Don't set error immediately, some errors are recoverable
          if (e.error && e.error.message) {
            console.error('Error details:', e.error.message);
            
            // If it's a marine tile error, we can continue with just OSM
            if (e.error.message.includes('openseamap') || e.error.message.includes('marine') || e.error.message.includes('harbours')) {
              console.warn('Marine tiles failed to load, continuing with base map only');
              // Remove marine layers if they exist
              if (map.current) {
                if (map.current.getLayer('marine')) {
                  map.current.removeLayer('marine');
                }
                if (map.current.getLayer('harbors')) {
                  map.current.removeLayer('harbors');
                }
              }
            } else {
              // For other errors, show user-friendly message
              setError('Some map features failed to load. The base map should still work.');
            }
          }
        });

        // Handle WebGL context loss
        map.current.on('webglcontextlost', () => {
          setError('WebGL context was lost. Please refresh the page.');
        });

        map.current.on('webglcontextrestored', () => {
          setError(null);
          setMapLoaded(true);
        });

      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to initialize the map. Please try refreshing the page.');
        isInitialized.current = false; // Reset on error
      }
    };

    // Simple initialization - try once, if container exists
    if (mapContainer.current) {
      initializeMap();
    } else {
      // If container doesn't exist yet, wait a bit and try again
      const timer = setTimeout(() => {
        if (mapContainer.current) {
          initializeMap();
        } else {
          setError('Map container is not available. Please try refreshing the page.');
        }
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      isInitialized.current = false; // Reset initialization flag
    };
  }, [initialCenter, initialZoom]);

  const setupRouteSources = () => {
    if (!map.current) return;

    // Add sources for route points and line
    map.current.addSource('route-points', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });

    map.current.addSource('route-line', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      }
    });

    // Add layers
    map.current.addLayer({
      id: 'route-points',
      type: 'circle',
      source: 'route-points',
      paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf',
        'circle-stroke-width': 3,
        'circle-stroke-color': '#ffffff'
      }
    });

    // Add point labels
    map.current.addLayer({
      id: 'route-points-labels',
      type: 'symbol',
      source: 'route-points',
      layout: {
        'text-field': ['get', 'label'],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 1.5],
        'text-anchor': 'top',
        'text-size': 12
      },
      paint: {
        'text-color': '#007cbf',
        'text-halo-color': '#ffffff',
        'text-halo-width': 2
      }
    });

    map.current.addLayer({
      id: 'route-line',
      type: 'line',
      source: 'route-line',
      paint: {
        'line-color': '#007cbf',
        'line-width': 4,
        'line-dasharray': [3, 3],
        'line-opacity': 0.8
      }
    });
  };

  const handleMapClick = (e: any) => {
    if (!isRouteMode || !map.current) return;

    // Check if this is a MapLibre click event
    if (e.lngLat) {
      const { lng, lat } = e.lngLat;
      const newPoints: [number, number][] = [...routePoints, [lng, lat]];
      setRoutePoints(newPoints);

      // Update map sources
      updateRouteDisplay(newPoints);

      if (newPoints.length === 2) {
        calculateDistance(newPoints);
        setIsRouteMode(false);
        toast({
          title: 'Route planned!',
          description: 'Distance calculated and sent to calculator.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const updateRouteDisplay = (points: [number, number][]) => {
    if (!map.current) return;

    // Update points source
    const pointSource = map.current.getSource('route-points') as maplibregl.GeoJSONSource;
    if (pointSource) {
      pointSource.setData({
        type: 'FeatureCollection',
        features: points.map((point, index) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: point
          },
          properties: {
            id: index + 1,
            label: index === 0 ? 'START' : index === 1 ? 'END' : `WP${index + 1}`
          }
        }))
      });
    }

    // Update line source
    const lineSource = map.current.getSource('route-line') as maplibregl.GeoJSONSource;
    if (lineSource && points.length >= 2) {
      lineSource.setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: points
        }
      });
    }
  };

  const calculateDistance = (points: [number, number][]) => {
    if (points.length !== 2) return;

    const line = turf.lineString(points);
    const distance = turf.length(line, { units: 'nauticalmiles' });
    setCalculatedDistance(distance);
  };

  const startRoutePlanning = () => {
    setIsRouteMode(true);
    setRoutePoints([]);
    setCalculatedDistance(null);
    
    // Clear existing route
    updateRouteDisplay([]);
    
    toast({
      title: 'Route planning mode',
      description: 'Click two points on the map to plan your route.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const clearRoute = () => {
    setRoutePoints([]);
    setCalculatedDistance(null);
    setIsRouteMode(false);
    updateRouteDisplay([]);
  };

  const handleDistanceToCalculator = (distance: number) => {
    // This will be passed to RoutePlanner
    return distance;
  };

  if (error) {
    return (
      <Box 
        p={4} 
        textAlign="center" 
        bg="red.50" 
        borderRadius="md"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <Text color="red.500" fontSize="lg">{error}</Text>
        <Button 
          colorScheme="blue" 
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </Box>
    );
  }

  return (
    <Box 
      style={{ 
        width: '100%', 
        height: '100%',
        position: 'relative',
        minHeight: '400px' // Ensure minimum height
      }} 
    >
      <Box 
        ref={mapContainer} 
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'relative',
          minHeight: '400px', // Ensure minimum height
          backgroundColor: '#f0f0f0' // Light background to show container bounds
        }} 
      />
      
      {/* Loading overlay */}
      {!mapLoaded && !error && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={5}
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="lg"
          textAlign="center"
        >
          <VStack spacing={3}>
            <Spinner size="lg" color="blue.500" />
            <Text>Loading map...</Text>
          </VStack>
        </Box>
      )}
      
      {/* Route Planning Controls */}
      {mapLoaded && (
        <Box
          position="absolute"
          top={4}
          left={4}
          zIndex={10}
        >
          <HStack spacing={2} align="stretch">
            <Button
              size="sm"
              colorScheme={isRouteMode ? "red" : "blue"}
              onClick={isRouteMode ? clearRoute : startRoutePlanning}
              leftIcon={<FaRoute />}
            >
              {isRouteMode ? "Cancel Route" : "Plan Route"}
            </Button>
            
            {calculatedDistance && (
              <Box
                p={2}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                border="1px"
                borderColor="gray.200"
              >
                <Text fontSize="sm" fontWeight="medium">
                  Distance: {calculatedDistance.toFixed(1)} nm
                </Text>
              </Box>
            )}
          </HStack>
        </Box>
      )}

      {mapLoaded && (
        <RoutePlanner 
          calculatedDistance={calculatedDistance}
          onDistanceUse={handleDistanceToCalculator}
        />
      )}
    </Box>
  );
} 