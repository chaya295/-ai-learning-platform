import React, { useEffect, useState } from 'react';
import { Container, Heading, Box, Text, VStack, Badge, Spinner } from '@chakra-ui/react';
import { promptsApi } from '../api/client';
import { Prompt } from '../types';

export const MyHistory: React.FC = () => {
  const [history, setHistory] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await promptsApi.getByUser(user.id);
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Container py={8}><Spinner /></Container>;

  return (
    <Container maxW="container.lg" py={8}>
      <Heading mb={6} color="blue.600">My Learning History</Heading>
      {history.length === 0 ? (
        <Text>No previous lessons</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {history.map((item) => (
            <Box key={item.id} bg="white" p={6} borderRadius="lg" boxShadow="md">
              <Badge colorScheme="blue" mb={2}>
                {item.category?.name} - {item.subCategory?.name}
              </Badge>
              <Text fontWeight="bold" mb={2}>Question:</Text>
              <Text mb={4}>{item.prompt}</Text>
              <Text fontWeight="bold" mb={2}>Answer:</Text>
              <Text whiteSpace="pre-wrap">{item.response}</Text>
              <Text fontSize="sm" color="gray.500" mt={4}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
};
