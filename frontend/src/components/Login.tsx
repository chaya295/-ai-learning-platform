import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { authApi } from '../api/client';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await authApi.login(phone, password);
      const userData = response.data.user;
      const token = response.data.access_token;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      onLoginSuccess(userData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="white" p={8} borderRadius="xl" boxShadow="lg" maxW="md" w="full" border="1px" borderColor="gray.200">
      <VStack spacing={2} mb={6} textAlign="center">
        <Box fontSize="3xl">🎓</Box>
        <Heading size="lg" color="gray.800">Welcome Back</Heading>
        <Text color="gray.600" fontSize="sm">Sign in to continue learning</Text>
      </VStack>
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel fontWeight="500" color="gray.700" fontSize="sm">Phone Number</FormLabel>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              size="md"
              maxLength={10}
              borderColor="gray.300"
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight="500" color="gray.700" fontSize="sm">Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              size="md"
              minLength={6}
              borderColor="gray.300"
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
            />
          </FormControl>
          {error && (
            <Box bg="red.50" p={3} borderRadius="md" w="full" border="1px" borderColor="red.200">
              <Text color="red.600" fontSize="sm">{error}</Text>
            </Box>
          )}
          <Button 
            type="submit" 
            colorScheme="blue" 
            size="md" 
            width="full" 
            isLoading={loading}
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
            transition="all 0.2s"
          >
            Sign In
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
