import { createTRPCRouter } from './trpc';
import { userRouter } from '@/contexts/user/infrastructure/trpc/user.router';
import { courseRouter } from '@/contexts/course/infrastructure/trpc/course.router';
import { learningRouter } from '@/contexts/learning/infrastructure/trpc/learning.router';
import { analyticsRouter } from '@/contexts/analytics/infrastructure/trpc/analytics.router';

export const appRouter = createTRPCRouter({
  user: userRouter,
  course: courseRouter,
  learning: learningRouter,
  analytics: analyticsRouter,
});

export type AppRouter = typeof appRouter;