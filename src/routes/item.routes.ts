import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreateItemController from '../controllers/item/CreateItemController';
import ItemRepository from '../repositories/Item/ItemRepository';
import CreateItemService from '../services/Item/CreateItemService';

require('express-async-errors');

const router = Router();

const createItemRepository = new ItemRepository(prisma);

// Create
const createService = new CreateItemService(createItemRepository);
const createController = new CreateItemController(createService);

router.post('/', createController.handle.bind(createController));

export default router;
