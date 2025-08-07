import { Sort } from '../enums/Sort.enum';
import { CategoryI, Category } from '../models/Category.model';

const getAllCategories = () => Category.find();

const getPaginatedCategories = async (
  limit: string,
  page: string,
  searchTerm: string,
  sort: Sort
) => {
  const categoriesPerPage = parseInt(limit, 10) || 6;
  const categoryPage = parseInt(page, 10) || 1;

  const searchQuery = searchTerm
    ? {
        $or: [{ name: { $regex: searchTerm, $options: 'i' } }],
      }
    : {};

  let sortOrder = Sort.ASC;
  if (sort === Sort.DESC) sortOrder = Sort.DESC;

  const categoryCount = await Category.countDocuments(searchQuery);
  const pageCount = Math.ceil(categoryCount / categoriesPerPage);

  const categories = await Category.find(searchQuery)
    .sort({ name: sortOrder })
    .skip((categoryPage - 1) * categoriesPerPage)
    .limit(categoriesPerPage);

  return { categories, pageCount, categoryCount };
};
const getOneCategory = (id: string) => Category.findById(id);

const getOneCategoryByName = (name: string) =>
  Category.findOne({ name }).collation({ locale: 'en', strength: 2 });

const createCategory = (data: Partial<CategoryI>) => Category.create(data);

const editCategory = (id: string, data: Partial<CategoryI>) =>
  Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteCategory = (id: string) => Category.findByIdAndDelete(id);

const getAllCount = async () => {
  const count = await Category.estimatedDocumentCount();
  return count;
};

export const categoryService = {
  getAllCategories,
  getPaginatedCategories,
  getOneCategory,
  getOneCategoryByName,
  createCategory,
  editCategory,
  deleteCategory,
  getAllCount,
};
