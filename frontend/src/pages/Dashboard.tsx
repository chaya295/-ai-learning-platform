import React, { useState, useEffect } from 'react';
import { Container, Heading, Grid, GridItem, Box } from '@chakra-ui/react';
import { LearningForm } from '../components/LearningForm';
import { HistoryList } from '../components/HistoryList';

export const Dashboard: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserId(user.id);
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
    <Container maxW="container.xl" py={8}>
      <Heading textAlign="center" color="blue.600" mb={8}>AI Learning Platform</Heading>
      <Grid templateColumns={{ base: '1fr', lg: '1fr 400px' }} gap={6}>
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
  );
};
