import { Request, Response } from 'express';
import userService from '../services/userService';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.findAll();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await userService.create({ name, email });
  res.status(201).json(user);
};