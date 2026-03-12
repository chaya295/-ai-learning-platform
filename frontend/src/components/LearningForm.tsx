import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Select, Textarea, VStack, useToast, Heading, Text, Divider } from '@chakra-ui/react';
import { categoriesApi, promptsApi } from '../api/client';
import { Category } from '../types';

interface Props {
  userId: number;
  onLessonCreated: () => void;
}

export const LearningForm: React.FC<Props> = ({ userId, onLessonCreated }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>('');
  const toast = useToast();

  useEffect(() => {
    categoriesApi.getAll().then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory) return;

    setLoading(true);
    setResponse('');
    try {
      const result = await promptsApi.create({ userId, categoryId: selectedCategory, subCategoryId: selectedSubCategory, prompt });
      setResponse(result.data.response);
      toast({ title: 'Lesson generated successfully!', status: 'success', duration: 3000 });
      setPrompt('');
      onLessonCreated();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Error generating lesson';
      toast({ title: errorMsg, status: 'error', duration: 5000 });
      console.error('Full error:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory);

  return (
    <VStack spacing={6} align="stretch">
      {/* Form Card */}
      <Box bg="white" p={8} borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
        <Heading size="lg" mb={2} color="gray.800">Generate New Lesson</Heading>
        <Text fontSize="sm" color="gray.600" mb={6}>
          Select a topic and ask the AI anything you want to learn
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl isRequired>
              <FormLabel fontWeight="500" color="gray.700">Category</FormLabel>
              <Select
                placeholder="Select category"
                size="lg"
                borderColor="gray.300"
                _hover={{ borderColor: 'blue.400' }}
                _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                onChange={(e) => {
                  setSelectedCategory(Number(e.target.value));
                  setSelectedSubCategory(null);
                }}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </Select>
            </FormControl>

            {selectedCategoryData && (
              <FormControl isRequired>
                <FormLabel fontWeight="500" color="gray.700">Sub-Category</FormLabel>
                <Select
                  placeholder="Select sub-category"
                  size="lg"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                  onChange={(e) => setSelectedSubCategory(Number(e.target.value))}
                >
                  {selectedCategoryData.subCategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </Select>
              </FormControl>
            )}

            <FormControl isRequired>
              <FormLabel fontWeight="500" color="gray.700">What do you want to learn?</FormLabel>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Teach me about black holes"
                rows={5}
                size="lg"
                borderColor="gray.300"
                _hover={{ borderColor: 'blue.400' }}
                _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
                resize="vertical"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              isLoading={loading}
              loadingText="Generating lesson..."
              isDisabled={!selectedCategory || !selectedSubCategory || !prompt.trim()}
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
              transition="all 0.2s"
            >
              Generate Lesson
            </Button>
          </VStack>
        </form>
      </Box>

      {/* Response Card */}
      {response && (
        <Box bg="white" p={8} borderRadius="lg" boxShadow="sm" border="1px" borderColor="gray.200">
          <Heading size="md" color="gray.800" mb={4}>Your Lesson</Heading>
          <Divider mb={4} />
          <Box
            bg="gray.50"
            p={6}
            borderRadius="md"
            maxH="500px"
            overflowY="auto"
            css={{
              '&::-webkit-scrollbar': { width: '8px' },
              '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: '10px' },
              '&::-webkit-scrollbar-thumb': { background: '#cbd5e0', borderRadius: '10px' },
              '&::-webkit-scrollbar-thumb:hover': { background: '#a0aec0' },
            }}
          >
            <Text fontSize="md" lineHeight="tall" whiteSpace="pre-wrap" color="gray.700">
              {response}
            </Text>
          </Box>
        </Box>
      )}
    </VStack>
  );
};
