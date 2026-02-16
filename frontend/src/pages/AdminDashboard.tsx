import React, { useEffect, useState } from 'react';
import { Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import { usersApi } from '../api/client';
import { User } from '../types';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    usersApi.getAll().then((res) => setUsers(res.data));
  }, []);

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6} color="blue.600">Admin Dashboard</Heading>
      <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Total Prompts</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.name}</Td>
                <Td>{user.phone}</Td>
                <Td>{user.prompts?.length || 0}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};
