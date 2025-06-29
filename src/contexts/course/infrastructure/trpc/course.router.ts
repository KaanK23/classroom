import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '@/lib/trpc/trpc';
import { CourseStatus } from '@prisma/client';

export const courseRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        status: z.nativeEnum(CourseStatus).optional(),
        instructorId: z.string().optional(),
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { status, instructorId, limit, cursor } = input;

      const courses = await ctx.prisma.course.findMany({
        where: {
          status: status ?? CourseStatus.PUBLISHED,
          instructorId,
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          instructor: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              enrollments: true,
              modules: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (courses.length > limit) {
        const nextItem = courses.pop();
        nextCursor = nextItem!.id;
      }

      return {
        courses,
        nextCursor,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const course = await ctx.prisma.course.findUnique({
        where: { id: input.id },
        include: {
          instructor: {
            select: {
              id: true,
              name: true,
              image: true,
              email: true,
            },
          },
          modules: {
            orderBy: { order: 'asc' },
            include: {
              lessons: {
                orderBy: { order: 'asc' },
              },
            },
          },
        },
      });

      if (!course) {
        throw new Error('Course not found');
      }

      return course;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        description: z.string().min(1),
        instructorId: z.string(),
        price: z.number().min(0).optional(),
        currency: z.string().default('USD'),
        settings: z.object({
          isPublic: z.boolean().default(true),
          requiresApproval: z.boolean().default(false),
          maxStudents: z.number().nullable().optional(),
          allowDiscussions: z.boolean().default(true),
        }).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const course = await ctx.prisma.course.create({
        data: {
          ...input,
          settings: input.settings ?? {},
        },
      });

      return course;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).max(200).optional(),
        description: z.string().min(1).optional(),
        status: z.nativeEnum(CourseStatus).optional(),
        price: z.number().min(0).optional(),
        settings: z.record(z.unknown()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      const course = await ctx.prisma.course.update({
        where: { id },
        data,
      });

      return course;
    }),
});