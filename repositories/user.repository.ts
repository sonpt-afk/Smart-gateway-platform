import { prisma } from '../config/db.js';

export const userRepository = {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
  },

  async findOrCreateRole(roleName: string) {
    return prisma.role.upsert({
      where:  { name: roleName },
      update: {},
      create: { name: roleName },
    });
  },

  async createUser(data: {
    email: string;
    passwordHash: string;
    name?: string;
    roleId: string;
  }) {
    return prisma.user.create({
      data: {
        email:    data.email,
        password: data.passwordHash,
        name:     data.name,
        roleId:   data.roleId,
      },
      include: { role: true },
    });
  },

   async findById(id: string) {
      return prisma.user.findUnique({
        where: { id },
        include: { role: true }
      });
    },
  
   async findRoleByName(name: string) {
      return prisma.role.findUnique({
        where: { name }
      });
    },

    async updateUser(id: string, data: { roleId: string }) {
      return prisma.user.update({
        where: { id },
        data,
        include: { role: true }
      });
    },

    async deleteUser(id: string) {
      return prisma.user.delete({
        where: { id },
      });
    }
};