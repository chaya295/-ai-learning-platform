import React, { useState, useEffect } from 'react';
import { Container, Heading, Grid, GridItem, Box, Text, HStack, Button } from '@chakra-ui/react';
import { LearningForm } from '../components/LearningForm';
import { HistoryList } from '../components/HistoryList';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [refresh, setRefresh] = useState(0);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserId(user.id);
      setUserName(user.name);
    }
  }, []);

  if (!userId) {
    return (
      <Container maxW="container.lg" py={8}>
        <Heading textAlign="center">Loading...</Heading>
      </Container>
    );
  }

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
                היסטוריה
              </Button>
              {user?.role === 'ADMIN' && (
                <Button size="sm" colorScheme="purple" onClick={() => navigate('/admin')}>
                  לוח מחוונים
                </Button>
              )}
              <Button
                size="sm"
                colorScheme="gray"
                variant="ghost"
                onClick={logout}
              >
                Logout
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={8}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 420px' }} gap={6}>
          <GridItem>
            <LearningForm userId={userId} onLessonCreated={() => setRefresh((r) => r + 1)} />
          </GridItem>
          <GridItem>
            <Box position="sticky" top="20px">
              <HistoryList userId={userId} refresh={refresh} />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};
