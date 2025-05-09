"use client"

import { 
    SidebarGroup, 
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu, 
    SidebarMenuButton,
    SidebarMenuItem } from "@/components/ui/sidebar"
import { useAuth, useClerk } from "@clerk/nextjs"
import {  HistoryIcon, ListVideoIcon,  ThumbsUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"



const items =[
    {
        title:"History",
        url:"/playlists/history",
        icon: HistoryIcon,
        auth:true
    },
    {
        title:"Liked videos",
        url:"/playlists/liked",
        icon: ThumbsUp,
        auth:true
    },
    {
        title:"All playlists",
        url:"/playlists",
        icon: ListVideoIcon,
        auth:true
    }
]

export const PersonalSection = () =>{
    const clerk = useClerk();
    const {isSignedIn}=useAuth();
    const pathname = usePathname();
    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarGroupLabel>You</SidebarGroupLabel>
                <SidebarMenu>
                    {items.map((item)=>(
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                            tooltip={item.title}
                            asChild
                            isActive={pathname===item.url}
                            onClick={(e)=>{
                                if(item.auth && !isSignedIn){
                                    e.preventDefault();
                                    clerk.openSignIn()
                                }
                            }}
                            >
                                <Link prefetch  href={item.url} className="flex items-center gap-4">
                                    <item.icon  />
                                    <span className="text-sm">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}                       
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}