import { InfiniteScroll } from "@/components/infinite-scroll";
import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import { Loader2Icon, SquareCheckIcon, SquareIcon } from "lucide-react";
import { toast } from "sonner";


import { z } from "zod";




interface PlaylistCreateModalProps {
  videoId:string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().min(1),
});

export const PlaylistAddModal = ({
  videoId,
  open,
  onOpenChange,
}: PlaylistCreateModalProps) => {

  const utils = trpc.useUtils();


  const {
     data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = trpc.playlists.getManyForVideo.useInfiniteQuery({
    videoId,
    limit:DEFAULT_LIMIT
  },{
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: !!videoId && open
  })
 const handleOpenChange = (newOpen:boolean)=>{
  utils.playlists.getManyForVideo.reset()
  onOpenChange(newOpen);

 }

 const addVideo = trpc.playlists.addVideo.useMutation({
  onSuccess:(data)=>{
    toast.success("Video added to playlist")
    utils.playlists.getMany.invalidate()
    utils.playlists.getManyForVideo.invalidate({videoId})
  },
  onError:()=>{
    toast.error("something went wrong")
  }

 })

 const removeVideo = trpc.playlists.removeVideo.useMutation({
  onSuccess:()=>{
    toast.success("Video removed from playlist")
    utils.playlists.getMany.invalidate()
    utils.playlists.getManyForVideo.invalidate({videoId})
  },
  onError:()=>{
    toast.error("something went wrong")
  }
 })


  
  return (
    <ResponsiveModal
      title="Add to playlist"
      open={open}
      onOpenChange={onOpenChange}
    >
        <div className="flex flex-col gap-2">

          {isLoading &&(
            <div className="flex justify-center">
              <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
            </div>

          )}
          {
            !isLoading && data?.pages
            .flatMap((page)=>page.items)
            .map((playlist)=>(
              <Button
              key={playlist.id}
              variant="ghost"
              className="w-full justify-start px-2 [&_svg]:size-5"
              size="lg"
              onClick={()=>{
                if(playlist.containsVideo){
                  removeVideo.mutate({
                    playlistId:playlist.id,
                    videoId,
                    
                  })
                }else{
                  addVideo.mutate({
                    playlistId:playlist.id,
                    videoId,
                  })
                }
              }}
              disabled={removeVideo.isPending || addVideo.isPending}
               >
                {
                  playlist.containsVideo ?(
                    <SquareCheckIcon className="mr-2" />
                  ):(
                    <SquareIcon className="mr-2" />
                  )
                }
                {playlist.name}
              </Button>
            ))
          }

          {
            !isLoading && (
              <InfiniteScroll
              isManual

              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
              >
                
                  
              </InfiniteScroll>
            )
          }

        </div>
      
    </ResponsiveModal>
  );
};
