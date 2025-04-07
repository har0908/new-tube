
import { studioRouter } from '@/modules/studio/server/procedures';
import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { videosRouter } from '@/modules/videos/server/procedures';
import { videoViewsRouter } from '@/modules/video-views/server/procedures';
import {videoRecationsRouter}from"@/modules/video-reaction/server/procedures"
import { subscriptionsRouter } from '@/modules/subscriptions/server/procedure';
import { commentsRouter } from '@/modules/comments/server/procedures';

export const appRouter = createTRPCRouter({
  studio:studioRouter,
  categories:categoriesRouter,
  videos:videosRouter,
  comments:commentsRouter,
  videoViews:videoViewsRouter,
  videoRecations:videoRecationsRouter,
  subscriptions:subscriptionsRouter


});
// export type definition of API
export type AppRouter = typeof appRouter;