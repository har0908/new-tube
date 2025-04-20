"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { DEFAULT_LIMIT } from "@/constants";

import { trpc } from "@/trpc/client";
import {  ListIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export const LoadingSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <SidebarMenuItem key={i}>
          <SidebarMenuButton disabled>
            <Skeleton className="size-6 rounded-full shrink-0" />
            <Skeleton className="h-4 w-full" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};

export const SubscriptionSection = () => {
  const { data, isLoading } = trpc.subscriptions.getMany.useInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarGroupLabel>You</SidebarGroupLabel>
        <SidebarMenu>
          {isLoading && <LoadingSkeleton />}

          {!isLoading &&
            data?.pages
              .flatMap((page) => page.items)
              .map((subscriptions) => (
                <SidebarMenuItem
                  key={`${subscriptions.creatorId}-${subscriptions.viewerId}`}
                >
                  <SidebarMenuButton
                    tooltip={subscriptions.user.name}
                    asChild
                    isActive={pathname === `/users/${subscriptions.user.id}`}
                  >
                    <Link prefetch 
                      href={`/users/${subscriptions.user.id}`}
                      className="flex items-center gap-4"
                    >
                      <UserAvatar
                        name={subscriptions.user.name}
                        size="xs"
                        imageUrl={subscriptions.user.imageUrl}
                      />
                      <span className="text-sm">{subscriptions.user.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {
                !isLoading && (
                    <SidebarMenuItem>
                        <SidebarMenuButton
                        asChild
                        isActive={pathname==="/subscriptions"}
                        >
                            <Link prefetch  href="/subscriptions" className="flex items-center gap-4">
                            <ListIcon className="size-4"/>
                            <span className="text-sm">All Subscription</span>
                            </Link>


                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
              }
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
