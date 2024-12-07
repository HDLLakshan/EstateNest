import { Request, Response } from 'express';
import {
  createDivision,
  getDivisions,
  getDivisionById,
  updateDivision,
} from '../models/Division';

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const division = await createDivision(req.body);
    res.status(201).json({ message: 'Division created successfully', division });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getAll = async (_req: Request, res: Response): Promise<void> => {
  try {
    const divisions = await getDivisions();
    res.status(200).json(divisions);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const getOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const division = await getDivisionById(req.params.id);
    res.status(200).json(division);
  } catch (error) {
    res.status(404).json({ message: (error as Error).message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const division = await updateDivision(req.params.id, req.body);
    res.status(200).json({ message: 'Division updated successfully', division });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};
