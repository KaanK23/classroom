import { createCallerFactory } from '@/lib/trpc/trpc';
import { appRouter } from '@/lib/trpc/root';
import { prisma } from '@/lib/db/prisma';

jest.mock('@/lib/db/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('User Router', () => {
  const createCaller = createCallerFactory(appRouter);
  const mockContext = {
    prisma,
    req: {} as any,
    res: {} as any,
  };
  const caller = createCaller(mockContext);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
        profile: {
          id: '456',
          userId: '123',
          bio: 'Test bio',
          settings: {},
        },
      };

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await caller.user.getProfile({ userId: '123' });

      expect(result).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: '123' },
        include: { profile: true },
      });
    });

    it('should throw error if user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(
        caller.user.getProfile({ userId: 'nonexistent' })
      ).rejects.toThrow('User not found');
    });
  });

  describe('updateProfile', () => {
    it('should update user profile', async () => {
      const mockUpdatedUser = {
        id: '123',
        email: 'test@example.com',
        name: 'Updated Name',
        profile: {
          id: '456',
          userId: '123',
          bio: 'Updated bio',
          settings: { theme: 'dark' },
        },
      };

      (prisma.user.update as jest.Mock).mockResolvedValue(mockUpdatedUser);

      const result = await caller.user.updateProfile({
        userId: '123',
        name: 'Updated Name',
        bio: 'Updated bio',
        settings: { theme: 'dark' },
      });

      expect(result).toEqual(mockUpdatedUser);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: '123' },
        data: {
          name: 'Updated Name',
          profile: {
            upsert: {
              create: {
                bio: 'Updated bio',
                settings: { theme: 'dark' },
              },
              update: {
                bio: 'Updated bio',
                settings: { theme: 'dark' },
              },
            },
          },
        },
        include: { profile: true },
      });
    });
  });
});