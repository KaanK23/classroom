import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/lib/trpc/trpc';
import { EnrollmentStatus } from '@prisma/client';

export const learningRouter = createTRPCRouter({
  enroll: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const enrollment = await ctx.prisma.enrollment.create({
        data: {
          userId: input.userId,
          courseId: input.courseId,
          status: EnrollmentStatus.ACTIVE,
        },
        include: {
          course: true,
        },
      });

      return enrollment;
    }),

  getEnrollment: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const enrollment = await ctx.prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: input.userId,
            courseId: input.courseId,
          },
        },
        include: {
          progress: {
            include: {
              lesson: true,
            },
          },
        },
      });

      return enrollment;
    }),

  updateProgress: protectedProcedure
    .input(
      z.object({
        enrollmentId: z.string(),
        lessonId: z.string(),
        watchTime: z.number().min(0),
        completed: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { enrollmentId, lessonId, watchTime, completed } = input;

      const progress = await ctx.prisma.progress.upsert({
        where: {
          enrollmentId_lessonId: {
            enrollmentId,
            lessonId,
          },
        },
        create: {
          enrollmentId,
          lessonId,
          watchTime,
          completed: completed ?? false,
          completedAt: completed ? new Date() : null,
          lastWatchedAt: new Date(),
        },
        update: {
          watchTime: {
            increment: watchTime,
          },
          completed: completed ?? undefined,
          completedAt: completed ? new Date() : undefined,
          lastWatchedAt: new Date(),
        },
      });

      return progress;
    }),

  getUserEnrollments: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        status: z.nativeEnum(EnrollmentStatus).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const enrollments = await ctx.prisma.enrollment.findMany({
        where: {
          userId: input.userId,
          status: input.status,
        },
        include: {
          course: {
            include: {
              instructor: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
          progress: true,
        },
        orderBy: {
          enrolledAt: 'desc',
        },
      });

      return enrollments.map((enrollment) => {
        const totalLessons = enrollment.progress.length;
        const completedLessons = enrollment.progress.filter((p) => p.completed).length;
        const completionPercentage = totalLessons > 0 
          ? Math.round((completedLessons / totalLessons) * 100) 
          : 0;

        return {
          ...enrollment,
          completionPercentage,
        };
      });
    }),
});