import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Select, Textarea, VStack, useToast, Heading } from '@chakra-ui/react';
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
  const toast = useToast();

  useEffect(() => {
    categoriesApi.getAll().then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory) return;

    setLoading(true);
    try {
      await promptsApi.create({ userId, categoryId: selectedCategory, subCategoryId: selectedSubCategory, prompt });
      toast({ title: 'Lesson generated!', status: 'success', duration: 3000 });
      setPrompt('');
      onLessonCreated();
    } catch (error) {
      toast({ title: 'Error generating lesson', status: 'error', duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const selectedCategoryData = categories.find((c) => c.id === selectedCategory);

  return (
    <Box bg="white" p={8} borderRadius="lg" boxShadow="lg">
      <Heading size="md" mb={6}>Generate a New Lesson</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select category"
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
              <FormLabel>Sub-Category</FormLabel>
              <Select placeholder="Select sub-category" onChange={(e) => setSelectedSubCategory(Number(e.target.value))}>
                {selectedCategoryData.subCategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl isRequired>
            <FormLabel>What do you want to learn?</FormLabel>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Teach me about black holes"
              rows={4}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={loading}
            isDisabled={!selectedCategory || !selectedSubCategory}
          >
            Generate Lesson
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
