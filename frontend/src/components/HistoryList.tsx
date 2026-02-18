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
    <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" maxH="calc(100vh - 150px)" overflowY="auto">
      <Heading size="md" mb={4} position="sticky" top="0" bg="white" pb={2} zIndex={1}>שאלות קודמות</Heading>
      <VStack spacing={3} align="stretch">
        {history.length === 0 ? (
          <Text color="gray.500" fontSize="sm">אין שאלות עדיין</Text>
        ) : (
          history.map((item) => (
            <Box key={item.id} p={3} borderWidth="1px" borderRadius="md" bg="gray.50" _hover={{ bg: 'blue.50', cursor: 'pointer' }}>
              <Badge colorScheme="blue" fontSize="xs" mb={1}>
                {item.category?.name}
              </Badge>
              <Text fontWeight="bold" fontSize="sm" noOfLines={2} mb={1}>{item.prompt}</Text>
              <Text fontSize="xs" color="gray.400">
                {new Date(item.createdAt).toLocaleDateString('he-IL')}
              </Text>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};
