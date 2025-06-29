import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/lib/trpc/trpc';
import { MetricType } from '@prisma/client';

export const analyticsRouter = createTRPCRouter({
  getCourseAnalytics: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { courseId, startDate, endDate } = input;

      const [enrollments, metrics] = await Promise.all([
        ctx.prisma.enrollment.findMany({
          where: { courseId },
          include: {
            progress: true,
          },
        }),
        ctx.prisma.courseMetric.findMany({
          where: {
            courseId,
            timestamp: {
              gte: startDate,
              lte: endDate,
            },
          },
        }),
      ]);

      const totalEnrollments = enrollments.length;
      const activeStudents = enrollments.filter(
        (e) => e.status === 'ACTIVE'
      ).length;
      const completedStudents = enrollments.filter(
        (e) => e.status === 'COMPLETED'
      ).length;

      const completionRate = totalEnrollments > 0
        ? (completedStudents / totalEnrollments) * 100
        : 0;

      const averageProgress = enrollments.reduce((acc, enrollment) => {
        const totalLessons = enrollment.progress.length;
        const completedLessons = enrollment.progress.filter((p) => p.completed).length;
        const progress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        return acc + progress;
      }, 0) / (enrollments.length || 1);

      const totalWatchTime = enrollments.reduce((acc, enrollment) => {
        const watchTime = enrollment.progress.reduce((sum, p) => sum + p.watchTime, 0);
        return acc + watchTime;
      }, 0);

      return {
        courseId,
        totalEnrollments,
        activeStudents,
        completionRate,
        averageProgress,
        averageWatchTime: totalWatchTime / (enrollments.length || 1),
        metrics,
      };
    }),

  getUserAnalytics: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId, startDate, endDate } = input;

      const [enrollments, metrics] = await Promise.all([
        ctx.prisma.enrollment.findMany({
          where: { userId },
          include: {
            progress: true,
            course: true,
          },
        }),
        ctx.prisma.userMetric.findMany({
          where: {
            userId,
            timestamp: {
              gte: startDate,
              lte: endDate,
            },
          },
        }),
      ]);

      const coursesEnrolled = enrollments.length;
      const coursesCompleted = enrollments.filter(
        (e) => e.status === 'COMPLETED'
      ).length;

      const totalWatchTime = enrollments.reduce((acc, enrollment) => {
        const watchTime = enrollment.progress.reduce((sum, p) => sum + p.watchTime, 0);
        return acc + watchTime;
      }, 0);

      return {
        userId,
        coursesEnrolled,
        coursesCompleted,
        totalWatchTime,
        enrollments: enrollments.map((enrollment) => {
          const totalLessons = enrollment.progress.length;
          const completedLessons = enrollment.progress.filter((p) => p.completed).length;
          const completionPercentage = totalLessons > 0
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0;

          return {
            ...enrollment,
            completionPercentage,
          };
        }),
        metrics,
      };
    }),

  recordMetric: protectedProcedure
    .input(
      z.object({
        entityId: z.string(),
        entityType: z.enum(['USER', 'COURSE']),
        type: z.nativeEnum(MetricType),
        value: z.number(),
        metadata: z.record(z.unknown()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { entityId, entityType, type, value, metadata } = input;

      if (entityType === 'USER') {
        return ctx.prisma.userMetric.create({
          data: {
            userId: entityId,
            type,
            value,
            metadata: metadata ?? {},
            timestamp: new Date(),
          },
        });
      } else {
        return ctx.prisma.courseMetric.create({
          data: {
            courseId: entityId,
            type,
            value,
            metadata: metadata ?? {},
            timestamp: new Date(),
          },
        });
      }
    }),
});