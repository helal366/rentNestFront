"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

interface SearchFormData {
  location: string;
}

export function HeroSearchForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { register, handleSubmit } = useForm<SearchFormData>();

  const handleSearchSubmit = (data: SearchFormData) => {
    startTransition(() => {
      const query = data.location
        ? `?location=${encodeURIComponent(data.location)}`
        : "";
      router.push(`/properties${query}`);
    });
  };

  return (
    <Card className="shadow-lg shadow-neutral-100 border border-neutral-200 max-w-2xl mx-auto lg:mx-0 p-1.5 bg-white">
      <CardContent className="p-0">
        <form
          onSubmit={handleSubmit(handleSearchSubmit)}
          className="flex flex-col sm:flex-row gap-2 items-center"
        >
          <div className="relative w-full flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search zones (e.g. Gulshan, Dhanmondi, Jatrabari)..."
              className="w-full pl-10 border-0 shadow-none focus-visible:ring-0 text-sm h-11"
              {...register("location")}
            />
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto bg-[#3E4A36] text-white hover:bg-[#2D3627] font-semibold h-11 px-6 rounded-md cursor-pointer text-xs"
          >
            {isPending ? "Searching..." : "Explore Nests"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
