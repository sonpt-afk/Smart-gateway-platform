import { prisma } from '../config/db.js';

    export class UserRepository {
      async findByEmail(email: string) {
        return prisma.user.findUnique({
          where: { email },
          include: { role: true }
        });
      }

      async findOrCreateRole(roleName: string) {
        let role = await prisma.role.findUnique({
          where: { name: roleName }
        });
        if (!role) {
          role = await prisma.role.create({
            data: { name: roleName }
          });
        }
        return role;
      }

      async createUser(data: { email: string; passwordHash: string; name?: string; roleId: string }) {
        return prisma.user.create({
          data: {
            email: data.email,
            password: data.passwordHash,
            name: data.name,
            roleId: data.roleId
          },
          include: {
            role: true
          }
        });
      }
    }