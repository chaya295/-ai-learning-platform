import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Box, Flex, Button } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Box bg="gray.50" minH="100vh">
          <Flex bg="blue.600" p={4} gap={4} boxShadow="md">
            <Button as={Link} to="/" colorScheme="whiteAlpha" variant="solid">
              User Dashboard
            </Button>
            <Button as={Link} to="/admin" colorScheme="whiteAlpha" variant="solid">
              Admin
            </Button>
          </Flex>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
