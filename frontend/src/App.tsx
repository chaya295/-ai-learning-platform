import React, { useState } from 'react';
import { ChakraProvider, Box, Button, Text, VStack, Container, Heading } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './components/Login';
import { UserRegistration } from './components/UserRegistration';
import { MyHistory } from './components/MyHistory';
import Protected from './components/Protected';

function AppContent() {
  const { user, setUser } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleRegisterSuccess = (userId: number) => {
    setShowLogin(true);
  };

  if (!user) {
    return (
      <Box bg="gray.50" minH="100vh" display="flex" alignItems="center" justifyContent="center" p={4}>
        <Container maxW="md">
          <VStack spacing={6}>
            {/* Header */}
            <VStack spacing={3} textAlign="center">
              <Box fontSize="5xl">🎓</Box>
              <Heading size="xl" color="gray.800">AI Learning Platform</Heading>
              <Text color="gray.600" fontSize="md">Learn anything with artificial intelligence</Text>
            </VStack>

            {/* Login/Register Form */}
            {showLogin ? (
              <VStack spacing={4} w="full">
                <Login onLoginSuccess={handleLoginSuccess} />
                <Text color="gray.600" fontSize="sm">
                  Don't have an account?{' '}
                  <Button 
                    variant="link" 
                    colorScheme="blue" 
                    onClick={() => setShowLogin(false)}
                    fontWeight="600"
                  >
                    Sign up
                  </Button>
                </Text>
              </VStack>
            ) : (
              <VStack spacing={4} w="full">
                <UserRegistration onUserCreated={handleRegisterSuccess} />
                <Text color="gray.600" fontSize="sm">
                  Already have an account?{' '}
                  <Button 
                    variant="link" 
                    colorScheme="blue" 
                    onClick={() => setShowLogin(true)}
                    fontWeight="600"
                  >
                    Sign in
                  </Button>
                </Text>
              </VStack>
            )}
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<MyHistory />} />
        <Route path="/admin" element={
          <Protected roles={['ADMIN']}>
            <AdminDashboard />
          </Protected>
        } />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
