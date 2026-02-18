import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text } from '@chakra-ui/react';
import { authApi } from '../api/client';

interface LoginProps {
  onLoginSuccess: (user: any, token: string) => void;
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
      onLoginSuccess(userData, token);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" maxW="md" mx="auto">
      <Heading size="md" mb={6} textAlign="center">התחברות</Heading>
      <form onSubmit={handleLogin}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>מספר טלפון</FormLabel>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0501234567"
              maxLength={10}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>סיסמה</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="הזן סיסמה"
              minLength={6}
            />
          </FormControl>
          {error && <Text color="red.500" fontSize="sm">{error}</Text>}
          <Button type="submit" colorScheme="blue" width="full" isLoading={loading}>
            התחבר
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
