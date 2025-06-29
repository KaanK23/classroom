import { initTRPC } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { ZodError } from 'zod';
import superjson from 'superjson';
import { prisma } from '@/lib/db/prisma';

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  return {
    prisma,
    req: opts.req,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  // TODO: Add auth check with NextAuth
  return next({
    ctx: {
      ...ctx,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

export const createCallerFactory = t.createCallerFactory;