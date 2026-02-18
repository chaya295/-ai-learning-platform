import React, { useEffect, useState } from 'react';
import { Container, Heading, Table, Thead, Tbody, Tr, Th, Td, Box, Input, Select, HStack, Text, Badge, Tabs, TabList, TabPanels, Tab, TabPanel, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { usersApi, promptsApi } from '../api/client';
import { User, Prompt } from '../types';

export const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [promptSearch, setPromptSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    loadUsers();
    loadPrompts();
  }, [searchTerm, sortBy]);

  const loadUsers = async () => {
    const params: { search?: string; sortBy?: string } = {};
    if (searchTerm) params.search = searchTerm;
    if (sortBy) params.sortBy = sortBy;
    
    const res = await usersApi.getAll(params);
    setUsers(res.data);
  };

  const loadPrompts = async () => {
    const res = await promptsApi.getAll();
    setPrompts(res.data);
    setFilteredPrompts(res.data);
  };

  useEffect(() => {
    let filtered = prompts;

    if (promptSearch) {
      filtered = filtered.filter(p => 
        p.prompt.toLowerCase().includes(promptSearch.toLowerCase()) ||
        p.response.toLowerCase().includes(promptSearch.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(p => p.category?.name === categoryFilter);
    }

    if (userFilter) {
      filtered = filtered.filter(p => p.user?.name === userFilter);
    }

    setFilteredPrompts(filtered);
  }, [promptSearch, categoryFilter, userFilter, prompts]);

  const uniqueCategories = [...new Set(prompts.map(p => p.category?.name).filter(Boolean))];
  const uniqueUsers = [...new Set(prompts.map(p => p.user?.name).filter(Boolean))];

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={6} color="blue.600">Admin Dashboard</Heading>
      
      <Tabs colorScheme="blue">
        <TabList>
          <Tab>משתמשים</Tab>
          <Tab>שאלות ({prompts.length})</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <HStack mb={4} spacing={4}>
              <Input
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                maxW="400px"
              />
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} maxW="200px">
                <option value="name">Sort by Name</option>
                <option value="prompts">Sort by Prompts</option>
                <option value="id">Sort by ID</option>
              </Select>
              <Text fontSize="sm" color="gray.600">
                Total Users: <Badge colorScheme="blue">{users.length}</Badge>
              </Text>
            </HStack>

            <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" overflowX="auto">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Name</Th>
                    <Th>Phone</Th>
                    <Th>Total Prompts</Th>
                    <Th>Joined</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => (
                    <Tr key={user.id}>
                      <Td>{user.id}</Td>
                      <Td>{user.name}</Td>
                      <Td>{user.phone}</Td>
                      <Td>
                        <Badge colorScheme={user.prompts?.length ? 'green' : 'gray'}>
                          {user.prompts?.length || 0}
                        </Badge>
                      </Td>
                      <Td fontSize="sm" color="gray.600">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>

          <TabPanel>
            <HStack mb={4} spacing={4} wrap="wrap">
              <Input
                placeholder="חפש בשאלות ותשובות..."
                value={promptSearch}
                onChange={(e) => setPromptSearch(e.target.value)}
                maxW="300px"
              />
              <Select 
                placeholder="כל הקטגוריות" 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)} 
                maxW="200px"
              >
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Select>
              <Select 
                placeholder="כל המשתמשים" 
                value={userFilter} 
                onChange={(e) => setUserFilter(e.target.value)} 
                maxW="200px"
              >
                {uniqueUsers.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </Select>
              <Text fontSize="sm" color="gray.600">
                מציג: <Badge colorScheme="green">{filteredPrompts.length}</Badge> מתוך {prompts.length}
              </Text>
            </HStack>

            <VStack spacing={4} align="stretch">
              {filteredPrompts.map((prompt) => (
                <Accordion key={prompt.id} allowToggle>
                  <AccordionItem border="1px" borderColor="gray.200" borderRadius="md">
                    <AccordionButton _expanded={{ bg: 'blue.50' }}>
                      <Box flex="1" textAlign="left">
                        <HStack spacing={3}>
                          <Badge colorScheme="purple">{prompt.user?.name}</Badge>
                          <Badge colorScheme="blue">{prompt.category?.name}</Badge>
                          <Badge colorScheme="green">{prompt.subCategory?.name}</Badge>
                          <Text fontSize="sm" color="gray.500">
                            {new Date(prompt.createdAt).toLocaleString('he-IL')}
                          </Text>
                        </HStack>
                        <Text mt={2} fontWeight="medium">{prompt.prompt}</Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4} bg="gray.50">
                      <Text whiteSpace="pre-wrap">{prompt.response}</Text>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
