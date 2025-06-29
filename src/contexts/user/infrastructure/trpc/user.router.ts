import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/lib/trpc/trpc';
import { UserRole } from '@prisma/client';

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: input.userId },
        include: {
          profile: true,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().optional(),
        bio: z.string().optional(),
        settings: z.record(z.unknown()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, name, bio, settings } = input;

      const user = await ctx.prisma.user.update({
        where: { id: userId },
        data: {
          name,
          profile: {
            upsert: {
              create: {
                bio,
                settings: settings ?? {},
              },
              update: {
                bio,
                settings,
              },
            },
          },
        },
        include: {
          profile: true,
        },
      });

      return user;
    }),

  listUsers: protectedProcedure
    .input(
      z.object({
        role: z.nativeEnum(UserRole).optional(),
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { role, limit, cursor } = input;

      const users = await ctx.prisma.user.findMany({
        where: role ? { role } : undefined,
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          profile: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (users.length > limit) {
        const nextItem = users.pop();
        nextCursor = nextItem!.id;
      }

      return {
        users,
        nextCursor,
      };
    }),
});