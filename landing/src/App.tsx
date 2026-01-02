import { ChakraProvider, Box } from '@chakra-ui/react'
import theme from './theme'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Home from './pages/Home'
import MarinaExplorer from './pages/MarinaExplorer'
import RouteExplorer from './pages/Routes'
import Community from './pages/Community'
import { MapPage } from './pages/MapPage'
import Contact from './components/Contact'
import { useEffect } from 'react'

// Auth removed: simplifying app to static pages only

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box minH="100vh">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marina-explorer" element={<MarinaExplorer />} />
            <Route path="/routes" element={<RouteExplorer />} />
            <Route path="/community" element={<Community />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  )
}

export default App
