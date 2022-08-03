import { Router } from 'express';

import CreateModuleService from '../services/module/CreateModuleService';
import ModuleRepository from '../repositories/Module/ModuleRepository';
import CreateModuleController from '../controllers/module/CreateModuleController';
import prisma from '../config/prismaClient';
import FindModuleByIdService from '../services/module/FindModuleByIdService';
import FindByIdModuleController from '../controllers/module/FindByIdModuleController';
import DeleteModule from '../controllers/module/DeleteModuleController';
import DeleteModuleService from '../services/module/DeleteModuleService';
import UpdateModuleService from '../services/module/UpdateModuleService';
import UpdateModuleController from '../controllers/module/UpdateModuleController';
import FindAllModuleByIdModuleService from '../services/module/FindAllModuleService';
import FindAllModuleController from '../controllers/module/FindAllModuleController';

require('express-async-errors');

const router = Router();

// Injetando as dependências
const moduleRepository = new ModuleRepository(prisma);
const createModuleService = new CreateModuleService(moduleRepository);
const createModuleController = new CreateModuleController(createModuleService);

// FindById
const findByIdModuleService = new FindModuleByIdService(moduleRepository);
const findModuleByIdController = new FindByIdModuleController(
  findByIdModuleService,
);

// FindAll
const findAllModuleService = new FindAllModuleByIdModuleService(
  moduleRepository,
);
const findAllModuleController = new FindAllModuleController(
  findAllModuleService,
);

// Delete
const deleteService = new DeleteModuleService(moduleRepository);
const deleteController = new DeleteModule(deleteService);

// Update
const updateService = new UpdateModuleService(moduleRepository);
const updateController = new UpdateModuleController(updateService);

router.post('/', createModuleController.handle.bind(createModuleController));
router.get(
  '/:id',
  findModuleByIdController.handle.bind(findModuleByIdController),
);
router.get('/', findAllModuleController.handle.bind(findAllModuleController));
router.delete('/:id', deleteController.handle.bind(deleteController));
router.put('/:id', updateController.handle.bind(updateController));

export default router;
