export interface User {
  id: number;
  name: string;
  phone: string;
  prompts?: Prompt[];
}

export interface Category {
  id: number;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
  categoryId: number;
}

export interface Prompt {
  id: number;
  userId: number;
  categoryId: number;
  subCategoryId: number;
  prompt: string;
  response: string;
  createdAt: string;
  category?: Category;
  subCategory?: SubCategory;
  user?: User;
}
