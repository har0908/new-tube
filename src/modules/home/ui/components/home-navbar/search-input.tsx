"use client"


import { Button } from "@/components/ui/button";
import { APP_URL } from "@/constants";
import { SearchIcon, XIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"

export const SearchInput = ()=>{
    // TODO: add search functionality

    const router = useRouter()
    const searchParams = useSearchParams();
    const categoryId = searchParams.get("categoryId")||"";
    const query = searchParams.get("query")||"";

    const [value,SetValue] = useState("");

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

      const url = new URL("/search",APP_URL);
      const newQuery = value.trim();

      

      url.searchParams.set("query",encodeURIComponent(newQuery));
      if(categoryId){
        url.searchParams.set("categoryId",categoryId);
      }
      if(newQuery===""){
        url.searchParams.delete("query");
      }

      SetValue(newQuery);

      router.push(url.toString())
    }

    return (
        <form className="flex w-full max-w-[600px]" onSubmit={handleSubmit}>
          <div className="relative w-full">

            <input type="text" 
            value={value}
            onChange={(e)=>SetValue(e.target.value)}
            placeholder="Search"
            className="w-full pl-4 py-2 pr-12 rounded-l-full
            border focus:outline-none
            focus:border-blue-500"
            
            />
           {
            value && (
              <Button
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
              onClick={()=>SetValue("")}
              >
                <XIcon className="text-gray-500"/>
              </Button>)
           }

          </div>

          <button
          disabled={!value.trim()}
          type="submit"
          className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200
          disabled:opacity-50 disabled:cursor-not-allowed "
          >
            <SearchIcon className="size-5"/>

          </button>


        </form>
    )
}