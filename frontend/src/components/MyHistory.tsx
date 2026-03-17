import React, { useEffect, useState } from 'react';
import { Box, Container, Heading, Text, VStack, Badge, Spinner, HStack, Button, Collapse, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { promptsApi } from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import { Prompt } from '../types';

export const MyHistory: React.FC = () => {
  const [history, setHistory] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
      const response = await promptsApi.getByUser(savedUser.id);
      setHistory(response.data);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
    }
  };

  const userName = JSON.parse(localStorage.getItem('user') || '{}').name || '';

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Header */}
      <Box bg="white" boxShadow="sm" borderBottom="1px" borderColor="gray.200">
        <Container maxW="container.xl" py={4}>
          <HStack justify="space-between">
            <HStack spacing={3}>
              <Box fontSize="2xl">🎓</Box>
              <Box>
                <Heading size="md" color="blue.600">AI Learning Platform</Heading>
                <Text fontSize="sm" color="gray.600">Learn anything with artificial intelligence</Text>
              </Box>
            </HStack>
            <HStack spacing={4}>
              <Box textAlign="right">
                <Text fontSize="sm" fontWeight="600" color="gray.700">Welcome, {userName}</Text>
                <Text fontSize="xs" color="gray.500">Student</Text>
              </Box>
              <Button size="sm" colorScheme="blue" variant="ghost" onClick={() => navigate('/history')}>
                History
              </Button>
              <Button size="sm" colorScheme="green" onClick={() => navigate('/')}>
                New Lesson
              </Button>
              {user?.role === 'ADMIN' && (
                <Button size="sm" colorScheme="purple" onClick={() => navigate('/admin')}>
                  Admin Dashboard
                </Button>
              )}
              <Button size="sm" colorScheme="gray" variant="ghost" onClick={logout}>
                Logout
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Content */}
      <Container maxW="container.lg" py={8}>
        <Heading mb={6} color="blue.600">My Learning History</Heading>
        {loading ? (
          <Spinner />
        ) : history.length === 0 ? (
          <Text>No previous lessons</Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {history.map((item) => (
              <Box key={item.id} bg="white" borderRadius="lg" boxShadow="md" overflow="hidden">
                <Box p={6} cursor="pointer" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
                  <HStack justify="space-between" align="start">
                    <Box flex="1">
                      <Badge colorScheme="blue" mb={2}>
                        {item.category?.name} - {item.subCategory?.name}
                      </Badge>
                      <Text fontWeight="bold" mb={1}>{item.prompt}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {new Date(item.createdAt).toLocaleString()}
                      </Text>
                    </Box>
                    <IconButton
                      aria-label="Toggle answer"
                      icon={expandedId === item.id ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      size="sm"
                      variant="ghost"
                    />
                  </HStack>
                </Box>
                <Collapse in={expandedId === item.id}>
                  <Box p={6} pt={0} borderTop="1px" borderColor="gray.200" bg="gray.50">
                    <Text fontWeight="bold" mb={2}>Answer:</Text>
                    <Text whiteSpace="pre-wrap">{item.response}</Text>
                  </Box>
                </Collapse>
              </Box>
            ))}
          </VStack>
        )}
      </Container>
    </Box>
  );
};
