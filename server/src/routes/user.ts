import express from 'express';
import User from '../models/User';
import UserService from '../services/user';
import { UserQueryParams } from '../dto/users.dto';
import CustomError from '../utils/CustomError';
import { handleError } from '../utils/handleError';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { page, limit, name } = new UserQueryParams(
      req.query.page as string,
      req.query.limit as string,
      req.query.name as string
    );

    const users = await UserService.getUsers({ page, limit, name });
    res.json(users);
  } catch (error) {
    handleError(error, res);
  }
});

router.get('/:idNumber', async (req, res) => {
  try {
    const users = await UserService.getUserById(Number(req.params.idNumber));
    res.json(users);
  } catch (error) {
    handleError(error, res);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await UserService.createUser(req.body);
    res.json(newUser);
  } catch (error) {
    handleError(error, res);
  }
});

router.delete('/:idNumber', async (req, res) => {
  try {
    const users = await UserService.deleteUser(Number(req.params.idNumber));
    res.json(users);
  } catch (error) {
    handleError(error, res);
  }
});

export default router;
