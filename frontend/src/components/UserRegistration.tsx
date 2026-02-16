import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Heading } from '@chakra-ui/react';
import { usersApi } from '../api/client';

interface Props {
  onUserCreated: (userId: number) => void;
}

export const UserRegistration: React.FC<Props> = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await usersApi.create({ name, phone });
      toast({ title: 'Registered successfully!', status: 'success', duration: 3000 });
      onUserCreated(response.data.id);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to register',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" maxW="md" mx="auto">
      <Heading size="md" mb={6}>Register to Start Learning</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10 digits"
              maxLength={10}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full" isLoading={loading}>
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
