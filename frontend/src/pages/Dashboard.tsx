import React, { useState } from 'react';
import { Container, Heading, VStack, Divider } from '@chakra-ui/react';
import { UserRegistration } from '../components/UserRegistration';
import { LearningForm } from '../components/LearningForm';
import { HistoryList } from '../components/HistoryList';

export const Dashboard: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(0);

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center" color="blue.600">AI Learning Platform</Heading>
        {!userId ? (
          <UserRegistration onUserCreated={setUserId} />
        ) : (
          <>
            <LearningForm userId={userId} onLessonCreated={() => setRefresh((r) => r + 1)} />
            <Divider />
            <HistoryList userId={userId} refresh={refresh} />
          </>
        )}
      </VStack>
    </Container>
  );
};
