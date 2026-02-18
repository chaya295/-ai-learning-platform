import React, { useState } from 'react';
import { ChakraProvider, Box, Flex, Button, Text, VStack } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Login } from './components/Login';
import { UserRegistration } from './components/UserRegistration';
import { MyHistory } from './components/MyHistory';
import Protected from './components/Protected';

function AppContent() {
  const { user, setUser, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleRegisterSuccess = (userId: number) => {
    setShowLogin(true);
  };

  if (!user) {
    return (
      <Box bg="gray.50" minH="100vh" py={10}>
        {showLogin ? (
          <VStack spacing={4}>
            <Login onLoginSuccess={handleLoginSuccess} />
            <Button variant="link" colorScheme="blue" onClick={() => setShowLogin(false)}>
              Don't have an account? Register here
            </Button>
          </VStack>
        ) : (
          <VStack spacing={4}>
            <UserRegistration onUserCreated={handleRegisterSuccess} />
            <Button variant="link" colorScheme="blue" onClick={() => setShowLogin(true)}>
              Already have an account? Login here
            </Button>
          </VStack>
        )}
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Box bg="gray.50" minH="100vh">
        <Flex bg="blue.600" p={4} gap={4} boxShadow="md" alignItems="center">
          <Button as={Link} to="/" colorScheme="whiteAlpha" variant="solid">
            Dashboard
          </Button>
          <Button as={Link} to="/history" colorScheme="whiteAlpha" variant="solid">
            My History
          </Button>
          <Protected roles={['ADMIN']}>
            <Button as={Link} to="/admin" colorScheme="whiteAlpha" variant="solid">
              Admin
            </Button>
          </Protected>
          <Text color="white" ml="auto">Hello, {user.name}</Text>
          <Button onClick={logout} colorScheme="red" size="sm">
            Logout
          </Button>
        </Flex>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/history" element={<MyHistory />} />
          <Route path="/admin" element={
            <Protected roles={['ADMIN']}>
              <AdminDashboard />
            </Protected>
          } />
        </Routes>
      </Box>
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
