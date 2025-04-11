// "use client"

import { DEFAULT_LIMIT } from "@/constants"
import { HomeView } from "@/modules/home/ui/views/home-view"
import {HydrateClient, trpc} from "@/trpc/server"

export const dynamic = "force-dynamic"

interface PageProps{
  searchParams:Promise<{
    categoryId?:string
  }>
}


 

const Page= async({searchParams}:PageProps)=>{
  const {categoryId} = await searchParams
 void  trpc.categories.getMany.prefetch();
 void trpc.videos.getMany.prefetch({
  limit:DEFAULT_LIMIT,
  categoryId
 })
  return(
    <HydrateClient>
     <HomeView categoryId={categoryId}/>
    </HydrateClient>
    
  )
}

export default Page;