import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Badge, Collapse, IconButton, useToast, HStack } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon, DeleteIcon } from '@chakra-ui/icons';
import { promptsApi } from '../api/client';
import { Prompt } from '../types';

interface Props {
  userId: number;
  refresh: number;
}

export const HistoryList: React.FC<Props> = ({ userId, refresh }) => {
  const [history, setHistory] = useState<Prompt[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    promptsApi.getByUser(userId).then((res) => setHistory(res.data));
  }, [userId, refresh]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;

    try {
      await promptsApi.delete(id);
      setHistory(history.filter(item => item.id !== id));
      toast({
        title: 'Lesson deleted successfully',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Error deleting lesson',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200" maxH="calc(100vh - 150px)" overflowY="auto">
      <Heading size="md" mb={5} color="gray.800">Learning History</Heading>
      <VStack spacing={3} align="stretch">
        {history.length === 0 ? (
          <Box textAlign="center" py={8}>
            <Text color="gray.400" fontSize="sm">No lessons yet</Text>
            <Text color="gray.400" fontSize="xs" mt={1}>Your lessons will appear here</Text>
          </Box>
        ) : (
          history.map((item) => (
            <Box
              key={item.id}
              borderWidth="1px"
              borderRadius="md"
              borderColor="gray.200"
              bg="white"
              overflow="hidden"
              transition="all 0.2s"
              _hover={{ boxShadow: 'sm', borderColor: 'blue.300' }}
            >
              <Box
                p={4}
                cursor="pointer"
                onClick={() => toggleExpand(item.id)}
                bg={expandedId === item.id ? 'blue.50' : 'white'}
                transition="all 0.2s"
              >
                <HStack justify="space-between" align="start" spacing={3}>
                  <Box flex="1" minW="0">
                    <HStack spacing={2} mb={2}>
                      <Badge colorScheme="blue" fontSize="xs" px={2}>
                        {item.category?.name}
                      </Badge>
                      <Badge colorScheme="purple" fontSize="xs" px={2}>
                        {item.subCategory?.name}
                      </Badge>
                    </HStack>
                    <Text fontWeight="500" fontSize="sm" noOfLines={2} mb={2} color="gray.700">
                      {item.prompt}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </Text>
                  </Box>
                  <HStack spacing={1}>
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={(e) => handleDelete(item.id, e)}
                    />
                    <IconButton
                      aria-label="Toggle response"
                      icon={expandedId === item.id ? <ChevronUpIcon boxSize={5} /> : <ChevronDownIcon boxSize={5} />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                    />
                  </HStack>
                </HStack>
              </Box>
              <Collapse in={expandedId === item.id}>
                <Box p={4} pt={0} bg="gray.50" borderTop="1px" borderColor="gray.200">
                  <Text fontWeight="500" fontSize="xs" mb={3} color="gray.600" textTransform="uppercase">
                    Response:
                  </Text>
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="md"
                    border="1px"
                    borderColor="gray.200"
                    maxH="400px"
                    overflowY="auto"
                    css={{
                      '&::-webkit-scrollbar': { width: '6px' },
                      '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '10px' },
                      '&::-webkit-scrollbar-thumb': { background: '#cbd5e0', borderRadius: '10px' },
                      '&::-webkit-scrollbar-thumb:hover': { background: '#a0aec0' },
                    }}
                  >
                    <Text fontSize="sm" whiteSpace="pre-wrap" lineHeight="tall" color="gray.700">
                      {item.response}
                    </Text>
                  </Box>
                </Box>
              </Collapse>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};
