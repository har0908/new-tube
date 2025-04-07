import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { VideoGetOneOutput } from "../../types";
import { use } from "react";
import { useClerk } from "@clerk/nextjs";
import { trpc } from "@/trpc/client";
import { error } from "console";
import { toast } from "sonner";

interface VideoReactionsProps{
    videoId:string;
    likes:number;
    dislikes:number;
    viewerReaction:VideoGetOneOutput["viewerReaction"]
}

export const VideoReactions = ({
    videoId,
    likes,
    dislikes,
    viewerReaction
}:VideoReactionsProps) => {

    const clerk = useClerk();

    const utils = trpc.useUtils();

    const like= trpc.videoRecations.like.useMutation(
        {
            onSuccess:()=>{
                utils.videos.getOne.invalidate({id:videoId})
                //TODO:Inavlidate "liked" playlist

            },
            onError:(error)=>{
                toast.error("Something went wrong")
                if(error.data?.code==="UNAUTHORIZED"){
                    clerk.openSignIn()
                }
            }
        }
    );
    const dislike= trpc.videoRecations.dislike.useMutation({
        onSuccess:()=>{
            utils.videos.getOne.invalidate({id:videoId})
            //TODO:Inavlidate "liked" playlist

        },
        onError:(error)=>{
            toast.error("Something went wrong")
            if(error.data?.code==="UNAUTHORIZED"){
                clerk.openSignIn()
            }
        }
    });



  

  return (
    <div className="flex items-center flex-none">
      <Button
      onClick={()=>like.mutate({videoId})}
        variant="secondary"
        className="rounded-l-full rounded-r-none gap-2 pr-4"
        disabled={like.isPending || dislike.isPending}
      >
        <ThumbsUpIcon
          className={cn("size-5", viewerReaction === "like" && "fill-black")}
        />
        {likes}
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        onClick={()=>dislike.mutate({videoId})}
        disabled={like.isPending || dislike.isPending}
        variant="secondary"
        className="rounded-l-none rounded-r-full pl-3"
      >
        <ThumbsDownIcon
          className={cn("size-5", viewerReaction === "dislike" && "fill-black")}
        />
        {dislikes}
      </Button>
    </div>
  );
};
