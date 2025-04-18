
import { studioRouter } from '@/modules/studio/server/procedures';
import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/procedures';
import { videosRouter } from '@/modules/videos/server/procedures';
import { videoViewsRouter } from '@/modules/video-views/server/procedures';
import {videoRecationsRouter}from"@/modules/video-reaction/server/procedures"
import { subscriptionsRouter } from '@/modules/subscriptions/server/procedure';
import { commentsRouter } from '@/modules/comments/server/procedures';
import { commentRecationsRouter } from '@/modules/comment-reaction/server/procedures';
import { suggestionsRouter } from '@/modules/suggestions/server/procedures';
import { searchRouter } from '@/modules/search/server/procedures';
import { playlistsRouter } from '@/modules/playlists/server/procedures';
import { usersRouter } from '@/modules/users/server/procedures';

export const appRouter = createTRPCRouter({
  studio:studioRouter,
  categories:categoriesRouter,
  users:usersRouter,
  videos:videosRouter,
  comments:commentsRouter,
  videoViews:videoViewsRouter,
  videoRecations:videoRecationsRouter,
  subscriptions:subscriptionsRouter,
  commentRecations:commentRecationsRouter,
  suggestions:suggestionsRouter,
  search:searchRouter,
  playlists:playlistsRouter




});
// export type definition of API
export type AppRouter = typeof appRouter;