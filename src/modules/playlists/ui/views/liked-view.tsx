
import { LikedVideosSection } from "../sections/liked-videos-section";


export const LikedView = ()=>{
    return (
        <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6  ">
           
            <div>
                <h1 className="text-2xl font-bold">Liked</h1>
                <p className="text-xs text-muted-foreground">
                    Liked videos you have watched
                </p>
            </div>
            <LikedVideosSection/>
            
        </div>
    )
}