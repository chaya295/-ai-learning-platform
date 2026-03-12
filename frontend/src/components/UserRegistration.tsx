import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Heading, Text } from '@chakra-ui/react';
import { usersApi } from '../api/client';

interface Props {
  onUserCreated: (userId: number) => void;
}

export const UserRegistration: React.FC<Props> = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await usersApi.create({ name, phone, password });
      toast({ 
        title: 'Registration successful!', 
        description: 'You can now sign in with your credentials.',
        status: 'success', 
        duration: 3000 
      });
      onUserCreated(response.data.id);
    } catch (error: any) {
      toast({
        title: 'Registration failed',
        description: error.response?.data?.message || 'Please try again',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="white" p={8} borderRadius="xl" boxShadow="lg" maxW="md" w="full" border="1px" borderColor="gray.200">
      <VStack spacing={2} mb={6} textAlign="center">
        <Box fontSize="3xl">🚀</Box>
        <Heading size="lg" color="gray.800">Create Account</Heading>
        <Text color="gray.600" fontSize="sm">Start your learning journey today</Text>
      </VStack>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel fontWeight="500" color="gray.700" fontSize="sm">Full Name</FormLabel>
            <Input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your full name" 
              size="md"
              borderColor="gray.300"
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight="500" color="gray.700" fontSize="sm">Phone Number</FormLabel>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10 digits"
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
              placeholder="Minimum 6 characters"
              size="md"
              minLength={6}
              borderColor="gray.300"
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
            />
          </FormControl>
          <Button 
            type="submit" 
            colorScheme="blue" 
            size="md" 
            width="full" 
            isLoading={loading}
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
            transition="all 0.2s"
          >
            Create Account
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
