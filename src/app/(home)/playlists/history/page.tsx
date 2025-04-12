import { trpc, HydrateClient } from "@/trpc/server";

import { DEFAULT_LIMIT } from "@/constants";
import { HistoryView } from "@/modules/playlists/ui/views/history-view";

const page = async () => {
  void trpc.playlists.getHistory.prefetch({
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <HistoryView/>
    </HydrateClient>
  );
};

export default page;
