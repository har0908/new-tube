import { trpc, HydrateClient } from "@/trpc/server";

import { DEFAULT_LIMIT } from "@/constants";
import { HistoryView } from "@/modules/playlists/ui/views/history-view";
import { VideosView } from "@/modules/playlists/ui/views/videos-view";


export const dynamic = "force-dynamic"

interface PageProps {
  
    params: Promise<{playlistId:string}>;
  
}

const page = async ({ params }: PageProps) => {

    const {playlistId} = await params;

  void trpc.playlists.getOne.prefetch({
    id: playlistId,
  });

  void trpc.playlists.getVideos.prefetchInfinite({

    limit: DEFAULT_LIMIT,
    playlistId
  });

  return (
    <HydrateClient>
      <VideosView playlistId={playlistId}/>
    </HydrateClient>
  );
};

export default page;
