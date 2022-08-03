import { Router } from 'express';

import CreateModuleService from '../services/module/CreateModuleService';
import ModuleRepository from '../repositories/Module/ModuleRepository';
import CreateModuleController from '../controllers/module/ModuleController';
import prisma from '../config/prismaClient';

const router = Router();

// Injetando as dependências
const moduleRepository = new ModuleRepository(prisma);
const createModuleService = new CreateModuleService(moduleRepository);
const createModuleController = new CreateModuleController(createModuleService);

router.post('/', createModuleController.handle.bind(createModuleController));

export default router;
