import { Router } from 'express';
import { trimBody } from '../middlewares/trimBody';
import { isAdmin } from '../middlewares/isAdmin';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { extractErrors } from '../utils/errParse';
import { categoryService } from '../services/categoryService';

export const categoryController = Router();

categoryController.get('/', async (req, res) => {
  try {
    const allCategories = await categoryService.getAllCategories();
    res.status(200).json(allCategories);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

categoryController.get('/admin', isAuthenticated, isAdmin, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    if (Object.keys(req.query).length > 0) {
      const { page, limit, searchTerm, sort } = req.query;
      const data = await categoryService.getPaginatedCategories(limit, page, searchTerm, sort);
      res.status(200).json(data);
    } else {
      const categoriesCount = await categoryService.getAllCount();
      res.status(200).json(categoriesCount);
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

categoryController.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getOneCategory(id);
    res.status(200).json(category);
  } catch (error) {
    const errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

categoryController.post('/', isAuthenticated, isAdmin, trimBody, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    const newCategory = await categoryService.createCategory({ ...req.body });
    res.status(201).json(newCategory);
  } catch (error) {
    let errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

categoryController.put('/:id', isAuthenticated, isAdmin, trimBody, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    const updatedCategory = await categoryService.editCategory(req.params.id, { ...req.body });
    res.status(200).json(updatedCategory);
  } catch (error) {
    let errors = extractErrors(error);
    res.status(400).json({ errors });
  }
});

categoryController.delete('/:id', isAuthenticated, isAdmin, async (req: any, res) => {
  try {
    if (req.decToken) {
      return res
        .status(401)
        .json({ expMessage: 'Your session has expired, you have to login again!' });
    }
    /*    const products = await productService.getAllFromCategory(req.params.id);
    if (products.length > 0)
      return res
        .status(400)
        .json({ hasProducts: 'Category cannot be deleted because it has products in it!' }); */
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    res.status(200).json(deletedCategory);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
