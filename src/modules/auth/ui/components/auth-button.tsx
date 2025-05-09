"use client";

import {  ClapperboardIcon, UserCircleIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";


import { SignedIn, SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

export const AuthButton = () => {
  // ToDO: add different auth states
  return (
    <>
    <SignedIn>
      
        <UserButton>
          <UserButton.MenuItems>
            {/* TODO: Add user profile menu button */}
            <UserButton.Link
            label="My Profile"
            href="/users/current"
            labelIcon={<UserIcon className="size-4"/>}
            />
            <UserButton.Link
            label="Studio"
            href="/studio"
            labelIcon={<ClapperboardIcon className="size-4"/>}
            />
            <UserButton.Action label="manageAccount"/>


          </UserButton.MenuItems>

          </UserButton>
    </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="outline"
            className="px-4 py-2 text-sm font medium text-blue-600
        hover:text-blue-500 border-blue-500/20 rounded-full shadow-none 
         "
          >
            <UserCircleIcon />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
