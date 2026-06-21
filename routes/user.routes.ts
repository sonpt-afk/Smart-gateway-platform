import { Router } from 'express';
import { updateUserRoleController, deleteUserController } from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRole } from "../middleware/role.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { assignRoleSchema } from "../validators/user.validator.js";

const router = Router();

router.patch('/:id/role', authenticate, authorizeRole("Admin"), validateBody(assignRoleSchema), updateUserRoleController);
router.delete('/:id', authenticate, authorizeRole('Admin'), deleteUserController);
export const userRoutes = router;
