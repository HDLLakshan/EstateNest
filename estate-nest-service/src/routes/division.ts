import express from 'express';
import { create, getAll, getOne, update } from '../controllers/divisionController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticate, create); // Create a division
router.get('/', authenticate, getAll); // Get all divisions
router.get('/:id', authenticate, getOne); // Get a single division
router.put('/:id', authenticate, update); // Update a division

export default router;
