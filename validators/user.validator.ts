import { z } from 'zod';

export const assignRoleSchema = z.object({
  roleName: z.string().min(1, 'Role name is required'),
});

export type AssignRoleInput = z.infer<typeof assignRoleSchema>;
