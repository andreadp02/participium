import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const userController = {
  async createMunicipalityUser(req: Request, res: Response) {
    try {
      const { email, username, firstName, lastName, password, municipality_role_id } = req.body;

      if (!email || !username || !firstName || !lastName || !password || !municipality_role_id) {
        return res.status(400).json({ 
          error: 'Bad Request', 
          message: 'Missing required fields: email, username, firstName, lastName, password, municipality_role_id' 
        });
      }
      const user = await authService.createMunicipalityUser(
        email, 
        username, 
        firstName, 
        lastName, 
        password,
        municipality_role_id
      );

      res.status(201).json(user);
    } catch (error: any) {
      if (error.message === 'Email is already in use' || error.message === 'Username is already in use') {
        res.status(409).json({ error: 'Conflict Error', message: error.message });
      } else {
        res.status(400).json({ error: 'Bad Request', message: error.message });
      }
    }
  },

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await authService.getAllUsers();
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  },

  async getUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Bad Request', message: 'Invalid user ID' });
      }

      const user = await authService.getUserById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'Not Found', message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  },

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        return res.status(400).json({ error: 'Bad Request', message: 'Invalid user ID' });
      }

      await authService.deleteUser(userId);
      res.status(204).send();
    } catch (error: any) {
      if (error.message === 'User not found') {
        res.status(404).json({ error: 'Not Found', message: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
      }
    }
  },
};
