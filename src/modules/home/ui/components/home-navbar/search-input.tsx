"use client"

import { Button } from "@/components/ui/button";
import { APP_URL } from "@/constants";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, KeyboardEvent } from "react";

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    const newQuery = value.trim();
    
    if (newQuery) {
      const url = new URL(
        "/search", 
        APP_URL ? `https://${APP_URL}` : "http://localhost:3000"
      );
      
      url.searchParams.set("query", encodeURIComponent(newQuery));
      router.push(url.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <form className="flex w-full max-w-[600px]" onSubmit={handleSubmit}>
      <div className="relative w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search YouTube"
          className="w-full pl-4 py-2 pr-12 rounded-l-full
            border focus:outline-none
            focus:border-blue-500"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
            onClick={handleClear}
          >
            <XIcon className="text-gray-500" />
          </Button>
        )}
      </div>
      <button
        disabled={!value.trim()}
        type="submit"
        className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <SearchIcon className="size-5" />
      </button>
    </form>
  );
};