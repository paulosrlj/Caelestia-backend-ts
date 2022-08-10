import { Router } from 'express';
import prisma from '../config/prismaClient';
import BuyItemController from '../controllers/item/BuyItemController';
import CreateItemController from '../controllers/item/CreateItemController';
import ItemRepository from '../repositories/Item/ItemRepository';
import BuyItemService from '../services/Item/BuyItemService';
import CreateItemService from '../services/Item/CreateItemService';

require('express-async-errors');

const router = Router();

const itemRepository = new ItemRepository(prisma);

// Create
const createService = new CreateItemService(itemRepository);
const createController = new CreateItemController(createService);

// buy item
const buyItemService = new BuyItemService(itemRepository);
const buyItemController = new BuyItemController(buyItemService);

router.post('/', createController.handle.bind(createController));
router.post('/buyItem/', buyItemController.handle.bind(buyItemController));

export default router;
