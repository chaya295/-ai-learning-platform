import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Badge, Divider } from '@chakra-ui/react';
import { promptsApi } from '../api/client';
import { Prompt } from '../types';

interface Props {
  userId: number;
  refresh: number;
}

export const HistoryList: React.FC<Props> = ({ userId, refresh }) => {
  const [history, setHistory] = useState<Prompt[]>([]);

  useEffect(() => {
    promptsApi.getByUser(userId).then((res) => setHistory(res.data));
  }, [userId, refresh]);

  return (
    <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
      <Heading size="md" mb={6}>Learning History</Heading>
      <VStack spacing={4} align="stretch">
        {history.length === 0 ? (
          <Text color="gray.500">No lessons yet. Generate your first lesson above!</Text>
        ) : (
          history.map((item) => (
            <Box key={item.id} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
              <Badge colorScheme="blue" mb={2}>
                {item.category?.name} - {item.subCategory?.name}
              </Badge>
              <Text fontWeight="bold" mb={2}>{item.prompt}</Text>
              <Divider my={2} />
              <Text fontSize="sm" color="gray.700">{item.response}</Text>
              <Text fontSize="xs" color="gray.400" mt={2}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};
