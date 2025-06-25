import express from "express";
import authMiddleware from "../middleware/auth.js";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categoryController.js";


const categoryRouter = express.Router();

categoryRouter.route('/cp')
    .get(authMiddleware, getCategories)
    .post(authMiddleware, createCategory)

    categoryRouter.route('/:id/cp')
    .get(authMiddleware, getCategoryById)
    .put(authMiddleware, updateCategory)
    .delete(authMiddleware, deleteCategory)

export default categoryRouter