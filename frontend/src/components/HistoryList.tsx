import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Badge, Collapse, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { promptsApi } from '../api/client';
import { Prompt } from '../types';

interface Props {
  userId: number;
  refresh: number;
}

export const HistoryList: React.FC<Props> = ({ userId, refresh }) => {
  const [history, setHistory] = useState<Prompt[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    promptsApi.getByUser(userId).then((res) => setHistory(res.data));
  }, [userId, refresh]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" maxH="calc(100vh - 150px)" overflowY="auto">
      <Heading size="md" mb={4} position="sticky" top="0" bg="white" pb={2} zIndex={1}>שאלות קודמות</Heading>
      <VStack spacing={3} align="stretch">
        {history.length === 0 ? (
          <Text color="gray.500" fontSize="sm">אין שאלות עדיין</Text>
        ) : (
          history.map((item) => (
            <Box key={item.id} borderWidth="1px" borderRadius="md" bg="gray.50" overflow="hidden">
              <Box p={3} _hover={{ bg: 'blue.50' }} cursor="pointer" onClick={() => toggleExpand(item.id)} display="flex" justifyContent="space-between" alignItems="center">
                <Box flex="1">
                  <Badge colorScheme="blue" fontSize="xs" mb={1}>
                    {item.category?.name}
                  </Badge>
                  <Text fontWeight="bold" fontSize="sm" noOfLines={2} mb={1}>{item.prompt}</Text>
                  <Text fontSize="xs" color="gray.400">
                    {new Date(item.createdAt).toLocaleDateString('he-IL')}
                  </Text>
                </Box>
                <IconButton
                  aria-label="Toggle response"
                  icon={expandedId === item.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  size="sm"
                  variant="ghost"
                />
              </Box>
              <Collapse in={expandedId === item.id}>
                <Box p={3} pt={0} borderTop="1px" borderColor="gray.200" bg="white">
                  <Text fontWeight="bold" fontSize="xs" mb={2} color="gray.600">תשובה:</Text>
                  <Text fontSize="sm" whiteSpace="pre-wrap">{item.response}</Text>
                </Box>
              </Collapse>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};
