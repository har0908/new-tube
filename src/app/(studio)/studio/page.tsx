import { DEFAULT_LIMIT } from "@/constants";
import { StudioView } from "@/modules/studio/ui/views/studio-view";
import { trpc,HydrateClient } from "@/trpc/server";



const Page = async() =>{
    void trpc.studio.getMany.prefetchInfinite(
        {
            limit:DEFAULT_LIMIT,
        }
    );
    return (
        <HydrateClient>
            <StudioView/>
        </HydrateClient>
        
    )
}

export default Page;