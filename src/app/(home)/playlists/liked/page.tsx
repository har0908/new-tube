import { trpc, HydrateClient } from "@/trpc/server";

import { DEFAULT_LIMIT } from "@/constants";
import { LikedView } from "@/modules/playlists/ui/views/liked-view";


const page = async () => {
  void trpc.playlists.getLiked.prefetch({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <LikedView/>
    </HydrateClient>
  );
};

export default page;
